# 🚀 Instalación Súper Fácil - NinjaTrader Integration

## 🎯 **Método Más Fácil - AUTOMÁTICO** (Recomendado)

### **Windows - 1 Click:**

1. **Descarga** la carpeta `ninjatrader-integration`
2. **Doble click** en `INSTALL.bat`
3. **Presiona cualquier tecla**
4. **¡Listo!** ✅

El instalador:
- ✅ Detecta automáticamente NinjaTrader
- ✅ Copia el archivo al lugar correcto
- ✅ Te dice exactamente qué hacer después

---

## 🔧 **Método Alternativo - PowerShell**

### **Si prefieres PowerShell:**

1. **Click derecho** en `Install.ps1`
2. **"Ejecutar con PowerShell"**
3. Si pide permisos: 
   - Escribe: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`
   - Presiona Enter
   - Vuelve a ejecutar `Install.ps1`
4. **¡Listo!** ✅

---

## 📱 **Después de la Instalación**

### **En NinjaTrader 8:**

1. **Abre NinjaTrader**
2. Presiona **F5** (compilar)
   - Debería decir: "Compilation successful"
3. **Abre cualquier gráfico**
4. **Click derecho** → **Strategies**
5. Busca **"TraderSurvivorExporter"**
6. **Selecciónalo** y configura:
   ```
   API Key: [pega aquí tu key de Trader Survivor]
   Habilitar Exportación: TRUE
   Log en Output: TRUE
   ```
7. Click **OK**

---

## ✨ **¿Dónde consigo la API Key?**

1. Ve a **Trader Survivor** (tu web)
2. **Configuración** → **Plataformas**
3. Click en **NinjaTrader**
4. Click **"Generar API Key"**
5. **Copia** la key que aparece
6. **Pégala** en NinjaTrader (paso 6 de arriba)

---

## ✅ **Verificar que Funciona**

1. Ejecuta un **trade de prueba** en NinjaTrader
2. **Cierra la posición**
3. Ve a la ventana **Output** (Ctrl+O)
4. Deberías ver:
   ```
   ✅ Trade exportado a Trader Survivor: ES 03-25 | P&L: $100.00
   ```
5. Ve a **Trader Survivor** → **Operaciones**
6. **¡Ahí está tu trade!** 🎉

---

## 🆘 **Problemas?**

### "No encuentro INSTALL.bat"
→ Descarga toda la carpeta `ninjatrader-integration`

### "NinjaTrader no encontrado"
→ Verifica que NinjaTrader 8 esté instalado en:  
`C:\Users\TuUsuario\Documents\NinjaTrader 8`

### "No compila (F5 da error)"
→ Asegúrate de tener NinjaTrader 8 (no 7)

### "El trade no se exporta"
→ Verifica:
- [ ] API Key correcta
- [ ] "Habilitar Exportación" = True
- [ ] La estrategia está activa en el gráfico
- [ ] Hay internet

---

## 📞 **Soporte**

- 📧 Email: support@tradersurvivor.com
- 💬 Chat: Trader Survivor web
- 📖 Docs completas: `README.md`

---

**¡Instalación en 30 segundos!** ⚡
