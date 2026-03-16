export const metadata = {
    title: 'Website Terms of Use | Velora Journeys',
    description: 'Terms of Use for Velora Journeys.',
};

export default function TermsOfServicePage() {
    return (
        <main className="min-h-screen bg-white pt-32 pb-24">
            <div className="max-w-3xl mx-auto px-6 md:px-12 prose prose-stone prose-headings:font-heading prose-a:text-gold hover:prose-a:text-gold/80">
                <h1 className="text-3xl md:text-5xl font-bold text-stone-900 mb-8 font-heading tracking-tight">Velora Journeys – Website Terms of Use</h1>
                
                <p className="text-stone-600 mb-8 text-lg">
                    By accessing and using this website, you agree to the following terms.
                </p>

                <h2 className="text-2xl font-bold text-stone-800 mt-12 mb-4 font-heading">Website Content</h2>
                <p className="text-stone-600 mb-4">
                    All content on this website including text, images, logos, and design elements are the property of Velora Journeys unless otherwise stated.
                </p>
                <p className="text-stone-600 mb-8">
                    Content may not be reproduced, copied, or distributed without prior written permission.
                </p>

                <h2 className="text-2xl font-bold text-stone-800 mt-12 mb-4 font-heading">Accuracy of Information</h2>
                <p className="text-stone-600 mb-4">
                    We aim to ensure that all information on the website is accurate and up to date. However, travel details such as itineraries, hotel availability, and pricing may change without notice.
                </p>
                <p className="text-stone-600 mb-8">
                    Velora Journeys does not guarantee the completeness or accuracy of all information at all times.
                </p>

                <h2 className="text-2xl font-bold text-stone-800 mt-12 mb-4 font-heading">External Links</h2>
                <p className="text-stone-600 mb-8">
                    Our website may contain links to third-party websites for informational purposes. Velora Journeys is not responsible for the content, policies, or practices of those external websites.
                </p>

                <h2 className="text-2xl font-bold text-stone-800 mt-12 mb-4 font-heading">Limitation of Liability</h2>
                <p className="text-stone-600 mb-8">
                    Velora Journeys shall not be liable for any loss or damages arising from the use of this website or reliance on the information provided.
                </p>

                <h2 className="text-2xl font-bold text-stone-800 mt-12 mb-4 font-heading">Updates</h2>
                <p className="text-stone-600 mb-8">
                    These terms may be updated from time to time without prior notice.
                </p>
            </div>
        </main>
    );
}
