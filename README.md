# Second River Games website

Static website for **Second River Games**. No build step: GitHub Pages serves this
branch as-is. Edit HTML/CSS, commit, push.

- Canonical domain: `https://second-river-games.com`
- Redirect domain: `https://secondrivergames.com`
- Legacy announcement site: `https://mindfulcloudgames.com`

GitHub Pages uses the canonical domain from `CNAME`. DNS and the permanent redirect
for `secondrivergames.com` are configured outside this repository. The legacy domain
will host its own rebrand announcement page and will not redirect.

## Pages

| URL | File |
| --- | --- |
| `/` | `index.html` |
| `/studio/` | `studio/index.html` |
| `/village-of-whispers/` | `village-of-whispers/index.html` |
| any 404 | `404.html` (GitHub Pages serves this automatically) |
| `/Projects.html` | legacy redirect to `/` |

Asset paths are root-relative (`/assets/...`), which is correct because the site is
served from the apex domain via `CNAME`. If `CNAME` is ever removed, the
`bulutk.github.io/<repo>/` URL would break every path.

## Design source

The design reference for the current look is the "Cinematic / Immersive · Pure
Confluence" concept. It is **not in this repository**: the handoff folders are
gitignored, because GitHub Pages publishes every file on the branch. They live in
Dropbox, shared with Bulut. `design-reference-cinematic.html` in that folder is a
static mockup, not production code.

Two conflicts in the cinematic reference were resolved as follows, and the rule is
worth reusing. Where the reference HTML and its README disagree on a **value** (size,
colour, weight, spacing), the reference wins: it is what was reviewed and approved, so
the three inline `font-size` overrides in the Home intro are deliberate. Where they
disagree on a **mechanism that cannot survive a viewport change**, design intent wins:
the reference carried a literal `width: 631px; height: 178px` on a body paragraph,
which is a visual-editor artifact of the fixed 1360px artboard, and it is dropped in
favour of the `max-width: 640px` that sits beside it. The `A STUDIO IN CAMBRIDGE, UK`
kicker the README describes was removed by the client on purpose and is not in the build.

### Deliberate departures from the reference

These are client decisions, not oversights. Anyone diffing the build against the
mockup will hit them, so they are recorded here rather than rediscovered:

- **Duygu Cakmak's bio** ends differently from the reference's approved wording. The
  client dictated the current text directly. Do not "restore" it.
- **The closing line** "That is all we will say for now…" is set at body size (16px)
  on both Studio and Village, where the reference has 19px and 26px. Requested by the
  client. The Village line's weight (300 → 400) and line-height (1.5 → 1.75) moved
  with it.
- **The email signup form** is gone from Home and Village. GitHub Pages cannot accept
  a POST; both blocks show the studio email as the filled CTA instead.
- **Discord** is gone from every footer.
- **The footer** is stripped on every page to the statutory fine print alone.

Brand rules live in the handoff `README.md` and are binding:
five exact colours, no yellow anywhere, Spectral / IBM Plex Sans / IBM Plex Mono,
no em-dashes in visible copy, and the confluence mark is never recoloured, rotated,
or given more or fewer than two ripples.

## Layout of this repo

Everything the current site needs is either in `assets/site/` or in the short list
of legacy images below. **`assets/site/` is the new site.**

```
assets/site/css/site.css     hand-written stylesheet, all pages
assets/site/css/fonts.css    generated @font-face rules (see below)
assets/site/js/site.js       mobile nav toggle
assets/site/js/reveal.js     one-shot scroll reveal on section entry
assets/site/fonts/           self-hosted woff2, latin + latin-ext subsets
assets/site/img/             confluence marks, founder portraits
```

### Legacy assets still in use

Everything else under `assets/` is left over from the old Mobirise site and is
**unused**, with these exceptions, which the current pages do reference:

- `assets/images/website-bcg3-2.{avif,webp,jpeg}` — hero on all three pages, and the OG/Twitter share image
- `assets/images/website-bcg3-2-tablet.{avif,webp,jpeg}` — hero, tablet
- `assets/images/website-bcg3-2-mobile.{avif,webp,jpeg}` — hero, mobile
- `assets/images/website-bcg3-6-2000x1500.{avif,webp,jpeg}` — image bands, Home + Studio

