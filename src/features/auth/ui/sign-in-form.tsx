import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { loginUser } from '../model/login-user';

import { Button, Input, Label } from '@/shared/ui';

/**
 * Utility for extraction error messages
 */
function toErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

export function SignInForm() {
  const { t } = useTranslation();

  /* Form State */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /* Status State */
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return email.length > 0 && password.length > 0 && !isPending;
  }, [email, password, isPending]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;

    setIsPending(true);
    setError(null);

    try {
      await loginUser(email, password);
    } catch (err) {
      setError(toErrorMessage(err) || t('auth.signIn.unexpectedError'));
      setIsPending(false);
    }
  };
  return (
    <form className='space-y-4' onSubmit={handleSubmit}>
      <div className='space-y-2'>
        <Label htmlFor='email'>{t('auth.fields.email')}</Label>
        <Input
          id='email'
          type='email'
          placeholder='you@example.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isPending}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='password'>{t('auth.fields.password')}</Label>
        <Input
          id='password'
          type='password'
          placeholder='••••••••'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isPending}
        />
      </div>

      {error && (
        <div className='rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive animate-in fade-in zoom-in-95'>
          {error}
        </div>
      )}

      <Button className='w-full' type='submit' disabled={!canSubmit}>
        {isPending ? t('auth.signIn.submitting') : t('auth.signIn.submit')}
      </Button>

      <div className='text-center text-sm text-muted-foreground pt-2'>
        <p>
          {t('auth.signIn.noAccount')}{' '}
          <Link
            className='font-semibold text-primary hover:underline'
            to='/sign-up'
          >
            {t('auth.signIn.signUp')}
          </Link>
        </p>
        <p className='mt-2'>
          <Link
            className='font-semibold text-primary hover:underline'
            to='/reset-password'
          >
            {t('auth.signIn.resetPassword')}
          </Link>
        </p>
      </div>
    </form>
  );
}
