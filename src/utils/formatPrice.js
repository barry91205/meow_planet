export const formatPrice = (num) => {
  return new Intl.NumberFormat().format(num);
};
