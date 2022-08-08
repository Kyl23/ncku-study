import { fireEvent, screen } from '@testing-library/react';

import GlobalLayout from '@/components/GlobalLayout';
import globalLayoutRender from '@/tests/utils/globalLayoutRender';
import routerMockProps from '@/tests/utils/routerMockProps';
import { Mode, userSession } from '@/tests/utils/userSession';

const pushedRoute = jest.fn();
const pathnameMock = jest.fn().mockReturnValue('/');

jest.mock('next/router', () => ({
    useRouter: () => ({
        ...routerMockProps,
        pathname: pathnameMock(),
        push: pushedRoute,
    }),
}));

describe('GlobalLayout', () => {
    it('renders default layout and redirect after clicking', () => {
        pathnameMock.mockReturnValue('/');
        globalLayoutRender(<GlobalLayout />, {
            user: { ...userSession, isLoggedIn: false },
        });

        fireEvent.click(screen.getByRole('button', { name: '我要分享' }));
        expect(pushedRoute.mock.calls[0][0]).toEqual('/post');

        fireEvent.click(screen.getByRole('button', { name: '學業心得' }));
        expect(pushedRoute.mock.calls[1][0]).toEqual('/study');

        fireEvent.click(screen.getByRole('button', { name: '轉輔雙主' }));
        expect(pushedRoute.mock.calls[2][0]).toEqual('/');
    });

    it('renders admin layout before signed in', () => {
        pathnameMock.mockReturnValue('/admin/login');
        globalLayoutRender(<GlobalLayout />, {
            user: { ...userSession, isLoggedIn: false, mode: Mode.admin },
        });

        expect(
            screen.getByRole('button', { name: '回到首頁' })
        ).toBeInTheDocument();
    });

    it('renders admin layout after signed in (user mode)', () => {
        pathnameMock.mockReturnValue('/admin');
        globalLayoutRender(<GlobalLayout />, {
            user: { ...userSession, isLoggedIn: true, mode: Mode.normal },
        });

        expect(
            screen.getByRole('button', { name: '登出' })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: '進入後台' })
        ).toBeInTheDocument();
    });

    it('renders admin layout after signed in (admin mode)', () => {
        pathnameMock.mockReturnValue('/admin');
        globalLayoutRender(<GlobalLayout />, {
            user: { ...userSession, isLoggedIn: true, mode: Mode.admin },
        });

        expect(
            screen.getByRole('button', { name: '登出' })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: '回到首頁' })
        ).toBeInTheDocument();
    });
});
