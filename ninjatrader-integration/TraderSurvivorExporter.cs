#region Using declarations
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Windows;
using System.Windows.Input;
using System.Windows.Media;
using System.Xml.Serialization;
using NinjaTrader.Cbi;
using NinjaTrader.Gui;
using NinjaTrader.Gui.Chart;
using NinjaTrader.Gui.SuperDom;
using NinjaTrader.Gui.Tools;
using NinjaTrader.Data;
using NinjaTrader.NinjaScript;
using NinjaTrader.Core.FloatingPoint;
using NinjaTrader.NinjaScript.Indicators;
using NinjaTrader.NinjaScript.DrawingTools;
using System.Net.Http;
using System.Threading.Tasks;
#endregion

//This namespace holds Strategies in this folder and is required. Do not change it. 
namespace NinjaTrader.NinjaScript.Strategies
{
	public class TraderSurvivorExporter : Strategy
	{
		private Account account;
		private string apiUrl = "https://pepetradersurvivor.vercel.app/api/proxy-ninjatrader";
		
		protected override void OnStateChange()
		{
			if (State == State.SetDefaults)
			{
				Description									= @"Exporta trades automáticamente a Trader Survivor";
				Name										= "TraderSurvivorExporter";
				Calculate									= Calculate.OnEachTick;
				EntriesPerDirection							= 1;
				EntryHandling								= EntryHandling.AllEntries;
				IsExitOnSessionCloseStrategy				= true;
				ExitOnSessionCloseSeconds					= 30;
				IsFillLimitOnTouch							= false;
				MaximumBarsLookBack							= MaximumBarsLookBack.TwoHundredFiftySix;
				OrderFillResolution							= OrderFillResolution.Standard;
				Slippage									= 0;
				StartBehavior								= StartBehavior.WaitUntilFlat;
				TimeInForce									= TimeInForce.Gtc;
				TraceOrders									= false;
				RealtimeErrorHandling						= RealtimeErrorHandling.StopCancelClose;
				StopTargetHandling							= StopTargetHandling.PerEntryExecution;
				BarsRequiredToTrade							= 20;
				
				// Parámetros configurables
				ApiKey = "";
				EnableExport = true;
				LogToOutput = true;
			}
			else if (State == State.Configure)
			{
			}
			else if (State == State.DataLoaded)
			{
				if (string.IsNullOrEmpty(ApiKey))
				{
					Print("⚠️ ADVERTENCIA: API Key no configurada. Ve a propiedades de la estrategia.");
				}
			}
			else if (State == State.Realtime)
			{
				account = Account;
			}
		}

		protected override void OnExecutionUpdate(Execution execution, string executionId, double price, int quantity, MarketPosition marketPosition, string orderId, DateTime time)
		{
			if (!EnableExport || string.IsNullOrEmpty(ApiKey))
				return;
			
			// Solo exportar cuando se cierra una posición
			if (execution.Order.OrderState == OrderState.Filled && 
			    (execution.Order.OrderAction == OrderAction.BuyToCover || 
			     execution.Order.OrderAction == OrderAction.Sell))
			{
				Task.Run(() => ExportTradeAsync(execution, executionId, price, quantity, orderId, time));
			}
		}

		private async Task ExportTradeAsync(Execution execution, string executionId, double price, int quantity, string orderId, DateTime time)
		{
			try
			{
				using (var client = new HttpClient())
				{
					client.DefaultRequestHeaders.Add("X-API-Key", ApiKey);
					client.Timeout = TimeSpan.FromSeconds(10);

					// Calcular P&L
					double pnl = 0;
					double commission = execution.Commission;
					
					if (Position != null)
					{
						pnl = Position.GetProfitLoss(price, PerformanceUnit.Currency);
					}

					// Crear objeto de trade
					var tradeData = new
					{
						orderId = orderId,
						executionId = executionId,
						instrument = Instrument.FullName,
						symbol = Instrument.MasterInstrument.Name,
						action = execution.Order.OrderAction.ToString(),
						orderType = execution.Order.OrderType.ToString(),
						
						// Precios
						entryPrice = execution.Order.AverageFillPrice,
						exitPrice = price,
						avgFillPrice = price,
						
						// Cantidades
						quantity = quantity,
						filledQuantity = quantity,
						
						// P&L
						realizedPnL = pnl,
						pnl = pnl,
						commission = commission,
						
						// Tiempos
						entryTime = execution.Order.Time.ToString("yyyy-MM-ddTHH:mm:ss"),
						exitTime = time.ToString("yyyy-MM-ddTHH:mm:ss"),
						time = time.ToString("yyyy-MM-ddTHH:mm:ss"),
						
						// Metadata
						timeInForce = execution.Order.TimeInForce.ToString(),
						strategy = Name,
						notes = $"Auto-exportado desde NinjaTrader - {Name}"
					};

					var json = Newtonsoft.Json.JsonConvert.SerializeObject(tradeData);
					var content = new StringContent(json, Encoding.UTF8, "application/json");

					var response = await client.PostAsync(apiUrl, content);
					
					if (response.IsSuccessStatusCode)
					{
						var responseContent = await response.Content.ReadAsStringAsync();
						if (LogToOutput)
						{
							Print($"✅ Trade exportado a Trader Survivor: {Instrument.FullName} | P&L: ${pnl:F2}");
						}
					}
					else
					{
						Print($"❌ Error exportando trade: {response.StatusCode} - {await response.Content.ReadAsStringAsync()}");
					}
				}
			}
			catch (Exception ex)
			{
				Print($"❌ Excepción al exportar trade: {ex.Message}");
			}
		}

		#region Properties
		[NinjaScriptProperty]
		[Display(Name="API Key", Description="Tu API Key de Trader Survivor", Order=1, GroupName="Configuración")]
		public string ApiKey { get; set; }

		[NinjaScriptProperty]
		[Display(Name="Habilitar Exportación", Description="Activar/desactivar exportación automática", Order=2, GroupName="Configuración")]
		public bool EnableExport { get; set; }

		[NinjaScriptProperty]
		[Display(Name="Log en Output", Description="Mostrar mensajes en la ventana Output", Order=3, GroupName="Configuración")]
		public bool LogToOutput { get; set; }
		#endregion
	}
}
