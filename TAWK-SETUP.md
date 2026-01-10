# 🚀 Configuración de Tawk.to (Chat en Vivo)

## Paso 1: Crear Cuenta
1. Ve a **https://www.tawk.to/**
2. Click en **"Sign Up Free"**
3. Usa tu email y crea contraseña
4. Verifica tu email

## Paso 2: Obtener el Código
1. Una vez dentro, ve a:
   - **Administration** (icono engranaje)
   - **Channels** → **Chat Widget**
2. Verás un código JavaScript
3. **Copia TODO el código** (se ve así):

```javascript
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/XXXXXXXX/default';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
```

## Paso 3: Pegar en landing.html
1. Abre **landing.html**
2. Busca al final del archivo este comentario:
   ```html
   <!-- Pega aquí tu código de Tawk.to -->
   ```
3. **Pega el código** que copiaste de Tawk.to

## Paso 4: Personalizar Colores (IMPORTANTE)
1. En Tawk.to Dashboard, ve a:
   - **Administration** → **Chat Widget** → **Widget Customization**
2. Configura estos colores para que coincida con tu landing:
   - **Primary Color**: `#00ff00` (verde neón)
   - **Background Color**: `#000000` (negro)
   - **Text Color**: `#ffffff` (blanco)

## Paso 5: Configurar Widget
1. En **Widget Customization**:
   - **Position**: Bottom Right (esquina inferior derecha)
   - **Show on pages**: All pages
   - **Greeting Message**: "¿Tienes dudas sobre Trader Survivor? Escríbenos 👋"

## Paso 6: Descargar App Móvil
Para recibir chats en tu celular:
- **iOS**: https://apps.apple.com/us/app/tawk-to/id1018387479
- **Android**: https://play.google.com/store/apps/details?id=com.tawk.android

Inicia sesión con tu cuenta y recibirás notificaciones instantáneas.

## Paso 7: Configurar Horarios (Opcional)
1. En Tawk.to → **Administration** → **Operating Hours**
2. Configura tu horario de atención
3. Mensajes fuera de horario van a email

## Respuestas Rápidas Recomendadas

Crea estas respuestas automáticas en **Shortcuts**:

**1. Pregunta por precio:**
```
Trader Survivor cuesta $120 USD/año. Pago único sin renovación automática.
Aceptamos tarjeta y crypto (USDT, USDC, BTC, ETH).
```

**2. Pregunta por brokers:**
```
Actualmente soportamos:
✅ NinjaTrader (sincronización automática)
✅ BingX, Bitget, MEXC (API)
✅ Importación manual CSV para cualquier broker
```

**3. Pregunta por diferencias vs Tradervue:**
```
Ventajas vs Tradervue:
💰 Precio: $120/año vs $399/año
🇪🇸 100% en español
📊 Mood tracking + Social media analytics
🎯 Funded accounts management
```

---

## ✅ Checklist Final
- [ ] Cuenta creada en Tawk.to
- [ ] Código copiado y pegado en landing.html
- [ ] Colores personalizados (negro + verde neón)
- [ ] App móvil instalada
- [ ] Respuestas rápidas configuradas
- [ ] Horario de atención definido

---

**Después de configurar, el widget aparecerá automáticamente en la esquina inferior derecha de tu landing page.**
