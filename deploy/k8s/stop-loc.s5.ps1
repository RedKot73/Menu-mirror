# Устанавливаем кодировку UTF-8 для корректного отображения кириллицы
$OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::InputEncoding = [System.Text.Encoding]::UTF8
$PSDefaultParameterValues['Out-File:Encoding'] = 'utf8'

Write-Host "--- Выключение локального кластера S5 ---" -ForegroundColor Cyan

# 1. Останавливаем сервер приложений
Write-Host "[1/3] Останавливаем s5-server (освобождаем RAM/CPU)..." -ForegroundColor Yellow
kubectl scale deployment s5-server-deployment -n s5-local --replicas=0

# 2. Удаляем кластер БД
Write-Host "[2/3] Удаляем s5-db-cluster (диски PVC сохраняются)..." -ForegroundColor Yellow
kubectl delete cluster s5-db-cluster -n s5-local

# 3. Чистим завершенные джобы
Write-Host "[3/3] Очистка завершенных задач..." -ForegroundColor Yellow
kubectl delete job s5-db-init-job -n s5-local --ignore-not-found

Write-Host "---------------------------------------" -ForegroundColor Cyan
Write-Host "Готово! Все ресурсы свободны. Данные сохранены на дисках." -ForegroundColor Green