import { createClient } from '@/utils/supabase/server';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, Calendar, Users, MessageSquare } from 'lucide-react';
import { updateInquiryStatus, deleteInquiry } from '../actions';

const statusColors: Record<string, string> = {
    new: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
    read: 'bg-white/10 text-white/50 border-white/10',
    replied: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
    closed: 'bg-white/5 text-white/30 border-white/5',
};

export default async function InquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: inq } = await supabase.from('inquiries').select('*').eq('id', id).single();
    if (!inq) notFound();

    // Mark as read if new
    if (inq.status === 'new') {
        await supabase.from('inquiries').update({ status: 'read' }).eq('id', id);
    }

    const details = [
        { icon: Mail, label: 'Email', value: inq.email },
        { icon: Phone, label: 'Phone', value: inq.phone || '—' },
        { icon: Calendar, label: 'Travel Month', value: inq.travel_month || '—' },
        { icon: Users, label: 'Travellers', value: inq.num_travelers || '—' },
        { icon: MessageSquare, label: 'Travel Style', value: inq.travel_style || '—' },
    ];

    return (
        <div className="max-w-3xl">
            <Link href="/admin/inquiries" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Inquiries
            </Link>

            <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white font-heading">{inq.name}</h1>
                    <p className="text-white/40 text-sm mt-1">
                        Received {new Date(inq.created_at).toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' })}
                    </p>
                </div>
                <span className={`text-xs px-3 py-1.5 rounded-full border font-medium ${statusColors[inq.status] ?? ''}`}>
                    {inq.status}
                </span>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {details.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3">
                        <Icon className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{label}</p>
                            <p className="text-white text-sm">{value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Message */}
            {inq.message && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Message</p>
                    <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">{inq.message}</p>
                </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 flex-wrap">
                <form action={updateInquiryStatus}>
                    <input type="hidden" name="id" value={inq.id} />
                    <div className="flex items-center gap-2">
                        <Select name="status" defaultValue={inq.status} />
                        <SubmitStatusButton />
                    </div>
                </form>

                <a
                    href={`mailto:${inq.email}?subject=Your Velora Journeys Enquiry&body=Dear ${inq.name.split(' ')[0]},%0A%0A`}
                    className="flex items-center gap-2 bg-ocean/20 hover:bg-ocean/30 border border-ocean/30 text-ocean text-sm font-medium px-4 py-2 rounded-xl transition-all"
                >
                    <Mail className="w-4 h-4" /> Reply by Email
                </a>

                <form action={async (fd) => {
                    'use server';
                    await deleteInquiry(fd);
                    redirect('/admin/inquiries');
                }}>
                    <input type="hidden" name="id" value={inq.id} />
                    <button className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-sm font-medium px-4 py-2 rounded-xl transition-all">
                        Delete
                    </button>
                </form>
            </div>
        </div>
    );
}

// Small helpers (can't use shadcn select in server component context)
function Select({ name, defaultValue }: { name: string; defaultValue: string }) {
    return (
        <select name={name} defaultValue={defaultValue} className="bg-white/5 border border-white/10 rounded-xl text-white text-sm px-3 py-2 focus:outline-none focus:border-gold/40">
            {['new', 'read', 'replied', 'closed'].map((s) => (
                <option key={s} value={s} className="bg-[#161820]">{s}</option>
            ))}
        </select>
    );
}

function SubmitStatusButton() {
    return (
        <button type="submit" className="bg-gold/90 hover:bg-gold text-deep text-sm font-semibold px-4 py-2 rounded-xl transition-all">
            Update Status
        </button>
    );
}
