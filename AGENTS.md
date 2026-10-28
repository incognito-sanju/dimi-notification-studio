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

## Architecture

- Full-screen notification screens are composed from the shared components in
  `src/components/notifications/` (screen shell, slide-to-action slider, info
  cards); per-type copy and demo data live in `src/components/notifications/data.ts`.
  Never hardcode notification copy inside a route — routes only pick a kind.
- DIMI colors, gradients, and screen backgrounds are semantic tokens and helper
  classes in `src/styles.css` (`.dimi-screen`, `.dimi-card`, `.slide-track-*`).
  Never hardcode color utilities in components.
