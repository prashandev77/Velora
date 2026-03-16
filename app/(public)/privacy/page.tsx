import Link from 'next/link';

export const metadata = {
    title: 'Privacy Policy | Velora Journeys',
    description: 'Privacy Policy for Velora Journeys.',
};

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-white pt-32 pb-24">
            <div className="max-w-3xl mx-auto px-6 md:px-12 prose prose-stone prose-headings:font-heading prose-a:text-gold hover:prose-a:text-gold/80">
                <h1 className="text-3xl md:text-5xl font-bold text-stone-900 mb-8 font-heading tracking-tight">Velora Journeys – Privacy Policy</h1>
                
                <p className="text-stone-600 mb-8">
                    Velora Journeys respects your privacy and is committed to protecting the personal information you provide when using our website or contacting us regarding travel services.
                </p>

                <h2 className="text-2xl font-bold text-stone-800 mt-12 mb-4 font-heading">Information We Collect</h2>
                <p className="text-stone-600 mb-4">When you submit an enquiry, request a proposal, or contact us through our website, we may collect the following information:</p>
                <ul className="list-disc pl-6 text-stone-600 mb-8 space-y-2">
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Travel dates and preferences</li>
                    <li>Number of travellers</li>
                    <li>Any other information you provide in your message</li>
                </ul>

                <h2 className="text-2xl font-bold text-stone-800 mt-12 mb-4 font-heading">How We Use Your Information</h2>
                <p className="text-stone-600 mb-4">Your information is used only for the purpose of:</p>
                <ul className="list-disc pl-6 text-stone-600 mb-6 space-y-2">
                    <li>Responding to travel enquiries</li>
                    <li>Preparing customised travel proposals</li>
                    <li>Arranging travel services such as hotels, transport, and experiences</li>
                    <li>Communicating important updates related to your travel plans</li>
                </ul>
                <p className="text-stone-600 mb-6">
                    We may share necessary booking information with trusted travel partners such as hotels, guides, transport providers, or local tour operators in order to deliver your requested travel services.
                </p>
                <p className="text-stone-600 mb-8 font-medium">
                    Velora Journeys does not sell, rent, or distribute your personal information to third parties for marketing purposes.
                </p>

                <h2 className="text-2xl font-bold text-stone-800 mt-12 mb-4 font-heading">Website Analytics & Cookies</h2>
                <p className="text-stone-600 mb-4">
                    Our website may use cookies or analytics tools to help us understand how visitors use the website and to improve user experience.
                </p>
                <p className="text-stone-600 mb-8">
                    These tools do not collect sensitive personal information.
                </p>

                <h2 className="text-2xl font-bold text-stone-800 mt-12 mb-4 font-heading">Data Protection</h2>
                <p className="text-stone-600 mb-8">
                    We take reasonable steps to protect your personal information from unauthorised access, misuse, or disclosure.
                </p>

                <h2 className="text-2xl font-bold text-stone-800 mt-12 mb-4 font-heading">Contact</h2>
                <p className="text-stone-600 mb-8">
                    If you have any questions regarding this Privacy Policy, please contact us at:{' '}
                    <a href="mailto:info@velorajourneys.com" className="font-medium text-gold">info@velorajourneys.com</a>
                </p>
            </div>
        </main>
    );
}