Also unused by the site: `app.yaml` and `main.py` (Google App Engine, from a previous
host) and `.htaccess.txt` (Apache). They do nothing on GitHub Pages. Left in place
deliberately; delete when you have confirmed nothing else depends on them.

## Fonts

Self-hosted rather than loaded from the Google Fonts CDN: it removes two third-party
connections from every page load, and visitor IP addresses are not sent to Google.

`assets/site/css/fonts.css` is generated. To change weights, edit the family list in
the URL below, re-run, and update the `<link rel="preload">` tags in each page.

```bash
curl -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 \
  (KHTML, like Gecko) Chrome/120.0 Safari/537.36" \
  "https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,300;0,400;0,500;1,300;1,400&family=IBM+Plex+Sans:ital,wght@0,400;1,500&family=IBM+Plex+Mono:wght@400;500&display=swap" \
  -o /tmp/gf.css
```

Then download each `latin` and `latin-ext` woff2 into `assets/site/fonts/` and rewrite
the `src:` URLs to `/assets/site/fonts/<name>.woff2`. Spectral and IBM Plex are both
Open Font License.

## Images

New images follow the rules in `.cursor/rules/webpagerules.mdc`: AVIF, then WebP, then
JPEG/PNG, in a `<picture>` element, sized to roughly 2x their rendered size.

Every use of the river photography carries
`filter: grayscale(0.05) hue-rotate(46deg) saturate(0.72)` (the `--river-filter` token).
This is not decorative: the source photos have yellow overlays, and the brand forbids
yellow. Do not drop the filter when adding a new river image.

## Running locally

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Use a server rather than opening the files
directly, because all paths are root-relative.

## Outstanding

- **Share image still carries the yellow annotations.** `og:image` and
  `twitter:image` on all three pages point at `assets/images/website-bcg3-2.jpeg`,
  the raw photo. On the page the `--river-filter` neutralises its yellow
  computer-vision overlays, but a CSS filter never reaches a social scraper, so link
  previews break the no-yellow brand rule. Being fixed separately: a corrected
  source photo is coming from Bulut. When it lands, replace the image and update the
  now-inaccurate `og:image:alt` ("The confluence of two rivers at dusk.") and the
  `og:image:width`/`height` to match.
- **Discord was removed from the site.** The design puts a Discord icon and label
  in every footer; it is no longer there. If it comes back, note that the handoff's
  `discord-icon-512.png` is mislabelled: it contains the Second River confluence
  mark, not the Discord logo. Putting it back needs a real Discord mark in
  `assets/site/img/` and the invite URL.
- **Unused code kept on purpose.** The whole `.footer__*` layout block (`__zones`,
  `__brand`, `__lockup`, `__place`, `__nav`, `__contact`, `__email`, `__social`),
  `.visually-hidden`, and `confluence-bone.svg` / `confluence-ink.svg` are shipped
  but unreferenced, because the footer was stripped late and nothing was committed
  yet. Delete once the stripped footer is confirmed final and there is a commit to
  recover from. `--bank` is *not* in this list: it is one of the five brand colours,
  documented as "available, sparingly".
- **Email signup.** The design has a signup form on Home and Village of Whispers.
  GitHub Pages cannot accept a POST, so the form was dropped and those blocks show
  the studio email as the filled CTA instead. Adding it back means picking a provider
  (Buttondown, MailerLite, Kit, Formspree) and posting to their endpoint.
- **Founder photographs are below the resolution this design needs.** The layout
  renders portraits at roughly 472x420 CSS pixels. `portrait-bulut` is 323x333 native
  (the largest copy that exists anywhere in the repo, despite the `bubuphoto-400x533`
  filename) and `portrait-duygu` is 500x500. Both are upscaled on a standard display
  and well short on a retina one. New photographs shot at 2x, roughly 950x850 or
  larger, would fix it. This is the one outstanding item that needs a camera, so it
  has the longest lead time.
