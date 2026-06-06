export const calculatePoints = (
  combo: number
): number => {
  if (combo >= 5) {
    return 20;
  }

  return 10;
};