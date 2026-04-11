import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/* FSD Imports */
import { authApi } from '../api/auth-api';
import { Button, Input, Label } from '@/shared/ui';

function toErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export function ResetPasswordForm() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isPending || !email) return;

    setIsPending(true);
    setError(null);
    setSuccess(null);

    try {
      const csrfToken = await authApi.getCsrfToken();
      await authApi.requestPasswordReset({ email }, csrfToken);
      setSuccess(t('auth.resetPassword.ifExists'));
    } catch (requestError) {
      const message = toErrorMessage(requestError);

      // Typical Java backend behavior: if the endpoint isn't mapped, it returns 404
      if (message.includes('404')) {
        setSuccess(t('auth.resetPassword.endpointUnavailable'));
      } else {
        setError(message || t('auth.resetPassword.failure'));
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form className='space-y-4' onSubmit={handleSubmit}>
      <div className='space-y-2'>
        <Label htmlFor='reset-email'>{t('auth.fields.accountEmail')}</Label>
        <Input
          id='reset-email'
          type='email'
          placeholder='you@example.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isPending}
        />
      </div>

      {error && (
        <div className='rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive animate-in fade-in'>
          {error}
        </div>
      )}

      {success && (
        <div className='rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-primary animate-in fade-in'>
          {success}
        </div>
      )}

      <Button className='w-full' type='submit' disabled={isPending || !email}>
        {isPending
          ? t('auth.resetPassword.submitting')
          : t('auth.resetPassword.submit')}
      </Button>

      <p className='text-center text-sm text-muted-foreground'>
        {t('auth.resetPassword.rememberedPassword')}{' '}
        <Link
          className='font-semibold text-primary hover:underline'
          to='/sign-in'
        >
          {t('common.backToSignIn')}
        </Link>
      </p>
    </form>
  );
}
