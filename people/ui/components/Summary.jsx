import React from 'react';
import { useSubscribe, useTracker } from 'meteor/react-meteor-data';
import { People } from '../../api/people';

export const Summary = ({ eventId }) => {
  useSubscribe('peopleByEvent', eventId);

  const summary = useTracker(() => {
    const people = People.find({ communityId: eventId }).fetch();

    const checkedInPeople = people.filter(
      (person) => person.checkInDate && !person.checkOutDate
    );
    const companiesSummary = new Map();

    checkedInPeople.forEach((person) => {
      const companyName = person.companyName ?? 'N/A';
      const currentCount = companiesSummary.get(companyName) ?? 0;

      companiesSummary.set(companyName, currentCount + 1);
    });

    return {
      checkedInCount: checkedInPeople.length,
      companiesSummary: Array.from(companiesSummary.entries()).map(
        ([company, count]) => (
          <li key={company}>
            {company} ({count})
          </li>
        )
      ),
      notCheckedInCount: people.length - checkedInPeople.length,
    };
  });

  return (
    <div className="flex w-full gap-10">
      <div className="flex min-w-96 flex-col items-start gap-4 rounded-3xl bg-white p-7 text-center shadow-md">
        <p className="text-2xl text-gray-500">People in the event right now</p>
        <p className="text-5xl font-bold text-gray-800">
          {summary.checkedInCount}
        </p>
      </div>
      <div className="flex min-w-96 flex-col items-start gap-4 rounded-3xl bg-white p-7 text-center shadow-md">
        <p className="text-2xl text-gray-500">People not checked in</p>
        <p className="text-5xl font-bold text-gray-800">
          {summary.notCheckedInCount}
        </p>
      </div>
      <div className="flex min-w-96 flex-col items-start gap-4 rounded-3xl bg-white p-7 text-center shadow-md">
        <p className="text-2xl text-gray-500">
          People by company in the event right now
        </p>
        <p className="text-2xl font-bold text-gray-800">
          <ul className="grid list-decimal grid-cols-2 gap-x-12 gap-y-4 pl-6 text-start">
            {summary.companiesSummary}
          </ul>
        </p>
      </div>
    </div>
  );
};
