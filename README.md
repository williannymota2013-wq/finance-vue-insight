# MarketSense

**Dashboard Inteligente para Monitoramento do Mercado Financeiro.**

## Objetivo

Projeto acadêmico desenvolvido por estudantes de Sistemas de Informação para a disciplina de Aplicações IoT em Python. O objetivo deste front-end é oferecer uma interface moderna e responsiva para visualizar bolsas de valores e ativos financeiros.

## Descrição

O MarketSense apresenta indicadores, gráficos históricos, rankings, tabelas pesquisáveis e uma lista de favoritos. Todos os valores são fictícios e existem exclusivamente para demonstrar a interface antes da integração com o backend Python.

## Tecnologias utilizadas

- React 19 e TypeScript
- Vite 8 e TanStack Start
- Tailwind CSS 4
- Recharts para gráficos interativos
- Lucide React para ícones

## Estrutura do projeto

```text
src/
├── components/   # Elementos reutilizáveis, navegação, cards, gráficos e tabelas
├── context/      # Estado temporário de favoritos e preferências
├── data/         # Dados financeiros fictícios
├── pages/        # Conteúdo das cinco telas
├── routes/       # Endereços e metadados de cada tela
├── services/     # Camada de acesso a dados preparada para API REST
└── types/        # Interfaces TypeScript dos ativos
```

## Telas

1. **Dashboard:** indicadores de Ibovespa, Dólar, S&P 500 e Bitcoin; evolução do Ibovespa; maiores altas e baixas; tabela de ativos.
2. **Mercado:** pesquisa, filtro por categoria, ordenação e tabela completa.
3. **Detalhes do Ativo:** preço, variação, gráfico por período, abertura, máxima, mínima e volume.
4. **Favoritos:** seleção interativa de ativos por estrela.
5. **Configurações:** tema, notificações, moeda e frequência de atualização.

## Componentes

`AppShell` fornece menu lateral, cabeçalho, busca global e navegação móvel. `AssetCard`, `AssetsTable`, `ChangeBadge` e `MarketChart` são reutilizados pelas telas.

## Dados mockados

Os ativos e seus históricos estão em `src/data/mockMarket.ts`. As interfaces correspondentes estão em `src/types/market.ts`. Nenhum dado financeiro externo é consumido.

## Como executar localmente

Requisito recomendado: Node.js 24 LTS (inclui npm).

No PowerShell, abra a pasta do projeto e execute:

```powershell
cd C:\Users\gh360\finance-vue-insight
npm install
npm run dev
```

Mantenha o terminal aberto enquanto usa a aplicação. Para encerrar, pressione `Ctrl+C`.
Nas próximas execuções, basta usar `npm run dev`; repita `npm install` quando as dependências mudarem.
O endereço padrão é `http://localhost:8080`. Se a porta estiver ocupada, o Vite informa outra porta no terminal. O `package-lock.json` permite reinstalar as mesmas versões com `npm ci`.

O arquivo `.env` existente contém a configuração pública do Supabase/Lovable usada pelo login e pelo MCP. Para usar outra configuração apenas nesta máquina, crie um `.env.local` (ignorado pelo Git) com as variáveis correspondentes e reinicie o servidor. Nunca coloque chaves privadas em variáveis `VITE_*`.

O dashboard usa dados demonstrativos em `src/data`, acessados por `src/services/api.ts`. Não é necessário instalar Python, iniciar o diretório `backend` ou configurar um banco de dados para usar essas telas. Login e MCP dependem do serviço remoto do Supabase/Lovable.

Para verificar a geração do build de produção (destinado à hospedagem):

```powershell
npm run build
```

Se preferir Bun:

```bash
bun install
bun run dev
```

A aplicação estará disponível no endereço exibido pelo terminal.

## Como conectar futuramente a API Python

A integração deve ser feita apenas em `src/services/api.ts`. Substitua os retornos mockados por chamadas `fetch()` aos endpoints REST do backend Python, mantendo as assinaturas de `getAssets`, `getAsset` e `searchAssets`. Faça a conversão da resposta da API para a interface `Asset` quando necessário. Os componentes visuais não precisam conhecer o endereço nem os detalhes do backend.

Exemplo futuro:

```ts
export async function getAssets(): Promise<Asset[]> {
  const response = await fetch(`${API_URL}/assets`);
  if (!response.ok) throw new Error("Não foi possível carregar os ativos");
  return response.json();
}
```

## Divisão entre Front-End e Back-End

### Front-End — escopo atual
- Interface, navegação e responsividade
- Gráficos, filtros e estados interativos
- Tipos e dados fictícios
- Camada preparada para integração

### Back-End — responsabilidade futura
- Servidor Python e regras de negócio
- Integração com provedores financeiros
- Persistência e atualização dos dados
- Autenticação, caso seja necessária
- Validação, segurança e disponibilidade da API

> Este repositório não implementa backend, banco de dados, autenticação, servidor Python, web scraping ou consumo de APIs financeiras externas.
