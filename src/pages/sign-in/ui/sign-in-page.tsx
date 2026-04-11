import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui';
import { SignInForm } from '@/features/auth';
import { LanguageSwitcher } from '@/shared/ui/language-switcher';

export function SignInPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const registrationSucceeded = searchParams.get('registered') === '1';

  return (
    <main className='mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-4 py-8'>
      <div className='mb-4 self-end'>
        <LanguageSwitcher />
      </div>

      <Card className='w-full max-w-md self-center bg-card/95 shadow-lg'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold tracking-tight'>
            {t('auth.signIn.title')}
          </CardTitle>
          <CardDescription>{t('auth.signIn.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          {registrationSucceeded && (
            <div className='mb-4 rounded-md border border-primary/40 bg-primary/10 px-3 py-2 text-sm text-primary animate-in fade-in'>
              {t('auth.signIn.registrationSuccess')}
            </div>
          )}
          <SignInForm />
        </CardContent>
      </Card>
    </main>
  );
}
