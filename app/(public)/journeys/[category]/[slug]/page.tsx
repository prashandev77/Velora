import { getAllPackages, getPackageBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import PackageDetail from './PackageDetail';

interface PageProps {
    params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
    const packages = await getAllPackages();
    return packages.map((p) => ({
        category: p.category,
        slug: p.slug,
    }));
}

export async function generateMetadata({ params }: PageProps) {
    const { category, slug } = await params;
    const pkg = await getPackageBySlug(category, slug);
    if (!pkg) return { title: 'Package Not Found | Velora Journeys' };
    return {
        title: `${pkg.title} | Velora Journeys`,
        description: pkg.description,
    };
}

export default async function PackagePage({ params }: PageProps) {
    const { category, slug } = await params;
    const allPkgs = await getAllPackages();
    const pkg = allPkgs.find((p) => p.category === category && p.slug === slug);
    if (!pkg) notFound();

    const relatedPackages = allPkgs
        .filter((p) => p.category === pkg.category && p.id !== pkg.id)
        .concat(allPkgs.filter((p) => p.category !== pkg.category && p.id !== pkg.id))
        .slice(0, 2);

    return <PackageDetail pkg={pkg} relatedPackages={relatedPackages} />;
}
