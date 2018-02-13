/* @flow */

import express from 'express';
import { apolloExpress, graphiqlExpress } from 'apollo-server';
import bodyParser from 'body-parser';
import cors from 'cors';
import schema from './models/schema';
import Database from './database/';
import Video from './modules/videos/schema';
import User from './modules/users/schema';
import Tag from './modules/tags/schema';

const GRAPHQL_PORT = process.env.PORT || 3000;

const graphQLServer = express();
// TODO : add DataLoaders and Mongodb Backend
graphQLServer.use('/graphql', cors(), bodyParser.json(), apolloExpress(async (req) => {
   
  return {
    schema,
    context: {
      isAuth: true,
      user: await User.Model.findById('5a6e05ccf6ad593d7aefe31f'),
      Video: Video.Model,
      User: User.Model,
      Tag: Tag.Model,
    },
  };
}));
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

graphQLServer.listen(GRAPHQL_PORT, async () => {
  Database.connect('mongodb://localhost:27080/loopvid');
  console.log(`GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`);
});
