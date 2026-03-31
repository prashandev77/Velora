import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft,
    CalendarDays,
    Users,
    Hash,
    MessageSquare,
    Mail,
    Phone,
    MapPin,
    Clock,
    Sparkles,
} from 'lucide-react';
import BookingActions from './BookingActions';

const statusColors: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-600 border-amber-200',
    confirmed: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    cancelled: 'bg-gray-100 text-gray-400 border-gray-200',
};

export default async function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: bk } = await supabase.from('bookings').select('*').eq('id', id).single();
    if (!bk) notFound();

    const details = [
        { icon: Hash, label: 'Booking Reference', value: bk.booking_ref },
        { icon: Mail, label: 'Email', value: bk.email || '—' },
        { icon: Phone, label: 'Phone', value: bk.phone || '—' },
        { icon: MapPin, label: 'Departing From', value: bk.departing_city || '—' },
        { icon: CalendarDays, label: 'Travel Month', value: bk.travel_month || '—' },
        { icon: Clock, label: 'Trip Length', value: bk.trip_length || '—' },
        { icon: Users, label: 'Travellers', value: `${bk.guest_count} traveller${bk.guest_count > 1 ? 's' : ''}` },
    ];

    // If this booking came from the /book/[id] flow, show package info
    if (bk.package_title) {
        details.splice(1, 0, { icon: Sparkles, label: 'Journey Package', value: bk.package_title });
    }

    return (
        <div className="max-w-3xl">
            <Link href="/admin/bookings" className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-700 text-sm mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Bookings
            </Link>

            <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-heading">{bk.name || bk.package_title || 'Booking'}</h1>
                    <p className="text-gray-400 text-sm mt-1">
                        Received {new Date(bk.created_at).toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' })}
                    </p>
                </div>
                <span className={`text-xs px-3 py-1.5 rounded-full border font-medium capitalize ${statusColors[bk.status] ?? ''}`}>
                    {bk.status}
                </span>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {details.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="bg-white border border-gray-200/80 rounded-2xl p-4 flex items-start gap-3 shadow-sm">
                        <Icon className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-gray-400 text-xs uppercase tracking-wider mb-1 font-medium">{label}</p>
                            <p className="text-gray-900 text-sm font-medium">{value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Travel Styles */}
            {bk.travel_styles && bk.travel_styles.length > 0 && (
                <div className="bg-white border border-gray-200/80 rounded-2xl p-6 mb-6 shadow-sm">
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-3 font-medium flex items-center gap-2">
                        <Sparkles className="w-4 h-4" /> Travel Interests
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {bk.travel_styles.map((style: string, i: number) => (
                            <span key={i} className="px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium rounded-full">
                                {style}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Special Requests / Message */}
            {(bk.special_requests || bk.message) && (
                <div className="bg-white border border-gray-200/80 rounded-2xl p-6 mb-6 shadow-sm">
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-3 font-medium flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" /> Message
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{bk.message || bk.special_requests}</p>
                </div>
            )}

            {/* Actions */}
            <BookingActions id={bk.id} currentStatus={bk.status} />
        </div>
    );
}

