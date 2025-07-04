import React from "react";
import { useState, useEffect, useCallback } from "react";
import AsyncSelect from "react-select/async";
import debounce from "lodash/debounce";
import api from "../../../utils/api";

const EmpresaAsyncSelect = ({
  name,
  value,
  defaultValue,
  onChange,
  required = false,
  placeholder = "Buscar empresa...",
  className = "",
  isClearable = true,
  disabled = false,
}) => {
  const [empresaOptions, setEmpresaOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadEmpresas = useCallback(
    debounce(async (inputValue, callback) => {

      try {
        setIsLoading(true);
        const res = await api.get(`/empresas/?search=${inputValue}`);
        const options = res.data.empresas.map((e) => ({
          value: e._id,
          label: e.nome,
          ...e,
        }));
        callback(options);
      } catch (error) {
        console.error("Erro ao buscar empresas:", error);
        callback([]);
      } finally {
        setIsLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    if (value) {
      const loadSelectedEmpresa = async () => {
        try {
          setIsLoading(true);
          const res = await api.get(`/empresas/?search=${value}`);
          setEmpresaOptions(
            res.data.empresas.map((e) => ({
              value: e._id,
              label: e.nome,
              ...e,
            }))
          );
        } catch (error) {
          console.error("Erro ao carregar empresa:", error);
        } finally {
          setIsLoading(false);
        }
      };
      loadSelectedEmpresa();
    }
  }, [defaultValue]);

  return (
    <div className={className}>
      <AsyncSelect
        name={name}
        cacheOptions
        loadOptions={loadEmpresas}
        defaultOptions={empresaOptions}
        value={empresaOptions.find((opt) => opt.value === value)}
        onChange={(selected) => onChange(selected?.value || null)}
        placeholder={placeholder}
        noOptionsMessage={({ inputValue }) =>
          !inputValue ? "Digite algo para buscar" : "Nenhuma empresa encontrada"
        }
        loadingMessage={() => "Carregando..."}
        classNamePrefix="select"
        isClearable={isClearable}
        isLoading={isLoading}
        isDisabled={disabled}
        aria-required={required}
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          control: (base) => ({
            ...base,
            minHeight: "42px",
            borderColor: "#d1d5db",
            "&:hover": {
              borderColor: "#d1d5db",
            },
          }),
        }}
      />
    </div>
  );
};

export default EmpresaAsyncSelect;
