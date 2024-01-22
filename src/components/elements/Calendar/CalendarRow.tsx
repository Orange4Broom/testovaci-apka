import React from 'react';

import { CalendarColumn } from './CalendarColumn';

import { Property } from '../../../typings/property';
import { DayInfo } from '../../../typings/date';
import { Icon } from '../Icon/Icon';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/base';

interface Props {
  property: Property;
  daysInfo: DayInfo[];
}

const CalendarRow: React.FC<Props> = React.memo(({ property, daysInfo }) => {
  const { loans } = useSelector((state: RootState) => state.loans);

  const filteredLoans = loans?.filter(
    (loan) => loan.propertyId === property.id
  );

  const cellHeight = daysInfo.map((day) => {
    const loansOnDay = filteredLoans?.filter((loan) => {
      return (
        new Date(loan.startDate).getTime() <=
          new Date(day.dateString).getTime() &&
        new Date(loan.endDate).getTime() >= new Date(day.dateString).getTime()
      );
    });

    return loansOnDay?.length || 0;
  });

  const maxCellHeight = Math.max(...cellHeight) * 34;

  return (
    <tr className="calendar-table-row" style={{ height: maxCellHeight }}>
      <td className="calendar-table-row__cell--short"></td>
      <td className="calendar-table-row__cell">{property.id}</td>
      <td className="calendar-table-row__cell--long">
        <button className="calendar-table-row__cell__button">
          <Icon name="plus" type="fas" color="" />
        </button>
        {property.name}
      </td>
      {daysInfo.map((day) => (
        <CalendarColumn
          key={day.dateString}
          dateString={day.dateString}
          property={property}
        />
      ))}
    </tr>
  );
});

CalendarRow.displayName = 'CalendarRow';

export { CalendarRow };
