'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Map, Star, Calendar } from 'lucide-react';

const stats = [
    { icon: Users, label: 'Happy Travelers', value: 12500, suffix: '+' },
    { icon: Map, label: 'Destinations', value: 45, suffix: '+' },
    { icon: Star, label: 'Five-Star Reviews', value: 4800, suffix: '+' },
    { icon: Calendar, label: 'Years of Excellence', value: 15, suffix: '' },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let start = 0;
        const duration = 2000;
        const stepTime = Math.max(Math.floor(duration / target), 10);
        const increment = Math.ceil(target / (duration / stepTime));

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [isInView, target]);

    return (
        <span ref={ref}>
            {count.toLocaleString()}
            {suffix}
        </span>
    );
}

export default function StatsBar() {
    return (
        <section className="relative py-20 bg-ocean overflow-hidden">
            {/* Decorative */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoLTZWMzBoNnYtNmg2djZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />

            <div className="relative max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-center"
                        >
                            <stat.icon className="w-7 h-7 text-gold mx-auto mb-3" />
                            <p className="font-heading text-3xl md:text-4xl font-bold text-white mb-1">
                                <Counter target={stat.value} suffix={stat.suffix} />
                            </p>
                            <p className="text-white/50 text-sm">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
