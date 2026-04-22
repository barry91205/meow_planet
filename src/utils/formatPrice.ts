export const formatPrice = (num: number) => {
  return new Intl.NumberFormat().format(num);
};
