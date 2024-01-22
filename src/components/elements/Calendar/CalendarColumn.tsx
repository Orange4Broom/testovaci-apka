import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/base';
import { getDateStringFromDate } from '../../../utils/date';
import { CalendarLoan } from '../CalendarLoan/CalendarLoan';
import { Property } from '../../../typings/property';
import { getTopValue } from '../../../utils/loan';
import { useDispatch } from 'react-redux';
import { updateRootState } from '../../../store/slices/rootStates';

interface Props {
  dateString: string;
  property: Property;
}

export const CalendarColumn: React.FC<Props> = ({ dateString, property }) => {
  const dispatch = useDispatch();
  const { loans } = useSelector((state: RootState) => state.loans);
  const { calendarStartDate, calendarEndDate } = useSelector(
    (state: RootState) => state.rootState
  );

  const currentDateString = getDateStringFromDate(new Date());

  const openModal = (setDateString: string) => {
    dispatch(
      updateRootState({
        isAddLoanOpen: true,
        startDate: setDateString,
        propertyId: property.id,
        propertyName: property.name,
      })
    );
  };

  const filteredLoans = loans?.filter(
    (loan) => loan.propertyId === property.id
  );

  return (
    <td
      style={{
        backgroundColor: dateString === currentDateString ? 'red' : undefined,
      }}
      className="calendar-table-row__cell"
      onClick={() => openModal(dateString)}
    >
      {filteredLoans?.length
        ? filteredLoans.map((loan, index) => {
            const top = getTopValue(filteredLoans, loan);

            const isLoanToRender =
              loan.startDate < calendarStartDate &&
              loan.endDate >= calendarStartDate &&
              loan.endDate <= calendarEndDate;

            const isLoanToRenderExtended =
              loan.startDate < calendarStartDate &&
              loan.endDate > calendarStartDate &&
              loan.endDate >= calendarEndDate;

            return (
              <React.Fragment key={index}>
                {loan.startDate === dateString && (
                  <CalendarLoan
                    key={`${loan.id}-start-${index}`}
                    id={loan.id}
                    loan={loan}
                    loanStartDate={loan.startDate}
                    loanEndDate={loan.endDate}
                    showStatus={true}
                    top={top}
                  />
                )}
                {isLoanToRender && dateString === calendarStartDate && (
                  <CalendarLoan
                    key={`${loan.id}-render-${index}`}
                    id={loan.id}
                    loan={loan}
                    loanStartDate={calendarStartDate}
                    loanEndDate={loan.endDate}
                    showStatus={false}
                    top={top}
                  />
                )}
                {isLoanToRenderExtended && dateString === calendarStartDate && (
                  <CalendarLoan
                    key={`${loan.id}-extended-${index}`}
                    id={loan.id}
                    loan={loan}
                    loanStartDate={calendarStartDate}
                    loanEndDate={calendarEndDate}
                    showStatus={false}
                    top={top}
                  />
                )}
              </React.Fragment>
            );
          })
        : null}
    </td>
  );
};
