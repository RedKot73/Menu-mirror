# Windows PowerShell wrapper for _run.s5app.sh
# Requires bash (Git Bash or WSL) to be in PATH

$scriptPath = Join-Path $PSScriptRoot "_run.s5app.sh"
echo "--- Redirecting run to bash: $scriptPath ---"

# Forward arguments (e.g., 'watch' or 'run') to the bash script.
# Default to 'watch' if no parameter is provided.
$command = if ($args.Count -gt 0) { $args[0] } else { "watch" }

# Запуск через bash используя относительный путь для избежания проблем с обратными слешами в путях Windows
bash ./ai/_run.s5app.sh $command
