# Define a imagem base do Node.js
FROM node:latest AS builder

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar o arquivo de configuração do npm
COPY package*.json ./ 

# Instalar as dependências
RUN npm install 
# Copiar os arquivos do projeto para o diretório de trabalho
COPY . ./
# Construir o projeto
RUN npm run build

FROM nginx:stable-alpine

COPY --from=builder /app/build /usr/share/nginx/html

# Expor a porta 80 para acesso externo
EXPOSE 80

# Comando para iniciar o servidor
CMD ["nginx", "-g", "daemon off;"]