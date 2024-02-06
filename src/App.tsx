import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CalendarTable } from './components/blocks/CalendarTable/CalendarTable';
import { AddPropertyModal } from './components/blocks/Modal/AddPropertyModal';
import { Icon } from './components/elements/Icon/Icon';

import { LoanModal } from './components/blocks/Modal/LoanModal';
import { RootState } from './store/base';
import { updateRootState } from './store/slices/rootStates';
import {
  getMonthNameByDateString,
  getShiftedDate,
  getYearNumberFromDateString,
} from './utils/date';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const calendarStartDate = useSelector(
    (state: RootState) => state.rootState.calendarStartDate
  );

  const setShiftCalendarStartDate = (
    shiftForward: boolean,
    daysToShift: number
  ) => {
    const newDate = getShiftedDate(
      shiftForward,
      calendarStartDate,
      daysToShift
    );
    dispatch(updateRootState({ calendarStartDate: newDate }));
  };

  const openModal = () => {
    dispatch(updateRootState({ isAddPropertyOpen: true }));
  };

  return (
    <div className="App">
      <AddPropertyModal />
      <LoanModal />
      <div className="App__header">
        <header>Testovací aplikace React</header>

        <div className="control-calendar__panel">
          <button
            className="control-calendar__panel__button"
            onClick={() => setShiftCalendarStartDate(false, 14)}
          >
            <Icon name="angles-left" type="fas" color="" />
          </button>

          <button
            className="control-calendar__panel__button"
            onClick={() => {
              setShiftCalendarStartDate(false, 7);
            }}
          >
            <Icon name="angle-left" type="fas" color="" />
          </button>

          <p className="control-calendar__panel__date">
            {getMonthNameByDateString(calendarStartDate)}{' '}
            {getYearNumberFromDateString(calendarStartDate)}
          </p>

          <button
            className="control-calendar__panel__button"
            onClick={() => {
              setShiftCalendarStartDate(true, 7);
            }}
          >
            <Icon name="angle-right" type="fas" color="" />
          </button>

          <button
            className="control-calendar__panel__button"
            onClick={() => {
              setShiftCalendarStartDate(true, 14);
            }}
          >
            <Icon name="angles-right" type="fas" color="" />
          </button>
        </div>

        <button
          className="control-calendar__panel__add-property-button"
          onClick={() => openModal()}
        >
          Přidat položku
        </button>
      </div>
      <CalendarTable />
    </div>
  );
};

export default App;
