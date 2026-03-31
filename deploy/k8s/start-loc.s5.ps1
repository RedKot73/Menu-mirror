# Настройка кодировки для кириллицы
$OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::InputEncoding = [System.Text.Encoding]::UTF8
$PSDefaultParameterValues['Out-File:Encoding'] = 'utf8'

Write-Host "--- Запуск локального кластера S5 ---" -ForegroundColor Cyan

# 1. Создаем Namespace (если его нет, kubectl просто выдаст ошибку и пойдет дальше)
Write-Host "[1/4] Подготовка пространства имен..." -ForegroundColor Yellow
kubectl create namespace s5-local

# 2. Устанавливаем оператор (если он есть, kubectl сообщит 'unchanged')
Write-Host "[2/4] Проверка оператора CloudNativePG..." -ForegroundColor Yellow
kubectl apply -f https://raw.githubusercontent.com/cloudnative-pg/cloudnative-pg/main/releases/cnpg-1.22.1.yaml

# 3. Деплой основного приложения
Write-Host "[3/4] Применяем манифесты Kustomize..." -ForegroundColor Yellow
# LoadRestrictionsNone нужен, чтобы Kustomize мог прочитать твой .env
kustomize build overlays/local --load-restrictor LoadRestrictionsNone | kubectl apply -f -

# 4. Ожидание
Write-Host "[4/4] Ожидание инициализации базы (30 сек)..." -ForegroundColor Yellow
Start-Sleep -Seconds 30

Write-Host "---------------------------------------" -ForegroundColor Cyan