# Imagem base do .NET SDK
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copia o arquivo de projeto e restaura as dependências
COPY *.csproj . ./
RUN dotnet restore

# Copia o código fonte e compila a aplicação
COPY . ./
RUN dotnet publish -c Release -o out

# Imagem base do .NET Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out . 

# expõe a porta que a aplicação escuta
EXPOSE 80

# define o comando de inicialização da aplicação
ENTRYPOINT ["dotnet", "ChatDistribuido.dll"]
