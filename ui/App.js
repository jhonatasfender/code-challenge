import React, { useState } from 'react';
import { EventSelector } from '../communities/ui/components/EventSelector.jsx';
import { PeopleList } from '../people/ui/components/PeopleList.jsx';
import { Summary } from '../people/ui/components/Summary.jsx';

export const App = () => {
  const [selectedEvent, setSelectedEvent] = useState('');

  return (
    <div>
      <h1>Event Check-In</h1>
      <EventSelector onSelectEvent={setSelectedEvent} />
      {selectedEvent && (
        <>
          <Summary eventId={selectedEvent} />
          <PeopleList eventId={selectedEvent} />
        </>
      )}
    </div>
  );
};
