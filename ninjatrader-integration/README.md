# 🚀 Integración NinjaTrader con Trader Survivor

Esta integración permite exportar automáticamente tus trades desde NinjaTrader a tu cuenta de Trader Survivor.

## 📋 Requisitos

- NinjaTrader 8
- .NET Framework 4.8+
- Cuenta activa en Trader Survivor
- API Key de Trader Survivor

## 🔧 Instalación

### Paso 1: Obtener tu API Key

1. Inicia sesión en [Trader Survivor](https://pepetradersurvivor.vercel.app)
2. Ve a **Configuración** → **Plataformas**
3. Busca **NinjaTrader** en la lista
4. Haz clic en **Conectar**
5. Copia tu **API Key** (la necesitarás después)

### Paso 2: Instalar la Estrategia en NinjaTrader

#### Opción A: Importación automática (Recomendado)

1. Descarga el archivo `TraderSurvivorExporter.cs`
2. Abre NinjaTrader 8
3. Ve a **Tools** → **Import** → **NinjaScript Add-On...**
4. Selecciona el archivo `TraderSurvivorExporter.cs`
5. Haz clic en **Import**
6. Reinicia NinjaTrader

#### Opción B: Instalación manual

1. Abre NinjaTrader 8
2. Presiona **F3** o ve a **Tools** → **Edit NinjaScript** → **Strategy**
3. Haz clic derecho en la carpeta de Strategies
4. Selecciona **Add New Strategy**
5. Nómbrala `TraderSurvivorExporter`
6. Copia y pega el contenido del archivo `TraderSurvivorExporter.cs`
7. Presiona **F5** para compilar
8. Si todo está correcto, verás "Compilation successful"

### Paso 3: Configurar la Estrategia

1. Abre un gráfico en NinjaTrader
2. Haz clic derecho en el gráfico → **Strategies**
3. Busca y selecciona **TraderSurvivorExporter**
4. En la configuración:
   - **API Key**: Pega tu API Key de Trader Survivor
   - **Habilitar Exportación**: Marca como `True`
   - **Log en Output**: `True` (para ver confirmaciones)
5. Haz clic en **OK**

## 📊 Uso

### Exportación Automática

Una vez configurada, la estrategia exportará automáticamente:

- ✅ Todas las posiciones cerradas
- ✅ P&L real calculado
- ✅ Comisiones incluidas
- ✅ Hora de entrada y salida
- ✅ Precio de entrada y salida
- ✅ Tipo de orden (Buy/Sell, Long/Short)

### Verificar Exportación

1. Ejecuta un trade en NinjaTrader
2. Cierra la posición
3. Ve a la ventana **Output** en NinjaTrader
4. Deberías ver: `✅ Trade exportado a Trader Survivor: [SÍMBOLO] | P&L: $XX.XX`
5. Ve a [Trader Survivor](https://pepetradersurvivor.vercel.app) → **Operaciones**
6. Tu trade debería aparecer automáticamente

## 🔍 Datos Exportados

Cada trade exportado incluye:

```json
{
  "instrument": "ES 03-25",
  "symbol": "ES",
  "action": "BuyToCover",
  "orderType": "Market",
  "entryPrice": 5875.50,
  "exitPrice": 5880.25,
  "quantity": 1,
  "realizedPnL": 237.50,
  "commission": 4.80,
  "entryTime": "2025-12-31T09:30:00",
  "exitTime": "2025-12-31T10:15:00",
  "strategy": "TraderSurvivorExporter"
}
```

## ⚙️ Configuración Avanzada

### Cambiar URL del API (Solo desarrollo)

Edita la línea 28 del archivo `TraderSurvivorExporter.cs`:

```csharp
private string apiUrl = "https://pepetradersurvivor.vercel.app/api/proxy-ninjatrader";
```

### Exportar trades históricos

La estrategia solo exporta trades en tiempo real. Para importar trades históricos:

1. Ve a Trader Survivor → **Operaciones**
2. Usa el botón **Importar desde CSV**
3. Exporta tus trades históricos desde NinjaTrader en formato CSV

## 🛠️ Solución de Problemas

### ❌ "API Key no configurada"

**Solución**: Verifica que hayas pegado correctamente tu API Key en la configuración de la estrategia.

### ❌ "Error 401: API Key inválida"

**Solución**: 
1. Tu API Key puede haber expirado o sido revocada
2. Ve a Trader Survivor → Configuración → Plataformas
3. Genera una nueva API Key
4. Actualiza la estrategia con la nueva Key

### ❌ "Error 500: Error del servidor"

**Solución**: 
1. Verifica tu conexión a internet
2. Intenta nuevamente en unos minutos
3. Si persiste, contacta soporte

### ❌ Los trades no aparecen en Trader Survivor

**Verificar**:
1. La estrategia está activa en el gráfico
2. "Habilitar Exportación" está en `True`
3. Hay mensajes de confirmación en la ventana Output
4. La sesión en Trader Survivor está activa

## 🔐 Seguridad

- ✅ Tu API Key viaja encriptada por HTTPS
- ✅ Solo tú puedes ver tus trades
- ✅ Puedes revocar el acceso en cualquier momento
- ✅ NinjaTrader nunca envía información sensible de tu cuenta

## 📝 Notas Importantes

- La estrategia NO ejecuta trades automáticamente, solo los exporta
- Solo exporta trades cerrados (posiciones completadas)
- Las comisiones se calculan automáticamente
- El P&L incluye slippage y comisiones

## 🆘 Soporte

¿Problemas con la integración?

- 📧 Email: support@tradersurvivor.com
- 💬 Chat en vivo: [Trader Survivor](https://pepetradersurvivor.vercel.app)
- 📖 Documentación: [docs.tradersurvivor.com](https://docs.tradersurvivor.com)

## 📄 Licencia

Esta integración es gratuita para todos los usuarios de Trader Survivor.

---

**Made with ❤️ by Trader Survivor Team**
