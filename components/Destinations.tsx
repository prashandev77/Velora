'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Sparkles, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface City {
    name: string;
    intro: string;
    image: string;
    attractions: string[];
    bestTime: string;
}

interface Province {
    id: string;
    name: string;
    intro: string;
    heroImage: string;
    cities: City[];
}

const provinces: Province[] = [
    {
        id: 'North_Central',
        name: 'North Central',
        intro: 'The cultural heartland of ancient Sri Lanka — UNESCO-listed ruins, sacred sites, and the iconic Sigiriya Rock Fortress rising from pristine jungle.',
        heroImage: '/Photos/Hero Slide Photo 1 Sigiriya.jpeg',
        cities: [
            { name: 'Sigiriya', intro: 'The iconic Lion Rock fortress — a marvel of ancient engineering and artistry.', image: '/Photos/Hero Slide Photo 1 Sigiriya.jpeg', attractions: ['Sigiriya Rock Fortress', 'Pidurangala Rock', 'Minneriya National Park'], bestTime: 'Jan – Apr' },
            { name: 'Dambulla', intro: 'Five sacred cave temples adorned with 150+ Buddha statues and ancient murals.', image: '/Photos/Other sections/Destination Dambulla.jpg', attractions: ['Dambulla Cave Temple', 'Golden Temple'], bestTime: 'Jan – Apr' },
            { name: 'Polonnaruwa', intro: 'A medieval capital\'s remarkably preserved stone ruins tell the story of a great kingdom.', image: '/Photos/Other sections/Polonnaruwa.jpeg', attractions: ['Ancient City', 'Gal Vihara'], bestTime: 'May – Sep' },
            { name: 'Anuradhapura', intro: 'One of the world\'s oldest cities — towering dagobas and sacred pilgrimage sites.', image: '/Photos/Other sections/Anuradhapura.jpeg', attractions: ['Sacred Bo Tree', 'Ruwanweli Maha Seya'], bestTime: 'Jan – Apr' },
        ],
    },
    {
        id: 'Central',
        name: 'Central',
        intro: 'Misty highlands, tea-draped hills, and Kandy — the soul of Sri Lanka\'s enchanting hill country filled with colonial charm.',
        heroImage: '/Photos/Other sections/Section 2 _ Classic Discovery.jpeg',
        cities: [
            { name: 'Kandy', intro: 'The hill capital home to the sacred Temple of the Sacred Tooth Relic.', image: '/Photos/Other sections/Our Journeys_Classic Discovery.jpeg', attractions: ['Temple of the Tooth', 'Peradeniya Gardens'], bestTime: 'Jan – Apr' },
            { name: 'Nuwara Eliya', intro: 'Colonial charm at 1,868m — rolling tea plantations and the finest Ceylon tea.', image: '/Photos/Other sections/Nuwara Eliya.jpeg', attractions: ['Tea Factory Tours', 'Horton Plains'], bestTime: 'Mar – May' },
        ],
    },
    {
        id: 'Uva',
        name: 'Uva',
        intro: 'Iconic scenic rail journeys, cascading waterfalls, and the laid-back mountain charm of Ella — Sri Lanka\'s most photogenic province.',
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
            { name: 'Mirissa', intro: 'Premier whale watching in Asia — blue whales, sperm whales, and dolphins.', image: '/Photos/Other sections/Destination Mirissa.jpeg', attractions: ['Whale Watching', 'Coconut Tree Hill'], bestTime: 'Nov – Apr' },
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
            { name: 'Wilpattu', intro: 'Sri Lanka\'s largest national park — famed for natural lakes and leopard density.', image: '/Photos/Other sections/Wild life .jpeg', attractions: ['Wilpattu Safari', 'Villu Lakes', 'Leopard Tracking'], bestTime: 'Feb – Oct' },
        ],
    },
    {
        id: 'Sabaragamuwa',
        name: 'Sabaragamuwa',
        intro: 'Raw adventure through ancient rainforests, white-water rapids, and hidden waterfalls deep in Sri Lanka\'s lush interior.',
        heroImage: '/Photos/Other sections/Water Rafting Kitulgala.jpg',
        cities: [
            { name: 'Kitulgala', intro: 'Adventure capital on the Kelani River — where Bridge on the River Kwai was filmed.', image: '/Photos/Other sections/Water Rafting Kitulgala.jpg', attractions: ['White-Water Rafting', 'Rainforest Trekking'], bestTime: 'Year-round' },
        ],
    },
    {
        id: 'Eastern',
        name: 'Eastern',
        intro: 'Pristine east coast beaches, world-class surf, ancient Hindu temples, and untouched natural beauty off the beaten path.',
        heroImage: '/Photos/Other sections/Section 2 _ Coast.jpeg',
        cities: [
            { name: 'Trincomalee', intro: 'A stunning harbour with sacred Hindu temples perched on dramatic clifftops.', image: '/Photos/Other sections/Section 2 _ Coast.jpeg', attractions: ['Koneswaram Temple', 'Pigeon Island'], bestTime: 'May – Sep' },
            { name: 'Pasikuda', intro: 'One of the calmest beaches in the world — turquoise shallow waters stretching a kilometre.', image: '/Photos/Other sections/Section 2 _ Coast.jpeg', attractions: ['Pasikuda Beach', 'Batticaloa Lagoon'], bestTime: 'Apr – Sep' },
        ],
    },
    {
        id: 'Northern',
        name: 'Northern',
        intro: 'Rich Tamil culture, ancient Hindu temples, unique cuisine, and an untouched northern coastline waiting to be discovered.',
        heroImage: '/Photos/Other sections/jafna culture.jpg',
        cities: [
             { name: 'Jaffna', intro: 'The cultural capital of the Tamil north — ancient temples, unique cuisine, warm hospitality.', image: '/Photos/Other sections/jafna culture.jpg', attractions: ['Nallur Temple', 'Jaffna Fort', 'Nagadeepa Island'], bestTime: 'Feb – Sep' },
        ],
    },
];

