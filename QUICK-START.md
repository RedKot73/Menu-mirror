# 🚀 S5 Server - Self-Contained Deployment

## Создание релиза одной командой

```powershell
.\build-quick.ps1
```

Готовый пакет будет в: `Release\win-x64\`

## Создание архива для клиента

```powershell
Compress-Archive -Path "Release\win-x64\*" -DestinationPath "S5Server.zip"
```

## Запуск у клиента

1. Распаковать `S5Server.zip`
2. Запустить `start.bat`
3. Открыть браузер: http://localhost:5000

**Важно:** .NET устанавливать не нужно - все включено!

---

## Скрипты сборки

| Скрипт | Описание |
|--------|----------|
| `build-quick.ps1` | Быстрая сборка для Windows x64 |
| `build-release.ps1` | Полная сборка с параметрами |
| `build-all.ps1` | Сборка для всех платформ |

## Примеры

### Сборка для Linux

```powershell
.\build-release.ps1 -Runtime linux-x64
```

### Сборка для всех платформ

```powershell
.\build-all.ps1 -Platform all
```

### Пересборка без Frontend

```powershell
.\build-release.ps1 -SkipFrontend
```

---

## Документация

- [RELEASE-GUIDE.md](RELEASE-GUIDE.md) - Полная инструкция по релизу
- [BUILD-README.md](BUILD-README.md) - Техническая документация

---

## Состав релиза

✅ .NET 10 Backend  
✅ Angular 20 Frontend  
✅ .NET Runtime (встроен)  
✅ SQLite База данных  
✅ Скрипты запуска  
✅ Инструкции  

**Размер:** ~150-180 MB

---

## Требования

**Для сборки:** Node.js + .NET SDK  
**Для запуска у клиента:** Только Windows 10/11

---

## Быстрый тест

```powershell
cd Release\win-x64
.\start.bat
```

Откройте: <http://localhost:5000>
