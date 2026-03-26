# Устанавливаем кодировку UTF-8 для корректного отображения кириллицы
# Устанавливаем кодировку UTF-8 для корректного отображения кириллицы
$OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::InputEncoding = [System.Text.Encoding]::UTF8
$PSDefaultParameterValues['Out-File:Encoding'] = 'utf8'

Write-Host "--- Запуск локального кластера S5 ---" -ForegroundColor Cyan

# 1. Разворачиваем манифесты
# Оператор увидит старые PVC и автоматически подключит их к новой базе
Write-Host "[1/3] Применяем манифесты через Kustomize..." -ForegroundColor Yellow
kustomize build overlays/local --load-restrictor LoadRestrictionsNone | kubectl apply -f -

# 2. Ожидание инициализации базы
# Нам нужно, чтобы база поднялась раньше, чем приложение начнет активно к ней стучаться
Write-Host "[2/3] Ожидание готовности базы данных (30 сек)..." -ForegroundColor Yellow
Start-Sleep -Seconds 30

# 3. Масштабируем сервер приложений обратно в 1
Write-Host "[3/3] Запускаем s5-server..." -ForegroundColor Yellow
#kubectl scale deployment s5-server-deployment -n s5-local --replicas=1

Write-Host "---------------------------------------" -ForegroundColor Cyan
Write-Host "Система запускается! Проверьте статус подов ниже:" -ForegroundColor Green
Write-Host "(Нажмите Ctrl+C, чтобы выйти из режима наблюдения)" -ForegroundColor Gray

# Выводим статус подов в реальном времени
kubectl get pods -n s5-local -w