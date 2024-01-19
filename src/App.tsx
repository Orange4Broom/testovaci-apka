import React from 'react';

import { CalendarTable } from './components/blocks/CalendarTable/CalendarTable';

export const App: React.FC = () => {
  return (
    <div className="App">
      <header>Testovací aplikace React</header>
      <CalendarTable />
    </div>
  );
};

export default App;
