# Use uma imagem base do Node.js
FROM node:22 AS build
WORKDIR /app

# Copie os arquivos do projeto e instale as dependências
COPY . .
RUN npm install
RUN npm install  @angular/cli -g

EXPOSE 4200
CMD ["ng", "serve", "--host","0.0.0.0"]
