# Quick Start - Build and Package

Write-Host "========================================" -ForegroundColor Green
Write-Host "  S5 Server Build (self-contained)" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Build for Windows x64
& "$PSScriptRoot\build-release.ps1" -Runtime win-x64 -Configuration Release

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "  BUILD SUCCESS!" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Package location:" -ForegroundColor Yellow
    Write-Host "  Release\win-x64\" -ForegroundColor White
    Write-Host ""
    Write-Host "To create archive:" -ForegroundColor Yellow
    Write-Host "  Compress-Archive -Path 'Release\win-x64\*' -DestinationPath 'S5Server.zip'" -ForegroundColor White
    Write-Host ""
    Write-Host "To test:" -ForegroundColor Yellow
    Write-Host "  cd Release\win-x64" -ForegroundColor White
    Write-Host "  .\start.bat" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "  BUILD FAILED!" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
}
