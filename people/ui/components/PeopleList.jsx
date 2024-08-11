import React from 'react';
import { useSubscribe, useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { People } from '../../api/people';

export const PeopleList = ({ eventId }) => {
  useSubscribe('people.byEvent', eventId);

  const people = useTracker(() =>
    People.find({ communityId: eventId }).fetch()
  );

  const handleCheckIn = (personId) => {
    Meteor.call('people.checkIn', personId);
  };

  const handleCheckOut = (personId) => {
    Meteor.call('people.checkOut', personId);
  };

  return (
    <ul>
      {people.map((person) => (
        <li key={person._id}>
          <p>-------------------------------------------------</p>
          <p>{`${person.firstName} ${person.lastName}`}</p>
          <p>{`Company: ${person.companyName || 'N/A'}`}</p>
          <p>{`Title: ${person.title || 'N/A'}`}</p>
          <p>{`Check-in: ${person.checkInDate ? new Date(person.checkInDate).toLocaleString() : 'N/A'}`}</p>
          <p>{`Check-out: ${person.checkOutDate ? new Date(person.checkOutDate).toLocaleString() : 'N/A'}`}</p>
          {!person.checkInDate && (
            <button onClick={() => handleCheckIn(person._id)}>
              Check-in {person.firstName} {person.lastName}
            </button>
          )}
          {person.checkInDate && !person.checkOutDate && (
            <button onClick={() => handleCheckOut(person._id)}>
              Check-out {person.firstName} {person.lastName}
            </button>
          )}
          <p>-------------------------------------------------</p>
        </li>
      ))}
    </ul>
  );
};
