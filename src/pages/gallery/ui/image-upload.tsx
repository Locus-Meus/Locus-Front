import { useId, useRef, useState, type ChangeEvent } from 'react';
import { ImagePlus, Loader2, Upload, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { contentApi } from '@/features/content';
import { Button } from '@/shared/ui';

type ImageUploadProps = {
  onUploaded?: () => void;
};

export function ImageUpload({ onUploaded }: ImageUploadProps) {
  const { t } = useTranslation();
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);

    setFiles(selectedFiles);
    setError(null);
    setIsUploaded(false);
  };

  const handleClear = () => {
    setFiles([]);
    setError(null);
    setIsUploaded(false);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError(t('gallery.imageUpload.emptyError'));
      return;
    }

    setIsUploading(true);
    setError(null);
    setIsUploaded(false);

    try {
      await contentApi.uploadImages(files);
      setFiles([]);
      setIsUploaded(true);
      onUploaded?.();

      if (inputRef.current) {
        inputRef.current.value = '';
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : t('gallery.imageUpload.failed'),
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className='spark-panel rounded-[32px] p-5'>
      <div className='flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground'>
        <ImagePlus className='size-4 text-primary' />
        {t('gallery.imageUpload.title')}
      </div>

      <p className='mt-3 text-sm leading-6 text-muted-foreground'>
        {t('gallery.imageUpload.description')}
      </p>

      <label
        className='mt-4 flex cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-primary/30 bg-white/60 px-4 py-6 text-center transition hover:border-primary/50 hover:bg-white/80'
        htmlFor={inputId}
      >
        <Upload className='size-6 text-primary' />
        <span className='mt-3 text-sm font-semibold text-foreground'>
          {t('gallery.imageUpload.choose')}
        </span>
        <span className='mt-1 text-xs text-muted-foreground'>
          {t('gallery.imageUpload.hint')}
        </span>
      </label>

      <input
        ref={inputRef}
        id={inputId}
        className='sr-only'
        type='file'
        accept='image/*'
        multiple
        onChange={handleFileChange}
      />

      {files.length > 0 && (
        <div className='mt-4 rounded-[24px] border border-white/60 bg-white/66 p-4'>
          <div className='flex items-center justify-between gap-3'>
            <p className='text-sm font-semibold text-foreground'>
              {t('gallery.imageUpload.selected', { count: files.length })}
            </p>
            <button
              className='rounded-full p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground'
              type='button'
              onClick={handleClear}
              aria-label={t('gallery.imageUpload.clear')}
              disabled={isUploading}
            >
              <X className='size-4' />
            </button>
          </div>

          <ul className='mt-3 max-h-28 space-y-1 overflow-auto text-xs text-muted-foreground'>
            {files.map((file) => (
              <li key={`${file.name}-${file.lastModified}`} className='truncate'>
                {file.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Button
        className='mt-4 h-12 w-full rounded-full px-5'
        type='button'
        onClick={handleUpload}
        disabled={isUploading || files.length === 0}
      >
        {isUploading && <Loader2 className='size-4 animate-spin' />}
        {isUploading
          ? t('gallery.imageUpload.uploading')
          : t('gallery.imageUpload.upload')}
      </Button>

      {isUploaded && (
        <p className='mt-3 rounded-[20px] border border-primary/20 bg-primary/10 px-4 py-3 text-sm text-foreground'>
          {t('gallery.imageUpload.success')}
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
