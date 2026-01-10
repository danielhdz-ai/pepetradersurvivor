# 📘 Guía Completa - NinjaTrader Sync

## 🎯 ¿Qué hace esta función?

Lee automáticamente tus trades desde los archivos que NinjaTrader guarda en tu disco duro y los importa a Trader Survivor. **No necesitas instalar nada en NinjaTrader**.

---

## ✨ Características

✅ **Súper Simple** - Solo seleccionas la carpeta una vez  
✅ **Sin Instalaciones** - No modificas NinjaTrader  
✅ **Multi-Cuenta Automático** - Detecta Sim, Live, Rithmic, etc.  
✅ **1-Click Sync** - Después de la primera vez, solo un click  
✅ **Seguro** - Solo lee archivos, no los modifica  

---

## 📋 Pasos (Primera Vez)

### 1️⃣ Ir a Plataformas
```
┌─────────────────────────────┐
│  📊 Dashboard               │
│  💰 Cuentas                 │
│  📈 Operaciones             │
│  🔌 Plataformas  ← Click    │
│  ⚙️  Configuración          │
└─────────────────────────────┘
```

### 2️⃣ Click en NinjaTrader
```
┌────────────────────────────────────────┐
│  Plataformas                           │
├────────────────────────────────────────┤
│                                        │
│  [BingX]  [MEXC]  [Bitget]            │
│                                        │
│  [NinjaTrader] ← Click aquí           │
│   Estado: No conectado                 │
│   [Sincronizar] ← O click aquí        │
│                                        │
└────────────────────────────────────────┘
```

### 3️⃣ Click en "Sincronizar Ahora"
```
┌────────────────────────────────────────┐
│           NinjaTrader 8                │
│    Sincronización Automática           │
├────────────────────────────────────────┤
│                                        │
│        [📁] Sincronización             │
│             Inteligente                │
│                                        │
│  Lee automáticamente tus trades        │
│  desde los archivos de NinjaTrader     │
│                                        │
│     [🔄 Sincronizar Ahora]            │
│                                        │
└────────────────────────────────────────┘
```

### 4️⃣ Seleccionar Carpeta
Se abre el explorador de Windows:

```
1. Navega a:
   C:\
   └── Users
       └── Daniel HDZ
           └── Documents
               └── NinjaTrader 8
                   └── db
                       └── execution ← Esta carpeta

2. Click en "execution"

3. Click en "Seleccionar carpeta" o "Select Folder"
```

### 5️⃣ Dar Permiso
El navegador pregunta:

```
┌────────────────────────────────────────┐
│  ⚠️  Trader Survivor quiere ver los    │
│     archivos en "execution"            │
│                                        │
│  [Cancelar]  [Ver archivos] ← Click   │
└────────────────────────────────────────┘
```

### 6️⃣ ¡Sincronizando!
```
┌────────────────────────────────────────┐
│            🔄 Sincronizando            │
│                                        │
│     Procesando archivos...             │
│                                        │
│  ████████████████░░░░░░ 75%           │
│                                        │
│           15 / 20 archivos             │
└────────────────────────────────────────┘
```

### 7️⃣ ¡Completado!
```
┌────────────────────────────────────────┐
│     ✅ ¡Sincronización Completada!     │
├────────────────────────────────────────┤
│                                        │
│    [35] Trades      [3] Cuentas       │
│                                        │
│  Cuentas detectadas:                   │
│  ✓ Sim101                              │
│  ✓ Live                                │
│  ✓ Rithmic-Demo                        │
│                                        │
│       [Ver Operaciones]                │
│                                        │
└────────────────────────────────────────┘
```

---

## ⚡ Próximas Veces (Súper Rápido)

Una vez configurado:

1. Click en botón **"Sincronizar"** (desde tarjeta o vista detallada)
2. ¡Listo! Se sincronizan automáticamente

**NO necesitas volver a seleccionar la carpeta** ✨

---

## 🗂️ Ubicación de Archivos

NinjaTrader guarda tus trades en formato XML/CSV en:

```
C:\Users\TU_USUARIO\Documents\NinjaTrader 8\db\execution\
```

**Variaciones comunes:**
- `C:\Users\Daniel HDZ\Documents\NinjaTrader 8\db\execution`
- `D:\NinjaTrader 8\db\execution` (si instalaste en D:)
- `C:\Users\TuNombre\OneDrive\Documents\NinjaTrader 8\db\execution` (si tienes OneDrive)

---

## 🔍 Cuentas Múltiples

### Detección Automática

El sistema lee el campo `<Account>` de cada archivo XML y automáticamente:

1. **Detecta** todas tus cuentas
2. **Separa** los trades por cuenta
3. **Guarda** el `account_id` en cada trade

### Ejemplo:

Si tienes 3 cuentas en NinjaTrader:
- **Sim101** (cuenta de simulación)
- **Live** (cuenta real)
- **Rithmic-Demo** (demo de Rithmic)

El sistema:
1. Lee todos los archivos
2. Detecta las 3 cuentas
3. Importa todos los trades con su cuenta correcta
4. Te muestra: "3 cuentas detectadas: Sim101, Live, Rithmic-Demo"

**No necesitas configurar nada** - es 100% automático.

---

## 🛠️ Requisitos

