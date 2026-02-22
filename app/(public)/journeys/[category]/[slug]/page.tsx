import { packages, getPackageBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import PackageDetail from './PackageDetail';

interface PageProps {
    params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
    return packages.map((p) => ({
        category: p.category,
        slug: p.slug,
    }));
}

export async function generateMetadata({ params }: PageProps) {
    const { category, slug } = await params;
    const pkg = getPackageBySlug(category, slug);
    if (!pkg) return { title: 'Package Not Found | Velora Journeys' };
    return {
        title: `${pkg.title} | Velora Journeys`,
        description: pkg.description,
    };
}

export default async function PackagePage({ params }: PageProps) {
    const { category, slug } = await params;
    const pkg = getPackageBySlug(category, slug);
    if (!pkg) notFound();
    return <PackageDetail pkg={pkg!} />;
}
