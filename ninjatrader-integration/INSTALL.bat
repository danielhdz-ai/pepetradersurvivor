@echo off
REM =====================================================
REM INSTALADOR AUTOMATICO - TRADER SURVIVOR PARA NINJATRADER
REM =====================================================

echo.
echo ========================================
echo  TRADER SURVIVOR - NinjaTrader Setup
echo ========================================
echo.

REM Verificar que NinjaTrader esta instalado
set "NINJA_PATH=%USERPROFILE%\Documents\NinjaTrader 8"

if not exist "%NINJA_PATH%" (
    echo [ERROR] NinjaTrader 8 no encontrado en:
    echo %NINJA_PATH%
    echo.
    echo Por favor instala NinjaTrader 8 primero.
    pause
    exit /b 1
)

echo [OK] NinjaTrader 8 encontrado
echo.

REM Crear directorio de estrategias si no existe
set "STRATEGY_PATH=%NINJA_PATH%\bin\Custom\Strategies"

if not exist "%STRATEGY_PATH%" (
    echo [INFO] Creando directorio de estrategias...
    mkdir "%STRATEGY_PATH%"
)

echo [INFO] Copiando TraderSurvivorExporter.cs...

REM Copiar el archivo de estrategia
copy /Y "TraderSurvivorExporter.cs" "%STRATEGY_PATH%\TraderSurvivorExporter.cs" >nul

if %ERRORLEVEL% EQU 0 (
    echo [OK] Archivo copiado exitosamente
    echo.
    echo ========================================
    echo  INSTALACION COMPLETADA
    echo ========================================
    echo.
    echo Proximos pasos:
    echo.
    echo 1. Abre NinjaTrader 8
    echo 2. Presiona F5 para compilar
    echo 3. Abre un grafico
    echo 4. Click derecho ^> Strategies
    echo 5. Selecciona "TraderSurvivorExporter"
    echo 6. Configura tu API Key
    echo 7. Habilitar Exportacion = True
    echo 8. OK
    echo.
    echo ========================================
    echo.
) else (
    echo [ERROR] No se pudo copiar el archivo
    echo.
    echo Intenta copiar manualmente a:
    echo %STRATEGY_PATH%
    echo.
)

pause