### Navegador
- ✅ **Chrome** (versión 86 o superior)
- ✅ **Edge** (versión 86 o superior)
- ❌ Firefox (no soporta File System Access API)
- ❌ Safari (no soporta File System Access API)

### Sistema Operativo
- ✅ Windows 10/11
- ✅ macOS (si tienes NinjaTrader en Parallels/Boot Camp)
- ❌ Linux (NinjaTrader no corre en Linux)

### NinjaTrader
- Cualquier versión de NinjaTrader 8
- **No necesitas tenerlo abierto** para sincronizar
- Solo necesita que los archivos existan en la carpeta

---

## ❓ Preguntas Frecuentes

### ¿Necesito instalar algo en NinjaTrader?
**No.** Solo lees archivos que NinjaTrader ya guarda.

### ¿Funciona con NinjaTrader cerrado?
**Sí.** Los archivos están en el disco duro, no importa si NT8 está abierto o cerrado.

### ¿Se modifican mis archivos de NinjaTrader?
**No.** Solo se leen, nunca se modifican.

### ¿Qué pasa si tengo varias cuentas?
Se detectan y separan automáticamente. Cada trade tiene su `account_id`.

### ¿Tengo que volver a seleccionar la carpeta cada vez?
**No.** Solo la primera vez. Después es 1-click.

### ¿Funciona en Firefox?
No. Firefox no soporta la API necesaria. Usa Chrome o Edge.

### ¿Puedo sincronizar desde otro PC?
Sí, pero necesitarás volver a seleccionar la carpeta en ese PC (solo una vez).

### ¿Los trades se duplican si sincronizo varias veces?
No. El sistema usa `upsert` con el ID único del trade para evitar duplicados.

---

## 🚨 Solución de Problemas

### "Tu navegador no soporta esta función"
- **Solución**: Usa Chrome o Edge (versiones recientes)

### "No se encontraron archivos"
- **Causa**: Carpeta incorrecta o NinjaTrader no ha guardado trades
- **Solución**: Verifica la ruta: `Documents\NinjaTrader 8\db\execution`

### "Permiso denegado"
- **Causa**: No diste permiso cuando el navegador preguntó
- **Solución**: Vuelve a sincronizar y click en "Ver archivos"

### "0 trades importados"
- **Causa**: No hay trades cerrados en los archivos
- **Solución**: Verifica que tengas trades cerrados en NinjaTrader

---

## 📊 Qué se Importa

El sistema lee estos datos de cada trade:

| Campo | Ejemplo |
|-------|---------|
| **Cuenta** | Sim101 |
| **Instrumento** | ES 03-25 |
| **Acción** | Buy / Sell |
| **Cantidad** | 2 |
| **Precio Entrada** | 4500.25 |
| **Precio Salida** | 4510.00 |
| **Fecha/Hora** | 2025-12-31 14:30:00 |
| **Comisión** | 4.80 |
| **P&L** | +97.20 |

### Formato de Archivos Soportados
- ✅ **XML** - Formato nativo de NinjaTrader
- ✅ **CSV** - Exportaciones manuales
- ❌ TXT - No soportado

---

## 🎓 Conceptos Técnicos

### File System Access API
Tecnología moderna del navegador que permite:
- Acceder a archivos locales con permiso del usuario
- Recordar la carpeta seleccionada
- Leer archivos sin subirlos a un servidor

### IndexedDB
Base de datos local del navegador donde se guarda:
- Referencia a la carpeta seleccionada
- Fecha de última sincronización
- NO se guardan los archivos completos

### Parsing XML
El sistema lee archivos XML de NinjaTrader y extrae:
```xml
<Execution>
  <Account>Sim101</Account>
  <Instrument>ES 03-25</Instrument>
  <Action>Buy</Action>
  <Quantity>1</Quantity>
  <Price>4500.25</Price>
  <Time>2025-12-31T14:30:00</Time>
</Execution>
```

---

## 🎯 Ventajas vs Métodos Tradicionales

| Método | NinjaTrader Sync | Webhook ATI | CSV Manual |
|--------|------------------|-------------|------------|
| **Instalación** | ❌ No requiere | ✅ Instalar código en NT8 | ❌ No requiere |
| **Complejidad** | 🟢 Muy simple | 🔴 Compleja | 🟡 Media |
| **Multi-cuenta** | 🟢 Automático | 🟡 Manual | 🟡 Manual |
| **Tiempo real** | 🟡 Manual sync | 🟢 Automático | 🔴 Muy lento |
| **Confiabilidad** | 🟢 Alta | 🟡 Media | 🟢 Alta |
| **Mantenimiento** | 🟢 Cero | 🔴 Alto | 🟢 Bajo |

---

## 🔐 Seguridad y Privacidad

✅ **Todo es local** - Los archivos NO se suben a ningún servidor  
✅ **Solo lectura** - No se modifican tus archivos de NinjaTrader  
✅ **Tu control** - Tú das el permiso explícito al navegador  
✅ **Open Source** - Puedes revisar el código en cualquier momento  
✅ **Revocable** - Puedes quitar el permiso cuando quieras  

---

## 📞 Soporte

¿Problemas o dudas?

1. Revisa esta guía completa
2. Verifica los requisitos (Chrome/Edge, carpeta correcta)
3. Contacta a soporte: support@tradersurvivor.com

---

**¡Listo para sincronizar! 🚀**
