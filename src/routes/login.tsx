import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const safeNext = (v: unknown) => (typeof v === "string" && v.startsWith("/") && !v.startsWith("//") ? v : "/");

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>) => ({ next: safeNext(s['next']) }),
  head: () => ({
    meta: [
      { title: "Entrar — MarketSense" },
      { name: "description", content: "Entre no MarketSense para conectar assistentes de IA." },
      { property: "og:title", content: "Entrar — MarketSense" },
      { property: "og:description", content: "Acesse sua conta MarketSense." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { next } = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault(); setBusy(true); setMsg(null);
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return setMsg(error.message);
      window.location.href = next;
    } else {
      const { data, error } = await supabase.auth.signUp({
        email, password, options: { emailRedirectTo: window.location.origin + next },
      });
      setBusy(false);
      if (error) return setMsg(error.message);
      if (data.session) window.location.href = next;
      else setMsg("Confirme seu e-mail pelo link enviado para continuar.");
    }
    void navigate;
  }

  return (
    <div className="mx-auto mt-10 max-w-sm glass-card p-6">
      <h1 className="text-xl font-semibold">{mode === "in" ? "Entrar" : "Criar conta"}</h1>
      <form onSubmit={submit} className="mt-4 space-y-3">
        <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" className="control w-full" />
        <input type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" className="control w-full" />
        {msg && <p role="alert" className="text-xs text-muted-foreground">{msg}</p>}
        <Button type="submit" disabled={busy} className="w-full">{mode === "in" ? "Entrar" : "Cadastrar"}</Button>
      </form>
      <button onClick={() => setMode(mode === "in" ? "up" : "in")} className="mt-3 text-xs text-brand">
        {mode === "in" ? "Não tem conta? Cadastre-se" : "Já tem conta? Entrar"}
      </button>
    </div>
  );
}
