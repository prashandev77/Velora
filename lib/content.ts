// ═══════════════════════════════════════════════════════════════════════════════
// AVELORA TRAVEL — Centralised Content File
// All static text content for the website. Components import from here.
// Package data (itineraries, included, etc.) lives in data.ts.
// ═══════════════════════════════════════════════════════════════════════════════

// ── HERO SECTION ─────────────────────────────────────────────────────────────
export const heroContent = {
    slides: [
        {
            id: 1,
            headline: 'Private Journeys Across Sri Lanka, the Maldives & Beyond',
            subtext: 'Thoughtfully curated travel with handpicked stays and trusted local expertise, designed around you.',
            tag: 'DESIGNED AROUND YOU',
            buttons: [
                { label: 'Start Planning', href: '/plan-your-trip', primary: true },
                { label: 'Browse Journeys', href: '/journeys', primary: false },
            ],
            image: '/Photos/Hero Slide Photo 1 Sigiriya bright up.webp',
        },
        {
            id: 2,
            headline: 'Where Untamed Beauty Meets Refined Comfort',
            subtext: 'Private safaris and boutique wilderness lodges.',
            tag: 'WILDLIFE & NATURE',
            buttons: [
                { label: 'Discover Wildlife Journeys', href: '/journeys', primary: true },
            ],
            image: '/Photos/Hero 2 Wildlife new red brightness.webp',
        },
        {
            id: 3,
            headline: 'Luxury, Thoughtfully Curated',
            subtext: 'Privately designed journeys with handpicked stays and trusted local expertise.',
            tag: 'THE AVELORA PROMISE',
            buttons: [
                { label: 'Start Planning', href: '/plan-your-trip', primary: true },
            ],
            image: '/Photos/Hero 3 - Tea new.webp',
        },
        {
            id: 4,
            headline: 'Endless Shores. Timeless Escapes.',
            subtext: 'Boutique luxury beach retreats along Sri Lanka\'s southern coast.',
            tag: 'COAST & ISLAND',
            buttons: [
                { label: 'Explore Coastal Journeys', href: '/journeys', primary: true },
            ],
            image: '/Photos/Hero Slide 2 Cape Weligama.jpg',
        },
        {
            id: 5,
            headline: 'Island Serenity, Perfected',
            subtext: 'Overwater villas and crystal lagoons in the Maldives.',
            tag: 'THE MALDIVES ESCAPE',
            buttons: [
                { label: 'View Maldives Collection', href: '/journeys', primary: true },
            ],
            image: '/Photos/Hero Slide 4 Maldives.jpg',
        },
    ],
    interval: 6000,
};

// ── NAVBAR ───────────────────────────────────────────────────────────────────
export const navbarContent = {
    links: [
        { href: '/', label: 'Home' },
        { href: '/journeys', label: 'Journeys' },
        { href: '/destinations', label: 'Destinations' },
        { href: '/about', label: 'About' },
        { href: '/booking', label: 'Plan' },
        { href: '/contact', label: 'Contact' },
    ],
    ctaLabel: 'Start Planning',
    ctaHref: '/plan-your-trip',
    mobileNavLabel: 'Navigation',
    mobileCtaLabel: 'Start your journey',
    mobileTalkToExpert: 'Talk to an expert',
    lightPages: ['/plan-your-trip', '/contact', '/about', '/journeys', '/destinations', '/booking'],
};

// ── FOOTER ───────────────────────────────────────────────────────────────────
export const footerContent = {
    description: 'Privately curated journeys across Sri Lanka, the Maldives & beyond.\nAustralian-Based Travel Company',
    contact: {
        location: 'Melbourne, Australia',
        email: 'info@aveloratravel.com.au',
        phone: '+61 472 726 456',
    },
    links: {
        journeys: [
            { label: 'Our Collection', href: '/journeys' },
            { label: 'Classic Discovery', href: '/journeys' },
            { label: 'Wildlife & Nature', href: '/journeys' },
            { label: 'Romance & Honeymoon', href: '/journeys' },
        ],
        company: [
            { label: 'About Us', href: '/about' },
            { label: 'Destinations', href: '/destinations' },
            { label: 'Contact', href: '/contact' },
            { label: 'FAQ', href: '/#faq' },
        ],
        support: [
            { label: 'Plan Your Journey', href: '/contact' },
            { label: 'How It Works', href: '/#how-it-works' },
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms of Service', href: '/terms' },
        ],
    },
    sectionTitles: {
        journeys: 'Journeys',
        company: 'Company',
        support: 'Support',
    },
    copyright: 'Avelora Travel. All rights reserved.',
    tagline: 'Designed Around You',
};

// ── TRAVEL STYLE SECTION ─────────────────────────────────────────────────────
export const travelStyleContent = {
    tag: 'Travel by Style',
    heading: 'How You Can Travel with Avelora',
    subtitle: 'From Sri Lanka’s cultural heart to Maldives lagoons, each journey is privately designed around your travel style, pace and preferences.',
    tiles: [
        {
            heading: 'Culture & Heritage',
            description: 'Ancient kingdoms, temples, and colonial towns , explored privately, with depth and space to absorb every moment.',
            button: 'Explore Cultural Journeys',
            href: '/journeys',
            image: '/Photos/Other sections/Section 2 _ Classic Discovery.jpeg',
        },
        {
            heading: 'Wildlife & Wilderness',
            description: 'Leopards at dawn, elephant gatherings, and boutique safari lodges, immersive nature without the crowds.',
            button: 'Discover Wildlife Experiences',
            href: '/journeys',
            image: '/Photos/Other sections/Section 2 _ Wildlife Expedition.jpeg',
        },
        {
            heading: 'Coast & Island Escape',
            description: 'Boutique coastlines in Sri Lanka, overwater calm in the Maldives, and island extensions tailored to your pace.',
            button: 'Explore Beach & Island Escapes',
            href: '/journeys',
            image: '/Photos/Other sections/Section 2 _ Coast.jpeg',
        },
        {
            heading: 'Romance & Celebrations',
            description: 'Honeymoons, anniversaries, and milestones, private dining, scenic journeys, and moments designed to remember.',
            button: 'View Romantic Journeys',
            href: '/journeys',
            image: '/Photos/Other sections/Section 2 Honeymoon.jpg',
        },
    ],
};

