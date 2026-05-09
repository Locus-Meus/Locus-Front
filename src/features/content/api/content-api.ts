import { BaseApiClient } from '@/shared/api/base-api-client';
import { AUTH_CONFIG } from '@/shared/config/auth';

export type PresignedImageUrl = string;

class ContentApi extends BaseApiClient {
  constructor() {
    super(AUTH_CONFIG.issuer || '/api');
  }

  public async getImages(): Promise<PresignedImageUrl[]> {
    return this.get<PresignedImageUrl[]>('/v1/api/images');
  }

  public async uploadImages(files: File[]): Promise<void> {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append('files', file);
    });

    return this.post<void>('/v1/api/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

export const contentApi = new ContentApi();
