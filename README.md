# Eco Städ – webbplats

Statisk webbplats för Eco Städ, byggd med ren HTML, CSS och JavaScript
(inget ramverk, inga byggverktyg krävs).

## Filstruktur

```
├── index.html          Startsidan (alla sektioner: hero, om oss, tjänster, kontakt osv.)
├── css/
│   └── styles.css      All styling
├── js/
│   └── script.js       Mobilmeny, scroll-effekter, kontaktformulär
├── assets/
│   ├── logo.jpg                    Originallogotypen (oredigerad)
│   ├── icon-color.png              Ikonen (hus+löv), transparent bakgrund – används i headern
│   ├── icon-white.png              Vit version av ikonen – används i den mörkgröna footern
│   ├── logo-lockup-transparent.png Ikon + "Eco städ"-text, transparent bakgrund (extra, för t.ex. sociala medier)
│   ├── favicon.ico / favicon-16.png / favicon-32.png / apple-touch-icon.png / icon-512.png
└── README.md
```

> **Om logotypen:** i headern/footern används den urklippta ikonen
> (`icon-color.png` / `icon-white.png`) tillsammans med en riktig text-wordmark
> ("Eco städ") istället för den platta `logo.jpg`-filen. Det gör att texten
> alltid blir skarp i alla storlekar och att ikonen kan bytas till en vit
> variant på den mörkgröna footern (den ursprungliga filen har vit bakgrund
> och hade annars synts som en vit ruta där). Har du en officiell transparent
> logotyp senare går den enkelt in i stället – byt bara ut bildfilerna i
> `assets/` och referenserna i `index.html`.

## Kom igång lokalt

Inga beroenden behövs. Öppna bara `index.html` i webbläsaren, eller kör en
enkel lokal server (rekommenderas för att undvika CORS-varningar i vissa
webbläsare):

```bash
# Python
python3 -m http.server 8000

# eller Node
npx serve .
```

Besök sedan `http://localhost:8000`.

## Publicera på GitHub Pages

1. Pusha koden till huvudgrenen (`main`) i GitHub-repot.
2. Gå till repots **Settings → Pages**.
3. Under "Build and deployment", välj **Deploy from a branch**, gren `main`
   och mapp `/ (root)`.
4. Spara. Sidan publiceras inom någon minut på
   `https://<användarnamn>.github.io/<repo-namn>/`.

## Publicera på Netlify

1. Logga in på [netlify.com](https://www.netlify.com) och välj **Add new
   site → Import an existing project**.
2. Koppla GitHub-repot.
3. Build command: lämna tomt. Publish directory: `/` (roten).
4. Deploy. Netlify ger dig en URL direkt (kan senare kopplas till egen domän).

### Kontaktformuläret – hur inskick når er e-post

Formuläret skickar via [FormSubmit](https://formsubmit.co/) – en gratis
tjänst som vidarebefordrar formulärinskick till en e-postadress utan att ni
behöver ett konto, en server eller någon API-nyckel. Det fungerar likadant
på GitHub Pages, Netlify eller vilken statisk webbhotell som helst, eftersom
allt sker direkt från besökarens webbläsare till FormSubmit.

I `index.html` pekar formuläret redan mot:

```html
<form ... action="https://formsubmit.co/ecostadflytt@gmail.com">
```

**Viktigt – bekräfta e-postadressen första gången:** FormSubmit kräver att
mottagaradressen bekräftas innan vidarebefordran börjar fungera skarpt.
Så fort någon skickar det *allra första* meddelandet via formuläret (t.ex.
ett eget testmeddelande efter lansering) skickar FormSubmit ett mejl till
**ecostadflytt@gmail.com** med en bekräftelselänk – klicka på den länken en
gång, så levereras alla efterföljande formulärinskick dit automatiskt.
Innan den bekräftelsen är gjord kommer inskick inte fram.

Om ni någon gång vill ändra mottagaradress: uppdatera `action`-attributet i
`index.html` (kontaktformuläret) till den nya adressen – FormSubmit kräver
då en ny bekräftelse för den adressen.

## Innehåll att fylla i själv

Telefon, e-post, adress, Facebook och Instagram är redan ifyllda med era
riktiga uppgifter. LinkedIn-ikonen är borttagen tills vidare eftersom ingen
länk fanns – lägg gärna till den i footern (`index.html`, `.social-links`)
om ni skapar ett företagskonto där, med samma uppmärkning som Facebook/
Instagram-länkarna.

Följande är fortfarande placeholder-innehåll – sök efter `<!-- TODO -->` i
`index.html` för att hitta det:

- **Öppettider** – kontaktsektionen (just nu "Mån–Fre 07:00–18:00").

## Anpassa färger och typsnitt

Alla varumärkesfärger och typsnitt är samlade som CSS-variabler högst upp i
`css/styles.css`:

```css
:root {
  --green: #2E7D4F;        /* primärgrön, från loggan */
  --green-deep: #1B6E4A;   /* djupgrön, header/footer/mörka ytor */
  --gold: #D4A72C;         /* guld/senap, CTA-knappar och highlights */
  --charcoal: #3A4550;     /* brödtext och rubriker */
  --slate: #6B7686;        /* sekundär text/ikoner */
}
```

## Tillgänglighet

- Semantisk HTML (`header`, `main`, `section`, `footer`, `nav`).
- Alla formulärfält har kopplade `<label>`.
- Tangentbordsfokus är synligt (guldfärgad outline) och det finns en
  "hoppa till innehåll"-länk längst upp på sidan.
- Färgkontraster är valda för att uppfylla WCAG AA för brödtext.
- `prefers-reduced-motion` respekteras för animationer.

## Nästa steg (frivilligt)

- Byt ut illustrationerna/ikonerna mot riktiga foton om ni vill ge sidan en
  mer personlig känsla (t.ex. bilder från era uppdrag).
- Lägg till ett kartutsnitt i kontaktsektionen när adressen är klar.
- Koppla en riktig domän (t.ex. `ecostad.se`) via GitHub Pages- eller
  Netlify-inställningarna.
