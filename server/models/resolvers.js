import customTypes from '../customTypes';
import casual from 'casual';
import _ from 'lodash';

const RESOLUTIONS = ['SD', 'HD']
const DURATION  = ['SHORT', 'LONG']

const randomVideo = function randomVideo(){
  return {
    id: casual.uuid,
    title: casual.title,
    desc: casual.description,
    resolution: RESOLUTIONS[_.random(0, 1)],
    upvotes: _.random(1, 1000),
    downvotes: _.random(1, 1000),
    viewCount: _.random(12, 12000),
    thumbnail: `http://lorempixel.com/${_.random(340, 350)}/${_.random(340, 350)}/`,
    isPublished: Boolean(_.random(0.5, 1)),
    minuteLength: _.random(2, 45),
    created_at: new Date(_.random(1325376000000, 1515139989055)),
    published_at: new Date(_.random(1325376000000, 1515139989055))
  }
}

const dbVideos = _.times(100).map(randomVideo);

const resolvers = {
  ...customTypes,
  Query: {
    videos(root, { page, pageSize = 10, filter = { resolution, duration }, sort }) {
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
      
      videos = _(videos).slice(page * pageSize).take(pageSize)

      return videos
    }
  }
};

export default resolvers;