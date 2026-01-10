# Ejemplo de Request/Response para Testing

## Endpoint
```
POST https://pepetradersurvivor.vercel.app/api/proxy-ninjatrader
```

## Headers
```json
{
  "Content-Type": "application/json",
  "X-API-Key": "tu_api_key_aqui"
}
```

## Request Body (Trade Cerrado - Long)
```json
{
  "orderId": "o123456789",
  "executionId": "e987654321",
  "instrument": "ES 03-25",
  "symbol": "ES",
  "action": "BuyToCover",
  "orderType": "Market",
  "entryPrice": 5875.50,
  "exitPrice": 5880.25,
  "avgFillPrice": 5880.25,
  "quantity": 1,
  "filledQuantity": 1,
  "realizedPnL": 237.50,
  "pnl": 237.50,
  "commission": 4.80,
  "entryTime": "2025-12-31T09:30:00",
  "exitTime": "2025-12-31T10:15:00",
  "time": "2025-12-31T10:15:00",
  "timeInForce": "Gtc",
  "strategy": "MyStrategy",
  "notes": "Auto-exportado desde NinjaTrader"
}
```

## Request Body (Trade Cerrado - Short)
```json
{
  "orderId": "o123456790",
  "executionId": "e987654322",
  "instrument": "NQ 03-25",
  "symbol": "NQ",
  "action": "Sell",
  "orderType": "Limit",
  "entryPrice": 17250.00,
  "exitPrice": 17210.50,
  "avgFillPrice": 17210.50,
  "quantity": 2,
  "filledQuantity": 2,
  "realizedPnL": 1580.00,
  "pnl": 1580.00,
  "commission": 9.60,
  "entryTime": "2025-12-31T11:00:00",
  "exitTime": "2025-12-31T11:45:00",
  "time": "2025-12-31T11:45:00",
  "timeInForce": "Day",
  "strategy": "ScalpingStrategy",
  "notes": "Trade ganador - scalping"
}
```

## Response (Éxito)
```json
{
  "success": true,
  "message": "Trade guardado exitosamente",
  "data": {
    "id": "ninja_1735668000_abc123def",
    "instrument": "ES 03-25",
    "type": "buy",
    "pnl": 237.50,
    "status": "closed"
  }
}
```

## Response (Error - API Key Inválida)
```json
{
  "success": false,
  "error": "API Key inválida o inactiva"
}
```

## Response (Error - Datos Faltantes)
```json
{
  "success": false,
  "error": "Faltan campos requeridos: instrument, action"
}
```

## Testing con cURL

### Linux/Mac
```bash
curl -X POST https://pepetradersurvivor.vercel.app/api/proxy-ninjatrader \
  -H "Content-Type: application/json" \
  -H "X-API-Key: tu_api_key_aqui" \
  -d '{
    "orderId": "test123",
    "instrument": "ES 03-25",
    "symbol": "ES",
    "action": "BuyToCover",
    "entryPrice": 5875.50,
    "exitPrice": 5880.25,
    "quantity": 1,
    "realizedPnL": 237.50,
    "commission": 4.80,
    "entryTime": "2025-12-31T09:30:00",
    "exitTime": "2025-12-31T10:15:00"
  }'
```

### Windows PowerShell
```powershell
$headers = @{
    "Content-Type" = "application/json"
    "X-API-Key" = "tu_api_key_aqui"
}

$body = @{
    orderId = "test123"
    instrument = "ES 03-25"
    symbol = "ES"
    action = "BuyToCover"
    entryPrice = 5875.50
    exitPrice = 5880.25
    quantity = 1
    realizedPnL = 237.50
    commission = 4.80
    entryTime = "2025-12-31T09:30:00"
    exitTime = "2025-12-31T10:15:00"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://pepetradersurvivor.vercel.app/api/proxy-ninjatrader" -Method Post -Headers $headers -Body $body
```

## Testing con Postman

1. Crea un nuevo request POST
2. URL: `https://pepetradersurvivor.vercel.app/api/proxy-ninjatrader`
3. Headers:
   - Key: `Content-Type`, Value: `application/json`
   - Key: `X-API-Key`, Value: `tu_api_key_aqui`
4. Body → raw → JSON:
   ```json
   {
     "orderId": "test123",
     "instrument": "ES 03-25",
     "symbol": "ES",
     "action": "BuyToCover",
     "entryPrice": 5875.50,
     "exitPrice": 5880.25,
     "quantity": 1,
     "realizedPnL": 237.50,
     "commission": 4.80,
     "entryTime": "2025-12-31T09:30:00",
     "exitTime": "2025-12-31T10:15:00"
   }
   ```
5. Click **Send**

## Campos Aceptados

### Requeridos
- `instrument` o `symbol`: Nombre del instrumento
- `action`: Acción del trade (BuyToCover, Sell, Buy, SellShort, etc.)

### Opcionales
- `orderId`: ID de la orden
- `executionId`: ID de la ejecución
- `orderType`: Tipo de orden (Market, Limit, Stop, etc.)
- `entryPrice`: Precio de entrada
- `exitPrice`: Precio de salida
- `avgFillPrice`: Precio promedio de llenado
- `quantity`: Cantidad
- `filledQuantity`: Cantidad llenada
- `realizedPnL`: P&L realizado
- `pnl`: P&L
- `commission`: Comisión
- `entryTime`: Hora de entrada (ISO 8601)
- `exitTime`: Hora de salida (ISO 8601)
- `time`: Hora general
- `timeInForce`: Time in force (Gtc, Day, etc.)
- `strategy`: Nombre de la estrategia
- `notes`: Notas adicionales

## Mapeo de Campos

| NinjaTrader | Trader Survivor | Descripción |
|-------------|----------------|-------------|
| `action` | `type` | Buy/BuyToCover → 'buy', Sell/SellShort → 'sell' |
| `instrument` | `instrument` | Nombre del instrumento |
| `avgFillPrice` | `entry_price` | Precio de entrada |
| `exitPrice` | `exit_price` | Precio de salida |
| `quantity` | `quantity` | Cantidad |
| `realizedPnL` | `pnl` | P&L neto |
| `commission` | `commission` | Comisión |
| `entryTime` | `entry_date` | Fecha/hora entrada |
| `exitTime` | `exit_date` | Fecha/hora salida |

## Cálculo de Resultado

El sistema calcula automáticamente:
- `result = 'win'` si `(pnl + commission) > 0.01`
- `result = 'loss'` si `(pnl + commission) < -0.01`
- `result = 'breakeven'` en otro caso
- `status = 'closed'` si hay `exitPrice`
- `status = 'open'` si no hay `exitPrice`
