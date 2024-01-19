import React from 'react';

import { CalendarTable } from './components/blocks/CalendarTable/CalendarTable';
import { Icon } from './components/elements/Icon/Icon';

export const App: React.FC = () => {
  return (
    <div className="App">
      <div className="App__header">
        <header>Testovací aplikace React</header>
        <div className="control-calendar__panel">
          <button className="control-calendar__panel__button">
            <Icon name="angles-left" type="fas" color="" />
          </button>
          <button className="control-calendar__panel__button">
            <Icon name="angle-left" type="fas" color="" />
          </button>
          <p className="control-calendar__panel__date">Leden 2024</p>
          <button className="control-calendar__panel__button">
            <Icon name="angle-right" type="fas" color="" />
          </button>
          <button className="control-calendar__panel__button">
            <Icon name="angles-right" type="fas" color="" />
          </button>
        </div>

        <button className="control-calendar__panel__add-property-button">
          Přidat položku
        </button>
      </div>
      <CalendarTable />
    </div>
  );
};

export default App;
