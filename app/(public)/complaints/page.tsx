import Link from 'next/link';

export default function ComplaintsPage() {
    return (
        <main className="min-h-screen bg-[#faf7f2] pt-28 pb-20">
            <div className="max-w-4xl mx-auto px-6 md:px-12 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-stone-100">
                <span className="text-gold text-xs md:text-sm font-medium uppercase tracking-[0.25em] mb-4 block">
                    SUPPORT & LEGAL
                </span>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-stone-900 mb-8">
                    Complaints & Feedback
                </h1>
                
                <div className="prose prose-stone max-w-none text-stone-600 space-y-6">
                    <p>
                        At Avelora Travel, we are committed to providing exceptional experiences. However, we understand that sometimes things may not go exactly as planned. We value your feedback as it helps us continually improve our services.
                    </p>

                    <h2 className="text-xl font-bold text-stone-900 mt-8 mb-4">During Your Journey</h2>
                    <p>
                        If you experience any issues while travelling, we strongly encourage you to raise them immediately. Please contact:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Your private chauffeur-guide (if applicable)</li>
                        <li>The hotel management (for accommodation-related issues)</li>
                        <li>Our 24/7 on-ground support team in Sri Lanka</li>
                    </ul>
                    <p>
                        Addressing concerns promptly on the ground gives us the best opportunity to resolve them and ensure the remainder of your journey is enjoyable.
                    </p>

                    <h2 className="text-xl font-bold text-stone-900 mt-8 mb-4">After Your Journey</h2>
                    <p>
                        If your issue was not resolved during your trip, or if you wish to provide formal feedback or lodge a complaint after you return home, please contact us in writing within 28 days of the completion of your journey.
                    </p>
                    <p>
                        <strong>Email:</strong> feedback@aveloratravel.com<br />
                        <strong>Subject:</strong> Feedback / Complaint - [Your Booking Reference]
                    </p>

                    <h2 className="text-xl font-bold text-stone-900 mt-8 mb-4">Our Commitment</h2>
                    <p>
                        When we receive a formal complaint, we promise to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Acknowledge receipt of your complaint within 2 business days.</li>
                        <li>Conduct a thorough investigation with our local partners and suppliers.</li>
                        <li>Provide a detailed response and proposed resolution within 14 business days (some complex cases may take longer, in which case we will keep you updated).</li>
                    </ul>

                    <div className="mt-12 pt-8 border-t border-stone-100">
                        <p>
                            For general enquiries, please visit our <Link href="/contact" className="text-gold hover:underline">Contact Page</Link>.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