// ── WHY AVELORA SECTION ───────────────────────────────────────────────────────
export const whyAveloraContent = {
    tag: 'The Avelora Difference',
    heading: 'Private Journeys. Beautifully Delivered.',
    description: 'Avelora Travel designs private journeys across Sri Lanka, the Maldives and beyond, with calm coordination and stays chosen for character, not volume.\nEach itinerary is built around your dates, pace, and priorities, supported by trusted local partners.',
    values: [
        {
            title: 'Trusted Expertise',
            description: 'Local insight and handpicked boutique stays, authentic, comfortable, and considered down to the details.',
        },
        {
            title: 'Tailored Experiences',
            description: 'Your pace, your interests, your level of comfort, nothing templated, nothing rushed.',
        },
        {
            title: 'Seamless Coordination',
            description: 'Private transfers, curated experiences, and smooth logistics from first conversation to farewell.',
        },
        {
            title: 'Personalised Support',
            description: 'Discreet on-ground assistance and responsive support whenever you need it.',
        },
    ],
};

/** @deprecated Use whyAveloraContent */
export const whyVeloraContent = whyAveloraContent;

// ── HOW IT WORKS SECTION ─────────────────────────────────────────────────────
export const howItWorksContent = {
    tag: 'How It Works',
    heading: 'Effortless, From Start to Finish',
    subtitle: 'From first ideas to your return home, we handle the details so you can stay present for the experience, across Sri Lanka, the Maldives, or a multi-stop route.',
    steps: [
        {
            number: '01',
            title: 'Share Your Vision',
            description: 'Tell us how you wish to travel, the pace, experiences, level of comfort, and special occasions. Whether you begin with one of our signature journeys or a blank canvas, we start with you.',
            image: '/Photos/Other sections/How it works 1.jpeg',
        },
        {
            number: '02',
            title: 'Curate & Design',
            description: 'Your dedicated Avelora specialist crafts a personalised itinerary, selecting boutique stays, private guides, and meaningful experiences tailored to your style.',
            image: '/images/how_it_works_2.webp',
        },
        {
            number: '03',
            title: 'Refine & Confirm',
            description: 'We review every detail together and refine as needed. Once confirmed, we coordinate accommodations, private transfers, and on-ground logistics seamlessly.',
            image: '/images/how_it_works_3.webp',
        },
        {
            number: '04',
            title: 'Travel Seamlessly',
            description: 'Arrive with confidence knowing everything is prepared. Enjoy discreet local support and 24/7 assistance while you focus on the experience.',
            image: '/images/how_it_works_4.webp',
        },
    ],
};

// ── FAQ SECTION ──────────────────────────────────────────────────────────────
export const faqContent = {
    tag: 'FAQ',
    heading: 'Frequently Asked Questions',
    categories: [
        {
            title: 'Pre-Departure',
            items: [
                {
                    q: 'Are Avelora journeys private or group tours?',
                    a: 'No. Avelora specialises in private, tailor-made journeys. We do not operate fixed-date group tours. Your dates, pace and interests shape the journey.',
                },
                {
                    q: 'Can I customise a journey or start completely from scratch?',
                    a: 'Absolutely. You can begin with any Avelora journey and tailor the route, number of nights, accommodation, experiences and pace or start with a blank canvas. Tell us what interests you, how long you’d like to travel and the way you like to experience a destination, and we’ll design the journey around you.',
                },
                {
                    q: 'What is included in an Avelora journey?',
                    a: 'Inclusions vary by journey and will be clearly detailed in your personalised itinerary and quotation. Depending on your journey, these may include accommodation, daily breakfast, private transport, guides, selected experiences and entrance fees.',
                },
                {
                    q: 'What type of accommodation do you provide?',
                    a: 'We select accommodation to suit your journey, preferences and budget from characterful boutique hotels and tea-country bungalows to safari lodges, coastal retreats and luxury resorts. Tell us how you like to travel and we’ll recommend stays that fit you.',
                },
                {
                    q: 'Do I need a visa to visit Sri Lanka?',
                    a: 'Australian passport holders are currently eligible for a free 30-day tourist visa (ETA), along with nationals of a number of other eligible countries. An Electronic Travel Authorization (ETA) is required before arrival. Visa and entry requirements can change, so we recommend checking the latest information with Sri Lanka’s Department of Immigration & Emigration before travel. We’ll also provide relevant pre-departure guidance as part of your Avelora journey.',
                },
                {
                    q: 'What is the best time to visit Sri Lanka?',
                    a: 'Sri Lanka can be travelled year-round, but the best regions depend on when you visit. The south and west coasts are generally most favourable during the Australian summer months, while the east coast comes into its own at other times of year. We’ll shape your route around the season as well as the experiences you want.',
                },
                {
                    q: 'How far in advance should I start planning?',
                    a: 'Earlier is helpful for the widest choice of preferred hotels, guides, trains and experiences, especially during popular travel periods. However, we can also assist with shorter-lead enquiries where availability allows.',
                },
                {
                    q: 'Can you accommodate dietary, accessibility or other special requirements?',
                    a: 'Yes. Tell us about any dietary, mobility, accessibility or other important requirements when you enquire. We’ll consider them when designing your journey and confirm what can be arranged.',
                },
                {
                    q: 'Do you arrange international flights?',
                    a: 'Our journeys primarily focus on your arrangements from arrival in destination. We can help you consider suitable international flight timing so your itinerary connects smoothly, but international flights are not normally included unless specifically arranged.',
                },
                {
                    q: 'Can I add the Maldives or another destination to my Sri Lanka journey?',
                    a: 'Yes. Sri Lanka and the Maldives make a natural combination culture, wildlife and landscapes followed by a few days of island relaxation. We can design both parts as one seamless journey, and selected regional extensions may also be possible depending on your plans.',
                },
                {
                    q: 'Do I need travel insurance?',
                    a: 'We strongly recommend comprehensive travel insurance appropriate for your journey, including cover for medical expenses, cancellation, luggage and the activities you plan to undertake. Your policy should be arranged as soon as practical after confirming your trip.',
                },
                {
                    q: 'Do you plan honeymoons, anniversaries and special celebrations?',
                    a: 'Yes. We can design honeymoons, anniversaries, birthdays and other meaningful journeys with stays and experiences chosen around the occasion without turning the trip into a generic celebration package.',
                }
            ]
        },
        {
            title: 'On the Ground',
            items: [
                {
                    q: 'Will we have a private driver or guide?',
                    a: 'Most Avelora Sri Lanka journeys include private transport with an experienced chauffeur-guide or driver, with specialist local guides arranged where appropriate. The exact arrangements will depend on your itinerary and will be clearly outlined in your personalised proposal.',
                },
                {
                    q: 'What support will I have while travelling?',
                    a: 'Your journey is coordinated with trusted local support in Sri Lanka. You’ll have contact details for assistance while travelling, including urgent on-trip support when required.',
                },
                {
                    q: 'How does Avelora approach responsible travel?',
                    a: 'We believe exceptional travel should respect the places, wildlife and communities that make each journey possible. Where possible, we favour quality local businesses and genuine experiences, carefully consider the wildlife experiences we recommend, and avoid filling itineraries with unnecessary tourist stops included primarily to generate commissions.',
                }
            ]
        },
        {
            title: 'Booking & Payment',
            items: [
                {
                    q: 'Are entrance fees included?',
                    a: 'Where entrance fees are included, they will be clearly shown in your proposal. We prefer to make inclusions transparent rather than leave you guessing about additional costs.',
                },
                {
                    q: 'What is the typical investment for an Avelora journey?',
                    a: 'Every journey is individually designed, so pricing varies with travel dates, duration, accommodation, experiences and number of travellers. Our published journeys provide a useful indication of investment, and we’ll prepare a clear personalised quotation before you commit.',
                },
                {
                    q: 'How do payments work?',
                    a: 'Your quotation and booking confirmation will clearly state the deposit, payment schedule and payment method applicable to your journey. Payment arrangements may vary depending on the services included.',
                }
            ]
        }
    ]
};

