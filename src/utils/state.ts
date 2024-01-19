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
