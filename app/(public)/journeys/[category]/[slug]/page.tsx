import { getAllPackages, getPackageBySlug, getPackageRouteParams } from '@/lib/data';
import { notFound } from 'next/navigation';
import PackageDetail from './PackageDetail';

interface PageProps {
    params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
    const routeParams = await getPackageRouteParams();
    return routeParams.map((p) => ({
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
    const pkg = await getPackageBySlug(category, slug);
    if (!pkg) notFound();

    const allPkgs = await getAllPackages();

    const relatedPackages = allPkgs
        .filter((p) => p.category === pkg.category && p.id !== pkg.id)
        .concat(allPkgs.filter((p) => p.category !== pkg.category && p.id !== pkg.id))
        .slice(0, 2);

    return <PackageDetail pkg={pkg} relatedPackages={relatedPackages} />;
}
