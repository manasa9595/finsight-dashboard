interface AmountFormatterProps {
  amount: number | string;
  currencySymbol?: string;
}

// Usage example:
// <AmountFormatter amount={1234567.89} />
// <AmountFormatter amount="1234567.89" currencySymbol="€" />
// <AmountFormatter amount={1234567} currencySymbol="₹" />

export default function AmountFormatter({
  amount,
  currencySymbol = "$",
}: AmountFormatterProps) {
  // Convert to number safely
  const num = typeof amount === "string" ? Number(amount) : amount;

  if (isNaN(num)) return <span>{amount}</span>;

  // Format with commas and fixed 2 decimals
  const formatted = num.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return <span>{currencySymbol + formatted}</span>;
}
