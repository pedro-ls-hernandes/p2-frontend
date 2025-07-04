"use client";

export default function Badge({ status = true }) {
  return (
    <span
      className={`bg-${status ? "green" : "red"}-100 text-${
        status ? "green" : "red"
      }-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full`}
    >
      {status ? "Ativa" : "Inativa"}
    </span>
  );
}
