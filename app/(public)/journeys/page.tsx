import { Metadata } from 'next';
import { getAllPackages } from '@/lib/data';
import JourneysClient from './JourneysClient';

export const metadata: Metadata = {
    title: 'Journeys | Avelora Travel',
    description: 'Explore our curated collection of luxury travel journeys across Sri Lanka and the Maldives.',
};

export default async function JourneysPage() {
    const packages = await getAllPackages();
    return <JourneysClient packages={packages} />;
}
