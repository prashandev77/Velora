import { Metadata } from 'next';
import JourneyCategoryPage from '@/components/JourneyCategoryPage';

export const metadata: Metadata = {
    title: 'Honeymoon Collection | Velora Journeys',
    description: 'Celebrate your love with romantic escapes, private island retreats, sunset cruises, and intimate experiences across Sri Lanka and the Maldives.',
};

export default function HoneymoonPage() {
    return (
        <JourneyCategoryPage
            category="honeymoon"
            tagline="Romance Redefined"
            title="Honeymoon"
            titleAccent="Collection"
            intro="Celebrate the beginning of your journey together in the world's most romantic destinations. Every moment designed for two, from sunrise yoga to starlit dinners."
            heroImage="/Photos/Other sections/Velora Luxury Honeymoon new.webp"
            features={[
                {
                    title: 'Intimate Escapes',
                    description: 'Private villas, secluded beaches, and couples-only experiences designed for romance.',
                },
                {
                    title: 'Sunset Moments',
                    description: 'Candlelit sandbank dinners, sunset dolphin cruises, and private beach cinema.',
                },
                {
                    title: "Couple's Wellness",
                    description: 'Side-by-side spa treatments, sunrise yoga, and rejuvenating wellness rituals.',
                },
            ]}
        />
    );
}
