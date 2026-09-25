import type { Asset, HistoryPoint, MarketPeriod } from "@/types/market";

const base = [126900,127180,126980,127640,127420,128010,127880,128260,128090,128450];
const multipliers: Record<MarketPeriod, number> = { "1D": 1, "1S": 1.025, "1M": .94, "6M": .82, "1A": .73 };
const labels: Record<MarketPeriod, string[]> = {
  "1D": ["09h","10h","11h","12h","13h","14h","15h","16h","17h","18h"],
  "1S": ["Seg","Ter","Qua","Qui","Sex","Seg","Ter","Qua","Qui","Sex"],
  "1M": ["01","04","07","10","13","16","19","22","25","28"],
  "6M": ["Abr","Abr","Mai","Mai","Jun","Jul","Ago","Ago","Set","Set"],
  "1A": ["Out","Nov","Dez","Jan","Fev","Mar","Abr","Jun","Ago","Set"],
};
const history = (scale = 1): Record<MarketPeriod, HistoryPoint[]> => Object.fromEntries(
  (Object.keys(labels) as MarketPeriod[]).map(period => [period, base.map((value, index) => ({ label: labels[period][index], value: value * multipliers[period] * scale }))])
) as Record<MarketPeriod, HistoryPoint[]>;

export const assets: Asset[] = [
  { symbol:"IBOV", name:"Ibovespa", category:"Índices", price:128450.32, currency:"BRL", change:1572.10, changePercent:1.24, open:126878.22, high:128901.45, low:126540.18, volume:18400000000, history:history() },
  { symbol:"USDBRL", name:"Dólar Americano", category:"Moedas", price:5.42, currency:"BRL", change:-0.02, changePercent:-0.38, open:5.44, high:5.46, low:5.39, volume:4280000000, history:history(.0000422) },
  { symbol:"SPX", name:"S&P 500", category:"Índices", price:5920.10, currency:"USD", change:36.58, changePercent:.62, open:5883.52, high:5934.8, low:5876.4, volume:3920000000, history:history(.0461) },
  { symbol:"BTC", name:"Bitcoin", category:"Cripto", price:97840, currency:"USD", change:2010, changePercent:2.10, open:95830, high:98910, low:94770, volume:36800000000, history:history(.762) },
  { symbol:"VALE3", name:"Vale S.A.", category:"Ações", price:62.18, currency:"BRL", change:2.06, changePercent:3.42, open:60.12, high:62.44, low:59.98, volume:924300000, history:history(.000484) },
  { symbol:"PETR4", name:"Petrobras PN", category:"Ações", price:38.90, currency:"BRL", change:.83, changePercent:2.18, open:38.07, high:39.12, low:37.90, volume:1480000000, history:history(.000303) },
  { symbol:"ITUB4", name:"Itaú Unibanco PN", category:"Ações", price:34.55, currency:"BRL", change:.59, changePercent:1.75, open:33.96, high:34.72, low:33.81, volume:786000000, history:history(.000269) },
  { symbol:"ABEV3", name:"Ambev S.A.", category:"Ações", price:13.28, currency:"BRL", change:.12, changePercent:.91, open:13.16, high:13.39, low:13.08, volume:342000000, history:history(.000103) },
  { symbol:"BBAS3", name:"Banco do Brasil ON", category:"Ações", price:27.42, currency:"BRL", change:-.26, changePercent:-.94, open:27.68, high:27.82, low:27.31, volume:512000000, history:history(.000213) },
  { symbol:"MGLU3", name:"Magazine Luiza ON", category:"Ações", price:9.48, currency:"BRL", change:-.16, changePercent:-1.66, open:9.64, high:9.71, low:9.39, volume:278000000, history:history(.000074) },
  { symbol:"WEGE3", name:"WEG S.A.", category:"Ações", price:41.55, currency:"BRL", change:-1.24, changePercent:-2.90, open:42.79, high:42.96, low:41.31, volume:396000000, history:history(.000323) },
];
export const overviewSymbols = ["IBOV", "USDBRL", "SPX", "BTC"];
