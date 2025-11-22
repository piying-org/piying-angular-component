import { ResourceLoaderParams } from '@angular/core';

export type LoadingData = ResourceLoaderParams<{
  data: (config: LoadingData) => Promise<any[]>;
  isLoading: true;
  params: Record<string, any>;
}>;