export default function Destinations() {
    const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
    const [activeProvince, setActiveProvince] = useState<string | null>(null);
    const svgRef = useRef<HTMLDivElement>(null);
    const [svgLoaded, setSvgLoaded] = useState(false);

    // Display: locked active province takes priority over hover preview
    const displayId = activeProvince ?? hoveredProvince;
    const displayed = provinces.find((p) => p.id === displayId) ?? null;

    // Load and inline the SVG
    useEffect(() => {
        const loadSvg = async () => {
            try {
                const res = await fetch('/Sri_Lanka_Map.svg');
                const text = await res.text();
                if (svgRef.current) {
                    svgRef.current.innerHTML = text;
                    const svg = svgRef.current.querySelector('svg');
                    if (svg) {
                        svg.setAttribute('class', 'w-full h-auto');
                    }

                    const provinceIds = [
                        'Northern', 'North_Central', 'North_Western', 'Eastern',
                        'Central', 'Western', 'Sabaragamuwa', 'Uva', 'Southern',
                    ];

                    provinceIds.forEach((pid) => {
                        const group = svgRef.current?.querySelector(`#${pid}`) as SVGGElement | null;
                        if (!group) return;

                        // Make every path in the group hittable regardless of fill
                        group.querySelectorAll('path').forEach((path) => {
                            path.style.pointerEvents = 'all';
                            // cls-2 has fill:none by default — give it a transparent fill
                            // so it has a hit area while staying visually invisible
                            if (path.classList.contains('cls-2')) {
                                path.style.fill = 'rgba(0,0,0,0)';
                            }
                        });
                    });

                    // Non-province overlays should NOT intercept events
                    const layer2 = svgRef.current.querySelector('#Layer_2') as SVGGElement | null;
                    if (layer2) layer2.style.pointerEvents = 'none';
                    const outline = svgRef.current.querySelector('#Sri_Lanka') as SVGGElement | null;
                    if (outline) outline.style.pointerEvents = 'none';

                    setSvgLoaded(true);
                }
            } catch (e) {
                console.error('Failed to load map SVG:', e);
            }
        };
        loadSvg();
    }, []);

    // Apply styles to provinces
    const applyStyles = useCallback(() => {
        if (!svgRef.current || !svgLoaded) return;
        const provinceIds = ['Northern', 'North_Central', 'North_Western', 'Eastern', 'Central', 'Western', 'Sabaragamuwa', 'Uva', 'Southern'];

        provinceIds.forEach((pid) => {
            const group = svgRef.current?.querySelector(`#${pid}`) as SVGGElement | null;
            if (!group) return;

            const isActive = activeProvince === pid;
            const isHovered = hoveredProvince === pid;
            const isDimmed = (activeProvince !== null && !isActive) || (activeProvince === null && hoveredProvince !== null && !isHovered);

            group.style.cursor = 'pointer';

            const fills = group.querySelectorAll('.cls-1, .cls-3');
            fills.forEach((el) => {
                const pathEl = el as SVGPathElement;
                pathEl.style.transition = 'all 0.35s ease';
                if (isActive) {
                    pathEl.style.fill = 'rgba(201, 169, 110, 0.40)';
                    pathEl.style.opacity = '1';
                } else if (isHovered) {
                    pathEl.style.fill = 'rgba(201, 169, 110, 0.25)';
                    pathEl.style.opacity = '1';
                } else if (isDimmed) {
                    pathEl.style.fill = 'rgba(201, 169, 110, 0.05)';
                    pathEl.style.opacity = '0.4';
                } else {
                    pathEl.style.fill = 'rgba(201, 169, 110, 0.1)';
                    pathEl.style.opacity = '0.8';
                }
            });

            const strokes = group.querySelectorAll('.cls-2');
            strokes.forEach((el) => {
                const pathEl = el as SVGPathElement;
                pathEl.style.transition = 'all 0.35s ease';
                if (isActive) {
                    pathEl.style.stroke = '#c9a96e';
                    pathEl.style.strokeWidth = '3px';
                    pathEl.style.opacity = '1';
                } else if (isHovered) {
                    pathEl.style.stroke = 'rgba(201, 169, 110, 0.8)';
                    pathEl.style.strokeWidth = '2px';
                    pathEl.style.opacity = '1';
                } else if (isDimmed) {
                    pathEl.style.stroke = 'rgba(201, 169, 110, 0.15)';
                    pathEl.style.strokeWidth = '1px';
                    pathEl.style.opacity = '0.4';
                } else {
                    pathEl.style.stroke = 'rgba(201, 169, 110, 0.4)';
                    pathEl.style.strokeWidth = '1.5px';
                    pathEl.style.opacity = '1';
                }
            });

            group.style.filter = isActive
                ? 'drop-shadow(0 0 18px rgba(201, 169, 110, 0.5))'
                : isHovered
                ? 'drop-shadow(0 0 12px rgba(201, 169, 110, 0.3))'
                : 'none';
        });
    }, [activeProvince, hoveredProvince, svgLoaded]);

    useEffect(() => { applyStyles(); }, [applyStyles]);

    // Attach event listeners
    useEffect(() => {
        if (!svgRef.current || !svgLoaded) return;
        const provinceIds = ['Northern', 'North_Central', 'North_Western', 'Eastern', 'Central', 'Western', 'Sabaragamuwa', 'Uva', 'Southern'];
        const handlers: { el: Element; event: string; fn: EventListener }[] = [];

        provinceIds.forEach((pid) => {
            const group = svgRef.current?.querySelector(`#${pid}`);
            if (!group) return;
            const clickHandler = () => setActiveProvince((prev) => prev === pid ? null : pid);
            const enterHandler = () => setHoveredProvince(pid);
            const leaveHandler = () => setHoveredProvince(null);
            group.addEventListener('click', clickHandler);
            group.addEventListener('mouseenter', enterHandler);
            group.addEventListener('mouseleave', leaveHandler);
            handlers.push(
                { el: group, event: 'click', fn: clickHandler },
                { el: group, event: 'mouseenter', fn: enterHandler },
                { el: group, event: 'mouseleave', fn: leaveHandler },
            );
        });

        return () => { handlers.forEach(({ el, event, fn }) => el.removeEventListener(event, fn)); };
    }, [svgLoaded]);

    return (
        <section id="destinations" className="min-h-screen flex flex-col justify-center py-16 md:py-20 bg-[#faf7f2]">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
                {/* Header */}
                <div className="text-center mb-10 md:mb-12">
                    <span className="text-gold text-xs md:text-sm font-medium uppercase tracking-[0.25em] mb-3 block">
                        Our Destinations
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 mb-3">
                        Sri Lanka by Province
                    </h2>
                    <p className="text-stone-400 text-sm max-w-xl mx-auto">
                        Hover to preview · Click a province to pin its details
                    </p>
                </div>

                {/* Split layout — map left / detail right */}
                {/* Fixed height container so section never resizes when switching provinces */}
                <div className="flex flex-col lg:flex-row gap-8" style={{minHeight: '580px'}}>

                    {/* ── Left: Map ── */}
                    <div className="w-full lg:w-5/12 flex flex-col justify-start" style={{height: '580px'}}>
                        {/* Province pill labels */}
                        <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                            {provinces.map((p) => (
                                <button
                                    key={p.id}
                                    onMouseEnter={() => setHoveredProvince(p.id)}
                                    onMouseLeave={() => setHoveredProvince(null)}
                                    onClick={() => setActiveProvince((prev) => prev === p.id ? null : p.id)}
                                    className={`text-[11px] px-3 py-1 rounded-full border transition-all duration-300 ${
                                        activeProvince === p.id
                                            ? 'bg-gold/20 border-gold/50 text-gold'
                                            : hoveredProvince === p.id
                                            ? 'bg-gold/15 border-gold/40 text-gold'
                                            : 'bg-white border-stone-200 text-stone-400 hover:text-stone-700 hover:border-stone-300'
                                    }`}
                                >
                                    {p.name}
                                </button>
                            ))}
                        </div>

                        {/* SVG Map — fixed height, no overflow */}
                        <div
                            ref={svgRef}
                            className="w-full flex justify-center overflow-hidden [&_svg]:max-h-[460px] [&_svg]:w-auto [&_svg]:flex-shrink-0"
                        />
                    </div>

                    {/* ── Right: Province detail — fixed height, scrollable inside ── */}
                    <div className="w-full lg:w-7/12 relative" style={{height: '580px'}}>
                        <AnimatePresence mode="wait">
                            {displayed ? (
                                <motion.div
                                    key={displayed.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                    className="h-full flex flex-col gap-5 overflow-y-auto pr-1"
                                    style={{scrollbarWidth: 'thin', scrollbarColor: 'rgba(201,169,110,0.3) transparent'}}
                                >
                                    {/* Hero image */}
                                    <div className="relative h-52 md:h-60 rounded-2xl overflow-hidden shrink-0">
                                        <Image
                                            src={displayed.heroImage}
                                            alt={displayed.name}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 1024px) 100vw, 58vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/85 via-stone-900/20 to-transparent" />
                                        {/* Lock / close button when pinned */}
                                        {activeProvince && (
                                            <button
                                                onClick={() => setActiveProvince(null)}
                                                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/60 transition-all z-10"
                                                title="Unpin province"
                                            >
                                                <span className="text-xs font-bold">✕</span>
                                            </button>
                                        )}
                                        <div className="absolute bottom-4 left-5 right-5">
                                            <h3 className="font-heading text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                                                {displayed.name} Province
                                            </h3>
                                            <div className="flex items-center gap-1.5 mt-1">
                                                <MapPin className="w-3.5 h-3.5 text-gold" />
                                                <span className="text-white/75 text-xs">
                                                    {displayed.cities.length} {displayed.cities.length === 1 ? 'destination' : 'destinations'}
                                                </span>
                                                {activeProvince && (
                                                    <span className="ml-2 text-[10px] bg-gold/20 text-gold border border-gold/30 px-2 py-0.5 rounded-full">
                                                        Pinned
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Intro */}
                                    <p className="text-stone-600 text-sm md:text-base leading-relaxed">
                                        {displayed.intro}
                                    </p>

                                    {/* Cities grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {displayed.cities.map((city: { name: string; image: string; intro: string; bestTime: string; attractions: string[] }) => (
                                            <div
                                                key={city.name}
                                                className="bg-white border border-stone-100 rounded-xl p-4 hover:border-gold/20 hover:shadow-sm transition-all duration-300"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                                                        <Image
                                                            src={city.image}
                                                            alt={city.name}
                                                            fill
                                                            className="object-cover"
                                                            sizes="48px"
                                                        />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="font-semibold text-stone-900 text-sm">{city.name}</p>
                                                        <p className="text-stone-400 text-xs mt-0.5 line-clamp-2">{city.intro}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-stone-50">
                                                    <Calendar className="w-3 h-3 text-gold shrink-0" />
                                                    <span className="text-stone-400 text-[11px]">Best: {city.bestTime}</span>
                                                    <div className="flex flex-wrap gap-1 ml-auto">
                                                        {city.attractions.slice(0, 1).map((a: string) => (
                                                            <span key={a} className="text-[10px] bg-stone-50 border border-stone-100 text-stone-500 px-2 py-0.5 rounded-md">{a}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA */}
                                    <div className="flex items-center gap-4 pt-1">
                                        <Link
                                            href="/contact"
                                            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-all hover:shadow-lg hover:shadow-gold/20"
                                        >
                                            Plan a Journey Here <ArrowRight className="w-4 h-4" />
                                        </Link>
                                        <Link
                                            href="/destinations"
                                            className="text-stone-500 hover:text-stone-800 text-sm font-medium transition-colors flex items-center gap-1"
                                        >
                                            Full guide <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="h-full flex flex-col items-center justify-center text-center p-8 overflow-hidden"
                                >
                                    {/* Decorative map icon */}
                                    <div className="w-20 h-20 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-center mb-5">
                                        <Sparkles className="w-8 h-8 text-gold/50" />
                                    </div>
                                    <p className="font-heading text-xl font-semibold text-stone-700 mb-2">
                                        Explore Sri Lanka
                                    </p>
                                    <p className="text-stone-400 text-sm max-w-xs leading-relaxed">
                                        Hover over any province on the map or a label above to discover its destinations and curated experiences.
                                    </p>

                                    {/* Province list preview */}
                                    <div className="mt-6 flex flex-wrap gap-2 justify-center max-w-sm">
                                        {provinces.map((p) => (
                                            <button
                                                key={p.id}
                                                onMouseEnter={() => setHoveredProvince(p.id)}
                                                onMouseLeave={() => setHoveredProvince(null)}
                                                className="text-xs bg-white border border-stone-100 text-stone-500 px-3 py-1.5 rounded-full hover:border-gold/30 hover:text-gold transition-all"
                                            >
                                                {p.name}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
