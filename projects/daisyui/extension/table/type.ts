import { ResourceLoaderParams } from '@angular/core';

export type LoadingData = ResourceLoaderParams<{
  data: (config: LoadingData) => Promise<any[]>;
  isLoading: true;
  params: Record<string, any>;
}>;
export type TableQueryParams = {
  page: {
    size: number;
    index: number;
  };
  direction: Record<string, 1 | -1>;
};
