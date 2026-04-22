import { ArrowRight, Flame, ShieldCheck, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui';
import { navigateToLogin } from '@/features/auth';
import { LanguageSwitcher } from '@/shared/ui/language-switcher';
import { AUTH_CONFIG, resolveEndpoint } from '@/shared/config/auth';

export function SignInPage() {
  const { t } = useTranslation();

  const handleSignIn = async () => {
    await navigateToLogin();
  };

  const handleSignUp = () => {
    window.location.href = resolveEndpoint(AUTH_CONFIG.endpoints.signUp);
  };

  const features = [
    t('auth.welcome.featureFocus'),
    t('auth.welcome.featureMomentum'),
    t('auth.welcome.featureClarity'),
  ];

  const highlights = [
    {
      value: t('auth.welcome.highlightResetValue'),
      label: t('auth.welcome.highlightResetLabel'),
    },
    {
      value: t('auth.welcome.highlightLanguageValue'),
      label: t('auth.welcome.highlightLanguageLabel'),
    },
    {
      value: t('auth.welcome.highlightEnergyValue'),
      label: t('auth.welcome.highlightEnergyLabel'),
    },
  ];

  return (
    <main className='relative min-h-screen overflow-hidden px-4 py-5 sm:px-6 lg:px-8'>
      <div className='pointer-events-none absolute inset-0 overflow-hidden'>
        <div className='absolute -left-16 top-20 size-72 rounded-full bg-[radial-gradient(circle,_rgba(244,130,75,0.34)_0%,_rgba(244,130,75,0)_70%)] blur-3xl animate-spark-float' />
        <div className='absolute right-0 top-1/3 size-80 rounded-full bg-[radial-gradient(circle,_rgba(110,178,151,0.22)_0%,_rgba(110,178,151,0)_68%)] blur-3xl animate-spark-float [animation-delay:1.4s]' />
        <div className='absolute bottom-0 left-1/3 h-56 w-80 rounded-full bg-[radial-gradient(circle,_rgba(255,215,132,0.26)_0%,_rgba(255,215,132,0)_72%)] blur-3xl' />
      </div>

      <div className='relative mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-6xl flex-col'>
        <header className='flex flex-col gap-4 py-3 sm:flex-row sm:items-center sm:justify-between'>
          <div className='spark-panel inline-flex w-fit items-center gap-3 rounded-full px-4 py-2'>
            <div className='flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20'>
              <Flame className='size-5' />
            </div>
            <div>
              <p className='text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground'>
                Espire
              </p>
              <p className='text-sm text-foreground'>
                {t('auth.welcome.brandLine')}
              </p>
            </div>
          </div>

          <LanguageSwitcher />
        </header>

        <section className='grid flex-1 items-center gap-8 py-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12'>
          <div className='animate-spark-rise'>
            <div className='inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-foreground/72 shadow-sm backdrop-blur'>
              <Sparkles className='size-4 text-primary' />
              {t('auth.welcome.eyebrow')}
            </div>

            <h1 className='spark-display mt-6 max-w-3xl text-5xl leading-[0.95] text-foreground sm:text-6xl lg:text-7xl'>
              {t('auth.welcome.title')}
            </h1>

            <p className='mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl'>
              {t('auth.welcome.description')}
            </p>

            <div className='mt-8 grid gap-3 sm:grid-cols-3'>
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className='spark-panel rounded-[24px] px-5 py-4'
                >
                  <p className='text-2xl font-semibold text-foreground'>
                    {item.value}
                  </p>
                  <p className='mt-1 text-sm text-muted-foreground'>
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className='mt-8 grid gap-4 md:grid-cols-3'>
              {features.map((feature, index) => (
                <div
                  key={feature}
                  className='spark-panel rounded-[28px] px-5 py-5'
                >
                  <p className='text-xs font-semibold uppercase tracking-[0.24em] text-primary'>
                    0{index + 1}
                  </p>
                  <p className='mt-3 text-sm leading-6 text-foreground/84'>
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Card className='spark-panel animate-spark-rise rounded-[32px] border-0 bg-white/75 shadow-[0_32px_90px_rgba(94,59,28,0.14)] [animation-delay:120ms]'>
            <CardHeader className='space-y-5 p-7 sm:p-8'>
              <div className='inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary'>
                <ShieldCheck className='size-4' />
                {t('auth.welcome.secureFlow')}
              </div>

              <div className='space-y-3'>
                <CardTitle className='spark-display text-4xl leading-none text-foreground sm:text-[2.6rem]'>
                  {t('auth.welcome.panelTitle')}
                </CardTitle>
                <CardDescription className='text-base leading-7 text-muted-foreground'>
                  {t('auth.welcome.panelDescription')}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className='space-y-4 p-7 pt-0 sm:p-8 sm:pt-0'>
              <Button
                className='h-12 w-full rounded-full px-6 text-base shadow-lg shadow-primary/20'
                size='lg'
                type='button'
                onClick={handleSignIn}
              >
                {t('auth.signIn.submit')}
                <ArrowRight className='size-4' />
              </Button>

              <Button
                className='h-12 w-full rounded-full border-border/80 bg-transparent text-base'
                size='lg'
                type='button'
                variant='outline'
                onClick={handleSignUp}
              >
                {t('auth.signUp.submit')}
              </Button>

              <div className='grid gap-3 pt-2 sm:grid-cols-2'>
                <div className='rounded-[24px] border border-border/60 bg-white/70 px-4 py-4'>
                  <p className='text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground'>
                    {t('auth.welcome.trustTitle')}
                  </p>
                  <p className='mt-2 text-sm leading-6 text-foreground/82'>
                    {t('auth.welcome.trustDescription')}
                  </p>
                </div>
                <div className='rounded-[24px] border border-border/60 bg-white/70 px-4 py-4'>
                  <p className='text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground'>
                    {t('auth.welcome.sparkTitle')}
                  </p>
                  <p className='mt-2 text-sm leading-6 text-foreground/82'>
                    {t('auth.welcome.sparkDescription')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
