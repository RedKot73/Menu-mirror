#!/bin/bash
cd "$(dirname "$0")/.."

export DB_HOST=localhost
export DB_NAME=S5_DB_local
export DB_PORT=5432
export DB_USER=S5Master_user
export DB_PASSWORD=SecretPass123
export PrimaryConnection__DB_Host=localhost
export PrimaryConnection__DB_Username=S5Master_user
export PrimaryConnection__DB_Password=SecretPass123
export PrimaryConnection__DB_Name=S5_DB_local
export PrimaryConnection__Port=5432
export TWO_FACTOR_MODE=soft
export JwtSettings__Secret="SuperSecretKeyForJWTNormalization2026!"
export JwtSettings__Issuer="S5Server"
export JwtSettings__Audience="S5Server"
export ASPNETCORE_ENVIRONMENT=Development
export DOTNET_USE_POLLING_FILE_WATCHER=1
export HOME=/tmp
export DOTNET_CLI_HOME=/tmp/.dotnet
export NUGET_PACKAGES="$(pwd)/S5Server/packages"

#!/bin/bash
export APP_PORT=5000
# Сохраняем значение в файл, чтобы другие могли его прочитать
echo $APP_PORT > /tmp/app_active_port

cd S5Server
export ASPNETCORE_URLS="http://0.0.0.0:$APP_PORT"
dotnet watch run --no-restore --non-interactive --no-launch-profile
