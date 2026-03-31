import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import BookingActions from '@/app/admin/bookings/[id]/BookingActions';

const pushMock = vi.fn();
const updateBookingStatusMock = vi.fn();
const deleteBookingMock = vi.fn();

vi.mock('next/navigation', () => ({
    useRouter: () => ({ push: pushMock }),
}));

vi.mock('@/app/admin/bookings/actions', () => ({
    updateBookingStatus: (...args: unknown[]) => updateBookingStatusMock(...args),
    deleteBooking: (...args: unknown[]) => deleteBookingMock(...args),
}));

describe('BookingActions', () => {
    beforeEach(() => {
        pushMock.mockReset();
        updateBookingStatusMock.mockReset();
        deleteBookingMock.mockReset();
        vi.restoreAllMocks();
    });

    it('deletes booking and navigates back when confirmed', async () => {
        vi.spyOn(window, 'confirm').mockReturnValue(true);
        const user = userEvent.setup();
        render(<BookingActions id="booking-1" currentStatus="pending" />);

        await user.click(screen.getByRole('button', { name: /delete/i }));

        expect(deleteBookingMock).toHaveBeenCalledTimes(1);
        expect(pushMock).toHaveBeenCalledWith('/admin/bookings');
    });
});
