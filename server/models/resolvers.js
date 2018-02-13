import customTypes from '../customTypes';
import casual from 'casual';
import _ from 'lodash';
import Video from '../modules/videos/schema';
import User from '../modules/users/schema';

const RESOLUTIONS = ['SD', 'HD'];

const resolvers = {
  ...customTypes,
  Mutation: {
    // createTag(name: String!): Tag
    async createTag(root, { name }, context) {
      return await context.Tag.create({ name })
    },
    login(root, { email, password }) {
      return _.find(dbUsers, { email, password });
    },
    signup(root, { email, password, fullName }) {
      dbUsers.push({
        id: casual.uuid, email, password, fullName,
      });
      return _.last(dbUsers);
    },
    async watch(root, { videoId }, context) {
      const video = await context.Video.findOneAndUpdate({ _id: videoId }, { $inc: { viewCount: 1 } }).exec();
      return video;
    },
    async like(root, { videoId }, context) {
      const { user } = context;
      const { nModified } = await user.update({ $addToSet: { likes: [videoId] } }).exec();

      // if (nModified) {
        const video = await context.Video.findOneAndUpdate({ _id: videoId }, { $inc: { upvotes: 1 } }, { new: true }).exec();
        return video
      // }
      return null;
    },
    async dislike(root, { videoId }, context) {
      const { user } = context;
      const { nModified } = await user.update({ $addToSet: { dislikes: [videoId] } }).exec();

      // if (nModified) {
        const video = await context.Video.findOneAndUpdate({ _id: videoId }, { $inc: { downvotes: 1 } }, { new: true }).exec();
        return video;
      // }
      return null;
    },
  },
  Video: {
    published_at: video => +new Date(video.published_at),
    src: video => `http://${process.env.REACT_APP_CLIENT}/${video.src}`,

    user: async ({ user_id }) => User.Model.findOne({ _id: user_id }).exec(),
  },
  Query: {
    async video(root, args, context) {
      const { id } = args;
      return await context.Video.findById(id).exec();
    },
    videos(root, { page, pageSize = 10, ...filterAndSort }, context) {
      const { resolution = null, duration = null } = filterAndSort.filter || {};
      const { UploadDate, ViewCount } = filterAndSort.sort || { };
      // let videos = dbVideos
      let query = {};
      let qSort = {};

      if (resolution && RESOLUTIONS[resolution]) {
        query = {
          ...query,
          resolution,
        };
      }
      const durations = {
        SHORT: { minuteLength: { $lte: 4 } },
        LONG: { minuteLength: { $gte: 20 } },
      };
      if (duration) {
        query = {
          ...query,
          ...durations[duration],
        };
      }
      if (UploadDate !== undefined) {
        qSort = {
          ...qSort,
          published_at: UploadDate ? -1 : 1,
        };
      }
      if (ViewCount !== undefined) {
        qSort = {
          ...qSort,
          viewCount: ViewCount ? -1 : 1,
        };
      }


      return context.Video.find(query).sort(qSort).skip(page * pageSize).limit(pageSize)
        .exec();
    },
  },
};

export default resolvers;
