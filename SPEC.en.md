# Random Strings - UI & Functional Specification

## Overview

A static web application for generating random strings. Users can specify character types, count, and length to generate cryptographically secure random strings.

### Tech Stack

- HTML + CSS + JavaScript (no build step)
- Alpine.js (reactive UI)
- Pico.css (base styles, dark theme)
- Fonts: `system-ui, sans-serif` (UI), `Menlo, Consolas, 'Courier New', monospace` (results)

---

## UI Layout

```
┌──────────────────────────────────────────────────┐
│  <h1> Random Strings                             │
│                                                  │
│  count: [___] length: [__]  [Generate] [Reset]   │
│                                                  │
│  □ a-z  □ A-Z  □ 0-9  □ symbols  max:[__]%       │
│                                                  │
│  □ !  □ "  □ #  □ $  □ %  □ &  □ '  □ (  □ )     │
│  □ *  □ +  □ ,  □ -  □ .  □ /                    │
│                                                  │
│  □ :  □ ;  □ <  □ =  □ >  □ ?  □ @  □ [  □ \     │
│  □ ]  □ ^  □ _  □ `  □ {  □ |  □ }  □ ~          │
│                                                  │
│  ┃ xK9mPq2nR4wL8vYt              [Copied!]       │
│  ┃ bN5jHc7sFa3gDe6i                              │
│  ┃ ...                                           │
└──────────────────────────────────────────────────┘
```

---

## UI Elements

### Input Fields

| Element | Type | Default | Description |
|---------|------|---------|-------------|
| count | text input | `12` | Number of strings to generate |
| length | text input | `16` | Length of each string |

- Values are parsed with `parseInt`; defaults to `0` on parse failure

### Buttons

| Button | Action |
|--------|--------|
| Generate | Regenerate strings with current settings |
| Reset | Clear URL parameters and restore all settings to defaults |

### Character Type Checkboxes (Basic)

| Label | Default | Character Set |
|-------|---------|---------------|
| a-z | ON | `abcdefghijklmnopqrstuvwxyz` |
| A-Z | ON | `ABCDEFGHIJKLMNOPQRSTUVWXYZ` |
| 0-9 | ON | `0123456789` |
| symbols | OFF | Bulk toggle for all symbols (see below) |

### Symbol Rate Limit (symbol max)

- Shown only when at least one symbol is enabled
- Default: `20` (%)
- Limits the number of symbol characters in each string to `length * symbolMax / 100`
- No limit applied when only alphanumeric or only symbols are selected

### Symbol Checkboxes (Individual, 33 total)

All OFF by default. Displayed in two rows.

**Row 1 (15):**
`!` `"` `#` `$` `%` `&` `'` `(` `)` `*` `+` `,` `-` `.` `/`

**Row 2 (18):**
`:` `;` `<` `=` `>` `?` `@` `[` `\` `]` `^` `_` `` ` `` `{` `|` `}` `~`

### Results Display

- Rendered as `<ul>` / `<li>` list (card-style with left border)
- Number of strings matches the count value
- Click to copy to clipboard with a "Copied!" mini toast

---

## Functional Specification

### String Generation

1. Build separate alphanumeric and symbol character pools from enabled character types
2. If both pools are empty, return an empty array (nothing displayed)
3. If only one pool is active, select characters uniformly from that pool
4. If both pools are active, generate while limiting symbol count to the `symbolMax` ratio
5. Randomness is provided by `crypto.getRandomValues()` (Web Crypto API)
   - A `Uint32Array` is generated and each value is divided by the pool length to select a character

### Reactive Behavior

- Changing count / length → immediate regeneration
- Changing a-z / A-Z / 0-9 checkboxes → immediate regeneration
- Changing individual symbol checkboxes → immediate regeneration
- Changing symbol max → immediate regeneration
- Generate button → regenerate with current settings
- On initial page load → auto-generate

### Symbols Bulk Toggle

- **symbols ON**: Checks all 33 symbol checkboxes and regenerates
- **symbols OFF**: Unchecks all 33 symbol checkboxes and regenerates
- **On individual symbol change**: If all symbols share the same state, the symbols checkbox syncs to that state

### Clipboard Copy

- Clicking a result `<li>` copies the text via `navigator.clipboard.writeText()`
- The clicked row's left border turns green (reverts after 1 second)
- A "Copied!" toast appears on the right side of the row (fades out in 0.8 seconds)

### Reset

- Clears URL query parameters (`window.history.replaceState`)
- Restores all settings to default values

---

## URL Parameter State Persistence

Settings are saved to URL query parameters via `history.replaceState` on every change. State is restored from parameters on page load.

### Parameters

| Key | Description | Example |
|-----|-------------|---------|
| `c` | count (number of strings) | `c=20` |
| `l` | length (string length) | `l=32` |
| `ch` | enabled character type tokens | `ch=aA0` |
| `sym` | enabled symbols | `sym=all` or `sym=!%23%24` |
| `sm` | symbol max % (omitted when default) | `sm=10` |

### `ch` Tokens

| Token | Character Type |
|-------|----------------|
| `a` | lowercase (a-z) |
| `A` | uppercase (A-Z) |
| `0` | digits (0-9) |

Examples: `ch=aA0` (all enabled), `ch=a` (lowercase only), `ch=A0` (uppercase + digits)

### `sym` Values

| Value | Meaning |
|-------|---------|
| omitted | All symbols OFF |
| `all` | All 33 symbols ON |
| concatenated characters | Only specified symbols ON (e.g. `sym=!@#`) |

### Defaults (when no URL parameters)

- count: `12`
- length: `16`
- ch: `aA0` (a-z: ON, A-Z: ON, 0-9: ON)
- sym: omitted (all symbols OFF)
- sm: `20`
