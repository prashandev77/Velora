import { Metadata } from 'next';
import JourneyCategoryPage from '@/components/JourneyCategoryPage';

export const metadata: Metadata = {
    title: 'Luxury Collection | Velora Journeys',
    description: 'Indulge in handcrafted luxury — private villas, curated fine dining, and exclusive access to the most extraordinary places in Sri Lanka and the Maldives.',
};

export default function LuxuryPage() {
    return (
        <JourneyCategoryPage
            category="luxury"
            tagline="Ultimate Refinement"
            title="Luxury"
            titleAccent="Collection"
            intro="Experience travel at its finest. Every detail curated, every moment extraordinary — from private overwater villas to bespoke cultural immersions."
            heroImage="/images/luxury-hero.jpg"
            features={[
                {
                    title: 'Private Villas',
                    description: 'Handpicked overwater and beachfront villas at the world\'s most exclusive resorts.',
                },
                {
                    title: 'Curated Dining',
                    description: 'Private chef experiences, underwater dining, and sandbank gourmet under the stars.',
                },
                {
                    title: 'Exclusive Access',
                    description: 'Private island excursions, VIP transfers, and behind-the-scenes cultural experiences.',
                },
            ]}
        />
    );
}
