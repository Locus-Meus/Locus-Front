import { useTranslation } from 'react-i18next';
import { Globe2 } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

const SUPPORTED_LANGUAGES = [
  { code: 'en', labelKey: 'common.languages.en' },
  { code: 'es', labelKey: 'common.languages.es' },
  { code: 'ru', labelKey: 'common.languages.ru' },
] as const;

export function LanguageSwitcher({ className }: { className?: string }) {
  const { i18n, t } = useTranslation();

  const currentLanguage = i18n.resolvedLanguage?.slice(0, 2) ?? 'en';

  return (
    <label
      className={cn(
        'spark-panel inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs text-muted-foreground',
        className,
      )}
    >
      <Globe2 className='size-3.5 text-primary' />
      <span className='font-semibold uppercase tracking-[0.18em]'>
        {t('common.language')}
      </span>
      <select
        className='h-8 rounded-full border border-border/60 bg-white/65 pl-4 pr-9 text-xs font-medium text-foreground shadow-sm outline-none transition focus:ring-2 focus:ring-ring/30'
        value={currentLanguage}
        onChange={(event) => {
          i18n.changeLanguage(event.target.value);
        }}
      >
        {SUPPORTED_LANGUAGES.map((language) => (
          <option key={language.code} value={language.code}>
            {t(language.labelKey)}
          </option>
        ))}
      </select>
    </label>
  );
}
