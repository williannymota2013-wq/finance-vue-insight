<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- MarketSense mantém dados em `src/data` e acesso assíncrono em `src/services/api.ts`, permitindo trocar mocks pela API Python sem alterar a interface.
- O estado demonstrativo compartilhado (favoritos e preferências) vive em um contexto React, pois o projeto não terá backend nem persistência nesta fase.
