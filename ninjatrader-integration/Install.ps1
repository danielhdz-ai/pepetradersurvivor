# =====================================================
# INSTALADOR AUTOMATICO - TRADER SURVIVOR PARA NINJATRADER
# PowerShell Script
# =====================================================

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host " TRADER SURVIVOR - NinjaTrader Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar NinjaTrader
$ninjaPath = "$env:USERPROFILE\Documents\NinjaTrader 8"

if (-not (Test-Path $ninjaPath)) {
    Write-Host "[ERROR] NinjaTrader 8 no encontrado en:" -ForegroundColor Red
    Write-Host $ninjaPath -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Por favor instala NinjaTrader 8 primero." -ForegroundColor Yellow
    pause
    exit 1
}

Write-Host "[OK] NinjaTrader 8 encontrado" -ForegroundColor Green
Write-Host ""

# Crear directorio de estrategias
$strategyPath = "$ninjaPath\bin\Custom\Strategies"

if (-not (Test-Path $strategyPath)) {
    Write-Host "[INFO] Creando directorio de estrategias..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $strategyPath -Force | Out-Null
}

Write-Host "[INFO] Copiando TraderSurvivorExporter.cs..." -ForegroundColor Yellow

# Copiar archivo
$sourceFile = Join-Path $PSScriptRoot "TraderSurvivorExporter.cs"
$destFile = Join-Path $strategyPath "TraderSurvivorExporter.cs"

try {
    Copy-Item -Path $sourceFile -Destination $destFile -Force
    
    Write-Host "[OK] Archivo copiado exitosamente" -ForegroundColor Green
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host " INSTALACION COMPLETADA" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Proximos pasos:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Abre NinjaTrader 8" -ForegroundColor White
    Write-Host "2. Presiona F5 para compilar" -ForegroundColor White
    Write-Host "3. Abre un grafico" -ForegroundColor White
    Write-Host "4. Click derecho > Strategies" -ForegroundColor White
    Write-Host "5. Selecciona 'TraderSurvivorExporter'" -ForegroundColor White
    Write-Host "6. Configura tu API Key" -ForegroundColor White
    Write-Host "7. Habilitar Exportacion = True" -ForegroundColor White
    Write-Host "8. OK" -ForegroundColor White
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    
    # Abrir carpeta de instalación
    Write-Host "Presiona ENTER para abrir la carpeta de NinjaTrader..." -ForegroundColor Yellow
    Read-Host
    Start-Process $strategyPath
    
} catch {
    Write-Host "[ERROR] No se pudo copiar el archivo" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    Write-Host "Intenta copiar manualmente a:" -ForegroundColor Yellow
    Write-Host $strategyPath -ForegroundColor White
    Write-Host ""
}

pause
