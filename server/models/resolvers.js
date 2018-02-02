import customTypes from '../customTypes';
import casual from 'casual';
import _ from 'lodash';
import Video from '../modules/videos/schema';
import User from '../modules/users/schema';

const RESOLUTIONS = ['SD', 'HD'];
const DURATION = ['SHORT', 'LONG'];
const randomUser = function randomUser() {
  return {
    fullName: casual.full_name,
    password: casual.password,
    email: casual.email,
    avatar: `https://picsum.photos/${_.random(340, 350)}/${_.random(340, 350)}/`,
  };
};
const videoSRC = ['portrait.mp4', 'portrait2.mp4', 'portrait3.mp4'];

// const dbUsers = _.times(10).map(randomUser);


const randomVideo = function randomVideo(users) {
  const user_id = users[_.random(0, 9)]._id;

  return {
    // id: casual.uuid,
    title: casual.title,
    desc: casual.description,
    src: videoSRC[_.random(0, 2)],
    resolution: RESOLUTIONS[_.random(0, 1)],
    upvotes: _.random(1, 1000),
    downvotes: _.random(1, 1000),
    viewCount: _.random(12, 12000),
    thumbnail: `https://picsum.photos/${_.random(340, 350)}/${_.random(340, 350)}/`,
    isPublished: Boolean(_.random(0.5, 1)),
    minuteLength: _.random(2, 45),
    created_at: new Date(_.random(1325376000000, 1515139989055)),
    published_at: new Date(_.random(1325376000000, 1515139989055)),
    user_id,
  };
};

// Promise.all(
//   _.times(10)
//     .map(randomUser)
//     .map(async u => await User.Model.create(u)))
//     .then(users => {
//       _.times(200).map(p => Video.Model.create(randomVideo(users)))
//     });

// const dbVideos = _.times(1).map( v => {
//   randomVideo().then(vid => Video.Model.create(vid) )
// })


const resolvers = {
  ...customTypes,
  Mutation: {
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
