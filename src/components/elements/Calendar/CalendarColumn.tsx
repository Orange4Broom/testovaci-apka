import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/base';
import { getDateStringFromDate } from '../../../utils/date';
import { CalendarLoan } from '../CalendarLoan/CalendarLoan';
import { Property } from '../../../typings/property';

interface Props {
  dateString: string;
  property: Property;
}

export const CalendarColumn: React.FC<Props> = ({ dateString, property }) => {
  const { loans } = useSelector((state: RootState) => state.loans);
  const { calendarStartDate } = useSelector(
    (state: RootState) => state.rootState
  );
  const { calendarEndDate } = useSelector(
    (state: RootState) => state.rootState
  );
  const currentDateString = getDateStringFromDate(new Date());
  const loanToRender = loans?.find(
    (loan) =>
      loan.startDate < calendarStartDate &&
      loan.endDate > calendarStartDate &&
      loan.endDate < calendarEndDate &&
      loan.propertyId === property.id
  );

  const loanToRenderExtended = loans?.find(
    (loan) =>
      loan.startDate < calendarStartDate &&
      loan.endDate > calendarStartDate &&
      loan.endDate > calendarEndDate &&
      loan.propertyId === property.id
  );

  return (
    <td
      style={{
        backgroundColor: dateString === currentDateString ? 'red' : undefined,
      }}
      className="calendar-table-row__cell"
    >
      {loans?.length
        ? loans.map((loan) => {
            if (
              loan.startDate === dateString &&
              loan.propertyId === property.id
            ) {
              return (
                <CalendarLoan
                  key={loan.id}
                  id={loan.id}
                  loan={loan}
                  loanStartDate={loan.startDate}
                  loanEndDate={loan.endDate}
                  showStatus={true}
                />
              );
            } else if (
              loan === loanToRender &&
              dateString === calendarStartDate
            ) {
              return (
                <CalendarLoan
                  key={loan.id}
                  id={loan.id}
                  loan={loan}
                  loanStartDate={calendarStartDate}
                  loanEndDate={loan.endDate}
                  showStatus={false}
                />
              );
            } else if (
              loan === loanToRenderExtended &&
              dateString === calendarStartDate
            ) {
              return (
                <CalendarLoan
                  key={loan.id}
                  id={loan.id}
                  loan={loan}
                  loanStartDate={calendarStartDate}
                  loanEndDate={calendarEndDate}
                  showStatus={false}
                />
              );
            } else {
              return null;
            }
          })
        : null}
    </td>
  );
};
