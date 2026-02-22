import { Metadata } from 'next';
import JourneyCategoryPage from '@/components/JourneyCategoryPage';

export const metadata: Metadata = {
    title: 'Wellness Collection | Velora Journeys',
    description: 'Rejuvenate body and soul — Ayurvedic retreats, overwater spa rituals, and mindfulness journeys across Sri Lanka and the Maldives.',
};

export default function WellnessPage() {
    return (
        <JourneyCategoryPage
            category="wellness"
            tagline="Restore & Renew"
            title="Wellness"
            titleAccent="Collection"
            intro="Reconnect with yourself through transformative wellness experiences — from ancient Ayurvedic programmes in Sri Lanka to overwater spa sanctuaries in the Maldives."
            heroImage="/images/wellness-hero.jpg"
            features={[
                {
                    title: 'Ayurvedic Healing',
                    description: 'Traditional Ayurvedic treatments with certified practitioners and personalised programmes.',
                },
                {
                    title: 'Yoga & Meditation',
                    description: 'Sunrise sessions overlooking tea fields, ocean decks, and misty mountain peaks.',
                },
                {
                    title: 'Spa Sanctuaries',
                    description: 'Overwater spa pavilions, hot stone therapies, and holistic body treatments.',
                },
            ]}
        />
    );
}
