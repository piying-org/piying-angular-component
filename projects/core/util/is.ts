export function isSchema(input: any) {
  return (
    input && typeof input === 'object' && '~run' in input && 'kind' in input && 'type' in input
  );
}