// ── TESTIMONIALS SECTION ─────────────────────────────────────────────────────
export const testimonialsContent = {
    tag: 'Traveller Reviews',
    heading: 'Words From Our Travellers',
    subtitle: 'Real experiences from guests who trusted Avelora to craft their most meaningful journeys.',
    reviews: [
        {
            name: 'Sarah & James Mitchell',
            location: 'Sydney',
            avatar: 'S',
            rating: 5,
            package: 'Avelora Signature Journey',
            text: 'Absolutely life-changing. The seamless transition from Sri Lanka\'s cultural wonders to the serene southern coast was pure magic. Every need was anticipated before we even thought of it.',
        },
        {
            name: 'Akira Tanaka',
            location: 'Melbourne',
            avatar: 'A',
            rating: 5,
            package: 'Avelora Discovery',
            text: 'I\'ve traveled extensively, but this journey was on another level. The private sunrise climb of Sigiriya and the train through tea country, every moment felt curated just for me.',
        },
        {
            name: 'Elena & Marco Rossi',
            location: 'Brisbane',
            avatar: 'E',
            rating: 5,
            package: 'Avelora Romance',
            text: 'Our honeymoon exceeded every dream. The sunset beach walk and private coastal dining were moments we\'ll treasure forever. Avelora made it all effortless.',
        },
        {
            name: 'David Okonkwo',
            location: 'Perth',
            avatar: 'D',
            rating: 5,
            package: 'Avelora Wild',
            text: 'From the elephants at Minneriya to the ancient ruins of Polonnaruwa, each day revealed a new wonder. The local guides were incredibly knowledgeable and passionate.',
        },
        {
            name: 'Charlotte Dubois',
            location: 'Adelaide',
            avatar: 'C',
            rating: 5,
            package: 'Avelora Wellness',
            text: 'Two weeks of pure tranquility. The combination of authentic Ayurvedic experiences and pristine beaches was the perfect balance. We\'re already planning our return trip.',
        },
        {
            name: 'Raj & Priya Sharma',
            location: 'Gold Coast',
            avatar: 'R',
            rating: 5,
            package: 'Grand Explorer',
            text: 'The scenic train ride was worth the trip alone. But it was the little touches, the private tea tasting and the jungle safari, that showed true attention to detail.',
        },
        {
            name: 'James & Olivia Chen',
            location: 'Singapore',
            avatar: 'J',
            rating: 5,
            package: 'Sri Lanka & Maldives',
            text: 'Avelora stitched together Sri Lanka and the Maldives flawlessly, one timeline, one point of contact, and every transfer felt calm and clear.',
        },
    ],
};

