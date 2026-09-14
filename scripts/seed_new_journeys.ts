import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://gpcdketdorvafupgbejw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwY2RrZXRkb3J2YWZ1cGdiZWp3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTc2NjE4MiwiZXhwIjoyMDg3MzQyMTgyfQ.NvqD7ui8xelxxqFFaSWxYjGtBfLkltIXdEEb758hU8I'
);

async function seed() {
  const { data, error } = await supabase.from('packages').upsert([
    {
      slug: 'the-girls-escape',
      category: 'adventure',
      title: 'The Girls\' Escape',
      location: 'Sri Lanka',
      days: 13,
      price_from_aud: 0,
      image_url: '/images/safari-wildlife.jpg',
      tag: 'GIRLS\' ESCAPE',
      subtitle: 'A stylish private journey designed for friends',
      travel_style: 'Culture · Adventure · Wellness',
      description: 'A stylish private journey designed for friends to experience Sri Lanka together — combining ancient culture, tea country, adventure, wildlife and time by the coast. Scenic train journeys, safari, cooking, wellness and beautiful stays create a trip with plenty to experience without losing time to simply relax and enjoy each other\'s company.',
      accommodation: 'Stay in a thoughtfully selected collection of stylish boutique and premium properties...',
      highlights: ['Culture', 'Adventure', 'Wildlife', 'Tea Country', 'Beach & Wellness'],
      why_special: ['A journey designed around shared experiences and time together', 'Sigiriya, Kandy and Sri Lanka\'s Cultural Triangle', 'Scenic hill-country rail journey and beautiful tea landscapes', 'Adventure in Ella including Flying Ravana zipline', 'Private wildlife safari in Yala', 'Cooking and local experiences', 'Relaxed coastal finish around Weligama and Ahangama', 'Stylish boutique and premium stays throughout'],
      perfect_for: ['Friends travelling together', 'Girls\' getaways', 'Celebrations', 'Adventure & wellness seekers'],
      route: ['Negombo', 'Sigiriya', 'Kandy', 'Nuwara Eliya', 'Ella', 'Yala', 'Weligama / Ahangama', 'Departure'],
      route_coords: [
        {"name": "Airport / Negombo", "lat": 7.1895, "lng": 79.8587},
        {"name": "Sigiriya", "lat": 7.9541, "lng": 80.7580},
        {"name": "Kandy", "lat": 7.2906, "lng": 80.6337},
        {"name": "Nuwara Eliya", "lat": 6.9497, "lng": 80.7828},
        {"name": "Ella", "lat": 6.8667, "lng": 81.0466},
        {"name": "Yala", "lat": 6.3683, "lng": 81.5200},
        {"name": "Weligama / Ahangama", "lat": 5.9739, "lng": 80.4283},
        {"name": "Airport", "lat": 7.1800, "lng": 79.8833}
      ],
      included: ['Private chauffeur-guide', 'Accommodation', 'Breakfast daily'],
      not_included: ['International flights', 'Visas', 'Travel insurance'],
      itinerary: [
        {"day": 1, "title": "Airport to Negombo", "description": "Arrive in Sri Lanka and meet your private chauffeur-guide. Transfer to Negombo and settle into your beachfront hotel, with time to relax after your flight.", "highlights": ["Soft arrival", "Beachfront stay", "Time to unwind"]},
        {"day": 2, "title": "Negombo to Sigiriya", "description": "Travel into Sri Lanka’s Cultural Triangle and settle into your stay near Sigiriya. Depending on your preferred pace, Dambulla Cave Temple can be incorporated into the journey.", "highlights": ["Cultural Triangle", "Dambulla option", "Countryside"]},
        {"day": 3, "title": "Sigiriya", "description": "Explore the Sigiriya area, with the opportunity to climb Sigiriya Rock Fortress or Pidurangala before heading into elephant country for a wildlife safari.", "highlights": ["Sigiriya", "Pidurangala", "Elephant safari"]},
        {"day": 4, "title": "Sigiriya to Kandy", "description": "Continue to the hill capital of Kandy. Visit the Temple of the Tooth and experience a traditional cultural performance.", "highlights": ["Kandy", "Temple of the Tooth", "Cultural performance"]},
        {"day": 5, "title": "Kandy to Nuwara Eliya", "description": "Journey into Sri Lanka’s highlands and tea country, where cooler air, mountain scenery and colonial character create a completely different side of the island.", "highlights": ["Tea country", "Hill-country scenery", "Nuwara Eliya"]},
        {"day": 6, "title": "Nuwara Eliya to Ella", "description": "Board one of Sri Lanka’s celebrated scenic train journeys through tea-covered mountains and valleys before arriving in Ella.", "highlights": ["Scenic rail", "Tea country", "Ella"]},
        {"day": 7, "title": "Ella", "description": "Explore Ella at an easy pace, including Little Adam’s Peak and the iconic Nine Arch Bridge.", "highlights": ["Little Adam’s Peak", "Nine Arch Bridge", "Mountain scenery"]},
        {"day": 8, "title": "Ella", "description": "A more adventurous day with the Flying Ravana zipline and a hands-on cooking experience.", "highlights": ["Zipline", "Cooking experience", "Adventure"]},
        {"day": 9, "title": "Ella to Yala", "description": "Leave the hills for Sri Lanka’s wild southern landscapes. Head into Yala for a private jeep safari in search of elephants, leopards and other wildlife.", "highlights": ["Yala", "Private safari", "Wildlife"]},
        {"day": 10, "title": "Yala to Weligama / Ahangama", "description": "Continue towards Sri Lanka’s south coast and settle into your coastal stay, with the rest of the day to slow down by the ocean.", "highlights": ["South coast", "Beach", "Relaxation"]},
        {"day": 11, "title": "Weligama / Ahangama", "description": "A relaxed coastal day to enjoy the beach, your resort and the easy rhythm of Sri Lanka’s southern coast.", "highlights": ["Beach time", "Wellness", "Slow travel"]},
        {"day": 12, "title": "Departure", "description": "Enjoy your final morning before your private transfer to the airport for your onward journey.", "highlights": ["Private transfer", "Farewell Sri Lanka"]}
      ],
      gallery_images: ['/images/safari-wildlife.jpg']
    },
    {
      slug: 'family-adventure',
      category: 'adventure',
      title: 'Family Adventure',
      location: 'Sri Lanka',
      days: 13,
      price_from_aud: 0,
      image_url: '/images/tea-plantation.jpg',
      tag: 'FAMILY ADVENTURE',
      subtitle: 'A private Sri Lankan adventure created for families',
      travel_style: 'Family · Wildlife · Adventure',
      description: 'A private Sri Lankan adventure created for families, combining wildlife, culture, scenic rail journeys, hands-on experiences and plenty of fun along the way. From elephants and ancient fortresses to ziplining through the hills and finishing beside the Indian Ocean, the journey balances discovery with comfortable family-friendly stays and time to relax.',
      accommodation: 'Stay in a carefully curated collection of premium, family-friendly hotels and boutique properties...',
      highlights: ['Family Adventure', 'Wildlife', 'Culture', 'Scenic Rail', 'Beach'],
      why_special: ['Family-friendly private touring at your own pace', 'Sigiriya and an elephant safari in the Cultural Triangle', 'Cultural and hands-on experiences in Kandy', 'Scenic train journey through Sri Lanka\'s tea country', 'Little Adam\'s Peak, Nine Arch Bridge and ziplining in Ella', 'Yala wildlife safari and bird park', 'Galle Fort, Madu River and coastal experiences', 'Beach time and water activities to finish the journey'],
      perfect_for: ['Families with children', 'Multi-generational families', 'Active families', 'First-time Sri Lanka travellers'],
      route: ['Negombo', 'Sigiriya', 'Kandy', 'Nuwara Eliya', 'Ella', 'Hambantota/Yala', 'Bentota', 'Departure'],
      route_coords: [
        {"name": "Airport / Negombo", "lat": 7.1895, "lng": 79.8587},
        {"name": "Sigiriya", "lat": 7.9541, "lng": 80.7580},
        {"name": "Kandy", "lat": 7.2906, "lng": 80.6337},
        {"name": "Nuwara Eliya", "lat": 6.9497, "lng": 80.7828},
        {"name": "Ella", "lat": 6.8667, "lng": 81.0466},
        {"name": "Hambantota / Yala", "lat": 6.1248, "lng": 81.1213},
        {"name": "Bentota", "lat": 6.4253, "lng": 79.9972},
        {"name": "Airport", "lat": 7.1800, "lng": 79.8833}
      ],
      included: ['Private chauffeur-guide', 'Accommodation', 'Breakfast daily'],
      not_included: ['International flights', 'Visas', 'Travel insurance'],
      itinerary: [
        {"day": 1, "title": "Airport to Negombo", "description": "Arrive in Sri Lanka and meet your private chauffeur-guide. Transfer to Negombo and settle into your hotel, allowing everyone time to relax after the journey.", "highlights": ["Easy arrival", "Family-friendly stay", "Rest"]},
        {"day": 2, "title": "Negombo to Sigiriya", "description": "Travel into Sri Lanka’s Cultural Triangle and settle into your family-friendly retreat near Sigiriya.", "highlights": ["Cultural Triangle", "Countryside", "Pool time"]},
        {"day": 3, "title": "Sigiriya", "description": "Discover the ancient Sigiriya Rock Fortress before heading into elephant country for an exciting wildlife safari.", "highlights": ["Sigiriya Rock", "Elephant safari", "Wildlife"]},
        {"day": 4, "title": "Sigiriya to Kandy", "description": "Travel to Kandy, Sri Lanka’s cultural hill capital, and begin exploring this historic city.", "highlights": ["Kandy", "Culture", "Hill country"]},
        {"day": 5, "title": "Kandy", "description": "Experience Kandy through a combination of cultural and family-friendly activities, including the Temple of the Tooth, Royal Botanical Gardens, a cultural performance and hands-on crafting.", "highlights": ["Temple of the Tooth", "Botanical Gardens", "Craft experience"]},
        {"day": 6, "title": "Kandy to Nuwara Eliya", "description": "Travel higher into Sri Lanka’s tea country, surrounded by rolling plantations, cool mountain air and beautiful highland scenery.", "highlights": ["Tea country", "Mountain scenery", "Nuwara Eliya"]},
        {"day": 7, "title": "Nuwara Eliya to Ella", "description": "Board the scenic train from Nanu Oya to Ella for one of the island’s memorable family travel experiences.", "highlights": ["Scenic train", "Tea country", "Ella"]},
        {"day": 8, "title": "Ella", "description": "Explore Little Adam’s Peak and Nine Arch Bridge, experience the Flying Ravana zipline and discover Sri Lanka’s tea story through a hands-on tea experience.", "highlights": ["Little Adam’s Peak", "Nine Arch Bridge", "Zipline", "Tea experience"]},
        {"day": 9, "title": "Ella to Hambantota", "description": "Descend from the hills towards Sri Lanka’s southern wilderness and settle into your resort near Yala and Hambantota.", "highlights": ["Southern wilderness", "Resort stay", "Family time"]},
        {"day": 10, "title": "Yala & Hambantota", "description": "Set out on a wildlife safari in Yala and visit the Bird Park for another nature-filled family experience.", "highlights": ["Yala safari", "Wildlife", "Bird Park"]},
        {"day": 11, "title": "Hambantota to Bentota", "description": "Travel along Sri Lanka’s south coast, exploring historic Galle Fort before continuing to Bentota.", "highlights": ["Galle Fort", "South coast", "Beach"]},
        {"day": 12, "title": "Bentota", "description": "Enjoy a final day of coastal experiences with water sports, a Madu River safari and time for relaxation or spa treatments.", "highlights": ["Water sports", "Madu River", "Beach", "Spa"]},
        {"day": 13, "title": "Departure", "description": "Enjoy your final morning before your private transfer to the airport.", "highlights": ["Private transfer", "Farewell Sri Lanka"]}
      ],
      gallery_images: ['/images/tea-plantation.jpg']
    }
  ]);
  if (error) {
    console.error('Error seeding packages:', error);
  } else {
    console.log('Successfully seeded new packages!');
  }
}

seed();
