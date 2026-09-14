import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { GuideBlock } from '@/lib/types';

interface GuideBlocksProps {
    blocks: GuideBlock[];
}

export default function GuideBlocks({ blocks }: GuideBlocksProps) {
    if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-col gap-12 md:gap-16 pb-16">
            {blocks.map((block, index) => {
                switch (block.type) {
                    case 'hero':
                        return <HeroBlock key={`block-${index}`} block={block} />;
                    case 'rich-text':
                        return <RichTextBlock key={`block-${index}`} block={block} />;
                    case 'gallery':
                        return <GalleryBlock key={`block-${index}`} block={block} />;
                    case 'related-links':
                        return <RelatedLinksBlock key={`block-${index}`} block={block} />;
                    default:
                        console.warn('Unknown block type:', (block as any).type);
                        return null;
                }
            })}
        </div>
    );
}

function HeroBlock({ block }: { block: Extract<GuideBlock, { type: 'hero' }> }) {
    return (
        <div className="relative w-full h-[60vh] min-h-[400px] max-h-[700px] rounded-3xl overflow-hidden group">
            <Image
                src={block.image}
                alt={block.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="100vw"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 max-w-4xl mx-auto text-center">
                {block.subtitle && (
                    <span className="text-gold font-medium tracking-[0.2em] uppercase text-xs md:text-sm mb-4">
                        {block.subtitle}
                    </span>
                )}
                <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl text-white font-bold mb-4 drop-shadow-md leading-tight">
                    {block.title}
                </h1>
                {block.author && (
                    <p className="text-white/80 text-sm mt-4 tracking-wide">
                        By <span className="text-white font-medium">{block.author}</span>
                    </p>
                )}
            </div>
        </div>
    );
}

function RichTextBlock({ block }: { block: Extract<GuideBlock, { type: 'rich-text' }> }) {
    return (
        <div className="max-w-3xl mx-auto px-6 w-full">
            <div 
                className="guide-content prose prose-stone prose-lg md:prose-xl max-w-none 
                    prose-headings:font-heading prose-headings:font-bold prose-headings:text-stone-900 
                    prose-p:text-stone-600 prose-p:leading-relaxed
                    prose-a:text-gold prose-a:no-underline hover:prose-a:text-gold-dark
                    prose-img:rounded-2xl"
                dangerouslySetInnerHTML={{ __html: block.html }}
            />
        </div>
    );
}

function GalleryBlock({ block }: { block: Extract<GuideBlock, { type: 'gallery' }> }) {
    // Determine grid columns based on layout
    const gridClass = {
        '1-up': 'grid-cols-1',
        '2-up': 'grid-cols-1 md:grid-cols-2',
        '3-up': 'grid-cols-1 md:grid-cols-3'
    }[block.layout] || 'grid-cols-1';

    return (
        <div className="max-w-5xl mx-auto px-6 w-full">
            <div className={`grid gap-6 ${gridClass}`}>
                {block.images.map((img, i) => (
                    <div key={i} className="flex flex-col gap-3">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden w-full group">
                            <Image
                                src={img.url}
                                alt={img.caption || `Gallery image ${i + 1}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                        {img.caption && (
                            <p className="text-sm text-stone-500 italic text-center px-4">
                                {img.caption}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

function RelatedLinksBlock({ block }: { block: Extract<GuideBlock, { type: 'related-links' }> }) {
    return (
        <div className="max-w-3xl mx-auto px-6 w-full my-8">
            <div className="bg-stone-50 border border-stone-100 rounded-3xl p-8 md:p-10">
                <h3 className="font-heading text-2xl font-bold text-stone-900 mb-6">Explore Further</h3>
                <div className="flex flex-col gap-4">
                    {block.links.map((link, i) => (
                        <Link 
                            key={i} 
                            href={link.url}
                            className="group flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-stone-100 hover:border-gold/30 hover:shadow-md transition-all duration-300"
                        >
                            <div className="flex-1">
                                <h4 className="font-heading text-xl font-bold text-stone-900 group-hover:text-gold transition-colors mb-1">
                                    {link.title}
                                </h4>
                                {link.description && (
                                    <p className="text-stone-500 text-sm line-clamp-2">
                                        {link.description}
                                    </p>
                                )}
                            </div>
                            <div className="w-10 h-10 shrink-0 rounded-full bg-stone-50 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                                <ArrowRight className="w-5 h-5 text-stone-400 group-hover:text-gold transition-colors" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
