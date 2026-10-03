import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { getAsset, getAssets, searchAssets } from "@/services/api";
import type { Asset, MarketPeriod } from "@/types/market";

const summary = (a: Asset) => ({
  symbol: a.symbol, name: a.name, category: a.category, price: a.price, currency: a.currency,
  change: a.change, changePercent: a.changePercent, volume: a.volume,
});

const requireAuth = (ctx: { isAuthenticated: () => boolean }) => {
  if (!ctx.isAuthenticated()) throw new ToolError("Autenticação necessária.");
};

export const listAssetsTool = defineTool({
  name: "list_assets",
  title: "Listar ativos",
  description: "Lista os ativos demonstrativos do MarketSense, com filtro opcional por categoria.",
  inputSchema: { category: z.enum(["Ações", "Índices", "Moedas", "Cripto"]).optional().describe("Categoria do ativo.") },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ category }, ctx) => {
    requireAuth(ctx);
    const list = (await getAssets()).filter(a => !category || a.category === category).map(summary);
    return { content: [{ type: "text", text: JSON.stringify(list) }], structuredContent: { assets: list } };
  },
});

export const searchAssetsTool = defineTool({
  name: "search_assets",
  title: "Buscar ativos",
  description: "Busca ativos demonstrativos por ticker ou nome.",
  inputSchema: { term: z.string().trim().min(1).describe("Ticker ou parte do nome.") },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ term }, ctx) => {
    requireAuth(ctx);
    const list = (await searchAssets(term)).map(summary);
    return { content: [{ type: "text", text: JSON.stringify(list) }], structuredContent: { assets: list } };
  },
});

export const getAssetTool = defineTool({
  name: "get_asset",
  title: "Detalhes do ativo",
  description: "Retorna preço, abertura, máxima, mínima, volume e histórico de um ativo demonstrativo.",
  inputSchema: {
    symbol: z.string().trim().min(1).describe("Ticker, ex.: PETR4."),
    period: z.enum(["1D", "1S", "1M", "6M", "1A"]).optional().describe("Período do histórico (padrão 1M)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ symbol, period }, ctx) => {
    requireAuth(ctx);
    const a = await getAsset(symbol);
    if (!a) throw new ToolError(`Ativo ${symbol} não encontrado.`);
    const p: MarketPeriod = period ?? "1M";
    const asset = { ...summary(a), open: a.open, high: a.high, low: a.low, period: p,
      history: a.history[p].map(({ label, value }) => ({ label, value })) };
    return { content: [{ type: "text", text: JSON.stringify(asset) }], structuredContent: { asset } };
  },
});
