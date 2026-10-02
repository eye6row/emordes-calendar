/* EMORDES CALENDAR — event data.
   Add an event by copying one object below.
   Fields: id, title, start (YYYY-MM-DD), end (optional, inclusive), time (optional "HH:MM"),
   category: "travel" | "work" | "studio" | "personal", location, notes, links [{label,url}],
   checklist [strings], draft (true = suggested / not booked), trip (optional link). */
window.EMORDES_EVENTS = [
  { id: "cannes-fest", title: "Festival de Cannes 80th", start: "2027-05-11", end: "2027-05-22", category: "travel",
    location: "Palais des Festivals, Cannes", notes: "Official 80th edition dates. Film lineup announced April 2027.",
    links: [{label:"festival-cannes.com",url:"https://www.festival-cannes.com/en/"},{label:"FAQ",url:"https://www.festival-cannes.com/en/faq/"}], trip: "cannes.html" },
  { id: "cannes-trip", title: "CANNES TRIP (DRAFT)", start: "2027-05-14", end: "2027-05-19", category: "travel", draft: true, featured: true,
    location: "SFO → Nice (NCE) → Cannes", notes: "Suggested plan: 5 nights during the first festival weekend. Nothing booked yet.",
    links: [{label:"Trip page",url:"cannes.html"},{label:"Cannes Ticket",url:"https://www.cannesticket.com/en/"}],
    checklist: ["Flights booked","Stay booked","Cannes Cinéphiles applied","Passport valid 3+ mo past return","ETIAS status checked","Black tie look ready","Travel insurance","Euros / card"], trip: "cannes.html" },
  { id: "cannes-stay", title: "Book Cannes stay", start: "2026-12-15", category: "travel", draft: true,
    notes: "Deadline (suggested). Prices spike. Consider Antibes, Nice or Juan-les-Pins Airbnb.", trip: "cannes.html" },
  { id: "cannes-flights", title: "Book SFO–NCE flights", start: "2027-01-15", category: "travel", draft: true,
    notes: "Deadline (suggested). Target $900–1400 round trip.", trip: "cannes.html" },
  { id: "cannes-cine", title: "Apply Cannes Cinéphiles", start: "2027-02-01", category: "travel", draft: true,
    notes: "Free accreditation for film lovers. Application opens ~early 2027; check the official site.",
    links: [{label:"FAQ",url:"https://www.festival-cannes.com/en/faq/"}], trip: "cannes.html" },
  { id: "cannes-passport", title: "Passport + ETIAS check", start: "2027-03-01", category: "travel", draft: true,
    notes: "Passport valid 3+ months past May 19, 2027. Check ETIAS (EU travel authorization) status.", trip: "cannes.html" },
  { id: "court-trial", title: "Traffic court trial", start: "2027-02-01", time: "08:30", category: "personal",
    location: "San Mateo Superior Court, 1050 Mission Rd, South San Francisco", notes: "Case 26-TRS-030721. Room not listed, check in early. Balance shown $1,101 (online payment blocked while set for trial).",
    links: [{label:"Case lookup",url:"https://odyportal-ext.sanmateocourt.org/portal-external"}] },
  { id: "songkran", title: "Songkran (Thai New Year)", start: "2027-04-13", end: "2027-04-15", category: "personal",
    location: "Thailand (Bangkok Silom, Chiang Mai)", notes: "Fun stuff: nationwide water festival. Celebrations often run longer in Chiang Mai. Trip not booked.",
    links: [{label:"Tourism Thailand",url:"https://www.tourismthailand.org/"}] },
  { id: "cannes-lineup", title: "Cannes lineup announced", start: "2027-04-15", category: "travel", draft: true,
    notes: "Official selection announced in April 2027 (exact date TBA)." }
];
