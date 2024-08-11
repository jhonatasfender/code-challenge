import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import React, { useState } from 'react';
import { Communities } from '../../api/communities';

export const EventSelector = ({ onSelectEvent }) => {
  const [selectedEvent, setSelectedEvent] = useState('');

  useSubscribe('allCommunities');

  const communities = useTracker(() => Communities.find().fetch());

  const handleSelect = (event) => {
    setSelectedEvent(event.target.value);
    onSelectEvent(event.target.value);
  };

  return (
    <select value={selectedEvent} onChange={handleSelect}>
      <option value="">Select an event</option>
      {communities.map((community) => (
        <option key={community._id} value={community._id}>
          {community.name}
        </option>
      ))}
    </select>
  );
};
