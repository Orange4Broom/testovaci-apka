import { Loan } from '../typings/loan';

export const getTopValue = (loans: Loan[], currentLoan: Loan): number => {
  const loansWithSamePropertyId = loans.filter(
    (loan) => loan.propertyId === currentLoan.propertyId
  );

  const loansBeforeCurrentLoan = loansWithSamePropertyId.filter(
    (loan) =>
      new Date(loan.startDate).getTime() <
        new Date(currentLoan.startDate).getTime() ||
      (new Date(loan.startDate).getTime() ===
        new Date(currentLoan.startDate).getTime() &&
        loan.id < currentLoan.id)
  );

  const areDatesColliding = loansBeforeCurrentLoan.some(
    (loan) =>
      new Date(loan.endDate).getTime() >=
      new Date(currentLoan.startDate).getTime()
  );

  return areDatesColliding ? loansBeforeCurrentLoan.length * 26 : 0;
};
