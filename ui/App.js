import React, { useState } from 'react';
import { EventSelector } from '../communities/ui/components/EventSelector.jsx';
import { PeopleList } from '../people/ui/components/PeopleList.jsx';
import { Summary } from '../people/ui/components/Summary.jsx';

export const App = () => {
  const [selectedEvent, setSelectedEvent] = useState('');

  return (
    <div className="flex h-screen flex-col bg-slate-100 overflow-hidden">
      <header className="navbar min-h-32 bg-white px-56 py-7">
        <div className="flex-1">
          <h1 className="text-4xl font-semibold text-slate-700">
            Event Check-In
          </h1>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <EventSelector onSelectEvent={setSelectedEvent} />
            </li>
          </ul>
        </div>
      </header>

      {selectedEvent && (
        <div className="flex flex-col px-56 py-16 w-full overflow-y-auto gap-12">
          <Summary eventId={selectedEvent} />
          <PeopleList eventId={selectedEvent} />
        </div>
      )}
    </div>
  );
};
