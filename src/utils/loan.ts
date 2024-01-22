import { Loan } from '../typings/loan';

/**
 * Calculates the top value for a given loan based on overlapping date ranges.
 *
 * @param {Loan[]} loans - An array of Loan objects representing all loans.
 * @param {Loan} currentLoan - The target loan for which the top value is calculated.
 *
 * @returns {number} - The calculated top value for the given loan.
 */
export const getTopValue = (loans: Loan[], currentLoan: Loan): number => {
  /**
   * Filters loans with the same property ID as the target loan.
   *
   * @type {Loan[]}
   */
  const loansWithSamePropertyId = loans.filter(
    (loan) => loan.propertyId === currentLoan.propertyId
  );

  /**
   * Filters loans that occur before the start date of the target loan.
   *
   * @type {Loan[]}
   */
  const loansBeforeCurrentLoan = loansWithSamePropertyId.filter(
    (loan) =>
      new Date(loan.startDate).getTime() <
        new Date(currentLoan.startDate).getTime() ||
      (new Date(loan.startDate).getTime() ===
        new Date(currentLoan.startDate).getTime() &&
        loan.id < currentLoan.id)
  );

  /**
   * Checks if there are any overlapping date ranges with loans before the target loan.
   *
   * @type {boolean}
   */
  const areDatesColliding = loansBeforeCurrentLoan.some(
    (loan) =>
      new Date(loan.endDate).getTime() >=
      new Date(currentLoan.startDate).getTime()
  );

  // If there are overlapping date ranges, calculate and return the top value.
  // Otherwise, return 0.
  return areDatesColliding ? loansBeforeCurrentLoan.length * 26 : 0;
};
