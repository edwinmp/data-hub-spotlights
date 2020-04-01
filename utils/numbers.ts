export const formatNumber = (value: number, decimals = 1): string => {
  if (value >= 1000000000000) {
    return `${(value / 1000000000000).toFixed(decimals)}tn`;
  }
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(decimals)}bn`;
  }
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(decimals)}m`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(decimals)}k`;
  }
  if (value >= 0) {
    return `${value.toFixed(decimals)}`;
  }
  if (value <= -1000000000000) {
    return `${(value / 1000000000000).toFixed(decimals)}tn`;
  }
  if (value <= -1000000000) {
    return `${(value / 1000000000).toFixed(decimals)}bn`;
  }
  if (value <= -1000000) {
    return `${(value / 1000000).toFixed(decimals)}m`;
  }
  if (value <= 1000) {
    return `${(value / 1000).toFixed(decimals)}k`;
  }

  return `${value.toFixed(decimals)}`;
};

export const setKeyfactsDecimalCount = (flag: string | undefined): number => {
  if (flag) {
    return flag.indexOf('th') == 0 ? 0 : 1;
  }

  return 1;
};