// ── START PLANNING SECTION ───────────────────────────────────────────────────
export const startPlanningContent = {
    tag: 'Plan with Avelora',
    heading: 'Start Planning Your',
    headingHighlight: 'Journey',
    subtitle: 'Share your plans and an Avelora specialist will design a personalised journey across Sri Lanka, the Maldives, or a multi-country route.',
    travelStyles: [
        'Luxury Hotels',
        'Wildlife & Safari',
        'Culture & Heritage',
        'Beach & Relaxation',
        'Honeymoon',
        'Wellness & Ayurveda',
        'Adventure & Nature',
        'Celebration Travel',
        'Family Travel',
        'Multi-country Escape',
    ],
    tripLengths: ['5–7 days', '8–10 days', '10–14 days', '15+ days', 'Not sure yet'],
    travellerCounts: ['1', '2', '3', '4', '5+'],
    formLabels: {
        when: 'When are you travelling?',
        whenPlaceholder: 'Select month',
        tripLength: 'Trip Length',
        tripLengthPlaceholder: 'Select duration',
        travellers: 'Number of Travellers',
        departingCity: 'Departing City',
        departingCityPlaceholder: 'e.g. Sydney, Melbourne',
        travelStyle: 'Travel Style',
        email: 'Email *',
        emailPlaceholder: 'you@example.com',
        message: 'Message (Optional)',
        messagePlaceholder: 'Tell us anything else...',
        destinationInterest: 'Destination interest',
        destinationPlaceholder: 'e.g. Sri Lanka, Maldives, or both',
        budgetRange: 'Budget range (optional)',
        budgetPlaceholder: 'Select range',
        specialOccasion: 'Special occasion (optional)',
        occasionPlaceholder: 'e.g. honeymoon, anniversary, birthday',
    },
    budgetRanges: ['Under $5k pp', '$5k–$10k pp', '$10k–$20k pp', '$20k+ pp', 'Prefer to discuss', 'Not sure yet'],
    submitButton: 'Start Planning',
    submitFooter: 'No obligation · Tailored planning · Response within 24 hours',
    successTitle: 'Thank You!',
    successMessage: 'Your journey request has been received. An Avelora specialist will be in touch within 24 hours.',
    successLink: 'Browse Journeys While You Wait',
    months: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December', 'Not sure yet',
    ],
};

// ── PRIVATE TRAVEL PROMISE SECTION ───────────────────────────────────────────
export const privateTravelPromiseContent = {
    tag: 'Our Promise',
    heading: 'The Avelora Promise',
    subtitle: 'Private journeys that feel calm, personal, and unmistakably yours, from Sri Lanka’s hills to Maldives lagoons and beyond.',
    promises: [
        'Privately curated, never fixed-date group tours',
        'Flexible dates and pacing shaped around you',
        'Handpicked stays and experiences that match your style',
        'Discreet local support from planning through travel',
    ],
    tagline: 'Travel as you wish, calm, seamless and deeply personal.',
};

