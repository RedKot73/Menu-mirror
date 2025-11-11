# Build Self-Contained Release for S5 Server
# Usage: .\build-release.ps1 [-Runtime win-x64] [-Configuration Release] [-SkipFrontend]

param(
    [string]$Configuration = "Release",
    [string]$Runtime = "win-x64",
    [switch]$SkipFrontend = $false
)

$ErrorActionPreference = "Stop"

function Write-Step {
    param([string]$Message)
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host $Message -ForegroundColor Cyan
    Write-Host "========================================`n" -ForegroundColor Cyan
}

function Write-Success {
    param([string]$Message)
    Write-Host "[OK] $Message" -ForegroundColor Green
}

function Write-ErrorMsg {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Check Node.js
if (-not $SkipFrontend) {
    Write-Step "Checking Node.js"
    try {
        $nodeVersion = node --version
        Write-Success "Node.js installed: $nodeVersion"
    } catch {
        Write-ErrorMsg "Node.js not found!"
        exit 1
    }
}

# Check .NET SDK
Write-Step "Checking .NET SDK"
try {
    $dotnetVersion = dotnet --version
    Write-Success ".NET SDK installed: $dotnetVersion"
} catch {
    Write-ErrorMsg ".NET SDK not found!"
    exit 1
}

# Paths
$RootDir = $PSScriptRoot
$FrontendDir = Join-Path $RootDir "S5Server\Front"
$BackendDir = Join-Path $RootDir "S5Server"
$OutputDir = Join-Path $RootDir "Release\$Runtime"

Write-Host "`nBuild Configuration:" -ForegroundColor Yellow
Write-Host "  Root: $RootDir" -ForegroundColor White
Write-Host "  Frontend: $FrontendDir" -ForegroundColor White
Write-Host "  Backend: $BackendDir" -ForegroundColor White
Write-Host "  Output: $OutputDir" -ForegroundColor White
Write-Host "  Configuration: $Configuration" -ForegroundColor White
Write-Host "  Runtime: $Runtime" -ForegroundColor White
Write-Host "  Skip Frontend: $SkipFrontend`n" -ForegroundColor White

# Clean output directory
if (Test-Path $OutputDir) {
    Write-Step "Cleaning previous build"
    Remove-Item -Path $OutputDir -Recurse -Force
    Write-Success "Cleaned: $OutputDir"
}

# Build Frontend
if (-not $SkipFrontend) {
    Write-Step "Building Frontend (Angular)"
    
    Push-Location $FrontendDir
    try {
        if (-not (Test-Path "node_modules")) {
            Write-Host "Installing npm dependencies..." -ForegroundColor Yellow
            npm install
            if ($LASTEXITCODE -ne 0) {
                throw "npm install failed"
            }
        }
        
        Write-Host "Building Angular..." -ForegroundColor Yellow
        npm run build
        if ($LASTEXITCODE -ne 0) {
            throw "Angular build failed"
        }
        
        $DistDir = Join-Path $FrontendDir "dist\Menu\browser"
        if (-not (Test-Path $DistDir)) {
            throw "dist directory not found: $DistDir"
        }
        
        Write-Success "Frontend built: $DistDir"
    } finally {
        Pop-Location
    }
} else {
    Write-Host "Skipping Frontend build" -ForegroundColor Yellow
}

# Build Backend
Write-Step "Building Backend (.NET Self-Contained)"

Push-Location $BackendDir
try {
    if (Test-Path "obj") {
        Remove-Item -Path "obj" -Recurse -Force
    }
    if (Test-Path "bin") {
        Remove-Item -Path "bin" -Recurse -Force
    }
    
    Write-Host "Running dotnet publish..." -ForegroundColor Yellow
    
    dotnet publish `
        --configuration $Configuration `
        --runtime $Runtime `
        --self-contained true `
        --output $OutputDir `
        -p:PublishSingleFile=false `
        -p:PublishTrimmed=false `
        -p:IncludeNativeLibrariesForSelfExtract=true `
        -p:DebugType=None `
        -p:DebugSymbols=false
    
    if ($LASTEXITCODE -ne 0) {
        throw "dotnet publish failed"
    }
    
    Write-Success "Backend published to: $OutputDir"
    
} finally {
    Pop-Location
}

# Copy database
Write-Step "Copying additional files"

$DbSource = Join-Path $BackendDir "Data\S5_DB.sqlite"
$DbDest = Join-Path $OutputDir "Data\S5_DB.sqlite"
if (Test-Path $DbSource) {
    if (-not (Test-Path (Join-Path $OutputDir "Data"))) {
        New-Item -ItemType Directory -Path (Join-Path $OutputDir "Data") -Force | Out-Null
    }
    Copy-Item -Path $DbSource -Destination $DbDest -Force
    Write-Success "Database copied"
}

# Create production config
$AppSettingsProduction = @"
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=Data/S5_DB.sqlite"
  },
  "Kestrel": {
    "Endpoints": {
      "Http": {
        "Url": "http://0.0.0.0:5000"
      }
    }
  }
}
"@

$AppSettingsPath = Join-Path $OutputDir "appsettings.Production.json"
$AppSettingsProduction | Out-File -FilePath $AppSettingsPath -Encoding UTF8
Write-Success "Created appsettings.Production.json"

# Create startup script for Windows
if ($Runtime -like "win-*") {
    $StartScript = @"
@echo off
echo ================================================
echo       S5 Server - Self-Contained Edition
echo ================================================
echo.
echo Starting server...
echo.
echo Application will be available at:
echo   http://localhost:5000
echo.
echo Press Ctrl+C to stop
echo ================================================
echo.

S5Server.exe --environment Production

pause
"@
    $StartScriptPath = Join-Path $OutputDir "start.bat"
    $StartScript | Out-File -FilePath $StartScriptPath -Encoding ASCII
    Write-Success "Created start.bat"
}

# Create startup script for Linux/Mac
if ($Runtime -like "linux-*" -or $Runtime -like "osx-*") {
    $StartScript = @"
#!/bin/bash
echo "================================================"
echo "       S5 Server - Self-Contained Edition"
echo "================================================"
echo ""
echo "Starting server..."
echo ""
echo "Application will be available at:"
echo "  http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop"
echo "================================================"
echo ""

chmod +x S5Server
./S5Server --environment Production
"@
    $StartScriptPath = Join-Path $OutputDir "start.sh"
    $StartScript | Out-File -FilePath $StartScriptPath -Encoding UTF8 -NoNewline
    Write-Success "Created start.sh"
}

# Create README
$ReadmeContent = @"
S5 Server - Self-Contained Deployment Package

DESCRIPTION:
This is a complete deployment package for S5 Server.
Includes:
- Backend application (.NET 10)
- Frontend application (Angular)
- .NET Runtime ($Runtime)
- SQLite Database
- All dependencies

SYSTEM REQUIREMENTS:
- Operating System: $(
    if ($Runtime -like "win-*") { "Windows 10/11 or Windows Server 2016+" }
    elseif ($Runtime -like "linux-*") { "Linux (x64)" }
    elseif ($Runtime -like "osx-*") { "macOS (x64)" }
    else { "See .NET documentation" }
)
- Free disk space: ~200 MB
- Free port: 5000

INSTALLATION:

Windows:
1. Extract archive to any directory
2. Run start.bat
3. Open browser: http://localhost:5000

Linux/Mac:
1. Extract archive to any directory
2. Open terminal in directory
3. Run: chmod +x start.sh
4. Run: ./start.sh
5. Open browser: http://localhost:5000

CONFIGURATION:

To change port, edit appsettings.Production.json:
{
  "Kestrel": {
    "Endpoints": {
      "Http": {
        "Url": "http://0.0.0.0:YOUR_PORT"
      }
    }
  }
}

DATABASE:
SQLite database location: Data/S5_DB.sqlite
Please backup this file regularly.

TROUBLESHOOTING:

Windows: "Cannot start application"
- Check if port 5000 is available
- Run start.bat as Administrator
- Check Windows Firewall

Linux: Permission Denied
Run: chmod +x S5Server

Port is busy:
Change port in appsettings.Production.json

LOGS:
Application logs are saved in logs/ directory

SUPPORT:
Build Date: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
Version: 1.0.0
Runtime: $Runtime
"@

$ReadmePath = Join-Path $OutputDir "README.txt"
$ReadmeContent | Out-File -FilePath $ReadmePath -Encoding UTF8
Write-Success "Created README.txt"

# Summary
Write-Step "BUILD COMPLETED SUCCESSFULLY!"

$OutputSize = (Get-ChildItem -Path $OutputDir -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB

Write-Host "Build completed:" -ForegroundColor Green
Write-Host "  Directory: $OutputDir" -ForegroundColor White
Write-Host "  Size: $([math]::Round($OutputSize, 2)) MB" -ForegroundColor White
Write-Host "  Runtime: $Runtime" -ForegroundColor White
Write-Host "`nStartup script: $(if ($Runtime -like 'win-*') {'start.bat'} else {'start.sh'})" -ForegroundColor Yellow
Write-Host "`nTo deploy:" -ForegroundColor Cyan
Write-Host "  1. Create archive: Compress-Archive -Path '$OutputDir\*' -DestinationPath 'S5Server.zip'" -ForegroundColor White
Write-Host "  2. Send archive to client" -ForegroundColor White
Write-Host "  3. Client extracts and runs start.*" -ForegroundColor White
Write-Host ""
