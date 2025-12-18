# i18n + RTL Smoke Checklist

- Toggle language via header globe and Settings -> Preferences; confirm interface strings switch and preference persists after reload.
- Verify `dir` changes (`ltr` for English, `rtl` for Arabic) and layout mirrors (sidebar placement, card alignment, dropdowns).
- Check high-traffic screens: Dashboard stats/cards, Parts list/detail/create/edit, Settings sections, Auth (Login/Signup/Awaiting Approval), 404 page.
- Ensure user content (e.g., part description) translates via helper or falls back to original text without empty strings.
- Validate locale parity with `npm run i18n:check` (aligns en/ar keys) and skim console for missing keys.