// ── DESTINATIONS (MAP) SECTION ───────────────────────────────────────────────
export const destinationsContent = {
    tag: 'Our Destinations',
    heading: 'Explore Sri Lanka, the Maldives & Beyond',
    subtitle: 'From Sri Lanka’s cultural heart and wildlife landscapes to Maldives island escapes. Avelora designs journeys that can begin with one destination or combine several seamlessly.',
    emptyState: {
            title: 'Explore Destinations',
        description: 'Tap any province on the map or a label above to discover its destinations and curated experiences.',
    },
    ctaPrimary: 'Plan a Journey Here',
    ctaSecondary: 'Full guide',
    provinces: [
        {
            id: 'North_Central',
            name: 'North Central',
            intro: 'The cultural heartland of ancient Sri Lanka, UNESCO-listed ruins, sacred sites, and the iconic Sigiriya Rock Fortress rising from pristine jungle.',
            heroImage: '/Photos/Hero Slide Photo 1 Sigiriya.jpeg',
            cities: [
                { name: 'Sigiriya', intro: 'The iconic Lion Rock fortress, a marvel of ancient engineering and artistry.', image: '/Photos/Hero Slide Photo 1 Sigiriya.jpeg', attractions: ['Sigiriya Rock Fortress', 'Pidurangala Rock', 'Minneriya National Park'], bestTime: 'Jan – Apr' },
                { name: 'Dambulla', intro: 'Five sacred cave temples adorned with 150+ Buddha statues and ancient murals.', image: '/Photos/Other sections/Destination Dambulla.jpg', attractions: ['Dambulla Cave Temple', 'Golden Temple'], bestTime: 'Jan – Apr' },
                { name: 'Polonnaruwa', intro: 'A medieval capital\'s remarkably preserved stone ruins tell the story of a great kingdom.', image: '/Photos/Other sections/Polonnaruwa.jpeg', attractions: ['Ancient City', 'Gal Vihara'], bestTime: 'May – Sep' },
                { name: 'Anuradhapura', intro: 'One of the world\'s oldest cities, towering dagobas and sacred pilgrimage sites.', image: '/Photos/Other sections/Anuradhapura.jpeg', attractions: ['Sacred Bo Tree', 'Ruwanweli Maha Seya'], bestTime: 'Jan – Apr' },
            ],
        },
        {
            id: 'Central',
            name: 'Central',
            intro: 'Misty highlands, tea-draped hills, and Kandy, the soul of Sri Lanka\'s enchanting hill country filled with colonial charm.',
            heroImage: '/Photos/Other sections/Destination Tea.jpeg',
            cities: [
                { name: 'Kandy', intro: 'The hill capital home to the sacred Temple of the Sacred Tooth Relic.', image: '/Photos/Other sections/Our Journeys_Classic Discovery.jpeg', attractions: ['Temple of the Tooth', 'Peradeniya Gardens'], bestTime: 'Jan – Apr' },
                { name: 'Nuwara Eliya', intro: 'Colonial charm at 1,868m, rolling tea plantations and the finest Ceylon tea.', image: '/Photos/Other sections/Nuwara Eliya.jpeg', attractions: ['Tea Factory Tours', 'Horton Plains'], bestTime: 'Mar – May' },
            ],
        },
        {
            id: 'Uva',
            name: 'Uva',
            intro: 'Iconic scenic rail journeys, cascading waterfalls, and the laid-back mountain charm of Ella, Sri Lanka\'s most photogenic province.',
            heroImage: '/Photos/Other sections/Destination Ella.jpeg',
            cities: [
                { name: 'Ella', intro: 'Nine Arches Bridge, dramatic viewpoints, and cascading waterfalls.', image: '/Photos/Other sections/Destination Ella.jpeg', attractions: ['Nine Arches Bridge', 'Ella Rock', 'Ravana Falls'], bestTime: 'Jan – Mar' },
                { name: 'Hatton', intro: 'Remote colonial tea estate bungalows and the sacred Adam\'s Peak pilgrimage.', image: '/Photos/Other sections/Destination Hatton.webp', attractions: ['Adam\'s Peak Trek', 'Tea Estate Bungalows'], bestTime: 'Dec – May' },
            ],
        },
        {
            id: 'Southern',
            name: 'Southern',
            intro: 'Golden beaches, the UNESCO-listed Galle Fort, and world-class blue whale watching along Sri Lanka\'s stunning southern coast.',
            heroImage: '/Photos/Other sections/Destination Galle.jpeg',
            cities: [
                { name: 'Galle', intro: 'A UNESCO World Heritage Dutch fort with ocean-facing ramparts and boutique cafés.', image: '/Photos/Other sections/Destination Galle.jpeg', attractions: ['Galle Fort', 'Unawatuna Beach'], bestTime: 'Dec – Apr' },
                { name: 'Mirissa', intro: 'Premier whale watching in Asia, blue whales, sperm whales, and dolphins.', image: '/Photos/Other sections/Destination Mirissa.jpeg', attractions: ['Whale Watching', 'Coconut Tree Hill'], bestTime: 'Nov – Apr' },
            ],
        },
        {
            id: 'Western',
            name: 'Western',
            intro: 'Cosmopolitan Colombo\'s vibrant energy meets serene Bentota beach retreats and mangrove river safari adventures.',
            heroImage: '/Photos/Other sections/Bentota water sports.webp',
            cities: [
                { name: 'Colombo', intro: 'The dynamic capital — colonial heritage, modern skyscrapers, and diverse cuisine.', image: '/Photos/Other sections/Collection page.jpeg', attractions: ['Gangaramaya Temple', 'Pettah Market'], bestTime: 'Year-round' },
                { name: 'Bentota', intro: 'Golden sands, mangrove river safaris, and Geoffrey Bawa\'s artistry.', image: '/Photos/Other sections/Bentota water sports.webp', attractions: ['Bentota Beach', 'Madu River Safari'], bestTime: 'Nov – Apr' },
            ],
        },
        {
            id: 'North_Western',
            name: 'North Western',
            intro: 'Untouched national parks and Sri Lanka\'s premier leopard territory in the ancient wilderness of Wilpattu.',
            heroImage: '/Photos/Other sections/Wild life .jpeg',
            cities: [
                { name: 'Wilpattu', intro: 'Sri Lanka\'s largest national park. famed for natural lakes and leopard density.', image: '/Photos/Other sections/Wild life .jpeg', attractions: ['Wilpattu Safari', 'Villu Lakes', 'Leopard Tracking'], bestTime: 'Feb – Oct' },
            ],
        },
        {
            id: 'Sabaragamuwa',
            name: 'Sabaragamuwa',
            intro: 'Raw adventure through ancient rainforests, white-water rapids, and hidden waterfalls deep in Sri Lanka\'s lush interior.',
            heroImage: '/Photos/Other sections/Water Rafting Kitulgala.jpg',
            cities: [
                { name: 'Kitulgala', intro: 'Adventure capital on the Kelani River, where Bridge on the River Kwai was filmed.', image: '/Photos/Other sections/Water Rafting Kitulgala.jpg', attractions: ['White-Water Rafting', 'Rainforest Trekking'], bestTime: 'Year-round' },
            ],
        },
        {
            id: 'Eastern',
            name: 'Eastern',
            intro: 'Pristine east coast beaches, world-class surf, ancient Hindu temples, and untouched natural beauty off the beaten path.',
            heroImage: '/Photos/Other sections/Section 2 _ Coast.jpeg',
            cities: [
                { name: 'Trincomalee', intro: 'A stunning harbour with sacred Hindu temples perched on dramatic clifftops.', image: '/Photos/Other sections/Section 2 _ Coast.jpeg', attractions: ['Koneswaram Temple', 'Pigeon Island'], bestTime: 'May – Sep' },
                { name: 'Pasikuda', intro: 'One of the calmest beaches in the world, turquoise shallow waters stretching a kilometre.', image: '/Photos/Other sections/Section 2 _ Coast.jpeg', attractions: ['Pasikuda Beach', 'Batticaloa Lagoon'], bestTime: 'Apr – Sep' },
            ],
        },
        {
            id: 'Northern',
            name: 'Northern',
            intro: 'Rich Tamil culture, ancient Hindu temples, unique cuisine, and an untouched northern coastline waiting to be discovered.',
            heroImage: '/Photos/Other sections/jafna culture.jpg',
            cities: [
                { name: 'Jaffna', intro: 'The cultural capital of the Tamil north, ancient temples, unique cuisine, warm hospitality.', image: '/Photos/Other sections/jafna culture.jpg', attractions: ['Nallur Temple', 'Jaffna Fort', 'Nagadeepa Island'], bestTime: 'Feb – Sep' },
            ],
        },
    ],
};

