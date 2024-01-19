import React, { useMemo } from 'react';

import {
  getDateStringFromDate,
  getDayInfoForInterval,
  getOffsetDateStringByDayCount,
} from '../../../utils/date';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/base';

import './CalendarTable.scss';
import { CalendarRow } from '../../elements/Calendar/CalendarRow';

export const CalendarTable: React.FC = () => {
  const { properties } = useSelector((state: RootState) => state.properties);

  const currentDateString = getDateStringFromDate(new Date());
  const dayInfo = useMemo(
    () =>
      getDayInfoForInterval(
        currentDateString,
        getOffsetDateStringByDayCount(currentDateString, 14)
      ),
    [currentDateString]
  );

  console.log(properties);
  return (
    <table className="calendar-table">
      <thead>
        <tr>
          <th className="calendar-table__heading--short"></th>
          <th className="calendar-table__heading">Kód</th>
          <th className="calendar-table__heading--long">Položka</th>
          {Object.values(dayInfo).map((day) => (
            <th
              key={day.dateString}
              style={{
                backgroundColor:
                  day.dateString === currentDateString ? 'red' : undefined,
              }}
              className="calendar-table__heading calendar-table__heading--short"
            >
              {day.dateString.slice(8)}
              <br />
              {day.dayName}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="calendar-table__body">
        {properties?.length
          ? properties.map((property) => (
              <CalendarRow
                key={property.id}
                property={property}
                daysInfo={dayInfo}
              />
            ))
          : null}
      </tbody>
    </table>
  );
};
