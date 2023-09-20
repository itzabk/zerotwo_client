export default function currencyFormatter(type, num) {
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: type,
  });
  return formatter.format(num);
}
