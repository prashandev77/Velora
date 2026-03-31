import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import DeletePackageButton from '@/app/admin/packages/components/DeletePackageButton';

const deletePackageMock = vi.fn();
const successToastMock = vi.fn();
const errorToastMock = vi.fn();

vi.mock('@/app/admin/packages/actions', () => ({
    deletePackage: (...args: unknown[]) => deletePackageMock(...args),
}));

vi.mock('@/app/admin/components/ToastProvider', () => ({
    useToast: () => ({
        success: successToastMock,
        error: errorToastMock,
    }),
}));

vi.mock('@/app/admin/components/ConfirmDialog', () => ({
    default: ({
        open,
        onConfirm,
        onCancel,
    }: {
        open: boolean;
        onConfirm: () => void;
        onCancel: () => void;
    }) =>
        open ? (
            <div>
                <button onClick={onCancel}>Cancel</button>
                <button onClick={onConfirm}>Confirm Delete</button>
            </div>
        ) : null,
}));

describe('DeletePackageButton', () => {
    beforeEach(() => {
        deletePackageMock.mockReset();
        successToastMock.mockReset();
        errorToastMock.mockReset();
    });

    it('opens dialog and deletes package on confirmation', async () => {
        const user = userEvent.setup();
        deletePackageMock.mockResolvedValue(undefined);

        render(<DeletePackageButton id="pkg-1" title="Island Escape" />);

        await user.click(screen.getByRole('button', { name: /delete/i }));
        await user.click(screen.getByRole('button', { name: /confirm delete/i }));

        expect(deletePackageMock).toHaveBeenCalledTimes(1);
        expect(successToastMock).toHaveBeenCalled();
    });
});
