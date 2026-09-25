import { assets } from "@/data/mockMarket";
import type { Asset } from "@/types/market";

const wait = (ms = 120) => new Promise(resolve => setTimeout(resolve, ms));

// PONTO DE INTEGRAÇÃO: substitua o conteúdo destas funções por fetch() para a API REST Python.
// Manter estas assinaturas evita mudanças nos componentes quando o backend estiver disponível.
export async function getAssets(): Promise<Asset[]> { await wait(); return assets; }
export async function getAsset(symbol: string): Promise<Asset | undefined> {
  await wait(); return assets.find(asset => asset.symbol.toLowerCase() === symbol.toLowerCase());
}
export async function searchAssets(term: string): Promise<Asset[]> {
  await wait(); const query = term.toLowerCase();
  return assets.filter(asset => asset.symbol.toLowerCase().includes(query) || asset.name.toLowerCase().includes(query));
}
