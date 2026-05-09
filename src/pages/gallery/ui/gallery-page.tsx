import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Flame,
  Heart,
  LogOut,
  Sparkles,
  ThumbsDown,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useSessionStore } from '@/entities/session';
import { authApi } from '@/features/auth';
import { Button, LanguageSwitcher } from '@/shared/ui';

type Reaction = 'like' | 'dislike' | null;

export function GalleryPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reactions, setReactions] = useState<Record<string, Reaction>>({});

  const { user, logout: clearSession } = useSessionStore();

  const slides = [
    {
      id: 'ignition',
      badge: t('gallery.slides.ignition.badge'),
      title: t('gallery.slides.ignition.title'),
      quote: t('gallery.slides.ignition.quote'),
      ritual: t('gallery.slides.ignition.ritual'),
      focus: t('gallery.slides.ignition.focus'),
      tags: [
        t('gallery.slides.ignition.tagOne'),
        t('gallery.slides.ignition.tagTwo'),
        t('gallery.slides.ignition.tagThree'),
      ],
      background:
        'linear-gradient(135deg, rgba(245, 139, 87, 1) 0%, rgba(249, 203, 120, 0.96) 52%, rgba(255, 247, 226, 1) 100%)',
    },
    {
      id: 'momentum',
      badge: t('gallery.slides.momentum.badge'),
      title: t('gallery.slides.momentum.title'),
      quote: t('gallery.slides.momentum.quote'),
      ritual: t('gallery.slides.momentum.ritual'),
      focus: t('gallery.slides.momentum.focus'),
      tags: [
        t('gallery.slides.momentum.tagOne'),
        t('gallery.slides.momentum.tagTwo'),
        t('gallery.slides.momentum.tagThree'),
      ],
      background:
        'linear-gradient(135deg, rgba(109, 178, 151, 1) 0%, rgba(193, 232, 206, 0.92) 52%, rgba(244, 250, 236, 1) 100%)',
    },
    {
      id: 'vision',
      badge: t('gallery.slides.vision.badge'),
      title: t('gallery.slides.vision.title'),
      quote: t('gallery.slides.vision.quote'),
      ritual: t('gallery.slides.vision.ritual'),
      focus: t('gallery.slides.vision.focus'),
      tags: [
        t('gallery.slides.vision.tagOne'),
        t('gallery.slides.vision.tagTwo'),
        t('gallery.slides.vision.tagThree'),
      ],
      background:
        'linear-gradient(135deg, rgba(92, 139, 168, 1) 0%, rgba(178, 219, 229, 0.92) 54%, rgba(245, 249, 252, 1) 100%)',
    },
  ];

  const activeSlide = slides[activeIndex];
  const activeReaction = reactions[activeSlide.id] ?? null;

  const handleLogout = async () => {
    setIsPending(true);
    setError(null);

    try {
      const csrfToken = await authApi.getCsrfToken();
      await authApi.logout(csrfToken);

      clearSession();
      navigate('/', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : t('gallery.logoutFailed'));
    } finally {
      setIsPending(false);
    }
  };

  const selectSlide = (index: number) => {
    setActiveIndex(index);
  };

  const handlePrevious = () => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  const handleReaction = (value: Exclude<Reaction, null>) => {
    setReactions((current) => ({
      ...current,
      [activeSlide.id]: current[activeSlide.id] === value ? null : value,
    }));
  };

  const reactionMessage =
    activeReaction === 'like'
      ? t('gallery.liked')
      : activeReaction === 'dislike'
        ? t('gallery.disliked')
        : t('gallery.reactionIdle');

  return (
    <main className='relative min-h-screen overflow-hidden px-4 py-5 sm:px-6 lg:px-8'>
      <div className='pointer-events-none absolute inset-0 overflow-hidden'>
        <div className='absolute left-0 top-16 size-64 rounded-full bg-[radial-gradient(circle,_rgba(246,144,85,0.22)_0%,_rgba(246,144,85,0)_70%)] blur-3xl animate-spark-float' />
        <div className='absolute right-0 top-40 size-80 rounded-full bg-[radial-gradient(circle,_rgba(104,172,145,0.2)_0%,_rgba(104,172,145,0)_70%)] blur-3xl animate-spark-float [animation-delay:1.2s]' />
        <div className='absolute bottom-0 left-1/3 h-64 w-80 rounded-full bg-[radial-gradient(circle,_rgba(255,210,140,0.18)_0%,_rgba(255,210,140,0)_72%)] blur-3xl' />
      </div>

      <div className='relative mx-auto max-w-6xl'>
        <header className='flex flex-col gap-4 py-3 lg:flex-row lg:items-center lg:justify-between'>
          <div>
            <div className='inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-foreground/72 shadow-sm backdrop-blur'>
              <Sparkles className='size-4 text-primary' />
              {t('gallery.title')}
            </div>

            <h1 className='spark-display mt-4 text-4xl text-foreground sm:text-5xl'>
              {t('gallery.greeting', {
                name: user?.firstName ?? t('gallery.guestName'),
              })}
            </h1>

            <p className='mt-3 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg'>
              {t('gallery.description')}
            </p>
          </div>

          <div className='flex flex-wrap items-center gap-3'>
            <LanguageSwitcher />
            <Button
              className='h-11 rounded-full border-white/60 bg-white/70 px-5'
              type='button'
              variant='outline'
              onClick={handleLogout}
              disabled={isPending}
            >
              <LogOut className='size-4' />
              {isPending ? t('gallery.signingOut') : t('gallery.signOut')}
            </Button>
          </div>
        </header>

        <section className='mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_340px]'>
          <article className='spark-panel rounded-[36px] p-4 sm:p-6'>
            <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground'>
                  {t('gallery.currentSpark')}
                </p>
                <div className='mt-3 flex flex-wrap gap-2'>
                  {slides.map((slide, index) => (
                    <button
                      key={slide.id}
                      className={`h-1.5 rounded-full transition ${
                        index === activeIndex
                          ? 'w-16 bg-primary'
                          : 'w-8 bg-primary/15'
                      }`}
                      type='button'
                      onClick={() => {
                        selectSlide(index);
                      }}
                      aria-label={`${t('gallery.currentSpark')} ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <Button
                  className='h-11 rounded-full border-white/60 bg-white/70 px-4'
                  size='sm'
                  type='button'
                  variant='outline'
                  onClick={handlePrevious}
                >
                  <ArrowLeft className='size-4' />
                  {t('gallery.previous')}
                </Button>
                <Button
                  className='h-11 rounded-full px-4'
                  size='sm'
                  type='button'
                  onClick={handleNext}
                >
                  {t('gallery.next')}
                  <ArrowRight className='size-4' />
                </Button>
              </div>
            </div>

            <div className='mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_0.85fr]'>
              <div
                key={activeSlide.id}
                className='animate-spark-rise overflow-hidden rounded-[30px] p-6 text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] sm:p-8'
                style={{ background: activeSlide.background }}
              >
                <div className='flex items-start justify-between gap-4'>
                  <span className='rounded-full bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-700 shadow-sm'>
                    {activeSlide.badge}
                  </span>
                  <span className='text-sm font-semibold text-slate-700/75'>
                    0{activeIndex + 1} / 0{slides.length}
                  </span>
                </div>

                <div className='mt-16 max-w-xl'>
                  <p className='text-xs font-semibold uppercase tracking-[0.3em] text-slate-700/62'>
                    {t('gallery.ritualTitle')}
                  </p>
                  <h2 className='spark-display mt-3 text-4xl leading-[0.95] text-slate-900 sm:text-5xl'>
                    {activeSlide.title}
                  </h2>
                  <p className='mt-5 text-lg leading-8 text-slate-800/80'>
                    {activeSlide.quote}
                  </p>
                </div>

                <div className='mt-10 flex flex-wrap gap-2'>
                  {activeSlide.tags.map((tag) => (
                    <span
                      key={tag}
                      className='rounded-full bg-white/68 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 shadow-sm'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className='space-y-4'>
                <div className='rounded-[28px] border border-white/55 bg-white/66 p-5 shadow-sm'>
                  <div className='flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground'>
                    <Flame className='size-4 text-primary' />
                    {t('gallery.focusTitle')}
                  </div>
                  <p className='mt-3 text-base leading-7 text-foreground/84'>
                    {activeSlide.focus}
                  </p>
                </div>

                <div className='rounded-[28px] border border-white/55 bg-white/66 p-5 shadow-sm'>
                  <p className='text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground'>
                    {t('gallery.ritualTitle')}
                  </p>
                  <p className='mt-3 text-base leading-7 text-foreground/84'>
                    {activeSlide.ritual}
                  </p>
                </div>

                <div className='rounded-[28px] border border-white/55 bg-white/66 p-5 shadow-sm'>
                  <p className='text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground'>
                    {t('gallery.reactionTitle')}
                  </p>
                  <p className='mt-3 text-base leading-7 text-foreground/84'>
                    {reactionMessage}
                  </p>
                </div>
              </div>
            </div>
          </article>

          <aside className='space-y-4'>
            <div className='spark-panel rounded-[32px] p-5'>
              <p className='text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground'>
                {t('gallery.deckTitle')}
              </p>
              <div className='mt-4 space-y-3'>
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    className={`w-full rounded-[24px] border px-4 py-4 text-left transition ${
                      index === activeIndex
                        ? 'border-primary/25 bg-primary/10 shadow-sm'
                        : 'border-border/60 bg-white/66 hover:bg-white'
                    }`}
                    type='button'
                    onClick={() => {
                      selectSlide(index);
                    }}
                  >
                    <div className='flex items-center justify-between gap-3'>
                      <div>
                        <p className='text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground'>
                          0{index + 1}
                        </p>
                        <p className='mt-2 text-sm font-semibold text-foreground'>
                          {slide.title}
                        </p>
                      </div>
                      <ArrowRight className='size-4 text-muted-foreground' />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className='spark-panel rounded-[32px] p-5'>
              <p className='text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground'>
                {t('gallery.reactionTitle')}
              </p>

              <div className='mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1'>
                <Button
                  className={`h-12 rounded-full justify-between px-5 ${
                    activeReaction === 'like'
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                      : 'border-white/60 bg-white/70 text-foreground'
                  }`}
                  type='button'
                  variant={activeReaction === 'like' ? 'default' : 'outline'}
                  onClick={() => {
                    handleReaction('like');
                  }}
                >
                  {t('gallery.like')}
                  <Heart className='size-4' />
                </Button>

                <Button
                  className={`h-12 rounded-full justify-between px-5 ${
                    activeReaction === 'dislike'
                      ? 'bg-foreground text-background shadow-lg shadow-foreground/15'
                      : 'border-white/60 bg-white/70 text-foreground'
                  }`}
                  type='button'
                  variant={activeReaction === 'dislike' ? 'secondary' : 'outline'}
                  onClick={() => {
                    handleReaction('dislike');
                  }}
                >
                  {t('gallery.dislike')}
                  <ThumbsDown className='size-4' />
                </Button>
              </div>
            </div>

            {error && (
              <p className='rounded-[24px] border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive'>
                {error}
              </p>
            )}
          </aside>
        </section>
      </div>
    </main>
  );
}
