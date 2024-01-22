/**
 * Sets the icon based on the loan state.
 *
 * @param {string} loanState - The state of the loan.
 *
 * @returns {string} - The corresponding icon for the given loan state.
 */

export const setIconByLoanState = (loanState: string) => {
  switch (loanState) {
    case 'nová':
      return 'hourglass';
    case 'v přípravě':
      return 'hourglass-half';
    case 'hotová':
      return 'circle-check';
    default:
      return 'circle-question';
  }
};

/**
 * Sets the color based on the loan state.
 *
 * @param {string} loanState - The state of the loan.
 *
 * @returns {string} - The corresponding color for the given loan state.
 */
export const setColorByLoanState = (loanState: string) => {
  switch (loanState) {
    case 'nová':
      return '#ff002a';
    case 'v přípravě':
      return '#00a33f';
    case 'hotová':
      return '#daeccc';
    default:
      return 'dark-grey';
  }
};

/**
 * Sets the background color based on the loan state.
 *
 * @param {string} loanState - The state of the loan.
 *
 * @returns {string} - The corresponding background color for the given loan state.
 */
export const setBackgroundColorByLoanState = (loanState: string) => {
  switch (loanState) {
    case 'nová':
      return '#ffb6bc';
    case 'v přípravě':
      return '#daeccc';
    case 'hotová':
      return '#00a33f';
    default:
      return 'dark-grey';
  }
};
