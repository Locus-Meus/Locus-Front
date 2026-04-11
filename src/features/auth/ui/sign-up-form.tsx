import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { authApi } from '../api/auth-api';
import type { SignUpPayload } from '../model/types';
import { Button, Input, Label } from '@/shared/ui';

const INITIAL_FORM: SignUpPayload = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  birthDate: '',
  phone: '',
  language: navigator.language.split('-')[0] ?? 'en',
};

const isEmailValid = (v: string) => /^\S+@\S+\.\S+$/.test(v);

export function SignUpForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form, setForm] = useState<SignUpPayload>(INITIAL_FORM);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(
    () =>
      !isPending &&
      isEmailValid(form.email) &&
      form.password.length >= 8 &&
      form.firstName.length > 0 &&
      form.lastName.length > 0 &&
      form.birthDate.length > 0,
    [form, isPending],
  );

  const updateField = (key: keyof SignUpPayload, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setIsPending(true);
    setError(null);

    try {
      const csrf = await authApi.getCsrfToken();
      await authApi.signUp(form, csrf);
      navigate('/sign-in?registered=1', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : t('auth.signUp.failure'));
      setIsPending(false);
    }
  };

  return (
    <form className='space-y-4' onSubmit={handleSubmit}>
      <div className='grid gap-4 sm:grid-cols-2'>
        <div className='space-y-2'>
          <Label htmlFor='firstName'>{t('auth.fields.firstName')}</Label>
          <Input
            id='firstName'
            value={form.firstName}
            onChange={(e) => updateField('firstName', e.target.value)}
            required
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='lastName'>{t('auth.fields.lastName')}</Label>
          <Input
            id='lastName'
            value={form.lastName}
            onChange={(e) => updateField('lastName', e.target.value)}
            required
          />
        </div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='email'>{t('auth.fields.email')}</Label>
        <Input
          id='email'
          type='email'
          value={form.email}
          onChange={(e) => updateField('email', e.target.value)}
          required
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='password'>{t('auth.fields.password')}</Label>
        <Input
          id='password'
          type='password'
          placeholder={t('auth.signUp.passwordHint')}
          value={form.password}
          onChange={(e) => updateField('password', e.target.value)}
          required
        />
      </div>

      <div className='grid gap-4 sm:grid-cols-2'>
        <div className='space-y-2'>
          <Label htmlFor='birthDate'>{t('auth.fields.birthDate')}</Label>
          <Input
            id='birthDate'
            type='date'
            value={form.birthDate}
            onChange={(e) => updateField('birthDate', e.target.value)}
            required
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='phone'>{t('auth.fields.phone')}</Label>
          <Input
            id='phone'
            type='tel'
            placeholder={t('auth.signUp.optionalPhone')}
            value={form.phone}
            onChange={(e) => updateField('phone', e.target.value)}
          />
        </div>
      </div>

      {error && (
        <p className='text-sm text-destructive bg-destructive/10 p-3 rounded-md border border-destructive/40'>
          {error}
        </p>
      )}

      <Button className='w-full' type='submit' disabled={!canSubmit}>
        {isPending ? t('auth.signUp.submitting') : t('auth.signUp.submit')}
      </Button>

      <p className='text-center text-sm text-muted-foreground'>
        {t('auth.signUp.haveAccount')}{' '}
        <Link
          className='font-semibold text-primary hover:underline'
          to='/sign-in'
        >
          {t('auth.signUp.signIn')}
        </Link>
      </p>
    </form>
  );
}
