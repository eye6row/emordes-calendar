# EMORDES CALENDAR
Static personal calendar (black / white / red #D64541, Oswald + mono).

- `index.html` month grid + list view, event side panel, add-in-browser (localStorage), export .ics
- `cannes.html` CANNES 2027 trip page (countdown, draft itinerary, checklist, budget calculator)
- `events.js` **edit this to add events.** Copy an object: `id, title, start, end?, time?, category (travel|work|studio|personal), location, notes, links[{label,url}], checklist[], draft?, trip?`

Deploy: `vercel deploy --prod --token $VERCEL_TOKEN`
