-- ============================================
-- Velora Journeys — Seed Data
-- Run AFTER migration.sql in Supabase SQL Editor
-- ============================================

INSERT INTO packages (id, title, price, location, days, image_url, tag, description, itinerary) VALUES
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Royal Ceylon Odyssey',
  2500.00,
  'Sri Lanka',
  10,
  'https://images.unsplash.com/photo-1586523731060-2d1d57c40652?w=1200&q=80',
  'Heritage',
  'Embark on a majestic journey through the ancient heart of Sri Lanka.',
  '[
    {"day":1,"title":"Arrival in Colombo","description":"Welcome to the Pearl of the Indian Ocean.","highlights":["Airport VIP transfer","Galle Face Hotel check-in","Welcome dinner"]},
    {"day":2,"title":"Colombo City Discovery","description":"Explore the vibrant capital with a private guide.","highlights":["Private city tour","Gangaramaya Temple","Fine dining"]},
    {"day":3,"title":"Journey to Sigiriya","description":"Visit Dambulla Cave Temple en route.","highlights":["Dambulla Cave Temple","Scenic drive","Eco-resort check-in"]},
    {"day":4,"title":"Sigiriya Rock Fortress","description":"Early morning climb of the legendary Lion Rock.","highlights":["Sigiriya sunrise climb","Ancient frescoes","Royal gardens"]},
    {"day":5,"title":"Minneriya & Polonnaruwa","description":"Safari and ancient city exploration.","highlights":["Elephant safari","Polonnaruwa ruins","Buddhist sculptures"]},
    {"day":6,"title":"Sacred Kandy","description":"Visit Temple of the Sacred Tooth Relic.","highlights":["Temple of the Tooth","Kandyan dance show","Lakeside hotel"]},
    {"day":7,"title":"Tea Country Experience","description":"Journey through lush tea plantations.","highlights":["Tea plantation tour","Factory visit","Tea tasting"]},
    {"day":8,"title":"Train to Ella","description":"Board the iconic blue train.","highlights":["Iconic train journey","Nine Arches Bridge","Mountain charm"]},
    {"day":9,"title":"Ella Adventures","description":"Hike to Little Adam Peak.","highlights":["Little Adam Peak trek","Ravana Falls","Cooking class"]},
    {"day":10,"title":"Farewell Departure","description":"Private transfer to airport.","highlights":["Leisurely breakfast","Airport transfer","Farewell gift"]}
  ]'::jsonb
),
(
  'b2c3d4e5-f6a7-8901-bcde-f12345678901',
  'Azure Atoll Escape',
  4200.00,
  'Maldives',
  5,
  'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80',
  'Luxury',
  'Surrender to the unparalleled luxury of the Maldivian atolls.',
  '[
    {"day":1,"title":"Seaplane to Paradise","description":"Scenic seaplane to your private atoll resort.","highlights":["Seaplane transfer","Overwater villa","Champagne welcome"]},
    {"day":2,"title":"Ocean Discovery","description":"Guided snorkeling and dolphin cruise.","highlights":["House reef snorkeling","Dolphin cruise","Sandbank dinner"]},
    {"day":3,"title":"Underwater Wonders","description":"Marine biology center and diving excursion.","highlights":["Marine biology tour","Coral wall diving","Underwater dining"]},
    {"day":4,"title":"Spa & Serenity","description":"Full-day overwater spa journey.","highlights":["Overwater spa","Sunrise yoga","Bioluminescent beach"]},
    {"day":5,"title":"Fond Farewell","description":"Final sunrise and seaplane departure.","highlights":["Villa sunrise","Farewell breakfast","Seaplane departure"]}
  ]'::jsonb
),
(
  'c3d4e5f6-a7b8-9012-cdef-123456789012',
  'The Dual Paradise',
  5500.00,
  'Sri Lanka & Maldives',
  14,
  'https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=1200&q=80',
  'Signature',
  'The ultimate journey combining Sri Lanka culture with Maldives luxury.',
  '[
    {"day":1,"title":"Colombo Arrival","description":"Welcome to Sri Lanka.","highlights":["VIP transfer","Heritage hotel","Food tour"]},
    {"day":2,"title":"Cultural Triangle","description":"Journey to Sigiriya.","highlights":["Dambulla Temple","Private villa","Sigiriya views"]},
    {"day":3,"title":"Sigiriya & Safari","description":"Rock climb and elephant safari.","highlights":["Sigiriya Rock","Minneriya safari","Elephant gathering"]},
    {"day":4,"title":"Kandy Heritage","description":"Temple of the Tooth.","highlights":["Spice gardens","Temple of the Tooth","Dance performance"]},
    {"day":5,"title":"Tea Plantations","description":"Ceylon Tea exploration.","highlights":["Tea Museum","Plantation walk","Highland lunch"]},
    {"day":6,"title":"Ella & Nine Arches","description":"Scenic train ride.","highlights":["Scenic train","Nine Arches Bridge","Sunset hike"]},
    {"day":7,"title":"Southern Coast","description":"Galle Fort and whale watching.","highlights":["Galle Fort","Beach resort","Whale watching"]},
    {"day":8,"title":"Fly to Maldives","description":"Seaplane to overwater villa.","highlights":["Flight to Male","Seaplane","Overwater villa"]},
    {"day":9,"title":"Reef Discovery","description":"Snorkeling with marine biologist.","highlights":["Snorkeling","Spa treatment","Beach cinema"]},
    {"day":10,"title":"Deep Blue Adventure","description":"Diving at Manta Ray Point.","highlights":["Manta diving","Jet skiing","Floating breakfast"]},
    {"day":11,"title":"Island Exploration","description":"Private yacht to uninhabited islands.","highlights":["Private yacht","Sandbar picnic","Sunset fishing"]},
    {"day":12,"title":"Wellness Day","description":"Overwater spa rituals.","highlights":["Wellness rituals","Yoga","Star-gazing dinner"]},
    {"day":13,"title":"Ocean Freedom","description":"Free day of water sports.","highlights":["Water sports","Relaxation","Farewell dinner"]},
    {"day":14,"title":"Paradise Farewell","description":"Final sunrise and departure.","highlights":["Sunrise","Farewell brunch","Seaplane departure"]}
  ]'::jsonb
);
