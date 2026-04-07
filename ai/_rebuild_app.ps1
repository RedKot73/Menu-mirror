# Windows PowerShell wrapper for _rebuild_app.sh
# Requires bash (Git Bash or WSL) to be in PATH

$scriptPath = Join-Path $PSScriptRoot "_rebuild_app.sh"
echo "--- Redirecting rebuild to bash: $scriptPath ---"

# Запуск через bash
#bash $scriptPath
bash ./ai/_rebuild_app.sh $args
