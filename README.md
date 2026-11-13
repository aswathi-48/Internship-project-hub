# Internship Project Hub

React (Vite) website built from "Internship Project Checklist & Timeline Plan".

Sections: Overview, Timeline (1-month / 4-month), Ideas bank (search + level filter),
Standard checklist (progress bar), Approval form (printable), Evaluation (marks calculator),
Student tracking sheet (CSV download). Ticks and entries are saved in the browser.

## Run
    npm install
    npm run dev        # open the printed local URL

## Build for hosting
    npm run build      # output in dist/ (upload to Netlify, Vercel, GitHub Pages)

Netlify uses `netlify.toml` to run the build and publish `dist/`.

Edit text, dates and ideas in `src/data.js`.
