import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { RequestFn, SortList } from '@piying-lib/angular-daisyui/extension';

export type RequestInput = {
  page: {
    index: number;
    size: number;
  };
  query?: { content?: string; level?: number };
  sort?: SortList;
};

@Injectable({ providedIn: 'root' })
export class DemoTableResourceService {
  private readonly mockData: any[] = Array.from({ length: 500 }, () => ({
    id: faker.string.uuid(),
    title: faker.animal.type(),
    level: faker.number.int(2),
    badge: faker.animal.dog(),
    createdAt: faker.date.past().toISOString(),
  }));

  readonly requestFn: RequestFn = (input: RequestInput): [number, any[]] => {
    const { index, size } = input.page ?? { index: 0, size: 10 };

    let data = [...this.mockData];

    if (input.query?.content) {
      const queryLower = input.query.content.toLowerCase();
      data = data.filter((item) => item.title.toLowerCase().includes(queryLower));
    }

    if (input.query?.level !== undefined) {
      data = data.filter((item) => item.level === input.query!.level);
    }

    if (input.sort && input.sort.length > 0) {
      input.sort.forEach(({ key, value }) => {
        data.sort((a, b) => {
          const aValue = a[key];
          const bValue = b[key];
          if (aValue == null && bValue == null) return 0;
          if (aValue == null) return value;
          if (bValue == null) return -value;
          if (aValue < bValue) return value;
          if (aValue > bValue) return -value;
          return 0;
        });
      });
    }

    data = data.slice(index * size, index * size + size);

    return [this.mockData.length, data];
  };
}
