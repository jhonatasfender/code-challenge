import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const People = new Mongo.Collection('people');

if (Meteor.isServer) {
  Meteor.publish('people.byEvent', (eventId) =>
    People.find({ communityId: eventId })
  );

  const updateCheckDates = async (
    personId,
    checkInDate = null,
    checkOutDate = null
  ) => {
    check(personId, String);

    await People.updateAsync(personId, {
      $set: {
        checkInDate,
        checkOutDate,
      },
    });
  };

  Meteor.methods({
    'people.checkIn': async (personId) => {
      await updateCheckDates(personId, new Date(), null);
    },
    'people.checkOut': async (personId) => {
      await updateCheckDates(personId, null, new Date());
    },
  });
}
