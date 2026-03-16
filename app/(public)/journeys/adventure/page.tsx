import { Metadata } from 'next';
import JourneyCategoryPage from '@/components/JourneyCategoryPage';

export const metadata: Metadata = {
    title: 'Adventure Collection | Velora Journeys',
    description: 'Trek ancient fortresses, safari through leopard country, dive pristine reefs, and ride the world\'s most scenic trains across Sri Lanka and the Maldives.',
};

export default function AdventurePage() {
    return (
        <JourneyCategoryPage
            category="adventure"
            tagline="Beyond Boundaries"
            title="Adventure"
            titleAccent="Collection"
            intro="For those who crave discovery, from the ancient rock fortress of Sigiriya to world-class dive sites in the Maldives. Every day brings a new frontier of excitement."
            heroImage="/images/sigiriya.jpg"
            features={[
                {
                    title: 'Wildlife Safaris',
                    description: 'Leopard tracking at Yala, elephant gatherings at Minneriya, and whale watching off Mirissa.',
                },
                {
                    title: 'Heritage Treks',
                    description: 'Climb Sigiriya Rock, explore Polonnaruwa ruins, and hike Knuckles Mountain Range.',
                },
                {
                    title: 'Ocean Exploration',
                    description: 'Dive manta ray points, explore shipwrecks, and snorkel pristine coral gardens.',
                },
            ]}
        />
    );
}
