import Video from '../modules/videos/schema';
import User from '../modules/users/schema';
import Tag from '../modules/tags/schema';
import casual from 'casual';
import _ from 'lodash';

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


const randomVideo = function randomVideo(users, tags) {
  const user_id = users[_.random(0, 9)]._id;
  const _tags = tags.slice(_.random(1, 3), _.random(3, 6)).map((t) => {
    return { id: t.id, name: t.name } // TODO: Complete the seed of tags
  })
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
    tags: _tags,
    user_id,
  };
};

const randomTag = function randomTag(){
  return { name: casual.title }
}



export default function run(){
  Promise.all(
    _.times(10)
      .map(randomUser)
      .map(async u => await User.Model.create(u)))
      .then(async users => {
        await Promise.all(_.times(300).map(randomTag)
        .map(async t => await Tag.Model.create(t)))
        .then(async tags => _.times(200).map(p => Video.Model.create(randomVideo(users, tags))))
      });
}