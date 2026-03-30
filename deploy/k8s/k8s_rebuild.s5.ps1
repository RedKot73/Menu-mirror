# Устанавливаем кодировку
$OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

# Определяем корень проекта (допустим, скрипт лежит в папке deploy/k8s)
# Нам нужно подняться на 2 уровня вверх, чтобы попасть к Dockerfile сервера
$rootDir = (Get-Item $PSScriptRoot).Parent.Parent.FullName
# Путь к папке с базой (относительно скрипта)
$dbDir = Join-Path $PSScriptRoot "../database"


Write-Host "Очистка старого образа..." -ForegroundColor Yellow
docker rmi s5-server:1.0.1 -f


Write-Host "[0/3] Принудительная пересборка образов..." -ForegroundColor Yellow


# 1. Сборка сервера (ищем Dockerfile в корне проекта)
# Мы явно указываем -f (файл) и контекст сборки (корень)
$version = "1.0.1" # Просто меняй эту цифру при каждом важном изменении
Write-Host "Собираем s5-server версии $version..." -ForegroundColor Cyan
# Исправлено: добавлена точка с запятой перед 'if'
docker build --no-cache -t s5-server:$version -f "$rootDir/Dockerfile" "$rootDir";
if ($LASTEXITCODE -ne 0) { Write-Host "Ошибка сборки сервера!" -ForegroundColor Red; exit 1 }

# 2. Сборка базы данных (используем Dockerfile.kuber)
Write-Host "Собираем s5-db из $dbDir..." -ForegroundColor Gray
docker build --no-cache -t s5-db:18.3-v1.0.0 -f "$dbDir/Dockerfile.kuber" "$dbDir"
if ($LASTEXITCODE -ne 0) { Write-Host "Ошибка сборки базы!" -ForegroundColor Red; exit 1 }

Write-Host "Все образы пересобраны успешно!" -ForegroundColor Green