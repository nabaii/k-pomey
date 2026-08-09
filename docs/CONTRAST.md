# Colour contrast working

Specification §9 requires **WCAG AA (4.5:1)** for all body and label text, names
the three tokens to check, and instructs: *"Adjust the token, not the instance."*

This file is that adjustment, with the arithmetic, so a reviewer can verify it
rather than trust it. Ratios are computed with the WCAG 2.x relative-luminance
formula, `(L1 + 0.05) / (L2 + 0.05)`.

## Surfaces

| Token | Value | Relative luminance |
|---|---|---|
| `--sumi` (ink) | `#161A17` | 0.0097 |
| `--washi` (paper) | `#EDE9E0` | 0.8166 |
| `--washi-2` (paper deep) | `#E3DED2` | 0.7322 |

## The three tokens §9 asks us to verify

Each fails as text on one surface and passes on the other. **One token cannot
serve both**, so each gained a surface-scoped sibling rather than being changed
outright — changing `--koke` to pass on paper would have broken it on ink.

| Token | Value | On `--washi` | On `--sumi` | Verdict |
|---|---|---|---|---|
| `--koke` | `#878F7D` | **2.77:1** ✗ | 5.24:1 ✓ | ink only |
| `--kanmuri` | `#C0913C` | **2.36:1** ✗ | 6.16:1 ✓ | ink only |
| `--heat` (spec value `#C2410C`) | `#C2410C` | **4.27:1** ✗ | 3.40:1 ✗ | fails both |

### The siblings

| Token | Value | On `--washi` | On `--washi-2` | On `--sumi` | Use |
|---|---|---|---|---|---|
| `--koke-d` | `#58624F` | 5.29:1 ✓ | 4.78:1 ✓ | — | muted text on paper |
| `--kanmuri-d` | `#7F5C1D` | 5.02:1 ✓ | 4.53:1 ✓ | — | gold text on paper |
| `--heat` | `#AD3A0A` | 5.12:1 ✓ | — | — | the accent on paper |
| `--heat-i` | `#E2662C` | — | — | 5.17:1 ✓ | the accent on ink |

`--heat` is the only token whose **published value changed**: `#C2410C` measures
4.27:1 on paper, and it is used at 9.5–10.5px tracked capitals — the smallest
text on the site, where contrast matters most and where the large-text 3:1
allowance does not apply. `#AD3A0A` is the nearest value that clears 4.5:1.

`.heat` resolves to whichever is correct for the surface, so a component does
not have to know where it sits:

```css
.heat { color: var(--heat); }
.ink .heat { color: var(--heat-i); }
```

## Tokens that pass unchanged

| Pair | Ratio |
|---|---|
| `--sumi` on `--washi` | 14.5:1 ✓ |
| `--sumi-2` on `--washi` | 11.5:1 ✓ |
| `--washi` on `--sumi` | 14.5:1 ✓ |
| `--niwa` on `--washi` | 5.43:1 ✓ |
| `--niwa-2` on `--sumi` | 5.44:1 ✓ |

`--niwa` and `--niwa-2` also carry `:focus-visible`, so they clear the 3:1
non-text requirement on their respective surfaces with room to spare.

## Not text

`--draw`, `--line` and `--line-inv` are hairline drafting linework and rules.
They are decorative, carry no information, and are exempt from the text
requirement. They are deliberately faint — §3.1 asks that hairlines stay
hairlines.

## Verified

Lighthouse accessibility scores **100** on all six pages (mobile, simulated
throttling), with zero contrast findings.
