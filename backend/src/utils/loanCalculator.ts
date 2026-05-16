interface LoanCalculation {
  interest: number;

  totalRepayment: number;
}

const calculateLoan = (
  principal: number,
  rate: number,
  tenureDays: number
): LoanCalculation => {

  const interest =
    (principal * rate * tenureDays)
    / (365 * 100);

  const totalRepayment =
    principal + interest;

  return {
    interest: Number(interest.toFixed(2)),
    totalRepayment: Number(
      totalRepayment.toFixed(2)
    ),
  };
};

export default calculateLoan;