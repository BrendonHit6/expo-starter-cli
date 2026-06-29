export const getInitials = (name: string): string =>
  name
    .trim()
    .split(' ')
    .slice(0, 2)
    .map(word => word[0]?.toUpperCase() ?? '')
    .join('');
