export type AssetCategory = "Ações" | "Índices" | "Moedas" | "Cripto";
export type MarketPeriod = "1D" | "1S" | "1M" | "6M" | "1A";

export interface HistoryPoint { label: string; value: number; }
export interface Asset {
  symbol: string;
  name: string;
  category: AssetCategory;
  price: number;
  currency: "BRL" | "USD";
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  history: Record<MarketPeriod, HistoryPoint[]>;
}