// ── SIGNATURE JOURNEYS (HOMEPAGE) ────────────────────────────────────────────
export const signatureJourneysContent = {
    tag: 'Curated Journeys',
    heading: 'Signature Private Journeys',
    subtitle: 'Each itinerary is a starting point, privately curated and fully customisable to your dates, style, and destinations.',
    journeys: [
        {
            title: 'Avelora Discovery',
            duration: '8 Days',
            tags: 'Culture • Highlands • Wildlife • Coast',
            description: 'A beautifully balanced introduction to Sri Lanka, blending ancient heritage, misty tea country and the island\'s golden southern coast.',
            route: 'Sigiriya → Kandy → Tea Country → South Coast',
            image: '/Photos/Hero Slide Photo 1 Sigiriya bright up.webp',
            href: '/journeys/adventure/avelora-discovery',
        },
        {
            title: 'Avelora Signature',
            duration: '11 Days',
            tags: 'Culture • Tea Country • Safari • Coast',
            description: 'Sri Lanka\'s most iconic landscapes are experienced in refined comfort, from cultural landmarks and tea estates to wildlife safaris and coastal retreats.',
            route: 'Sigiriya → Kandy → Tea Country → Yala → South Coast',
            image: '/Photos/Other sections/Velora Luxe Main photo.webp',
            href: '/journeys/luxury/avelora-signature',
        },
        {
            title: 'Avelora Romance',
            duration: '12 Days',
            tags: 'Romance • Tea Country • Safari • Ocean',
            description: 'A romantic journey through Sri Lanka\'s most beautiful settings, combining scenic train rides, wildlife safaris and luxury oceanfront stays.',
            route: 'Negombo → Sigiriya → Hatton → Ella → Yala → Cape Weligama',
            image: '/Photos/Other sections/Velora Luxury Honeymoon new.webp',
            href: '/journeys/honeymoon/avelora-romance',
        },
        {
            title: 'Avelora Wellness',
            duration: '14 Days',
            tags: 'Wellness • Ayurveda • Nature • Culture',
            description: 'A restorative journey designed for wellbeing, combining authentic Ayurveda treatments with gentle cultural discovery and peaceful landscapes.',
            route: 'Negombo → Cultural Triangle → Ayurveda Retreat → South Coast',
            image: '/Photos/Other sections/Velora Serene new.avif',
            href: '/journeys/wellness/avelora-wellness',
        },
        {
            title: 'Avelora Wild',
            duration: '17 Days',
            tags: 'National Parks • Rainforests • Bird Sanctuaries',
            description: 'An immersive wildlife expedition exploring Sri Lanka\'s national parks, wetlands and rainforests in search of extraordinary biodiversity.',
            route: 'Wilpattu → Trincomalee → Kumana → Gal Oya → Sinharaja → Kitulgala',
            image: '/Photos/Other sections/Journey_Velora Wild new.jpg',
            href: '/journeys/adventure/avelora-wild',
        },
    ],
    cta: 'View All Journeys',
    ctaHref: '/journeys',
};

// ── JOURNEYS PAGE ────────────────────────────────────────────────────────────
export const journeysPageContent = {
    tag: 'Our Curated Collection',
    heading: 'Choose Your Path',
    subtitle: 'Every journey is thoughtfully curated and fully customisable. Choose your ideal itinerary and we\'ll tailor every detail.',
    footerNote: 'All journeys are privately curated and subject to availability at the time of booking.',
    viewItinerary: 'MAKE THIS JOURNEY YOURS',
};

// ── ABOUT PAGE ───────────────────────────────────────────────────────────────
export const aboutPageContent = {
    tag: 'About Avelora Travel',
    heading: 'Travel, Thoughtfully Curated',
    heroDescription: 'Avelora Travel, an Australian-based travel company, was founded with a simple belief: truly memorable travel should feel personal, seamless, and deeply meaningful. We specialise in privately curated journeys across Sri Lanka, the Maldives and beyond, blending refined comfort with authentic local experiences.',
    heroImage: '/Photos/Other sections/About Page.jpeg',
    introText: 'Every itinerary we design is tailored around you, your pace, your interests, your preferred travel dates. We do not operate fixed group tours. We craft journeys exclusively for individuals, couples, families, and small private groups seeking a more considered way to travel.',
    sections: [
        {
            title: 'Our Story',
            content: 'Avelora was born from a deep connection to Sri Lanka, its landscapes, heritage, wildlife, and warm hospitality, combined with an understanding of what modern travellers expect: clarity, quality, and seamless coordination. We saw the opportunity to create something different from traditional tour operators: not volume-based tourism, not rigid departure schedules, but curated private journeys designed with care and precision. Avelora brings together local expertise and international service standards, ensuring every journey feels effortless from arrival to departure.',
        },
        {
            title: 'Our Vision',
            content: 'To redefine how travellers experience Sri Lanka, the Maldives, and the wider region, through thoughtful design, personalised service, and meaningful cultural connection. We believe luxury is not defined by excess. It is defined by seamless coordination, attention to detail, authentic encounters, trusted partnerships, and space to travel at your own pace.',
        },
        {
            title: 'Our Approach',
            content: 'Every Avelora journey begins with listening. We take time to understand your travel style, comfort preferences, and purpose for travel, whether it\'s exploration, relaxation, celebration, or renewal. From there, we curate handpicked stays, private chauffeurs and guides, experiences chosen for depth (not volume), and balanced pacing. Logistics are managed discreetly so you can focus on the experience.',
        },
        {
            title: 'Why Avelora',
            content: 'Because travel should never feel crowded, rushed, or templated. We design journeys on your preferred dates, with private transport throughout, flexibility built into each day, and local support available when needed.',
        },
    ],
    founderQuote: 'Avelora Travel was created from a deep appreciation for Sri Lanka and a desire to present it in a way that feels refined, seamless, and personal. I recognised a gap between traditional group tourism and the private, well-paced journeys many discerning travellers seek. Avelora was founded to bridge that gap, with thoughtful design, trusted local partnerships, and clear communication. Travel should never feel rushed or impersonal. It should feel considered, immersive, and effortless.',
    founderAttribution: 'Founder, Avelora Travel',
    sustainability: {
        heading: 'Sustainability & Responsible Travel',
        body: 'We prioritise boutique and locally owned properties where possible, respectful cultural engagement, wildlife experiences aligned with conservation standards, and supporting local guides and communities. Luxury and responsibility can, and should, coexist.',
    },
    ctaText: 'Start Planning Your Journey →',
};

