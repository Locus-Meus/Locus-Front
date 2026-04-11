import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { RequireAuth } from './require-auth';

// FSD: Import pages from their public API (index.ts)
// We will create these index files next to avoid errors
import { SignInPage } from '@/pages/sign-in';
import { SignUpPage } from '@/pages/sign-up';
import { GalleryPage } from '@/pages/gallery';
import { PkcePage } from '@/pages/pkce';
import { CallbackPage } from '@/pages/callback';
import { ResetPasswordPage } from '@/pages/reset-password';

const router = createBrowserRouter([
  // Public Routes
  { path: '/sign-in', element: <SignInPage /> },
  { path: '/sign-up', element: <SignUpPage /> },
  { path: '/reset-password', element: <ResetPasswordPage /> },
  { path: '/pkce', element: <PkcePage /> },
  { path: '/callback', element: <CallbackPage /> },

  {
    element: <RequireAuth />,
    children: [
      { path: '/gallery', element: <GalleryPage /> },
      // The root path redirects to gallery for authenticated users
      { path: '/', element: <Navigate to='/gallery' replace /> },
    ],
  },

  { path: '*', element: <Navigate to='/gallery' replace /> },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
