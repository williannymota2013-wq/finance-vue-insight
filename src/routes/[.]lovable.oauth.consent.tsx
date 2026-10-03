import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

type OAuthResult = { data: any; error: { message: string } | null };
const oauth = (supabase.auth as unknown as {
  oauth: {
    getAuthorizationDetails: (id: string) => Promise<OAuthResult>;
    approveAuthorization: (id: string) => Promise<OAuthResult>;
    denyAuthorization: (id: string) => Promise<OAuthResult>;
  };
}).oauth;

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id: typeof s.authorization_id === "string" ? s.authorization_id : "",
  }),
  head: () => ({
    meta: [
      { title: "Autorizar conexão — MarketSense" },
      { name: "description", content: "Autorize um assistente de IA a usar o MarketSense." },
      { property: "og:title", content: "Autorizar conexão — MarketSense" },
      { property: "og:description", content: "Conecte um assistente de IA à sua conta MarketSense." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  beforeLoad: async ({ search, location }) => {
    if (!search.authorization_id) throw new Error("authorization_id ausente");
    const { data } = await supabase.auth.getSession();
    if (!data.session) throw redirect({ to: "/login", search: { next: location.pathname + location.searchStr } });
  },
  loader: async ({ location }) => {
    const id = new URLSearchParams(location.search).get("authorization_id")!;
    const { data, error } = await oauth.getAuthorizationDetails(id);
    if (error) throw new Error(error.message);
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) throw redirect({ href: immediate });
    return data;
  },
  component: Consent,
  errorComponent: ({ error }) => (
    <div className="glass-card mx-auto mt-10 max-w-md p-6 text-sm">Não foi possível carregar esta autorização: {String((error as Error)?.message ?? error)}</div>
  ),
});

function Consent() {
  const details = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const client = details?.client?.name ?? "um aplicativo";

  async function decide(approve: boolean) {
    setBusy(true);
    const { data, error } = approve ? await oauth.approveAuthorization(authorization_id) : await oauth.denyAuthorization(authorization_id);
    const target = data?.redirect_url ?? data?.redirect_to;
    if (error || !target) { setBusy(false); setError(error?.message ?? "Nenhum redirecionamento retornado."); return; }
    window.location.href = target;
  }

  return (
    <div className="glass-card mx-auto mt-10 max-w-md space-y-4 p-6">
      <h1 className="text-xl font-semibold">Conectar {client} ao MarketSense</h1>
      <p className="text-sm text-muted-foreground">{client} poderá consultar os ativos do MarketSense em seu nome. Isso compartilha seu perfil básico e e-mail.</p>
      {error && <p role="alert" className="text-sm text-down">{error}</p>}
      <div className="flex gap-2">
        <Button disabled={busy} onClick={() => decide(true)}>Aprovar</Button>
        <Button disabled={busy} onClick={() => decide(false)}>Cancelar conexão</Button>
      </div>
    </div>
  );
}
