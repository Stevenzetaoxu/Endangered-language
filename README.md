# nDrapa Language Archive

A digital archive website for endangered language data collected by linguists. Built for GitHub Pages — no build tools required.

## Pages

| Page | Description |
|------|-------------|
| **Home** (`index.html`) | Language overview, map of speaker region, photo gallery, key statistics |
| **Data** (`data.html`) | Three-section data browser: Vocabulary (with audio playback), Grammar (Leipzig glossed sentences), Stories (oral narratives) |
| **Resources** (`resources.html`) | Academic references, cultural resources, community links |
| **Team** (`team.html`) | Research team members with roles and bios |
| **Contact** (`contact.html`) | Contact form and institutional information |

## Features

- **Audio playback** — Click any word or sentence to hear it spoken. Visual feedback with pulsing button animations and a playback notification toast.
- **Searchable vocabulary** — Filter words by IPA transcription, script, or English translation.
- **Tabbed data browser** — Switch between vocabulary, grammar, and stories views.
- **Scroll animations** — Sections fade in as you scroll.
- **Mobile responsive** — Adaptive layout for phones, tablets, and desktops.

## Deploy to GitHub Pages

1. **Create a GitHub repository** at [github.com/new](https://github.com/new)

2. **Push the files to your repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: nDrapa Language Archive"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Branch", select `main` and save (root directory)
   - Your site will be live at `https://YOUR-USERNAME.github.io/YOUR-REPO`

That's it. All pages link to each other with relative URLs, so they work immediately.

## Customization

- **Replace the language**: The sample data uses nDrapa (Zhaba), a Tibeto-Burman language of Sichuan. Edit the text in each `.html` file to adapt it for a different endangered language.
- **Add real audio**: Place `.mp3` or `.wav` files in an `audio/` folder and update the `vocab-audio-btn` click handlers in `js/main.js` to play real files instead of simulating playback.
- **Add a real map**: Replace the `.map-fallback` div in `index.html` with an embedded Leaflet or Google Maps iframe.
- **Add actual photos**: Replace the `.gallery-placeholder` divs with `<img>` tags pointing to real images.

## File Structure

```
├── index.html        # Home page
├── data.html         # Language data (vocabulary, grammar, stories)
├── resources.html    # Cultural and academic resources
├── team.html         # Team member profiles
├── contact.html      # Contact form and information
├── css/
│   └── style.css     # Complete design system
├── js/
│   └── main.js       # Interactions, audio, animations
└── README.md         # This file
```

## Design System

- **Typography**: Playfair Display (headings) + DM Sans (body)
- **Colors**: Warm earth tones — terracotta, sage, gold, deep brown
- **Aesthetic**: Scholarly archival meets organic warmth. Aged-paper textures, subtle gradients, and generous whitespace.

## License

All original code in this repository is available under the MIT License. Language data and recordings belong to their respective speakers and communities; contact the archive team for usage inquiries.
