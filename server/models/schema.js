import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
  scalar Date

  enum Durations {
    Short
    Long
  }
  input Filter {
    resolution: String
    duration: String
  }
  input Sort {
    UploadDate: Boolean
    ViewCount: Boolean
    Rating: Boolean
  }
  type Query {
    videos(page: Int = 1, pageSize: Int = 10, filter: Filter, sort: Sort): [Video]!
    video(id: ID!): Video!
  }
  enum Resolutions {
    SD
    HD
  }
  type Video {
    id: ID!
    title: String!
    desc: String!
    upvotes: Int!
    downvotes: Int!
    resolution: Resolutions!
    viewCount: Int!
    thumbnail: String!
    isPublished: Boolean
    minuteLength: Int
    created_at: Date
    published_at: Date
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;