import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import type React from 'react';
import BookClient from '@/app/(public)/book/[id]/BookClient';
import type { Package } from '@/lib/types';

const pushMock = vi.fn();
const createBookingMock = vi.fn();

vi.mock('next/navigation', () => ({
    useRouter: () => ({ push: pushMock }),
}));

vi.mock('@/app/(public)/actions/booking', () => ({
    createBooking: (...args: unknown[]) => createBookingMock(...args),
}));

vi.mock('framer-motion', () => ({
    motion: { div: (props: React.HTMLAttributes<HTMLDivElement>) => <div {...props} /> },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const pkg: Package = {
    id: 'pkg-1',
    slug: 'pkg-1',
    category: 'luxury',
    title: 'Test Journey',
    location: 'Sri Lanka',
    days: 7,
    image_url: '/test.jpg',
    itinerary: [],
};

describe('BookClient', () => {
    beforeEach(() => {
        createBookingMock.mockReset();
        pushMock.mockReset();
    });

    it('prevents moving past step 1 without travel date', async () => {
        render(<BookClient packId={pkg.id} pkg={pkg} />);
        const nextButton = screen.getByRole('button', { name: /next step/i });
        expect(nextButton).toBeDisabled();
    });

    it('submits booking and shows confirmation state', async () => {
        createBookingMock.mockResolvedValue({
            success: true,
            bookingId: 'VJ-123456',
        });

        const user = userEvent.setup();
        render(<BookClient packId={pkg.id} pkg={pkg} />);

        await user.type(screen.getByLabelText(/travel date/i), '2026-12-20');
        await user.click(screen.getAllByRole('button', { name: /next step/i }).at(-1)!);

        const guestInputs = screen.getAllByPlaceholderText(/guest \d+ full name/i);
        await user.type(guestInputs[0], 'Alice');
        await user.type(guestInputs[1], 'Bob');
        await user.click(screen.getAllByRole('button', { name: /next step/i }).at(-1)!);
        await user.click(screen.getAllByRole('button', { name: /next step/i }).at(-1)!);

        await user.click(screen.getByRole('button', { name: /confirm booking/i }));

        expect(createBookingMock).toHaveBeenCalledTimes(1);
        expect(screen.getByText(/booking confirmed/i)).toBeInTheDocument();
        expect(screen.getByText(/VJ-123456/i)).toBeInTheDocument();
    });
});
