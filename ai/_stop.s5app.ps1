$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location -Path "$ScriptDir\.."

Write-Host "Stopping dotnet processes..."
Get-Process | Where-Object { $_.Name -like "dotnet*" } | Stop-Process -Force -ErrorAction SilentlyContinue
