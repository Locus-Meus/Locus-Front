import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSessionStore } from '@/entities/session';

export const RequireAuth = () => {
  const isAuth = useSessionStore((state) => state.isAuth);
  const location = useLocation();

  // MOCK LOGIC:
  // You can manually go to your browser console and type:
  // useSessionStore.getState().setAuth('fake-token', { id: '1', email: 'test@test.com' })
  // to "unlock" the app.

  if (!isAuth) {
    return <Navigate to='/' state={{ from: location }} replace />;
  }

  return <Outlet />;
};
