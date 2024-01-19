import React from 'react';

import { CalendarColumn } from './CalendarColumn';

import { Property } from '../../../typings/property';
import { DayInfo } from '../../../typings/date';

interface Props {
  property: Property;
  daysInfo: DayInfo[];
}

const CalendarRow: React.FC<Props> = React.memo(({ property, daysInfo }) => {
  return (
    <tr className="calendar-table-row">
      <td className="calendar-table-row__cell--short"></td>
      <td className="calendar-table-row__cell">{property.id}</td>
      <td className="calendar-table-row__cell--long">
        <button className="calendar-table-row__cell__button">+</button>
        {property.name}
      </td>
      {daysInfo.map((day, index) => (
        <CalendarColumn
          key={index}
          dateString={day.dateString}
          property={property}
        />
      ))}
    </tr>
  );
});

CalendarRow.displayName = 'CalendarRow';

export { CalendarRow };
