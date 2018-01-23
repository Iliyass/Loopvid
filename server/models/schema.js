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
    videos(page: Int = 0, pageSize: Int = 10, filter: Filter, sort: Sort): [Video]!
    video(id: ID!): Video!
  }

  type Mutation {
    login(email: String!, password: String!): User
    signup(email: String!, password: String!, fullName: String!): User
    
    like(videoId: ID!): Video
    dislike(videoId: ID!): Video

    watch(videoId: ID!): Video
  }

  enum Resolutions {
    SD
    HD
  }

  type Video {
    id: ID!
    title: String!
    src: String!
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
    user: User!
  }
  type Like {
    ObjectID: ID!
  }
  type User {
    id: ID!
    fullName: String!
    email: String!
    avatar: String
    isActive: Boolean
    dislikes: [ID!]
    likes: [ID!]
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;