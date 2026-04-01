import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import StatusSelect from '@/app/admin/bookings/components/StatusSelect';

const updateBookingStatusMock = vi.fn();
const refreshMock = vi.fn();

vi.mock('next/navigation', () => ({
    useRouter: () => ({ refresh: refreshMock, push: vi.fn() }),
}));

vi.mock('@/app/admin/bookings/actions', () => ({
    updateBookingStatus: (...args: unknown[]) => updateBookingStatusMock(...args),
}));

vi.mock('@/app/admin/components/ToastProvider', () => ({
    useToast: () => ({
        success: vi.fn(),
        error: vi.fn(),
        toast: vi.fn(),
        warning: vi.fn(),
        info: vi.fn(),
    }),
}));

vi.mock('@/app/admin/components/ConfirmDialog', () => ({
    default: ({
        open,
        onConfirm,
        onCancel,
        confirmLabel,
    }: {
        open: boolean;
        onConfirm: () => void;
        onCancel: () => void;
        confirmLabel?: string;
    }) =>
        open ? (
            <div data-testid="confirm-dialog">
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
                <button type="button" onClick={onConfirm}>
                    {confirmLabel ?? 'Confirm'}
                </button>
            </div>
        ) : null,
}));

describe('StatusSelect', () => {
    beforeEach(() => {
        updateBookingStatusMock.mockReset();
        refreshMock.mockReset();
        updateBookingStatusMock.mockResolvedValue(undefined);
    });

    it('keeps value when user cancels confirmation', async () => {
        const user = userEvent.setup();
        render(<StatusSelect id="b-1" currentStatus="pending" />);

        const select = screen.getByRole('combobox') as HTMLSelectElement;
        await user.selectOptions(select, 'confirmed');
        await user.click(screen.getByRole('button', { name: /cancel/i }));

        expect(select.value).toBe('pending');
        expect(updateBookingStatusMock).not.toHaveBeenCalled();
    });

    it('calls updateBookingStatus when user confirms status change', async () => {
        const user = userEvent.setup();
        render(<StatusSelect id="b-2" currentStatus="pending" />);

        const select = screen.getByRole('combobox');
        await user.selectOptions(select, 'confirmed');
        await user.click(screen.getByRole('button', { name: /update status/i }));

        expect(updateBookingStatusMock).toHaveBeenCalledTimes(1);
        const fd = updateBookingStatusMock.mock.calls[0][0] as FormData;
        expect(fd.get('id')).toBe('b-2');
        expect(fd.get('status')).toBe('confirmed');
        expect(refreshMock).toHaveBeenCalled();
    });
});
