import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui';
import { ResetPasswordForm } from '@/features/auth';
import { LanguageSwitcher } from '@/shared/ui/language-switcher';

export function ResetPasswordPage() {
  const { t } = useTranslation();

  return (
    <main className='mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-4 py-8'>
      <LanguageSwitcher className='mb-4 self-end' />
      <Card className='w-full max-w-md self-center'>
        <CardHeader>
          <CardTitle>{t('auth.resetPassword.title')}</CardTitle>
          <CardDescription>
            {t('auth.resetPassword.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm />
        </CardContent>
      </Card>
    </main>
  );
}
