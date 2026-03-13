FROM nginx:alpine

# Argumentos que o Coolify vai injetar
ARG BUILD_VERSION=unknown
ARG TARGET_ENV=unknown

# Passa os ARGs para variáveis de ambiente (ENV) para o script ler em runtime
ENV BUILD_VERSION=$BUILD_VERSION
ENV TARGET_ENV=$TARGET_ENV

# Copia o script para dentro do container
COPY entrypoint.sh /entrypoint.sh

# Dá permissão de execução e corrige possíveis problemas de final de linha (Windows/Linux)
RUN chmod +x /entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
