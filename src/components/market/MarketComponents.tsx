import { Link } from "@tanstack/react-router";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowDownRight, ArrowUpRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMarket } from "@/context/MarketContext";
import type { Asset, HistoryPoint } from "@/types/market";

export const money = (value: number, currency: string) => new Intl.NumberFormat("pt-BR", { style:"currency", currency, maximumFractionDigits: value > 1000 ? 0 : 2 }).format(value);
export const compact = (value: number) => new Intl.NumberFormat("pt-BR", { notation:"compact", maximumFractionDigits:1 }).format(value);

export function ChangeBadge({ value }: { value: number }) {
  const up = value >= 0;
  return <span className={`inline-flex items-center gap-1 rounded-sm px-2 py-1 font-mono text-xs font-semibold ${up ? "bg-up-soft text-up" : "bg-down-soft text-down"}`}>{up ? <ArrowUpRight size={13}/> : <ArrowDownRight size={13}/>} {up ? "+" : ""}{value.toFixed(2).replace(".",",")}%</span>;
}

export function AssetCard({ asset }: { asset: Asset }) {
  return <Link to="/ativo/$symbol" params={{ symbol:asset.symbol }} className="glass-card diag block p-4 transition hover:-translate-y-0.5 hover:border-brand/30">
    <div className="flex items-center justify-between text-xs text-muted-foreground"><span>{asset.name}</span><span className="font-mono">{asset.symbol}</span></div>
    <p className="mt-3 font-mono text-xl font-semibold text-foreground">{money(asset.price, asset.currency)}</p>
    <div className={`mt-2 flex items-center gap-1 font-mono text-xs ${asset.changePercent >= 0 ? "text-up" : "text-down"}`}>{asset.changePercent >= 0 ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>} {asset.changePercent > 0 ? "+" : ""}{asset.changePercent.toFixed(2).replace(".",",")}%</div>
  </Link>;
}

export function MarketChart({ data, positive = true }: { data: HistoryPoint[]; positive?: boolean }) {
  return <div className="h-64 w-full"><ResponsiveContainer width="100%" height="100%"><AreaChart data={data} margin={{ top:12, right:4, left:-24, bottom:0 }}>
    <defs><linearGradient id={positive ? "upFill" : "downFill"} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={`var(--${positive ? "up" : "down"})`} stopOpacity={.28}/><stop offset="100%" stopColor={`var(--${positive ? "up" : "down"})`} stopOpacity={0}/></linearGradient></defs>
    <CartesianGrid vertical={false} stroke="var(--chart-grid)"/><XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill:"var(--muted-foreground)", fontSize:10 }}/><YAxis domain={["dataMin - 100", "dataMax + 100"]} axisLine={false} tickLine={false} tick={{ fill:"var(--muted-foreground)", fontSize:10 }}/><Tooltip contentStyle={{ background:"var(--popover)", border:"1px solid var(--border)", borderRadius:8, fontFamily:"IBM Plex Mono" }} formatter={(value) => [Number(value).toLocaleString("pt-BR"), "Valor"]}/><Area type="monotone" dataKey="value" stroke={`var(--${positive ? "up" : "down"})`} strokeWidth={2} fill={`url(#${positive ? "upFill" : "downFill"})`}/>
  </AreaChart></ResponsiveContainer></div>;
}

export function AssetsTable({ items }: { items: Asset[] }) {
  const { favorites, toggleFavorite } = useMarket();
  return <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left"><thead><tr className="border-b border-border text-[11px] uppercase text-muted-foreground"><th className="w-10 px-3 py-3"></th><th className="px-3 py-3">Ativo</th><th className="px-3 py-3">Nome</th><th className="px-3 py-3 text-right">Preço</th><th className="px-3 py-3 text-right">Variação</th><th className="px-3 py-3 text-right">Variação %</th><th className="px-3 py-3 text-right">Volume</th></tr></thead><tbody>
    {items.map(asset => <tr key={asset.symbol} className="border-b border-border/60 transition hover:bg-surface-strong"><td className="px-3 py-3"><Button aria-label={`${favorites.includes(asset.symbol) ? "Remover" : "Adicionar"} ${asset.symbol} dos favoritos`} title="Favoritar" className="size-8 border-0 bg-transparent p-0" onClick={() => toggleFavorite(asset.symbol)}><Star size={15} className={favorites.includes(asset.symbol) ? "fill-amber text-amber" : "text-muted-foreground"}/></Button></td><td className="px-3 py-3"><Link to="/ativo/$symbol" params={{symbol:asset.symbol}} className="font-mono text-sm font-semibold text-brand hover:underline">{asset.symbol}</Link></td><td className="px-3 py-3 text-sm text-secondary-foreground">{asset.name}</td><td className="px-3 py-3 text-right font-mono text-sm">{money(asset.price,asset.currency)}</td><td className={`px-3 py-3 text-right font-mono text-sm ${asset.change >= 0 ? "text-up" : "text-down"}`}>{asset.change >= 0 ? "+" : ""}{asset.change.toLocaleString("pt-BR")}</td><td className="px-3 py-3 text-right"><ChangeBadge value={asset.changePercent}/></td><td className="px-3 py-3 text-right font-mono text-sm text-muted-foreground">{compact(asset.volume)}</td></tr>)}
  </tbody></table></div>;
}
