import { auth, defineMcp } from "@lovable.dev/mcp-js";
import { getAssetTool, listAssetsTool, searchAssetsTool } from "./tools/assets";

const projectRef = import.meta.env["VITE_SUPABASE_PROJECT_ID"] ?? "project-ref-unset";

export default defineMcp({
  name: "market-sense-dashboard",
  title: "Market Sense Dashboard",
  version: "0.1.0",
  instructions:
    "Ferramentas do MarketSense (dados fictícios de mercado). Use `list_assets` para listar, `search_assets` para buscar por ticker/nome e `get_asset` para detalhes e histórico.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listAssetsTool, searchAssetsTool, getAssetTool],
});
