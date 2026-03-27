"use client";
import { useState, useEffect, useRef } from "react";

const COUNTRIES = [
  {
    id: "turkey", name: "Turkey", flag: "🇹🇷", region: "Asia", year: "2012", badge: "First Stamp",
    color: "#e63946",
    vibe: "My very first passport stamp — though at one year old, Istanbul lives in family photos rather than actual memory. I've grown up hearing about it: the cats, the bazaars, the minarets, Bodrum's impossibly blue water. Whether I remember it or not, it was the right city to start with. First stamp at age one still counts.",
    highlights: ["Istanbul", "Bodrum", "Beach days", "Cat colonies"],
    photo: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80",
    photoCaption: "Istanbul, Turkey",
    photos: ["/Turkey-photo-1.JPG", "/Turkey-photo-2.JPG", "/Turkey-photo-3.JPG"],
    // lat/lon for globe projection
    lat: 39, lon: 35,
  },
  {
    id: "uae", name: "UAE", flag: "🇦🇪", region: "Asia", year: "2013", badge: "Desert Gold",
    color: "#f4a261",
    vibe: "Dubai at two years old means this one lives in family photos rather than memory — but the photos are great. There's a whole album of me apparently swimming with dolphins at Atlantis, which sounds unhinged for a toddler, but the evidence is undeniable. Dubai's scale is the kind of thing you can barely process as an adult, let alone at two. Allegedly I had a brilliant time.",
    highlights: ["Dubai", "Atlantis", "Dolphins", "City sightseeing"],
    photo: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    photoCaption: "Dubai, UAE",
    photos: ["/UAE-photo-1.JPG", "/UAE-photo-2.JPG", "/UAE-photo-3.JPG"],
    lat: 25, lon: 55,
  },
  {
    id: "singapore", name: "Singapore", flag: "🇸🇬", region: "Asia", year: "2013, 2017, 2022", badge: "Triple Entry",
    color: "#2a9d8f",
    vibe: "Three separate visits and the city still finds ways to surprise me. The Night Safari is different every time — the darkness, the animal sounds, the completely different world that opens up after sunset. Singapore feels like proof that a city can be efficient and beautiful and green all at once. Every time I leave, I'm already thinking about when I'll be back.",
    highlights: ["Zoo & Night Safari", "Universal Studios", "Ferrari experience", "Family reunions"],
    photo: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
    photoCaption: "Marina Bay, Singapore",
    photoGroups: [
      { year: "2013", photos: ["/Singapore-photo-5-2013.JPG", "/Singapore-photo-6-2013.JPG"] },
      { year: "2017", photos: ["/Singapore-photo-1-2017.JPG", "/Singapore-photo-2-2017.JPG", "/Singapore-photo-3-2017.JPG"] },
      { year: "2022", photos: ["/Singapore-photo-4-2022.jpeg"] },
    ],
    lat: 1, lon: 104,
  },
  {
    id: "uk", name: "United Kingdom", flag: "🇬🇧", region: "Europe", year: "2014", badge: "West End Debut",
    color: "#1a6fff",
    vibe: "London's energy hits you before you can even explain what a city is — there's a pulse to it you feel immediately. Watching Matilda on the West End at age three was my first real theatrical experience, and something about the storytelling landed even then. We walked everywhere — through parks, markets, and side streets that felt centuries old. It planted a seed that made me want to come back the moment we left.",
    highlights: ["London", "Matilda musical", "City sightseeing"],
    photo: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=800&q=80",
    photoCaption: "London, UK",
    photos: ["/UK-photo-1.JPG", "/UK-photo-2.JPG", "/UK-photo-3.JPG"],
    lat: 51, lon: -1,
  },
  {
    id: "czech", name: "Czech Republic", flag: "🇨🇿", region: "Europe", year: "2014", badge: "Old World",
    color: "#6d597a",
    vibe: "Prague looks like it was drawn rather than built — the cobblestones, the towers, the whole city in a palette that feels too perfect to be real. Touring the Old Town in a vintage car at age three is one of my earliest actual travel memories. A wooden puppet from a craftsman's stall came home with us and is still somewhere in the house. Prague Zoo is also genuinely world-class, which nobody tells you beforehand.",
    highlights: ["Prague Old Town", "Vintage car tour", "Horse carriage", "Prague Zoo"],
    photo: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&q=80",
    photoCaption: "Prague, Czech Republic",
    photos: ["/Czech-photo-1.JPG", "/Czech-photo-2.JPG", "/Czech-photo-3.JPG"],
    lat: 50, lon: 15,
  },
  {
    id: "switzerland", name: "Switzerland", flag: "🇨🇭", region: "Europe", year: "2015, 2024", badge: "Alpine Rush",
    color: "#e9c46a",
    vibe: "First snow — Grindelwald, 2015 — a four-year-old from Mumbai completely speechless at the Alps for the first time. Nine years later I came back to ski in Zermatt, with the Matterhorn watching over the slopes like it had been waiting. The Olympic Museum in Lausanne was an unexpected highlight — it made Olympic sport feel deeply personal in a way I didn't expect. Switzerland gets better every time you understand it a little more.",
    highlights: ["Grindelwald", "Interlaken", "Zermatt skiing", "Olympic Museum"],
    photo: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    photoCaption: "Swiss Alps",
    photoGroups: [
      { year: "2015", photos: ["/Switzerland-photo-3-2015.JPG", "/Switzerland-photo-4-2015.JPG"] },
      { year: "2024", photos: ["/Switzerland-photo-1-2024.JPG", "/Switzerland-photo-2-2024.JPG"] },
    ],
    lat: 47, lon: 8,
  },
  {
    id: "germany", name: "Germany", flag: "🇩🇪", region: "Europe", year: "2015", badge: "Engineering Nation",
    color: "#457b9d",
    vibe: "Viktualienmarkt in Munich had fresh cheese so good that even a four-year-old refused to eat anything else. The BMW Museum is a genuine temple to engineering — the kind of place where you walk out wanting to build something. Neuschwanstein by horse carriage through the forest was so cinematic it felt staged. Munich, Black Forest, Berlin — Germany operates at full volume across every dimension, and I loved every bit of it.",
    highlights: ["Munich", "Neuschwanstein Castle", "Black Forest", "Berlin"],
    photo: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80",
    photoCaption: "Neuschwanstein, Germany",
    photoGroups: [
      { year: "2015", photos: ["/Germany-photo-1.JPG", "/Germany-photo-2.JPG", "/Germany-photo-3.JPG"] },
    ],
    lat: 51, lon: 10,
  },
  {
    id: "hongkong", name: "Hong Kong", flag: "🇭🇰", region: "Asia", year: "2016", badge: "Skyline City",
    color: "#e76f51",
    vibe: "Disney Hong Kong was everything a five-year-old could hope for, but what surprised me more was how much I loved the city itself — the density, the layers, the contrast between old and new at every turn. The skyline across Victoria Harbour is one of the great views on the planet. Family reunions here have their own warmth: good food, loud tables, everyone talking at once. It's a city that gets under your skin.",
    highlights: ["Disney Hong Kong", "Family reunion", "City exploration"],
    photo: "https://images.unsplash.com/photo-1536599424071-0b215a388ba7?w=800&q=80",
    photoCaption: "Hong Kong",
    photoGroups: [
      { year: "2016", photos: ["/Honkkong-photo-1.JPG", "/Honkkong-photo-2.JPG", "/Honkkong-photo-3.JPG"] },
    ],
    lat: 22, lon: 114,
  },
  {
    id: "thailand", name: "Thailand", flag: "🇹🇭", region: "Asia", year: "2016, 2019, 2022", badge: "Golden Temples",
    color: "#e9c46a",
    vibe: "Three separate trips to Thailand across six years. First visit in 2016, then back in 2019, and again in 2022 for my aunt's 30th in Phuket and Bangkok. Thailand has a way of pulling you back — the temples, the chaos, the street food, the warmth of the people. Every visit hits different.",
    highlights: ["Phuket", "Bangkok", "Temples", "Street food", "Aunt's 30th"],
    photo: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80",
    photoCaption: "Bangkok, Thailand",
    photoGroups: [
      { year: "2016", photos: ["/Thailand-photo-2-2016.JPG", "/Thailand-photo-5-2016.JPG"] },
      { year: "2019", photos: ["/Thailand-photo-1-2019.JPG", "/Thailand-photo-4-2019.JPG"] },
      { year: "2022", photos: ["/Thailand-photo-3-2022.JPG", "/Thailand-photo-6-2022.JPG"] },
    ],
    lat: 15, lon: 101,
  },
  {
    id: "spain", name: "Spain", flag: "🇪🇸", region: "Europe", year: "2017", badge: "Iberian Sweep",
    color: "#f4a261",
    vibe: "Five cities in one trip — Madrid, Barcelona, Marbella, Granada, Palma — which is either ambitious or borderline unhinged for a six-year-old. The Sagrada Família stopped me mid-step; I had no idea architecture could feel like that. Puerto Banús in Marbella is its own world entirely — superyachts, designer stores, open-air cafés, pure spectacle. The Alhambra in Granada was the quieter highlight: intricate, ancient, and worth every step up the hill.",
    highlights: ["Madrid", "Barcelona", "Marbella", "Granada Alhambra", "Palma"],
    photo: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80",
    photoCaption: "Barcelona, Spain",
    photoGroups: [
      { year: "2017", photos: ["/Spain-photo-1.JPG", "/Spain-photo-2.JPG", "/Spain-photo-3.JPG"] },
    ],
    lat: 40, lon: -4,
  },
  {
    id: "bhutan", name: "Bhutan", flag: "🇧🇹", region: "Asia", year: "2017", badge: "Himalayan Trek",
    color: "#2a9d8f",
    vibe: "Bhutan doesn't let just anyone in — you apply, pay, and earn the entry — and you feel that weight the moment you land. The trek to Tiger's Nest at six years old was steep, relentless, and properly hard. But standing in front of that monastery perched on the cliff, looking out over the valley — it's one of the most awe-inspiring moments I've had anywhere. Some places are worth making difficult.",
    highlights: ["Tiger's Nest trek", "Thimphu", "Paro", "Punakha"],
    photo: "https://images.pexels.com/photos/3408353/pexels-photo-3408353.jpeg?w=800&auto=compress",
    photoCaption: "Tiger's Nest, Bhutan",
    photoGroups: [
      { year: "2017", photos: ["/Bhutan-photo-1.jpg", "/Bhutan-photo-2.jpg", "/Bhutan-photo-3.jpg"] },
    ],
    lat: 27, lon: 90,
  },
  {
    id: "gibraltar", name: "Gibraltar", flag: "🇬🇮", region: "Europe", year: "2017", badge: "The Rock",
    color: "#6d597a",
    vibe: "A day trip that punches way above its weight. The Barbary macaques are completely fearless — one jumped on my shoulder at age six and tried to steal my bag, which is a memory that sticks. Climbing The Rock gives you a view of two continents at once: Europe behind you, Africa across the water. One of the most unique geographical spots on the planet.",
    highlights: ["The Rock", "Barbary macaques", "Mountain views"],
    photo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    photoCaption: "Gibraltar",
    photos: ["/Gibraltar-photo-1.JPG", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", "https://images.unsplash.com/photo-1597598494791-e4f7ba35c4c1?w=400&q=80"],
    lat: 36, lon: -5,
  },
  {
    id: "canada", name: "Canada", flag: "🇨🇦", region: "North America", year: "2018", badge: "Rocky Road",
    color: "#e63946",
    vibe: "The Rockies road trip — Banff, Lake Louise, Jasper, Whistler — was the trip where I understood what wilderness actually means. Lake Louise was so perfectly blue it looked painted; I spent a long time just standing at the edge of it. Jasper was quieter and wilder, with elk wandering through town like they owned the place. Vancouver before the mountains was its own reward: Stanley Park, the harbour, mountains on the horizon from every angle.",
    highlights: ["Vancouver", "Banff", "Lake Louise", "Jasper", "Whistler"],
    photo: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&q=80",
    photoCaption: "Banff, Canada",
    photos: ["/Canada-photo-1.JPG", "/Canada-photo-2.JPG", "/Canada-photo-3.JPG"],
    lat: 56, lon: -106,
  },
  {
    id: "usa", name: "USA", flag: "🇺🇸", region: "North America", year: "2018, 2022", badge: "Coast to Coast",
    color: "#1a6fff",
    vibe: "Two very different trips — first a family adventure through Seattle, Orlando, and New York; then a university visit tour at age eleven that felt genuinely significant. Standing in Harvard Yard for the first time, I began to understand what a university at that scale actually feels like. NYC operates at a frequency unlike any other city — it hits you immediately and doesn't let up. Pike Place Market in Seattle at 6am, watching the fish throwers warm up, is a specific memory I'll keep for a long time.",
    highlights: ["NYC", "Boston / Harvard", "Orlando", "Seattle"],
    photo: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=800&q=80",
    photoCaption: "New York City, USA",
    lat: 38, lon: -97,
  },
  {
    id: "maldives", name: "Maldives", flag: "🇲🇻", region: "Asia", year: "May 2018, 2021", badge: "Ocean Paradise",
    color: "#06b6d4",
    vibe: "Two separate trips to paradise. In May 2018, stayed at the Jumeirah Vittaveli — the kids club was incredible and the water villa was unlike anything I'd ever seen. Would jump into the sea every single day and fed stingrays right from the shore. Back again in 2021 with family — snorkelling, the ocean, and total disconnection from the world. The Maldives resets you in a way nowhere else can.",
    highlights: ["Jumeirah Vittaveli", "Water villa", "Fed stingrays", "Kids club", "Snorkelling", "Family trip 2021"],
    photo: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    photoCaption: "Maldives",
    photoGroups: [
      { year: "2018", photos: ["/Maldives-photo-1-2018.JPG", "/Maldives-photo-4-2018.JPG"] },
      { year: "2021", photos: ["/Maldives-photo-2-2021.JPG", "/Maldives-photo-3-2021.JPG"] },
    ],
    lat: 3, lon: 73,
  },
  {
    id: "france", name: "France", flag: "🇫🇷", region: "Europe", year: "2019 (×2)", badge: "Lavender & Lights",
    color: "#457b9d",
    vibe: "Two trips in one year showed me France has at least two completely distinct personalities. The summer trip through Provence — Gordes lavender fields, Pont du Gard, Cassis by boat — was slow and golden and warm in every sense. Paris at Christmas was the opposite: all lights and crowds and vin chaud and the Eiffel Tower doing its every-hour sparkle. Both versions of France are completely worth it.",
    highlights: ["Aix-en-Provence", "Pont du Gard", "Avignon", "Cassis", "Paris Christmas"],
    photo: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&q=80",
    photoCaption: "Paris, France",
    photoGroups: [
      { year: "2019", photos: ["/France-photo-1.JPG", "/France-photo-2.JPG", "/France-photo-3.JPG"] },
    ],
    lat: 46, lon: 2,
  },
  {
    id: "portugal", name: "Portugal", flag: "🇵🇹", region: "Europe", year: "2019", badge: "Atlantic Edge",
    color: "#e9c46a",
    vibe: "Standing on the cliff at Nazaré watching the world's biggest waves was humbling in a physical way — the scale is hard to communicate to someone who hasn't been. Porto's Livraria Lello is the most beautiful bookshop I've ever been in; I bought a book just to have something to carry out. Lisbon's trams, Sintra's palaces, Óbidos' medieval walls — Portugal packs an extraordinary amount into a small country. Probably the most underrated destination in Western Europe.",
    highlights: ["Lisbon", "Nazaré waves", "Óbidos", "Sintra", "Porto"],
    photo: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80",
    photoCaption: "Lisbon, Portugal",
    photoGroups: [
      { year: "2019", photos: ["/Portugal-photo-1.JPG", "/Portugal-photo-2.JPG", "/Portugal-photo-3.JPG"] },
    ],
    lat: 39, lon: -8,
  },
  {
    id: "denmark", name: "Denmark", flag: "🇩🇰", region: "Europe", year: "2019", badge: "Hygge Life",
    color: "#2a9d8f",
    vibe: "Copenhagen is effortlessly cool in a way very few cities actually pull off — nothing feels forced or performed. Tivoli at night is something from another era: warm lights, old rides, people just enjoying being somewhere together. The food was better than expected, the cycling was everywhere, and the city felt genuinely liveable in a way that made me think about what cities could be. I'd go back without a second thought.",
    highlights: ["Copenhagen", "Tivoli Gardens"],
    photo: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=800&q=80",
    photoCaption: "Copenhagen, Denmark",
    photoGroups: [
      { year: "2019", photos: ["/Denmark-photo-1.JPG", "/Denmark-photo-2.JPG", "/Denmark-photo-3.JPG"] },
    ],
    lat: 56, lon: 10,
  },
  {
    id: "belgium", name: "Belgium", flag: "🇧🇪", region: "Europe", year: "2019, 2025", badge: "Medieval Charm",
    color: "#f4a261",
    vibe: "Bruges in 2019 was pure medieval Europe — horse-drawn carriages, canals, chocolate shops on every corner, a pace that felt deliberately slow. Brussels MUN was the kind of experience where you make friends you actually keep. And somewhere along the way I had the best waffles and fries of my life, which sounds like a cliché until you're actually there.",
    highlights: ["Bruges", "Brussels MUN", "Ghent", "Dinant"],
    photo: "https://images.unsplash.com/photo-1559113202-c916b8e44373?w=800&q=80",
    photoCaption: "Bruges, Belgium",
    photoGroups: [
      { year: "2019", photos: ["/Belgium-photo-2-2019.JPG", "/Belgium-photo-3-2019.JPG", "/Belgium-photo-4-2019.JPG"] },
      { year: "2025", photos: ["/Belgium-photo-1-2025.JPG", "/Belgium-photo-5-2025.JPG", "/Belgium-photo-6-2025.JPG"] },
    ],
    lat: 50, lon: 4,
  },
  {
    id: "netherlands", name: "Netherlands", flag: "🇳🇱", region: "Europe", year: "2019, 2025", badge: "Canal City",
    color: "#e07b39",
    vibe: "Amsterdam with friends in 2019 — the kind of trip that writes itself. The canals, the bikes everywhere, the chaos of the city that somehow still feels relaxed. We wandered through Jordaan, ate at every place that looked good, and just let the city happen. Back in 2025, stayed in Delft with day trips to The Hague, boating through the canals of Giethoorn, and exploring the university town of Leiden. The Dutch countryside is flat, green, and impossibly peaceful.",
    highlights: ["Amsterdam", "Jordaan", "Canal walks", "Delft", "The Hague", "Giethoorn", "Leiden"],
    photo: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80",
    photoCaption: "Amsterdam, Netherlands",
    photoGroups: [
      { year: "2019", photos: ["/Netherlands-photo-3-2019.JPG", "/Netherlands-photo-4-2019.JPG", "/Netherlands-photo-5-2019.JPG"] },
      { year: "2025", photos: ["/Netherlands-photo-1-2025.JPG", "/Netherlands-photo-2-2025.JPG", "/Netherlands-photo-6-2025.JPG"] },
    ],
    lat: 52, lon: 5,
  },
  {
    id: "austria", name: "Austria", flag: "🇦🇹", region: "Europe", year: "2022, 2023", badge: "Alpine Base",
    color: "#6d597a",
    vibe: "Christmas at the family home in Payerbach felt like the ideal European winter — snow, mulled wine, the smell of pine, every cliché landing exactly right. Then ski season in Kitzbühel for Dad's 50th birthday — one of those rare trips where the occasion matches the setting perfectly. Innsbruck surprised me: compact, walkable, and ringed by mountains that feel impossibly close to the city. Austria makes the Alps feel personal rather than just spectacular.",
    highlights: ["Payerbach", "Kirchberg skiing", "Kitzbühel", "Innsbruck"],
    photo: "https://images.unsplash.com/photo-1609856878074-cf31e21ccb6b?w=800&q=80",
    photoCaption: "Austrian Alps",
    photoGroups: [
      { year: "2022", photos: ["/Austria-photo-2-2022.JPG", "/Austria-photo-3-2022.JPG", "/Austria-photo-5-2022.JPG"] },
      { year: "2023", photos: ["/Austria-photo-1-2023.JPG", "/Austria-photo-4-2023.JPG"] },
    ],
    lat: 47, lon: 14,
  },
  {
    id: "croatia", name: "Croatia", flag: "🇭🇷", region: "Europe", year: "2023", badge: "Game of Thrones",
    color: "#2a9d8f",
    vibe: "Dubrovnik's Game of Thrones tour reframed the whole city — suddenly every staircase and fortress wall had a scene attached to it. Cliff jumping in Hvar from a private speedboat was the kind of afternoon that only exists in summer, only in the Adriatic. Plitvice Lakes is the most beautiful natural sight I've ever seen — cascading turquoise pools through ancient forest, like the planet showing off. Croatia has a quiet confidence to its beauty that I completely didn't expect.",
    highlights: ["Dubrovnik GoT tour", "Hvar cliff jumping", "Blue Caves", "Plitvice Lakes"],
    photo: "https://images.pexels.com/photos/1223649/pexels-photo-1223649.jpeg?w=800&auto=compress",
    photoCaption: "Dubrovnik, Croatia",
    photos: ["/Croatia-photo-1.jpg", "/Croatia-photo-2.jpg", "/Croatia-photo-3.jpg"],
    lat: 45, lon: 16,
  },
  {
    id: "slovenia", name: "Slovenia", flag: "🇸🇮", region: "Europe", year: "2023", badge: "Cave Explorer",
    color: "#6d597a",
    vibe: "Postojna Caves was like descending into a completely different world — vast chambers, stalactites that took millennia to form, and a little train that takes you deep into the karst. Lake Bled is almost absurdly picturesque: a castle on a cliff, an island in the middle of a lake, the Julian Alps as a backdrop. Slovenia is tiny but it feels layered, like it's been hiding something excellent. It was the quiet surprise of the trip.",
    highlights: ["Postojna Caves", "Lake Bled", "Ljubljana", "Julian Alps"],
    photo: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80",
    photoCaption: "Lake Bled, Slovenia",
    photos: ["/Slovenia-photo-1.JPG", "/Slovenia-photo-2.JPG", "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?w=400&q=80"],
    lat: 46, lon: 15,
  },
  {
    id: "italy", name: "Italy", flag: "🇮🇹", region: "Europe", year: "2024, 2025", badge: "La Dolce Vita",
    color: "#e63946",
    vibe: "Milan's Galleria Vittorio Emanuele II set the tone — beautiful, grand, and I immediately understood why Italians call it il salotto di Milano, the city's drawing room. Rome in 2025 was overwhelming in the best way: the layers of history compressed into every street corner. Venice I explored with CISV friends, which made it feel human rather than just scenic — watching glass being blown in Murano by hand was genuinely mesmerising. Italy rewards every return.",
    highlights: ["Milan", "Rome", "Venice", "Murano glass blowing"],
    photo: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80",
    photoCaption: "Rome, Italy",
    photoGroups: [
      { year: "2024", photos: ["/Italy-photo-1-2024.JPG", "/Italy-photo-2-2024.JPG"] },
      { year: "2025", photos: ["/Italy-photo-3-2025.JPG", "/Italy-photo-4-2025.JPG", "/Italy-photo-5-2025.JPG", "/Italy-photo-6-2025.JPG"] },
    ],
    lat: 42, lon: 12,
  },
  {
    id: "greece", name: "Greece", flag: "🇬🇷", region: "Europe", year: "2024", badge: "Island Hopper",
    color: "#1a6fff",
    vibe: "Athens hit me with more history per square metre than I knew how to process — the Acropolis is one thing, but it's the layers underneath that stay with you. Meteora is something else entirely: Byzantine monasteries balanced on top of sheer rock pillars, as if someone decided the most dramatic location possible was the only acceptable one. Island hopping through Santorini, Mykonos, and Paros gave each island room to be itself — every one completely different from the last. Greece is relentlessly, almost exhaustingly beautiful.",
    highlights: ["Athens", "Meteora", "Santorini", "Mykonos", "Paros"],
    photo: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80",
    photoCaption: "Santorini, Greece",
    photos: ["/Greece-photo-1.JPG", "/Greece-photo-2.JPG", "/Greece-photo-3.JPG"],
    lat: 38, lon: 24,
  },
  {
    id: "vatican", name: "Vatican City", flag: "🇻🇦", region: "Europe", year: "2025", badge: "Jubilee Year",
    color: "#c0a060",
    vibe: "Visiting the Sistine Chapel and St. Peter's Basilica during the Jubilee Year 2025 gave the whole experience a different weight — pilgrims everywhere, the Vatican more charged than usual, the art carrying a significance that went beyond the aesthetic. One of the most historically significant years to visit, and you could feel it.",
    highlights: ["Sistine Chapel", "St. Peter's Basilica", "Jubilee Year 2025"],
    photo: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=80",
    photoCaption: "St. Peter's Square, Vatican City",
    photos: ["/vatican-photo-1.JPG", "https://images.unsplash.com/photo-1555993539-1732b0258235?w=400&q=80", "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=400&q=80"],
    lat: 41.9, lon: 12.45,
  },
  {
    id: "kenya", name: "Kenya", flag: "🇰🇪", region: "Africa", year: "2025", badge: "Safari Soul",
    color: "#f4a261",
    vibe: "The Masai Mara recalibrates you — there's a scale and wildness to it that makes every other landscape feel slightly smaller afterward. We spotted a leopard in a tree at close range, completely still, watching us watch it — a moment I replayed for weeks. The red earth, the acacia trees, the enormous open sky, the sounds at night — Africa gets into you in a way nothing fully prepares you for. Nothing else feels quite as real after.",
    highlights: ["Nairobi", "Masai Mara safari", "Leopard sighting"],
    photo: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=80",
    photoCaption: "Masai Mara, Kenya",
    photos: ["/Kenya-photo-1.JPG", "/Kenya-photo-2.JPG", "/Kenya-photo-3.JPG"],
    lat: -1, lon: 37,
  },
  {
    id: "vietnam", name: "Vietnam", flag: "🇻🇳", region: "Asia", year: "2025", badge: "Family Celebration",
    color: "#e76f51",
    vibe: "Grandfather's 70th birthday brought the whole family to Da Nang, turning a trip into a proper occasion — the kind of memory that layers itself over the place. Hoi An at night, lit by hundreds of paper lanterns reflected in the Thu Bon river, is as beautiful as anywhere I've been. Vietnamese food hits completely differently when you're actually there: the freshness, the specificity, the way every region has its own version of everything. Vietnam reminded me why family travel is the best kind.",
    highlights: ["Da Nang", "Hoi An", "Family celebration", "Local food"],
    photo: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
    photoCaption: "Hoi An, Vietnam",
    photos: ["/Vietnam-photo-1.JPG", "/Vietnam-photo-2.JPG", "/Vietnam-photo-3.JPG"],
    lat: 16, lon: 108,
  },
  {
    id: "srilanka", name: "Sri Lanka", flag: "🇱🇰", region: "Asia", year: "2025", badge: "Wild South",
    color: "#2a9d8f",
    vibe: "Learning to surf in Weligama was humbling and addictive in equal measure — the Indian Ocean doesn't care how many times you fall, but getting up feels extraordinary every single time. Galle Fort's Dutch colonial walls and streets were a complete surprise — layered history in a town that still feels fully alive. Yala National Park delivered another leopard sighting, which at this point I'm starting to take personally. Sri Lanka is criminally underrated: extraordinary food, stunning landscapes, warm people, and none of the crowds.",
    highlights: ["Weligama surfing", "Galle", "Yala leopard safari", "Colombo"],
    photo: "https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?w=800&auto=compress",
    photoCaption: "Sri Lanka",
    photos: ["/SriLanka-photo-1.jpg", "/SriLanka-photo-2.jpg", "/SriLanka-photo-3.jpg"],
    lat: 8, lon: 81,
  },
];

const REGIONS = ["All", "Europe", "Asia", "North America", "Africa"];
const REGION_COLORS: Record<string, string> = {
  Europe: "#1a6fff", Asia: "#2a9d8f", "North America": "#e63946",
  Africa: "#e9c46a",
};

// Globe dimensions
const CX = 200, CY = 200, R = 170;

function projectPin(lat: number, lon: number, rotY: number) {
  const phi = (90 - lat) * Math.PI / 180;
  const theta = (lon + rotY) * Math.PI / 180;
  const x = R * Math.sin(phi) * Math.sin(theta);
  const y = -R * Math.cos(phi);
  const z = R * Math.sin(phi) * Math.cos(theta);
  const visible = z > -20; // slightly past horizon for smooth fade
  const px = CX + x;
  const py = CY + y;
  const depth = (z + R) / (2 * R); // 0=back, 1=front
  return { px, py, visible, depth, z };
}

export default function PassportPage() {
  const [selected, setSelected] = useState<typeof COUNTRIES[0] | null>(null);
  const [filter, setFilter] = useState("All");
  const [easterEgg, setEasterEgg] = useState(false);
  const [rotY, setRotY] = useState(0);
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  // Easter egg states
  const [globeClicks, setGlobeClicks] = useState(0);
  const [showExplorerEgg, setShowExplorerEgg] = useState(false);
  const [showWanderlust, setShowWanderlust] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState<{ id: number; color: string; left: number; delay: number; duration: number; rotation: number }[]>([]);
  const [passportClicks, setPassportClicks] = useState(0);
  const [showClassified, setShowClassified] = useState(false);
  const [globeTapCount, setGlobeTapCount] = useState(0);
  const [showKonami, setShowKonami] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const animRef = useRef<number | undefined>(undefined);
  const lastTime = useRef<number>(0);
  const isDragging = useRef(false);
  const dragStart = useRef(0);
  const rotStart = useRef(0);
  const autoSpin = useRef(true);
  const titlePressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const globeTapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerWanderlust = () => {
    setShowWanderlust(true);
    const pieces = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      color: ["#e9c46a","#1a6fff","#e63946","#2a9d8f","#f4a261","#ffffff"][Math.floor(Math.random() * 6)],
      left: Math.random() * 100,
      delay: Math.random() * 1.5,
      duration: 2.5 + Math.random() * 1.5,
      rotation: Math.random() * 720 - 360,
    }));
    setConfettiPieces(pieces);
    setTimeout(() => { setShowWanderlust(false); setConfettiPieces([]); }, 4000);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setLightboxSrc(null); setShowExplorerEgg(false); setShowWanderlust(false); setShowKonami(false); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const animate = (time: number) => {
      if (autoSpin.current && !isDragging.current) {
        if (lastTime.current) {
          const delta = time - lastTime.current;
          setRotY(r => r + delta * 0.018);
        }
        lastTime.current = time;
      } else {
        lastTime.current = time;
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  const filtered = filter === "All" ? COUNTRIES : COUNTRIES.filter(c => c.region === filter);

  // Sort pins by depth (back to front)
  const projectedPins = COUNTRIES.map(c => ({ ...projectPin(c.lat, c.lon, rotY), country: c }))
    .filter(p => p.visible)
    .sort((a, b) => a.z - b.z);

  return (
    <div style={{ minHeight: "100vh", background: "#060810", color: "#e8eaf0", fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #060810; }
        ::-webkit-scrollbar-thumb { background: #1a6fff33; border-radius: 4px; }

        .id-card {
          background: linear-gradient(135deg, #0b1220 0%, #091628 60%, #0b1117 100%);
          border: 1px solid #1a2a4a;
          border-radius: 28px;
          padding: 2.75rem;
          position: relative;
          overflow: hidden;
        }
        .id-card::before {
          content: '';
          position: absolute; inset: 0;
          background: repeating-linear-gradient(45deg, transparent, transparent 24px, rgba(26,111,255,0.016) 24px, rgba(26,111,255,0.016) 25px);
          pointer-events: none;
        }
        .id-card-glow {
          position: absolute; top: -30%; right: -10%;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(26,111,255,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .globe-container {
          position: relative;
          background: radial-gradient(ellipse at 45% 40%, #060e1f 0%, #030508 72%);
          border: 1px solid #0f1a2e;
          border-radius: 28px;
          padding: 3rem 2rem 2rem;
          overflow: visible;
        }
        .globe-svg-wrap {
          position: relative;
          width: 420px;
          height: 420px;
          margin: 0 auto;
          cursor: grab;
          user-select: none;
        }
        .globe-svg-wrap:active { cursor: grabbing; }
        .globe-svg { width: 100%; height: 100%; overflow: visible; }

        .flag-pin {
          position: absolute;
          transform: translate(-50%, -100%);
          pointer-events: all;
          cursor: pointer;
          transition: transform 0.15s ease;
          z-index: 10;
        }
        .flag-pin:hover { transform: translate(-50%, -108%) scale(1.15); }
        .flag-bubble {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50% 50% 50% 0;
          background: rgba(13,17,35,0.92);
          border: 1.5px solid rgba(26,111,255,0.5);
          font-size: 24px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.5), 0 0 0 1px rgba(26,111,255,0.2);
          backdrop-filter: blur(4px);
          line-height: 1;
          transform: rotate(-45deg);
        }
        .flag-emoji { transform: rotate(45deg); display: block; }
        .flag-stem {
          width: 1.5px;
          height: 8px;
          background: linear-gradient(to bottom, rgba(26,111,255,0.6), transparent);
          margin: 0 auto;
        }

        .pin-tooltip {
          position: absolute;
          bottom: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%);
          background: rgba(9,13,25,0.96);
          border: 1px solid #1a2a4a;
          border-radius: 10px;
          padding: 0.6rem 0.9rem;
          white-space: nowrap;
          font-size: 0.72rem;
          font-weight: 500;
          color: #e8eaf0;
          pointer-events: none;
          backdrop-filter: blur(8px);
          z-index: 20;
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
        }
        .pin-tooltip::after {
          content: '';
          position: absolute;
          top: 100%; left: 50%;
          transform: translateX(-50%);
          border: 5px solid transparent;
          border-top-color: rgba(9,13,25,0.96);
        }

        .stamp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
          gap: 1rem;
        }
        .stamp-card {
          background: #0c1017;
          border: 1px solid #111825;
          border-radius: 18px;
          cursor: pointer;
          transition: all 0.28s cubic-bezier(0.4,0,0.2,1);
          overflow: hidden;
        }
        .stamp-card:hover {
          border-color: rgba(26,111,255,0.4);
          transform: translateY(-5px) scale(1.01);
          box-shadow: 0 20px 48px rgba(26,111,255,0.1), 0 0 0 1px rgba(26,111,255,0.1);
        }
        .stamp-img {
          width: 100%; height: 115px;
          object-fit: cover; display: block;
          filter: brightness(0.8) saturate(0.85);
          transition: filter 0.3s, transform 0.3s;
        }
        .stamp-card:hover .stamp-img { filter: brightness(1) saturate(1.1); transform: scale(1.04); }
        .stamp-img-wrap { overflow: hidden; position: relative; }
        .placeholder-img {
          width: 100%; height: 115px;
          background: linear-gradient(135deg, #111827 0%, #0c1017 100%);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 0.3rem; color: #2a3349;
          border-bottom: 1px dashed #1a2030;
          font-size: 0.65rem;
          font-family: 'DM Mono', monospace;
          letter-spacing: 0.05em;
        }
        .stamp-body { padding: 1rem; }
        .stamp-badge {
          display: inline-block;
          font-size: 0.6rem; font-weight: 600;
          letter-spacing: 0.09em; text-transform: uppercase;
          padding: 0.18rem 0.55rem; border-radius: 20px; margin-bottom: 0.6rem;
        }

        .filter-btn {
          padding: 0.42rem 1.05rem;
          border-radius: 30px; border: 1px solid #141a28;
          background: transparent; color: #4b5a72;
          font-size: 0.75rem; font-weight: 500;
          cursor: pointer; transition: all 0.2s;
          font-family: 'DM Sans', sans-serif; letter-spacing: 0.02em;
        }
        .filter-btn:hover { border-color: rgba(26,111,255,0.3); color: #e8eaf0; }
        .filter-btn.active { background: #1a6fff; border-color: #1a6fff; color: #fff; }

        .modal-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          width: 100%; height: 100%;
          background: rgba(0,0,0,0.85);
          z-index: 9999; display: flex;
          align-items: center; justify-content: center;
          padding: 1rem; backdrop-filter: blur(12px);
          overflow-y: auto; animation: fadeIn 0.2s ease;
        }
        .modal-box {
          position: relative; width: 100%; max-width: 600px;
          max-height: 85vh; overflow-y: auto; margin: auto;
          background: #0b1017; border: 1px solid #1a2340;
          border-radius: 20px;
          animation: slideUp 0.3s cubic-bezier(0.4,0,0.2,1);
          scrollbar-width: thin;
        }
        .modal-hero-wrap { position: relative; overflow: hidden; border-radius: 22px 22px 0 0; }
        .modal-hero { width: 100%; height: 240px; object-fit: cover; display: block; }
        .modal-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(11,16,23,0.9) 0%, transparent 60%);
        }
        .modal-hero-caption {
          position: absolute; bottom: 1rem; left: 1.5rem;
          font-size: 0.65rem; color: rgba(255,255,255,0.4);
          font-family: 'DM Mono', monospace; letter-spacing: 0.08em;
        }
        .modal-body { padding: 3rem; }

        .your-photo-placeholder {
          width: 100%; height: 200px;
          background: #0b1017;
          border: 1.5px dashed #1a2340;
          border-radius: 14px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 0.5rem; text-align: center;
          margin-bottom: 1.5rem;
          transition: border-color 0.2s;
        }
        .your-photo-placeholder:hover { border-color: rgba(26,111,255,0.3); }

        .highlight-pill {
          display: inline-flex; align-items: center; gap: 0.4rem;
          background: #111825; border: 1px solid #181e30;
          border-radius: 8px; padding: 0.36rem 0.8rem;
          font-size: 0.85rem; color: #8896a8; line-height: 1.4;
        }
        .stat-pill {
          display: flex; flex-direction: column; align-items: center;
          padding: 1.25rem 1.5rem;
          background: #0c1017; border: 1px solid #111825;
          border-radius: 18px; flex: 1; min-width: 100px; gap: 0.2rem;
          transition: border-color 0.2s;
        }
        .stat-pill:hover { border-color: rgba(26,111,255,0.25); }
        .close-btn {
          position: absolute; top: 1.1rem; right: 1.1rem;
          width: 34px; height: 34px; border-radius: 10px;
          border: 1px solid #1a2340; background: rgba(11,16,23,0.85);
          color: #4b5a72; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem; transition: all 0.2s; z-index: 5;
        }
        .close-btn:hover { background: #111825; color: #e8eaf0; }
        .modal-label {
          font-size: 0.75rem; font-weight: 600; letter-spacing: 0.13em;
          text-transform: uppercase; color: #2a3349; margin-bottom: 0.75rem;
          font-family: 'DM Mono', monospace;
        }
        .section-label {
          font-size: 0.7rem; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: #1a6fff; margin-bottom: 0.75rem;
        }
        .nav-link { color: #5a6a82; text-decoration: none; font-size: 0.83rem; font-weight: 500; transition: color 0.2s; }
        .nav-link:hover { color: #e8eaf0; }
        .nav-link.cur { color: #e8eaf0; }
        .dob-click { cursor: pointer; border-bottom: 1px dashed #1a6fff44; transition: color 0.2s; display: inline; }
        .dob-click:hover { color: #1a6fff; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(24px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes floatIn { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pinPulse {
          0%, 100% { box-shadow: 0 4px 16px rgba(0,0,0,0.5), 0 0 0 0px rgba(26,111,255,0.4); }
          50% { box-shadow: 0 4px 16px rgba(0,0,0,0.5), 0 0 0 5px rgba(26,111,255,0); }
        }
        .flag-bubble { animation: pinPulse 2.5s ease-in-out infinite; }

        .easter-modal {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          width: 100%; height: 100%;
          background: rgba(0,0,0,0.85);
          z-index: 9999; display: flex;
          align-items: center; justify-content: center;
          padding: 1rem; backdrop-filter: blur(12px);
          overflow-y: auto; animation: fadeIn 0.3s ease;
        }

        .globe-drag-hint {
          position: absolute; bottom: 1.5rem; left: 50%;
          transform: translateX(-50%);
          font-size: 0.65rem; color: #1f2d42;
          font-family: 'DM Mono', monospace;
          letter-spacing: 0.08em; white-space: nowrap;
        }

        @keyframes confettiFall {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(var(--rot)); opacity: 0; }
        }
        .confetti-piece {
          position: fixed;
          top: -10px;
          width: 8px;
          height: 8px;
          border-radius: 2px;
          pointer-events: none;
          z-index: 9998;
          animation: confettiFall var(--dur) var(--delay) linear forwards;
        }
        @keyframes classifiedStamp {
          from { transform: rotate(-15deg) scale(1.5); opacity: 0; }
          to { transform: rotate(-15deg) scale(1); opacity: 1; }
        }
        .classified-stamp {
          position: absolute;
          top: 50%; left: 50%;
          transform: rotate(-15deg) scale(1);
          transform-origin: center;
          translate: -50% -50%;
          color: #cc0000;
          border: 4px solid #cc0000;
          padding: 0.4rem 1rem;
          font-family: 'DM Mono', monospace;
          font-size: 1.4rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          border-radius: 4px;
          pointer-events: none;
          animation: classifiedStamp 0.3s cubic-bezier(0.4,0,0.2,1) forwards;
          white-space: nowrap;
          text-shadow: 0 0 10px rgba(204,0,0,0.6);
          box-shadow: 0 0 16px rgba(204,0,0,0.4);
          z-index: 10;
        }
        @keyframes wanderlustFadeOut {
          0% { opacity: 1; transform: translateY(0); }
          70% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-12px); }
        }
        .wanderlust-toast {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: #0d1421;
          border: 1.5px solid #e9c46a;
          border-radius: 14px;
          padding: 0.85rem 2rem;
          font-weight: 700;
          font-size: 1rem;
          color: #e9c46a;
          z-index: 9999;
          pointer-events: none;
          animation: wanderlustFadeOut 4s ease forwards;
          white-space: nowrap;
          box-shadow: 0 8px 32px rgba(233,196,106,0.2);
        }

        /* MOBILE RESPONSIVENESS */
        @media (max-width: 768px) {
          .stamp-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .globe-container {
            max-width: 100% !important;
            transform: scale(0.85);
            transform-origin: top center;
          }
          .passport-id-grid {
            grid-template-columns: 1fr !important;
          }
          .stat-pills {
            flex-wrap: wrap !important;
          }
          .passport-hero-title {
            font-size: clamp(1.8rem, 8vw, 3rem) !important;
            white-space: normal !important;
          }
          .passport-hamburger {
            display: flex !important;
          }
          .modal-box {
            max-width: 100% !important;
            max-height: 90vh !important;
            border-radius: 16px !important;
          }
          .modal-body {
            padding: 1.25rem !important;
          }
          .easter-modal .easter-box {
            max-width: 100% !important;
            border-radius: 16px !important;
            padding: 1.25rem !important;
          }
          .flag-bubble {
            width: 32px !important;
            height: 32px !important;
            font-size: 18px !important;
          }
          .globe-svg-wrap {
            width: 100% !important;
            height: auto !important;
            max-width: 420px !important;
          }
        }
        @media (max-width: 480px) {
          .stamp-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.5rem !important;
          }
        }
        .passport-hamburger { display: flex; }
      `}</style>

      {/* NAV */}
      <nav style={{
        padding: "1.2rem 2.5rem", display: "flex", alignItems: "center",
        justifyContent: "space-between", borderBottom: "1px solid #0f1520",
        position: "sticky", top: 0, background: "rgba(6,8,16,0.92)",
        backdropFilter: "blur(14px)", zIndex: 100,
      }}>
        <a href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", fontWeight: 700, color: "#e8eaf0", letterSpacing: "0.02em" }}>SP</span>
        </a>
        <button
          className="passport-hamburger"
          onClick={() => setMobileMenuOpen(o => !o)}
          style={{ background: "none", border: "1px solid #1a2340", borderRadius: 8, color: "#e8eaf0", fontSize: "1rem", cursor: "pointer", alignItems: "center", justifyContent: "center", padding: "0.6rem 0.75rem" }}
          aria-label="Open menu"
        >☰</button>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      {mobileMenuOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(6,8,16,0.97)", zIndex: 200, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", paddingTop: "5rem", gap: "2rem", backdropFilter: "blur(16px)" }}>
          <button onClick={() => setMobileMenuOpen(false)} style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "none", border: "none", color: "#e8eaf0", fontSize: "1.8rem", cursor: "pointer" }}>✕</button>
          {[["Finance Lab", "/finance"], ["MUN Arena", "/mun"], ["Experience", "/experience"], ["The Passport", "/passport"], ["Connect", "/connect"]].map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: "none", fontSize: "1.4rem", fontWeight: 500, color: label === "The Passport" ? "#e8eaf0" : "#5a6a82", fontFamily: "'DM Sans', sans-serif" }}>{label}</a>
          ))}
        </div>
      )}

      <main style={{ maxWidth: 1120, margin: "0 auto", padding: "3.5rem 2rem 9rem" }}>

        {/* HERO */}
        <div style={{ marginBottom: "4.5rem", animation: "floatIn 0.8s ease forwards" }}>
          <div className="section-label">Global Citizen · 29 Countries · 4 Continents</div>
          <h1
            className="passport-hero-title"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3rem, 7vw, 6rem)",
              fontWeight: 700, lineHeight: 0.9, letterSpacing: "-0.01em",
              marginBottom: "1.75rem",
              cursor: "default",
              userSelect: "none",
              whiteSpace: "nowrap",
            }}
            onMouseDown={() => { titlePressTimer.current = setTimeout(() => triggerWanderlust(), 2000); }}
            onMouseUp={() => { if (titlePressTimer.current) { clearTimeout(titlePressTimer.current); titlePressTimer.current = null; } }}
            onMouseLeave={() => { if (titlePressTimer.current) { clearTimeout(titlePressTimer.current); titlePressTimer.current = null; } }}
            onTouchStart={() => { titlePressTimer.current = setTimeout(() => triggerWanderlust(), 2000); }}
            onTouchEnd={() => { if (titlePressTimer.current) { clearTimeout(titlePressTimer.current); titlePressTimer.current = null; } }}
          >
            <span style={{ color: "#c8ccd8" }}>The </span>
            <span style={{ fontStyle: "italic", background: "linear-gradient(125deg, #1a6fff 0%, #6fb3ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Passport</span>
          </h1>
          <p style={{ fontSize: "1.05rem", color: "#4b5a72", maxWidth: 440, lineHeight: 1.8, fontWeight: 300 }}>
            29 countries. 4 continents. A lifetime of global immersion.
          </p>
        </div>

        {/* PASSPORT ID CARD */}
        <div className="id-card" style={{ marginBottom: "3rem" }}>
          <div className="id-card-glow" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2.5rem", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
            <div style={{ flex: 1, minWidth: 260 }}>
              <div className="section-label" style={{ marginBottom: "1.75rem", position: "relative", display: "inline-block", cursor: "pointer" }}
                onClick={() => {
                  setPassportClicks(prev => {
                    const next = prev + 1;
                    if (next >= 3) {
                      setShowClassified(true);
                      // Play thud sound via Web Audio API
                      try {
                        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
                        const osc = ctx.createOscillator();
                        const gain = ctx.createGain();
                        osc.connect(gain);
                        gain.connect(ctx.destination);
                        osc.frequency.setValueAtTime(60, ctx.currentTime);
                        osc.type = "sine";
                        gain.gain.setValueAtTime(1, ctx.currentTime);
                        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
                        osc.start(ctx.currentTime);
                        osc.stop(ctx.currentTime + 0.15);
                      } catch {}
                      return 0;
                    }
                    return next;
                  });
                }}
              >
                Passport No. SP-2011-001
                {showClassified && <span className="classified-stamp">CLASSIFIED</span>}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem 2.5rem" }}>
                {[
                  ["HOLDER", "Shivaan Patwa"],
                  ["STATUS", "Global Citizen / Active Explorer"],
                  ["DATE OF BIRTH", <span key="dob" className="dob-click" onClick={() => setEasterEgg(true)} title="🔑">13/08/2011</span>],
                  ["FIRST STAMP", "Turkey (2012)"],
                  ["LATEST ENTRY", "Italy / Vatican (Dec 2025)"],
                  ["CONTINENTS", "4 of 7"],
                ].map(([label, val]) => (
                  <div key={label as string}>
                    <div style={{ fontSize: "0.6rem", letterSpacing: "0.13em", color: "#2a3349", fontWeight: 600, marginBottom: "0.35rem", fontFamily: "'DM Mono', monospace" }}>{label as string}</div>
                    <div style={{ fontSize: "0.87rem", fontWeight: 500, color: "#c8ccd8" }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div style={{ fontSize: "3rem" }}>🛂</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.52rem", color: "#141e30", lineHeight: 2.2, userSelect: "none", letterSpacing: "0.04em", textAlign: "right" }}>
                P&lt;INDPATWA&lt;&lt;SHIVAAN&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;<br />
                SP20110013&lt;6IND1308136M2812301&lt;&lt;&lt;&lt;&lt;2
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "4.5rem" }}>
          {[
            { val: "29", label: "Countries", icon: "🌍" },
            { val: "4", label: "Continents", icon: "🗺️" },
            { val: "13", label: "Years Exploring", icon: "✈️" },
            { val: "2012", label: "First Stamp", icon: "🔖" },
          ].map(s => (
            <div key={s.label} className="stat-pill">
              <div style={{ fontSize: "1.3rem" }}>{s.icon}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.25rem", fontWeight: 700, color: "#1a6fff", lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: "0.7rem", color: "#4b5a72", fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── GLOBE ── */}
        <div style={{ marginBottom: "5.5rem" }}>
          <div className="section-label">The Map</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 700, marginBottom: "2rem", fontStyle: "italic" }}>
            Every country, spinning live
          </h2>
          <div className="globe-container">
            <div style={{ maxWidth: "100%", overflowX: "hidden" }}>
            <div
              className="globe-svg-wrap"
              onMouseDown={e => {
                isDragging.current = true;
                autoSpin.current = false;
                dragStart.current = e.clientX;
                rotStart.current = rotY;
              }}
              onMouseMove={e => {
                if (!isDragging.current) return;
                const delta = e.clientX - dragStart.current;
                setRotY(rotStart.current + delta * 0.4);
              }}
              onMouseUp={() => { isDragging.current = false; setTimeout(() => { autoSpin.current = true; lastTime.current = 0; }, 1500); }}
              onMouseLeave={() => { if (isDragging.current) { isDragging.current = false; setTimeout(() => { autoSpin.current = true; lastTime.current = 0; }, 1500); } }}
            >
              {/* Atmosphere halo behind globe */}
              <div style={{
                position: "absolute",
                left: "50%", top: "50%",
                transform: "translate(-50%, -50%)",
                width: 420, height: 420,
                borderRadius: "50%",
                background: "radial-gradient(circle, transparent 38%, rgba(26,111,255,0.18) 68%, transparent 80%)",
                pointerEvents: "none",
                zIndex: 0,
              }} />
              <svg className="globe-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  if (!isDragging.current) {
                    // 5-click explorer egg
                    setGlobeClicks(prev => {
                      const next = prev + 1;
                      if (next >= 5) { setShowExplorerEgg(true); return 0; }
                      return next;
                    });
                    // Triple-tap konami (dream destinations)
                    setGlobeTapCount(prev => {
                      const next = prev + 1;
                      if (globeTapTimer.current) clearTimeout(globeTapTimer.current);
                      if (next >= 3) {
                        setShowKonami(true);
                        globeTapTimer.current = null;
                        return 0;
                      }
                      globeTapTimer.current = setTimeout(() => { setGlobeTapCount(0); }, 600);
                      return next;
                    });
                  }
                }}
                style={{ filter: "drop-shadow(0 0 18px rgba(26,111,255,0.45))", position: "relative", zIndex: 1 }}>
                <defs>
                  <radialGradient id="gGrad" cx="38%" cy="32%">
                    <stop offset="0%" stopColor="#0d1f3c" />
                    <stop offset="100%" stopColor="#060810" />
                  </radialGradient>
                  <radialGradient id="gShine" cx="32%" cy="28%">
                    <stop offset="0%" stopColor="rgba(26,111,255,0.14)" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                  <clipPath id="gClip"><circle cx={CX} cy={CY} r={R} /></clipPath>
                </defs>
                {/* Body */}
                <circle cx={CX} cy={CY} r={R} fill="url(#gGrad)" />
                <circle cx={CX} cy={CY} r={R} fill="url(#gShine)" />
                {/* Continent outlines */}
                <g clipPath="url(#gClip)">
                  {[
                    { id: "europe", points: [[35,-9],[36,28],[47,39],[55,27],[58,5],[51,-5],[44,-9],[35,-9]] as [number,number][] },
                    { id: "africa", points: [[37,-5],[37,36],[-34,18],[-34,26],[-26,33],[11,51],[12,43],[15,42],[11,44],[2,42],[-11,40],[-34,26],[-34,18],[-17,12],[0,10],[5,-8],[14,-17],[22,-17],[30,-17],[37,-5]] as [number,number][] },
                    { id: "namerica", points: [[70,-141],[83,-70],[60,-64],[25,-80],[20,-87],[9,-77],[8,-77],[15,-92],[20,-105],[30,-110],[32,-117],[48,-124],[60,-141],[70,-141]] as [number,number][] },
                    { id: "samerica", points: [[12,-72],[10,-63],[5,-52],[-5,-35],[-23,-43],[-34,-58],[-55,-68],[-55,-66],[-17,-70],[-4,-80],[1,-78],[12,-72]] as [number,number][] },
                    { id: "asia", points: [[10,100],[22,114],[35,140],[40,141],[52,142],[60,163],[68,170],[72,135],[73,80],[72,60],[55,50],[40,50],[38,27],[42,45],[55,60],[70,59],[73,80]] as [number,number][] },
                    { id: "australia", points: [[-15,130],[-13,136],[-16,146],[-24,154],[-38,146],[-38,140],[-35,116],[-22,114],[-15,130]] as [number,number][] },
                  ].map(continent => {
                    const projected = continent.points.map(([lat, lon]) => projectPin(lat, lon, rotY));
                    // Only draw if at least half of points are visible
                    const visibleCount = projected.filter(p => p.visible).length;
                    if (visibleCount < projected.length / 2) return null;
                    const pointsStr = projected.map(p => `${p.px},${p.py}`).join(" ");
                    return (
                      <polygon
                        key={continent.id}
                        points={pointsStr}
                        fill="rgba(26,111,255,0.15)"
                        stroke="rgba(26,111,255,0.3)"
                        strokeWidth="0.5"
                      />
                    );
                  })}
                </g>
                {/* Lat lines */}
                {[-60, -30, 0, 30, 60].map(lat => {
                  const phi = (90 - lat) * Math.PI / 180;
                  const ry2 = R * Math.sin(phi);
                  const cy2 = CY - R * Math.cos(phi);
                  return <ellipse key={lat} cx={CX} cy={cy2} rx={ry2} ry={ry2 * 0.22} fill="none" stroke="rgba(26,111,255,0.2)" strokeWidth="0.7" clipPath="url(#gClip)" />;
                })}
                {/* Lon lines */}
                {[0, 30, 60, 90, 120, 150].map(lon => {
                  const angle = ((lon + rotY) % 360) * Math.PI / 180;
                  if (Math.cos(angle) < 0) return null;
                  return <ellipse key={lon} cx={CX} cy={CY} rx={Math.abs(Math.sin(angle)) * R} ry={R} fill="none" stroke="rgba(26,111,255,0.2)" strokeWidth="0.6" clipPath="url(#gClip)" />;
                })}
                {/* Rim */}
                <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(26,111,255,0.25)" strokeWidth="1.2" />
                {/* Shine */}
                <ellipse cx={155} cy={148} rx={38} ry={22} fill="rgba(255,255,255,0.04)" transform="rotate(-28,155,148)" />
              </svg>

              {/* FLAG PINS — rendered as absolutely positioned over the SVG */}
              <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                {projectedPins.map(({ country, px, py, depth }) => {
                  // Convert SVG coords to percentage of 420px container
                  const left = (px / 400) * 100 + "%";
                  const top = (py / 400) * 100 + "%";
                  const opacity = Math.max(0.2, depth);
                  const scale = 0.7 + depth * 0.45;
                  return (
                    <div
                      key={country.id}
                      className="flag-pin"
                      style={{ left, top, opacity, transform: `translate(-50%, -100%) scale(${scale})`, pointerEvents: "all" }}
                      onClick={() => setSelected(country)}
                      onMouseEnter={() => setHoveredPin(country.id)}
                      onMouseLeave={() => setHoveredPin(null)}
                    >
                      {hoveredPin === country.id && (
                        <div className="pin-tooltip">
                          <span style={{ marginRight: "0.35rem" }}>{country.flag}</span>
                          {country.name}
                          <span style={{ marginLeft: "0.5rem", color: "#3a4a62", fontFamily: "'DM Mono', monospace" }}>{country.year}</span>
                        </div>
                      )}
                      <div className="flag-bubble">
                        <span className="flag-emoji">{country.flag}</span>
                      </div>
                      <div className="flag-stem" />
                    </div>
                  );
                })}
              </div>
            </div>
            </div>
            <div className="globe-drag-hint">drag to rotate · click a flag to explore</div>
          </div>
        </div>

        {/* FILTERS */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem", alignItems: "center" }}>
          <span style={{ fontSize: "0.7rem", color: "#2a3349", fontWeight: 500, marginRight: "0.4rem", fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em" }}>REGION</span>
          {REGIONS.map(r => (
            <button key={r} className={`filter-btn ${filter === r ? "active" : ""}`} onClick={() => setFilter(r)}>{r}</button>
          ))}
        </div>

        {/* STAMP GRID */}
        <div className="section-label" style={{ marginBottom: "1.5rem" }}>Entry Log — {filtered.length} Stamps</div>
        <div className="stamp-grid" style={{ marginBottom: "5rem" }}>
          {filtered.map(country => (
            <div key={country.id} className="stamp-card" onClick={() => setSelected(country)}>
              <div className="stamp-img-wrap">
                <img src={country.photo} alt={country.photoCaption} className="stamp-img"
                  onError={e => { const img = e.target as HTMLImageElement; if (!img.dataset.errored) { img.dataset.errored = "1"; img.src = "https://images.pexels.com/photos/1051073/pexels-photo-1051073.jpeg?w=800&auto=compress"; } else { img.parentElement!.innerHTML = `<div class="placeholder-img"><span style="font-size:1.4rem">📷</span><span>${country.name}</span></div>`; } }} />
              </div>
              <div className="stamp-body">
                <div className="stamp-badge" style={{ background: (REGION_COLORS[country.region] || "#1a6fff") + "20", color: REGION_COLORS[country.region] || "#1a6fff" }}>
                  {country.badge}
                </div>
                <div style={{ fontSize: "1.5rem", marginBottom: "0.3rem" }}>{country.flag}</div>
                <div style={{ fontWeight: 600, fontSize: "0.86rem", color: "#d0d4e0", marginBottom: "0.2rem" }}>{country.name}</div>
                <div style={{ fontSize: "0.66rem", color: "#2a3349", fontFamily: "'DM Mono', monospace" }}>{country.year}</div>
              </div>
            </div>
          ))}
        </div>

        {/* EASTER EGG HINT */}
        <div style={{ textAlign: "center", marginTop: "3rem", marginBottom: "2rem" }}>
          <div style={{
            display: "inline-block",
            opacity: 1,
            transform: "rotate(-2deg)",
            border: "2px solid #cc0000",
            borderRadius: "4px",
            padding: "0.6rem 1.4rem",
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.75rem",
            color: "#cc0000",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            lineHeight: 1.6,
            userSelect: "none",
          }}>
            CLASSIFIED // This passport contains hidden secrets. Explore carefully.
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <div style={{ color: "#6b7280", fontSize: "0.7rem", fontFamily: "monospace", marginBottom: "1.5rem", letterSpacing: "0.08em" }}>secrets hidden within...</div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "2rem", color: "#9ca3af", marginBottom: "2.5rem", lineHeight: 1.4 }}>
            "The world is big.<br />I'm just getting started."
          </p>
          <a href="/" style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            padding: "0.8rem 2rem", background: "transparent",
            border: "1px solid #6b7280", borderRadius: "12px",
            color: "#6b7280", textDecoration: "none",
            fontSize: "0.83rem", fontWeight: 500, transition: "all 0.2s",
          }}>← Back to Home</a>
        </div>
      </main>

      {/* COUNTRY MODAL */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelected(null)}>✕</button>
            <div className="modal-hero-wrap">
              <img src={selected.photo} alt={selected.photoCaption} className="modal-hero"
                onError={e => { const img = e.target as HTMLImageElement; if (!img.dataset.errored) { img.dataset.errored = "1"; img.src = "https://images.pexels.com/photos/1051073/pexels-photo-1051073.jpeg?w=800&auto=compress"; } else { img.style.display = "none"; } }} />
              <div className="modal-hero-overlay" />
              <div className="modal-hero-caption">{selected.photoCaption}</div>
            </div>
            <div className="modal-body">
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.75rem", gap: "1rem" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                    <div className="stamp-badge" style={{ background: (REGION_COLORS[selected.region] || "#1a6fff") + "20", color: REGION_COLORS[selected.region] || "#1a6fff", margin: 0 }}>{selected.badge}</div>
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: "0.35rem",
                      background: "rgba(26,111,255,0.1)", border: "1px solid rgba(26,111,255,0.25)",
                      borderRadius: "20px", padding: "0.22rem 0.7rem",
                      fontSize: "0.85rem", fontFamily: "'DM Mono', monospace",
                      color: "#1a6fff", fontWeight: 500, letterSpacing: "0.04em",
                    }}>
                      ✈ {selected.year}
                    </div>
                  </div>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.4rem", fontWeight: 700, color: "#e8eaf0", marginBottom: "0.35rem", lineHeight: 1.1 }}>
                    {selected.flag} {selected.name}
                  </h2>
                  <div style={{ fontSize: "0.78rem", fontFamily: "'DM Mono', monospace", color: "#3a4a62", letterSpacing: "0.05em" }}>{selected.region}</div>
                </div>
              </div>

              {/* PERSONAL PHOTOS */}
              {(selected as any).photoGroups ? (
                <div style={{ marginBottom: "1.5rem" }}>
                  {(selected as any).photoGroups.map((group: { year: string; photos: string[] }) => (
                    <div key={group.year} style={{ marginBottom: "1rem" }}>
                      <div style={{ fontSize: "0.72rem", fontFamily: "'DM Mono', monospace", color: "#3a4a62", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>{group.year}</div>
                      <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(group.photos.length, 3)}, 1fr)`, gap: "0.75rem" }}>
                        {group.photos.map((src: string, i: number) => (
                          <div key={i} style={{ borderRadius: "10px", overflow: "hidden", aspectRatio: "1", background: "#0f1520", cursor: "pointer" }}>
                            <img src={src} alt={`${selected.name} ${group.year} photo ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onClick={() => setLightboxSrc(src)} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (selected as any).photos ? (
                <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min((selected as any).photos.length, 3)}, 1fr)`, gap: "0.75rem", marginBottom: "1.5rem" }}>
                  {(selected as any).photos.map((src: string, i: number) => (
                    <div key={i} style={{ borderRadius: "10px", overflow: "hidden", aspectRatio: "1", background: "#0f1520", cursor: "pointer" }}>
                      <img src={src} alt={`${selected.name} photo ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onClick={() => setLightboxSrc(src)} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="your-photo-placeholder">
                  <span style={{ fontSize: "2rem" }}>📷</span>
                  <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#2a3349", fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em" }}>YOUR PHOTO</span>
                  <span style={{ fontSize: "0.7rem", color: "#1a2233" }}>Add your personal photo from {selected.name} here</span>
                </div>
              )}

              <div style={{ background: "#0f1520", borderRadius: "14px", padding: "1.5rem 1.75rem", marginBottom: "1.5rem", borderLeft: `3px solid ${REGION_COLORS[selected.region] || "#1a6fff"}` }}>
                <div className="modal-label">VIBE CHECK</div>
                <p style={{ fontSize: "1rem", color: "#c0c8d8", lineHeight: 2.0 }}>{selected.vibe}</p>
              </div>

              <div>
                <div className="modal-label">HIGHLIGHTS</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {selected.highlights.map(h => (
                    <span key={h} className="highlight-pill">
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: REGION_COLORS[selected.region] || "#1a6fff", display: "inline-block", flexShrink: 0 }} />
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LIGHTBOX */}
      {lightboxSrc && (
        <div
          onClick={() => setLightboxSrc(null)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.92)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => setLightboxSrc(null)}
            style={{
              position: "absolute", top: "1.25rem", right: "1.5rem",
              background: "rgba(11,16,23,0.85)", border: "1px solid #1a2340",
              borderRadius: "10px", color: "#e8eaf0",
              width: 38, height: 38, fontSize: "1.1rem",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 10000,
            }}
          >×</button>
          <img
            src={lightboxSrc}
            alt="Enlarged photo"
            onClick={e => e.stopPropagation()}
            onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              objectFit: "contain",
              borderRadius: "8px",
            }}
          />
        </div>
      )}

      {/* CONFETTI */}
      {confettiPieces.map(p => (
        <div key={p.id} className="confetti-piece" style={{
          background: p.color,
          left: `${p.left}%`,
          "--dur": `${p.duration}s`,
          "--delay": `${p.delay}s`,
          "--rot": `${p.rotation}deg`,
        } as React.CSSProperties} />
      ))}

      {/* WANDERLUST TOAST */}
      {showWanderlust && (
        <div className="wanderlust-toast">True Wanderer Unlocked 🏅</div>
      )}

      {/* EXPLORER EGG MODAL (globe 5 clicks) */}
      {showExplorerEgg && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.85)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", backdropFilter: "blur(12px)", overflowY: "auto", animation: "fadeIn 0.25s ease" }}
          onClick={() => setShowExplorerEgg(false)}>
          <div style={{ background: "#0a0f1a", border: "1px solid #1a6fff33", borderRadius: 20, padding: "2rem", maxWidth: 420, width: "100%", position: "relative", margin: "auto", overflowY: "auto", maxHeight: "85vh", textAlign: "center", animation: "slideUp 0.3s cubic-bezier(0.4,0,0.2,1)" }}
            onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🌍</div>
            <h3 style={{ fontWeight: 700, color: "#fff", fontSize: "1.3rem", marginBottom: "1rem" }}>You found the explorer mode 🌍</h3>
            <p style={{ color: "#8899aa", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "1.75rem" }}>Most people see the world through a screen. Shivaan sees it through a boarding pass.</p>
            <button onClick={() => setShowExplorerEgg(false)} style={{ padding: "0.7rem 2rem", background: "#1a6fff", border: "none", borderRadius: 10, color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: "0.88rem", fontFamily: "'DM Sans', sans-serif" }}>Close</button>
          </div>
        </div>
      )}

      {/* KONAMI MODAL */}
      {showKonami && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.85)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", backdropFilter: "blur(12px)", overflowY: "auto", animation: "fadeIn 0.25s ease" }}
          onClick={() => setShowKonami(false)}>
          <div style={{ background: "#0a0f1a", border: "1px solid rgba(26,111,255,0.2)", borderRadius: 20, padding: "2rem", maxWidth: 480, width: "100%", position: "relative", margin: "auto", overflowY: "auto", maxHeight: "85vh", animation: "slideUp 0.3s cubic-bezier(0.4,0,0.2,1)" }}
            onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowKonami(false)} style={{ position: "absolute", top: "1rem", right: "1rem", width: 32, height: 32, borderRadius: 8, border: "1px solid #1a2340", background: "rgba(11,16,23,0.85)", color: "#4b5a72", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>✕</button>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem", textAlign: "center" }}>🗺️</div>
            <h3 style={{ fontWeight: 700, color: "#fff", fontSize: "1.3rem", marginBottom: "0.4rem", textAlign: "center" }}>Dream Destinations 🗺️</h3>
            <p style={{ color: "#8899aa", fontSize: "0.85rem", textAlign: "center", marginBottom: "1.5rem" }}>Places still on the list...</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {[
                { flag: "🇯🇵", name: "Japan", reason: "Cherry blossoms and ancient temples" },
                { flag: "🇧🇷", name: "Brazil", reason: "Amazon, carnival, and the world's most joyful culture" },
                { flag: "🇳🇿", name: "New Zealand", reason: "Lord of the Rings landscapes and the end of the earth" },
                { flag: "🇲🇦", name: "Morocco", reason: "Sahara dunes, medinas, and a world completely unlike any other" },
              ].map(dest => (
                <div key={dest.name} style={{ display: "flex", gap: "1rem", alignItems: "center", background: "#0d1421", border: "1px solid rgba(26,111,255,0.12)", borderRadius: 12, padding: "0.9rem 1.1rem" }}>
                  <span style={{ fontSize: "1.8rem", flexShrink: 0 }}>{dest.flag}</span>
                  <div>
                    <div style={{ fontWeight: 600, color: "#e8eaf0", fontSize: "0.9rem", marginBottom: "0.2rem" }}>{dest.name}</div>
                    <div style={{ color: "#8899aa", fontSize: "0.78rem", lineHeight: 1.5 }}>{dest.reason}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* EASTER EGG */}
      {easterEgg && (
        <div className="easter-modal" onClick={() => setEasterEgg(false)}>
          <div className="easter-box" style={{
            background: "#0b1017", border: "1px solid #1a2a4a",
            borderRadius: "20px", padding: "2.5rem", width: "100%", maxWidth: 480,
            position: "relative", margin: "auto", overflowY: "auto", maxHeight: "85vh",
            textAlign: "center", animation: "slideUp 0.4s cubic-bezier(0.4,0,0.2,1)",
          }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🗝️</div>
            <div className="section-label" style={{ textAlign: "center", marginBottom: "0.75rem" }}>Hidden Map Unlocked</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "1.9rem", fontWeight: 700, marginBottom: "1.75rem", color: "#e8eaf0" }}>
              My Top 3 Places on Earth
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", textAlign: "left", marginBottom: "2rem" }}>
              {[
                { rank: "01", name: "Kenya", why: "The Masai Mara safari changed how I see the world. Seeing a leopard up close in the wild is something I'll never forget.", flag: "🇰🇪" },
                { rank: "02", name: "Italy", why: "Rome, Venice, Milan — Italy has everything. The culture, the food, the history. Meeting CISV friends in Venice made it even more special.", flag: "🇮🇹" },
                { rank: "03", name: "Sri Lanka", why: "Criminally underrated. First surf in Weligama, leopard safari in Yala, and the most laid-back beautiful energy of anywhere I've been.", flag: "🇱🇰" },
              ].map(item => (
                <div key={item.rank} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", background: "#0f1520", borderRadius: "14px", padding: "1.1rem" }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "1.1rem", fontWeight: 500, color: "#1a6fff", lineHeight: 1, flexShrink: 0, paddingTop: "0.1rem" }}>{item.rank}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "#e8eaf0", marginBottom: "0.3rem" }}>{item.flag} {item.name}</div>
                    <div style={{ fontSize: "0.78rem", color: "#4b5a72", lineHeight: 1.65 }}>{item.why}</div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setEasterEgg(false)} style={{
              padding: "0.8rem 2.25rem", background: "#1a6fff", border: "none",
              borderRadius: "12px", color: "#fff", fontWeight: 600,
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem",
            }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
