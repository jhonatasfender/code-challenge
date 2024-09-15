import classNames from 'classnames';
import { Meteor } from 'meteor/meteor';
import { useSubscribe, useTracker } from 'meteor/react-meteor-data';
import React, { useCallback } from 'react';
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

  const test = useCallback(
    (index) =>
      classNames('border-none', {
        '!bg-gray-100': index % 2 === 0,
        '!bg-white': index % 2 !== 0,
      }),
    []
  );

  return (
    <div className="rounded-3xl border-[0.1rem] border-slate-200 overflow-x-hidden overflow-y-auto h-full">
      <table className="table table-zebra w-full text-left">
        <thead>
          <tr className="border-b-slate-200 bg-white">
            <th className="p-5 text-2xl font-normal text-slate-500">Name</th>
            <th className="p-5 text-2xl font-normal text-slate-500">Company</th>
            <th className="p-5 text-2xl font-normal text-slate-500">Title</th>
            <th className="p-5 text-2xl font-normal text-slate-500">
              Check-In
            </th>
            <th className="p-5 text-2xl font-normal text-slate-500">
              Check-Out
            </th>
            <th className="p-5 text-2xl font-normal text-slate-500">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {people.map((person, index) => (
            <tr key={person._id} className={test(index)}>
              <td className="p-5 text-2xl font-semibold">
                {person.firstName} {person.lastName}
              </td>
              <td className="p-5 text-2xl font-semibold">
                {person.companyName || 'N/A'}
              </td>
              <td className="p-5 text-2xl font-semibold">
                {person.title || 'N/A'}
              </td>
              <td className="p-5 text-2xl font-semibold min-w-80">
                {person.checkInDate
                  ? new Date(person.checkInDate).toLocaleString()
                  : 'N/A'}
              </td>
              <td className="p-5 text-2xl font-semibold min-w-80">
                {person.checkOutDate
                  ? new Date(person.checkOutDate).toLocaleString()
                  : 'N/A'}
              </td>
              <td className="p-5">
                {!person.checkInDate && (
                  <button
                    onClick={() => handleCheckIn(person._id)}
                    className="w-full rounded-lg bg-green-500 px-3 py-2 text-2xl font-semibold text-white hover:bg-green-600"
                  >
                    Check-in
                  </button>
                )}
                {person.checkInDate && !person.checkOutDate && (
                  <button
                    onClick={() => handleCheckOut(person._id)}
                    className="w-full rounded-lg bg-red-500 px-3 py-2 text-2xl font-semibold text-white hover:bg-red-600 min-w-48"
                  >
                    Check-out
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
