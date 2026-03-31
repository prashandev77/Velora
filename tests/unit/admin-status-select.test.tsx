import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import StatusSelect from '@/app/admin/bookings/components/StatusSelect';

vi.mock('@/app/admin/bookings/actions', () => ({
    updateBookingStatus: vi.fn(),
}));

describe('StatusSelect', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('resets value when user cancels confirmation', () => {
        vi.spyOn(window, 'confirm').mockReturnValue(false);
        render(<StatusSelect id="b-1" currentStatus="pending" />);

        const select = screen.getByRole('combobox') as HTMLSelectElement;
        fireEvent.change(select, { target: { value: 'confirmed' } });

        expect(select.value).toBe('pending');
    });

    it('submits form when user confirms status change', () => {
        vi.spyOn(window, 'confirm').mockReturnValue(true);
        const submitSpy = vi.spyOn(HTMLFormElement.prototype, 'requestSubmit').mockImplementation(() => {});
        render(<StatusSelect id="b-2" currentStatus="pending" />);

        const select = screen.getByRole('combobox');
        fireEvent.change(select, { target: { value: 'confirmed' } });

        expect(submitSpy).toHaveBeenCalledTimes(1);
    });
});