// ── CONTACT PAGE ─────────────────────────────────────────────────────────────
export const contactPageContent = {
    tag: 'Get in Touch',
    heading: 'Contact Us',
    subtitle: 'Whether you have a question about our journeys, need assistance with an existing booking, or want to discuss a completely bespoke itinerary, our team of travel specialists is here to help.',
    phone: {
        title: 'Call or WhatsApp',
        description: 'We are available 24/7 for urgent inquiries.',
        number: '+61 472 726 456',
        href: 'tel:+61472726456',
    },
    email: {
        title: 'Email Us',
        description: 'Our team typically replies within 24 hours.',
        address: 'info@aveloratravel.com.au',
        href: 'mailto:info@aveloratravel.com.au',
    },
    office: {
        title: 'Office Location',
        description: 'Visits by appointment only.',
        address: ['Melbourne,', 'Australia'],
    },
    cta: {
        heading: 'Ready to design your journey?',
        description: 'If you want to start planning your bespoke trip, use our detailed inquiry form to tell us exactly what you\'re looking for.',
        buttonText: 'Plan Your Trip',
    },
    sideImage: '/Photos/Other sections/Contact us.jpeg',
    sideLabel: 'Based in Australia',
    sideTagline: 'Australian trust, global luxury standards.',
};

// ── BOOKING & PAYMENT PAGE ───────────────────────────────────────────────────
export const bookingPageContent = {
    hero: {
        tag: 'Booking & Payment Terms',
        heading: 'Travel With Confidence',
        subtitle: 'Planning your journey with Avelora is simple and transparent. A small deposit secures your itinerary, with the balance payable closer to your travel date.',
        image: '/Photos/Other sections/Payment tab new.webp',
    },
    confidencePoints: [
        'Privately curated journeys',
        'No fixed departure dates',
        'Handpicked boutique hotels',
        'Trusted local expertise',
        '24/7 support during your journey',
    ],
    reserveSection: {
        tag: 'How It Works',
        heading: 'Reserve Your Journey with Confidence',
        subtitle: 'Book Now, Pay As You Go, our process is built around flexibility and transparency.',
    },
    sections: [
        {
            title: '20% Deposit to Secure Your Journey',
            body: 'A 20% deposit confirms your privately curated itinerary and allows us to secure your hotels, experiences, and chauffeur services.',
        },
        {
            title: 'Final Balance Before Arrival',
            body: 'The remaining balance is payable 14 days prior to departure or as otherwise stated in your booking confirmation.',
        },
        {
            title: 'Flexible & Personalised Planning',
            body: 'After your booking is confirmed, our team can continue refining your itinerary to ensure every detail perfectly matches your travel preferences.',
        },
        {
            title: 'Changes to Your Booking',
            body: 'If you need to amend your travel dates or itinerary, please contact us as early as possible. Changes are subject to availability and the policies of our hotel and service partners.',
        },
        {
            title: 'Cancellations',
            body: 'Cancellations must be made in writing. Cancellation fees may apply depending on the timing of the cancellation and the policies of the hotels and services reserved for your journey.',
        },
        {
            title: 'Travel Insurance',
            body: 'We strongly recommend that all travellers obtain comprehensive travel insurance covering cancellations, medical expenses, and travel disruptions.',
        },
        {
            title: 'External Factors',
            body: 'Avelora Travel shall not be held responsible for changes caused by circumstances beyond our control, including but not limited to weather conditions, airline schedule changes, government regulations, or force majeure events.',
        },
        {
            title: 'Local Travel Partners',
            body: 'Avelora Travel works with carefully selected, licensed local partners across our destination network, including Sri Lanka, the Maldives, and other curated extensions.',
        },
    ],
    paymentMethods: {
        tag: 'Payment Methods',
        heading: 'How to Pay',
        subtitle: 'We accept the following payment methods:',
        methods: [
            { label: 'Bank transfer' },
            { label: 'Credit card payments' },
        ],
    },
    securePayment: {
        heading: 'Secure Payment Guarantee',
        description: 'All payments are processed securely and confirmations will be issued immediately upon receipt.',
        note: 'Avelora Travel works with carefully selected boutique hotels and partners across Sri Lanka and the Maldives. Early deposits allow us to secure the best availability for your travel dates.',
    },
    cta: {
        heading: 'Ready to Plan Your Journey?',
        subtitle: 'Speak with our team and start designing your privately curated journey today.',
        buttonText: 'Plan Your Journey',
    },
};

// ── TERMS & CONDITIONS PAGE ──────────────────────────────────────────────────
export const termsPageContent = {
    hero: {
        tag: 'Avelora Travel',
        heading: 'Website Terms & Conditions',
        subtitle: 'By accessing and using the Avelora Travel website, you agree to the following terms and conditions.',
    },
    sections: [
        {
            title: 'Website Content',
            body: 'All content on this website, including text, images, logos, and design elements, is the property of Avelora Travel unless otherwise stated.\n\nContent may not be reproduced, copied, distributed, or used for commercial purposes without prior written permission.',
        },
        {
            title: 'Accuracy of Information',
            body: 'We aim to keep the information on this website accurate and up to date. However, travel details such as itineraries, accommodation availability, experiences, and pricing may change from time to time.\n\nFor the most current information when planning your journey, we recommend contacting our team directly.',
        },
        {
            title: 'Use of the Website',
            body: 'The content on this website is provided for general travel inspiration and information. While we take care to ensure accuracy, Avelora Travel cannot guarantee that all information will always be complete or current.',
        },
        {
            title: 'External Information',
            body: 'From time to time, the website may reference travel experiences, destinations, or services provided by third parties. Avelora Travel is not responsible for the policies or practices of those providers.',
        },
        {
            title: 'Updates to These Terms',
            body: 'Avelora Travel may update these terms and conditions from time to time. By continuing to use the website, you accept the most recent version.',
        },
    ],
    footerNote: 'Have questions about our terms?',
    footerCta: 'Contact Our Team',
};

