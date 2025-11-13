# Etapa 1 — build da aplicação
FROM node:20-alpine AS build

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos necessários para instalar dependências
COPY app/*.json ./
COPY app/*.js ./

# Instala dependências
RUN npm install

# Copia o resto do código (sem node_modules)
COPY app/ .

# Gera build de produção
RUN npm run build

# Etapa 2 — servidor leve (para servir o build)
FROM nginx:alpine

# Copia o arquivo de configuração customizado
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia o build gerado para o nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Comando padrão do nginx
CMD ["nginx", "-g", "daemon off;"]
