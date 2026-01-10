# ⚡ Quick Start - NinjaTrader Integration

## En 5 minutos tendrás tus trades exportándose automáticamente

### 1️⃣ Obtén tu API Key (1 min)

1. Ve a https://pepetradersurvivor.vercel.app
2. Inicia sesión
3. **Configuración** → **Plataformas** → **NinjaTrader** → **Conectar**
4. **Copia tu API Key** 📋

### 2️⃣ Instala en NinjaTrader (2 min)

**Windows - Instalación Rápida:**

1. Descarga `TraderSurvivorExporter.cs`
2. Abre NinjaTrader 8
3. Presiona **Ctrl+N** (New NinjaScript)
4. Selecciona **Strategy**
5. Nombra: `TraderSurvivorExporter`
6. **Pega el código completo** del archivo
7. Presiona **F5** (Compile)
8. ✅ Listo!

### 3️⃣ Configura (1 min)

1. Abre **cualquier gráfico** en NinjaTrader
2. Click derecho → **Strategies**
3. Selecciona **TraderSurvivorExporter**
4. **Pega tu API Key**
5. Marca **"Habilitar Exportación"** = True
6. **Apply** → **OK**

### 4️⃣ Prueba (1 min)

1. Ejecuta un trade de prueba
2. Cierra la posición
3. Ve a la ventana **Output** (Ctrl+O)
4. Verás: ✅ `Trade exportado a Trader Survivor`
5. Revisa en https://pepetradersurvivor.vercel.app → **Operaciones**

## 🎯 ¿Qué se exporta automáticamente?

- ✅ Símbolo/Instrumento
- ✅ Tipo de operación (Long/Short)
- ✅ Precio de entrada y salida
- ✅ P&L calculado
- ✅ Comisiones
- ✅ Hora exacta
- ✅ Resultado (Win/Loss/Breakeven)

## ⚠️ Problemas Comunes

### "Compilation error"
→ Asegúrate de tener NinjaTrader 8 (no funciona en NT7)

### "API Key inválida"
→ Verifica que copiaste la key completa (sin espacios extra)

### "No se exportan los trades"
→ Verifica que "Habilitar Exportación" está en True

## 📞 ¿Necesitas ayuda?

- 💬 Chat en vivo en la web
- 📧 support@tradersurvivor.com
- 📖 Documentación completa en `README.md`

---

**¡Empieza a trackear tus trades profesionalmente! 🚀**
