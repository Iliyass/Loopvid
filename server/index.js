/* @flow */

import express from 'express';
import { apolloExpress, graphiqlExpress } from 'apollo-server';
import bodyParser from 'body-parser';
import cors from 'cors';
import schema from './models/schema';
import Database from './database/';
import Video from './modules/videos/schema';
import User from './modules/users/schema';

const GRAPHQL_PORT = process.env.PORT || 3000;

const graphQLServer = express();
// TODO : add DataLoaders and Mongodb Backend
graphQLServer.use('/graphql', cors(), bodyParser.json(), apolloExpress(async (req) => {
   
  return {
    schema,
    context: {
      isAuth: true,
      user: await User.Model.findById('5a66378fe7cd5913362cf35b'),
      Video: Video.Model,
      User: User.Model,
    },
  };
}));
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

graphQLServer.listen(GRAPHQL_PORT, async () => {
  Database.connect('mongodb://localhost:27017/loopvid');
  console.log(`GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`);
});
