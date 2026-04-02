$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location -Path "$ScriptDir\.."

$env:DB_HOST="localhost"
$env:DB_NAME="S5_DB_local"
$env:DB_PORT="5432"
$env:DB_USER="S5Master_user"
$env:DB_PASSWORD="SecretPass123"
$env:PrimaryConnection__DB_Host="localhost"
$env:PrimaryConnection__DB_Username="S5Master_user"
$env:PrimaryConnection__DB_Password="SecretPass123"
$env:PrimaryConnection__DB_Name="S5_DB_local"
$env:PrimaryConnection__Port="5432"
$env:TWO_FACTOR_MODE="soft"
$env:JwtSettings__Secret="SuperSecretKeyForJWTNormalization2026!"
$env:JwtSettings__Issuer="S5Server"
$env:JwtSettings__Audience="S5Server"
$env:ASPNETCORE_ENVIRONMENT="Development"
$env:DOTNET_USE_POLLING_FILE_WATCHER="1"

Set-Location -Path "S5Server"
$env:ASPNETCORE_URLS="http://0.0.0.0:8080"
dotnet watch run --no-restore --non-interactive --no-launch-profile
