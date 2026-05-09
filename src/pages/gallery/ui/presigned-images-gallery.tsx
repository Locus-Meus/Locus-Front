import { useEffect, useState } from 'react';
import { Images, Loader2, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { contentApi } from '@/features/content';
import { Button } from '@/shared/ui';

type PresignedImagesGalleryProps = {
  refreshKey?: number;
};

export function PresignedImagesGallery({
  refreshKey = 0,
}: PresignedImagesGalleryProps) {
  const { t } = useTranslation();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadImages = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const urls = await contentApi.getImages();
      setImageUrls(urls);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : t('gallery.images.failed'),
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadImages();
  }, [refreshKey]);

  return (
    <div className='spark-panel rounded-[32px] p-5'>
      <div className='flex items-center justify-between gap-3'>
        <div className='flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground'>
          <Images className='size-4 text-primary' />
          {t('gallery.images.title')}
        </div>

        <Button
          className='size-9 rounded-full border-white/60 bg-white/70'
          size='icon'
          type='button'
          variant='outline'
          onClick={() => {
            void loadImages();
          }}
          disabled={isLoading}
          aria-label={t('gallery.images.refresh')}
        >
          {isLoading ? (
            <Loader2 className='size-4 animate-spin' />
          ) : (
            <RefreshCw className='size-4' />
          )}
        </Button>
      </div>

      {isLoading && imageUrls.length === 0 ? (
        <p className='mt-4 text-sm text-muted-foreground'>
          {t('gallery.images.loading')}
        </p>
      ) : imageUrls.length > 0 ? (
        <div className='mt-4 grid grid-cols-2 gap-3'>
          {imageUrls.map((url, index) => (
            <a
              key={url}
              className='group block overflow-hidden rounded-[22px] border border-white/60 bg-white/66 shadow-sm'
              href={url}
              target='_blank'
              rel='noreferrer'
              aria-label={t('gallery.images.open', { number: index + 1 })}
            >
              <img
                className='aspect-square w-full object-cover transition duration-300 group-hover:scale-105'
                src={url}
                alt={t('gallery.images.alt', { number: index + 1 })}
                loading='lazy'
              />
            </a>
          ))}
        </div>
      ) : (
        <p className='mt-4 rounded-[20px] border border-white/60 bg-white/66 px-4 py-3 text-sm text-muted-foreground'>
          {t('gallery.images.empty')}
        </p>
      )}

      {error && (
        <p className='mt-3 rounded-[20px] border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive'>
          {error}
        </p>
      )}
    </div>
  );
}
