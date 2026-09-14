export default function BookingTermsPage() {
    return (
        <main className="min-h-screen bg-[#faf7f2] pt-28 pb-20">
            <div className="max-w-4xl mx-auto px-6 md:px-12 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-stone-100">
                <span className="text-gold text-xs md:text-sm font-medium uppercase tracking-[0.25em] mb-4 block">
                    LEGAL
                </span>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-stone-900 mb-8">
                    Booking Terms & Conditions
                </h1>
                
                <div className="prose prose-stone max-w-none text-stone-600 space-y-6">
                    <p className="text-sm">Last updated: August 2026</p>
                    
                    <p>
                        Please read these booking terms and conditions carefully as they form the basis of your contract with Avelora Travel. 
                        By making a booking with us, you acknowledge that you have read, understood and agree to be bound by these terms.
                    </p>

                    <h2 className="text-xl font-bold text-stone-900 mt-8 mb-4">1. Booking & Payment</h2>
                    <p>
                        A deposit of 20% of the total journey cost is required to secure your booking. 
                        The remaining balance is due 14 days prior to your departure date. If your booking is made within 14 days of departure, full payment is required at the time of booking.
                    </p>
                    <p>
                        Quotations are subject to availability and may change until the deposit is received and the booking is confirmed in writing by Avelora Travel.
                    </p>

                    <h2 className="text-xl font-bold text-stone-900 mt-8 mb-4">2. Cancellations & Amendments</h2>
                    <p>
                        If you need to cancel or amend your booking, you must notify us in writing. Cancellation fees apply as follows:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>More than 30 days before departure: Loss of deposit</li>
                        <li>15 to 30 days before departure: 50% of the total journey cost</li>
                        <li>14 days or less before departure: 100% of the total journey cost</li>
                    </ul>
                    <p>
                        We strongly recommend purchasing comprehensive travel insurance that includes cancellation cover.
                    </p>

                    <h2 className="text-xl font-bold text-stone-900 mt-8 mb-4">3. Passports, Visas & Health</h2>
                    <p>
                        It is your responsibility to ensure you have a valid passport (with at least six months validity from your return date), necessary visas, and required vaccinations for your destination.
                        While we may provide guidance, Avelora Travel cannot be held responsible if you are denied entry due to incorrect documentation.
                    </p>

                    <h2 className="text-xl font-bold text-stone-900 mt-8 mb-4">4. Travel Insurance</h2>
                    <p>
                        Comprehensive travel insurance is a mandatory requirement for travelling with Avelora Travel. 
                        Your policy must cover medical expenses, emergency repatriation, cancellation, and personal liability.
                    </p>

                    <h2 className="text-xl font-bold text-stone-900 mt-8 mb-4">5. Force Majeure</h2>
                    <p>
                        Avelora Travel shall not be liable for any failure or delay in performing its obligations where such failure or delay results from any cause that is beyond its reasonable control. Such causes include, but are not limited to: power failure, Internet Service Provider failure, industrial action, civil unrest, fire, flood, storms, earthquakes, acts of terrorism, acts of war, governmental action or any other event that is beyond the control of the party in question.
                    </p>
                </div>
            </div>
        </main>
    );
}
