import { getPackageById, getAllPackages } from '@/lib/data';
import { notFound } from 'next/navigation';
import BookClient from './BookClient';

// Generate static paths for all packages
export async function generateStaticParams() {
    const packages = await getAllPackages();
    return packages.map((pkg) => ({
        id: pkg.id,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const pkg = await getPackageById(id);
    if (!pkg) return { title: 'Package Not Found | Velora Journeys' };
    return {
        title: `Book ${pkg.title} | Velora Journeys`,
        description: `Book your ${pkg.title} experience with Velora Journeys.`,
    };
}

export default async function BookingPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const pkg = await getPackageById(id);
    
    if (!pkg) notFound();

    return <BookClient packId={id} pkg={pkg} />;
}
