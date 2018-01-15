import customTypes from '../customTypes';
import casual from 'casual';
import _ from 'lodash';

const RESOLUTIONS = ['SD', 'HD']
const DURATION  = ['SHORT', 'LONG']
const randomUser = function randomUser(){
  return {
    id: casual.uuid,
    fullName: casual.full_name,
    password: casual.password,
    email: casual.email,
    avatar: `http://lorempixel.com/${_.random(340, 350)}/${_.random(340, 350)}/`
  }
}

const dbUsers = _.times(10).map(randomUser);

const videoSRC = [ "portrait.mp4", "portrait2.mp4","portrait3.mp4"]

const randomVideo = function randomVideo(){
  return {
    id: casual.uuid,
    title: casual.title,
    desc: casual.description,
    src: videoSRC[_.random(0, 2)],    
    resolution: RESOLUTIONS[_.random(0, 1)],
    upvotes: _.random(1, 1000),
    downvotes: _.random(1, 1000),
    viewCount: _.random(12, 12000),
    thumbnail: `http://lorempixel.com/${_.random(340, 350)}/${_.random(340, 350)}/`,
    isPublished: Boolean(_.random(0.5, 1)),
    minuteLength: _.random(2, 45),
    created_at: new Date(_.random(1325376000000, 1515139989055)),
    published_at: new Date(_.random(1325376000000, 1515139989055)),
    user_id: dbUsers[_.random(0, dbUsers.length - 1)].id
  }
}

const dbVideos = _.times(10).map(randomVideo);

const resolvers = {
  ...customTypes,
  Mutation: {
    login(root, { email, password }){
      return _.find(dbUsers, { email, password })
    },
    signup(root, { email, password, fullName }){
      dbUsers.push({ id: casual.uuid, email, password, fullName })
      return _.last(dbUsers)
    }
  },
  Video: {
    src: (video) => `http://localhost:3000/${video.src}`,
    user: (video) => {
      return _.find(dbUsers, { id: video.user_id })
    }
  },
  User: {
    fullName: (user) => {
      return `My Fucking Full name is ${user.fullName}`
    }
  },
  Query: {
    user(root, { id }){
      return _.find(dbUsers, { id })
    },
    users(root, { }){
      return dbUsers
    },
    video(root, args){
      const { id } = args
      return _.find(dbVideos, { id })
    },
    videos(root, { page, pageSize = 10, filter = { resolution, duration }, sort = { UploadDate, ViewCount } }) {
      const { resolution, duration } = filter
      const { UploadDate, ViewCount } = sort
      let videos = dbVideos

      if(resolution){
        videos = _.filter(videos, v => v.resolution === resolution)
      }
      if(duration){
        videos = _.filter(videos, v => (duration === "SHORT" && v.minuteLength <= 4) || (duration === "LONG" && v.minuteLength > 20) )
      }
      if(UploadDate !== undefined){
        videos = _.sortBy(videos, [ 'published_at' ], [ UploadDate ? 'desc' : 'asc' ])
      }
      if(ViewCount  !== undefined){
        videos = _.sortBy(videos, [ 'viewCount' ], [ ViewCount ? 'desc' : 'asc' ] )
      }
      
      videos = _.take(_.slice(videos, page * pageSize), pageSize)

      return videos
    }
  }
};

export default resolvers;