// ── PRIVACY POLICY PAGE ──────────────────────────────────────────────────────
export const privacyPageContent = {
    heading: 'Avelora Travel – Privacy Policy',
    intro: 'Avelora Travel respects your privacy and is committed to protecting the personal information you provide when using our website or contacting us regarding travel services.',
    sections: [
        {
            title: 'Information We Collect',
            intro: 'When you submit an enquiry, request a proposal, or contact us through our website, we may collect the following information:',
            items: ['Name', 'Email address', 'Phone number', 'Travel dates and preferences', 'Number of travellers', 'Any other information you provide in your message'],
        },
        {
            title: 'How We Use Your Information',
            intro: 'Your information is used only for the purpose of:',
            items: ['Responding to travel enquiries', 'Preparing customised travel proposals', 'Arranging travel services such as hotels, transport, and experiences', 'Communicating important updates related to your travel plans'],
            additionalParagraphs: [
                'We may share necessary booking information with trusted travel partners such as hotels, guides, transport providers, or local tour operators in order to deliver your requested travel services.',
                'Avelora Travel does not sell, rent, or distribute your personal information to third parties for marketing purposes.',
            ],
        },
        {
            title: 'Website Analytics & Cookies',
            paragraphs: [
                'Our website may use cookies or analytics tools to help us understand how visitors use the website and to improve user experience.',
                'These tools do not collect sensitive personal information.',
            ],
        },
        {
            title: 'Data Protection',
            paragraphs: [
                'We take reasonable steps to protect your personal information from unauthorised access, misuse, or disclosure.',
            ],
        },
        {
            title: 'Contact',
            body: 'If you have any questions regarding this Privacy Policy, please contact us at:',
            email: 'info@aveloratravel.com.au',
            emailHref: 'mailto:info@aveloratravel.com.au',
        },
    ],
};

// ── PACKAGE DETAIL PAGE (STATIC LABELS) ──────────────────────────────────────
export const packageDetailContent = {
    expandAll: 'Expand All',
    collapseAll: 'Collapse All',
    importantInfoTitle: 'Important Information',
    importantInfoItems: [
        'All journeys are privately curated and subject to availability at the time of booking.',
        'Itineraries may be adjusted based on weather, local conditions, or guest preferences.',
        'Hotel selections are recommended based on your travel dates and may vary depending on availability.',
        'Entrance fees and experience inclusions are as specified in your personalised itinerary.',
        'Avelora Travel reserves the right to substitute equivalent or higher-standard alternatives where necessary.',
        'Travel insurance is strongly recommended for all travellers.',
        'Visa requirements should be confirmed ahead of travel, our team is happy to advise.',
    ],
    relatedJourneysTitle: 'You May Also Love',
    relatedJourneysSubtitle: 'Explore more of our privately curated journeys across Sri Lanka, the Maldives and beyond.',
};

// ── BOOKING TERMS & CONDITIONS ───────────────────────────────────────────────
export const bookingTermsContent = {
    hero: {
        tag: 'BOOKING TERMS',
        heading: 'Booking Terms & Conditions',
        subtitle: 'These Booking Terms & Conditions apply to travel arrangements booked with Avelora Travel. Your personalised quotation and booking confirmation may also contain journey-specific conditions, including supplier payment and cancellation terms.',
    },
    sections: [
        {
            title: 'Agreement',
            body: 'By accessing and using the Avelora Travel website, you agree to the following terms and conditions.',
        },
        {
            title: 'Website Content',
            body: 'Content on this website, including text, logos, images and design elements, is owned by Avelora Travel or used with permission from the relevant owners or suppliers.\n\nContent may not be reproduced, copied, distributed or used for commercial purposes without appropriate permission.',
        },
        {
            title: 'Accuracy of Information',
            body: 'We aim to keep the information on this website accurate and up to date. However, travel details including itineraries, accommodation, experiences, availability and indicative pricing may change.\n\nYour personalised quotation and booking confirmation will provide the details applicable to your journey.',
        },
        {
            title: 'Use of the Website',
            body: 'This website is provided for travel inspiration and general information. You may use the website only for lawful purposes and must not use it in a way that could damage, disrupt or interfere with the website or its operation.',
        },
        {
            title: 'Third-Party Content & Links',
            body: 'Our website may contain information, content or links relating to third-party accommodation providers, attractions and travel services. Third-party websites and content are subject to their own terms, policies and practices.',
        },
        {
            title: 'Travel Bookings',
            body: 'Information on this website does not by itself constitute a confirmed travel booking.\n\nTravel arrangements booked with Avelora are subject to our Booking Terms & Conditions, together with any journey-specific conditions provided in your quotation or booking confirmation.',
        },
        {
            title: 'Updates to These Terms',
            body: 'Avelora Travel may update these terms and conditions from time to time. By continuing to use the website, you accept the most recent version.\n\nLast updated: August 2026',
        }
    ],
    footerNote: 'Ready to begin planning?',
    footerCta: 'Start Your Journey',
};

// ── COMPLAINTS & FEEDBACK ────────────────────────────────────────────────────
export const complaintsContent = {
    hero: {
        tag: 'SUPPORT',
        heading: 'Complaints & Feedback',
        subtitle: 'We want every interaction with Avelora to feel clear, considered and well supported. If something has not met your expectations, please tell us so we can understand what happened and work toward an appropriate resolution.',
    },
    sections: [
        {
            title: 'How to Contact Us',
            body: 'Please contact Avelora Travel by email and include "Complaint" in the subject line. You may also contact us by phone if the matter is urgent while you are travelling.',
        },
        {
            title: 'What to Include',
            body: 'Please provide your name, booking or enquiry reference if applicable, a clear description of the issue, relevant dates, and any supporting information that may help us review the matter.',
        },
        {
            title: 'What Happens Next',
            body: 'We will acknowledge your complaint as soon as reasonably practical, review the information provided and contact any relevant service providers where required. We will keep you informed if we need further information or if the matter requires additional time to investigate.',
        },
        {
            title: 'Our Response',
            body: 'We aim to provide a clear response within a reasonable timeframe, taking into account the nature and complexity of the matter.',
        },
        {
            title: 'If You Are Travelling',
            body: 'If an issue arises during your journey, please contact your Avelora support contact as soon as possible so we have an opportunity to assist while you are travelling.',
        },
        {
            title: 'Further Assistance',
            body: 'If we are unable to resolve the matter directly, we will explain any further options that may be available to you.',
        }
    ],
    contact: {
        email: 'info@aveloratravel.com.au',
        phone: '+61 472 726 456'
    }
};

