import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Communities = new Mongo.Collection('communities');

if (Meteor.isServer) {
  Meteor.publish('allCommunities', () => Communities.find());
}
