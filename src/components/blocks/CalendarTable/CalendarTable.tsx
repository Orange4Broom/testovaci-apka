import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../store/base';
import { CalendarRow } from '../../elements/Calendar/CalendarRow';
import {
  getDateStringFromDate,
  getDayInfoForInterval,
  getOffsetDateStringByDayCount,
} from '../../../utils/date';
import { useDispatch } from 'react-redux';
import { updateRootState } from '../../../store/slices/rootStates';

import './CalendarTable.scss';

export const CalendarTable: React.FC = () => {
  const dispatch = useDispatch();
  const { properties } = useSelector((state: RootState) => state.properties);
  const calendarStartDate = useSelector(
    (state: RootState) => state.rootState.calendarStartDate
  );
  const currentDateString = getDateStringFromDate(new Date());

  const dayInfo = useMemo(
    () =>
      getDayInfoForInterval(
        calendarStartDate,
        getOffsetDateStringByDayCount(calendarStartDate, 14)
      ),
    [calendarStartDate]
  );

  useEffect(() => {
    dispatch(
      updateRootState({
        calendarEndDate: dayInfo[dayInfo.length - 1].dateString,
      })
    );
  }, [dayInfo]);

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
