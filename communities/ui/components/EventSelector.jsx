import classNames from 'classnames';
import { useSubscribe, useTracker } from 'meteor/react-meteor-data';
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

  const selectClasses = classNames(
    'select select-bordered h-16 min-w-96 w-full rounded-full bg-blue-600 px-10 py-3.5',
    'text-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-3xl appearance-none',
    'hover:bg-blue-600 focus:bg-blue-600 focus:text-white active:text-white active:bg-blue-600 '
  );

  const test = (community) =>
    classNames({
      'bg-blue-500 text-white': selectedEvent === community?._id,
      'bg-white text-black': selectedEvent !== community?._id,
    });

  return (
    <select
      value={selectedEvent}
      onChange={handleSelect}
      className={selectClasses}
    >
      <option selected className={test()}>
        Select an event
      </option>
      {communities.map((community) => (
        <option
          key={community._id}
          value={community._id}
          className={test(community)}
        >
          {community.name}
        </option>
      ))}
    </select>
  );
};
