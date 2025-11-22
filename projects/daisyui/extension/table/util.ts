export type DataResolved = [number, any[]];

export function dataConvert(data: any[]): DataResolved {
  if (data.length === 2 && typeof data[0] === 'number' && Array.isArray(data[1])) {
    return data as any;
  }
  return [data.length, data];
}
