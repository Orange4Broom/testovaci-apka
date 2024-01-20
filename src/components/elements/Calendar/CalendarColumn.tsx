import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/base';
import { getDateStringFromDate } from '../../../utils/date';
import { CalendarLoan } from '../CalendarLoan/CalendarLoan';
import { Property } from '../../../typings/property';
import { getTopValue } from '../../../utils/loan';

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
      loan.endDate >= calendarEndDate &&
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
            const top = getTopValue(loans, loan);
            let cellHeight = 0;
            if (
              loan.propertyId === property.id &&
              new Date(loan.startDate) >= new Date(calendarStartDate) &&
              new Date(loan.endDate) <= new Date(calendarEndDate)
            ) {
              cellHeight = top + 8;
            } else if (
              loan.propertyId === property.id &&
              new Date(loan.startDate) < new Date(calendarStartDate) &&
              new Date(loan.endDate) < new Date(calendarEndDate)
            ) {
              cellHeight = top;
            } else if (
              loan.propertyId === property.id &&
              new Date(loan.startDate) > new Date(calendarStartDate) &&
              new Date(loan.endDate) > new Date(calendarEndDate)
            ) {
              cellHeight = top + 4;
            }
            return (
              <div
                key={loan.id}
                style={{ height: cellHeight }}
                className="calendar-loan-container"
              >
                {loan.startDate === dateString &&
                loan.propertyId === property.id ? (
                  <CalendarLoan
                    key={loan.id}
                    id={loan.id}
                    loan={loan}
                    loanStartDate={loan.startDate}
                    loanEndDate={loan.endDate}
                    showStatus={true}
                    top={top}
                  />
                ) : null}
                {loan === loanToRender && dateString === calendarStartDate ? (
                  <CalendarLoan
                    key={loan.id}
                    id={loan.id}
                    loan={loan}
                    loanStartDate={calendarStartDate}
                    loanEndDate={loan.endDate}
                    showStatus={false}
                    top={top}
                  />
                ) : null}
                {loan === loanToRenderExtended &&
                dateString === calendarStartDate ? (
                  <CalendarLoan
                    key={loan.id}
                    id={loan.id}
                    loan={loan}
                    loanStartDate={calendarStartDate}
                    loanEndDate={calendarEndDate}
                    showStatus={false}
                    top={top}
                  />
                ) : null}
              </div>
            );
          })
        : null}
    </td>
  );
};
