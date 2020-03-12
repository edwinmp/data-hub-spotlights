export const formatNumber = (value: number, decimals = 2): string => {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(decimals)}bn`;
  }
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(decimals)}m`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(decimals)}k`;
  }
  return `${value.toFixed(decimals)}`;
};
