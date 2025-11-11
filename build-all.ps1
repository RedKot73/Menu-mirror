# ============================================================================
# Быстрая сборка для различных платформ
# ============================================================================

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("win-x64", "win-x86", "linux-x64", "osx-x64", "all")]
    [string]$Platform = "win-x64"
)

$ErrorActionPreference = "Stop"

function Build-Platform {
    param([string]$Runtime)
    
    Write-Host "`n╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
    Write-Host "║  Сборка для платформы: $Runtime" -ForegroundColor Cyan
    Write-Host "╚════════════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan
    
    & "$PSScriptRoot\build-release.ps1" -Runtime $Runtime -Configuration Release
    
    if ($LASTEXITCODE -ne 0) {
        throw "Ошибка сборки для $Runtime"
    }
}

if ($Platform -eq "all") {
    Write-Host "Сборка для всех платформ..." -ForegroundColor Yellow
    
    $platforms = @("win-x64", "win-x86", "linux-x64", "osx-x64")
    
    foreach ($p in $platforms) {
        try {
            Build-Platform -Runtime $p
            Write-Host "✓ $p - Готово`n" -ForegroundColor Green
        } catch {
            Write-Host "✗ $p - Ошибка: $_`n" -ForegroundColor Red
        }
    }
    
    Write-Host "`n╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║  ВСЕ СБОРКИ ЗАВЕРШЕНЫ" -ForegroundColor Green
    Write-Host "╚════════════════════════════════════════════════════════════════╝`n" -ForegroundColor Green
    
} else {
    Build-Platform -Runtime $Platform
}
