import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type ThemePreference = "Escuro" | "Sistema";
type CurrencyPreference = "BRL" | "USD";
interface MarketContextValue {
  favorites: string[]; toggleFavorite: (symbol: string) => void;
  theme: ThemePreference; setTheme: (value: ThemePreference) => void;
  currency: CurrencyPreference; setCurrency: (value: CurrencyPreference) => void;
  notifications: boolean; setNotifications: (value: boolean) => void;
  refreshRate: string; setRefreshRate: (value: string) => void;
}
const MarketContext = createContext<MarketContextValue | undefined>(undefined);
export function MarketProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState(["VALE3", "PETR4", "BTC"]);
  const [theme, setTheme] = useState<ThemePreference>("Escuro");
  const [currency, setCurrency] = useState<CurrencyPreference>("BRL");
  const [notifications, setNotifications] = useState(true);
  const [refreshRate, setRefreshRate] = useState("30 segundos");
  const value = useMemo(() => ({ favorites, toggleFavorite: (symbol: string) => setFavorites(current => current.includes(symbol) ? current.filter(item => item !== symbol) : [...current, symbol]), theme, setTheme, currency, setCurrency, notifications, setNotifications, refreshRate, setRefreshRate }), [favorites, theme, currency, notifications, refreshRate]);
  return <MarketContext.Provider value={value}>{children}</MarketContext.Provider>;
}
export function useMarket() { const value = useContext(MarketContext); if (!value) throw new Error("MarketProvider ausente"); return value; }
