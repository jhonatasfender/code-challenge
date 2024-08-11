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
      companiesSummary: Array.from(companiesSummary.entries())
        .map(([company, count]) => `${company} (${count})`)
        .join(', '),
      notCheckedInCount: people.length - checkedInPeople.length,
    };
  });

  return (
    <div>
      <p>{`People in the event right now: ${summary.checkedInCount}`}</p>
      <p>{`People by company in the event right now: ${summary.companiesSummary}`}</p>
      <p>{`People not checked in: ${summary.notCheckedInCount}`}</p>
    </div>
  );
};
