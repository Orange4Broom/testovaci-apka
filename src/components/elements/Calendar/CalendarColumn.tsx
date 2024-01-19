import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/base';
import { getDateStringFromDate, getLoanDayCount } from '../../../utils/date';
import { CalendarLoan } from '../CalendarLoan/CalendarLoan';
import { Property } from '../../../typings/property';

interface Props {
  dateString: string;
  property: Property;
}

export const CalendarColumn: React.FC<Props> = ({ dateString, property }) => {
  const { loans } = useSelector((state: RootState) => state.loans);
  const currentDateString = getDateStringFromDate(new Date());
  console.log(loans);
  console.log(dateString);
  return (
    <td
      style={{
        backgroundColor: dateString === currentDateString ? 'red' : undefined,
      }}
      className="calendar-table-row__cell"
    >
      {loans?.length
        ? loans.map((loan) => {
            return loan.startDate === dateString &&
              loan.propertyId === property.id ? (
              <CalendarLoan
                key={loan.id}
                id={loan.id}
                loan={loan}
                loanDayCount={getLoanDayCount(loan.startDate, loan.endDate)}
              />
            ) : null;
          })
        : null}
    </td>
  );
};
