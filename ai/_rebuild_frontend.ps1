# Windows PowerShell wrapper for _rebuild_frontend.sh
# Requires bash (Git Bash or WSL) to be in PATH

$scriptPath = Join-Path $PSScriptRoot "_rebuild_frontend.sh"
echo "--- Redirecting rebuild to bash: $scriptPath ---"

# Launch via bash
bash $scriptPath $args
