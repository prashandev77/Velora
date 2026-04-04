import type { Metadata } from 'next';
import MaintenanceScreen from '@/components/MaintenanceScreen';

export const metadata: Metadata = {
    title: 'We’ll be back soon | Avelora Travel',
    description: 'Avelora Travel is temporarily unavailable while we complete scheduled maintenance.',
    robots: { index: false, follow: false },
};

export default function MaintenancePage() {
    return <MaintenanceScreen />;
}
