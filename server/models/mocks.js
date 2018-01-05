import casual from 'casual';
import _ from 'lodash';

const randomVideo = function randomVideo(){
  return {
    id: casual.uuid,
    title: casual.title
  }
}
const mocks = {
  String: () => 'It works!',  
  Query: () => ({
    videos: (root, args) => {
      return _.times(10).map(randomVideo);
    }
  }),
  Author: () => ({ id: () => casual.uuid, firstName: () => casual.first_name, lastName: () => casual.last_name }),
  Post: () => ({ title: casual.title, text: casual.sentences(3) }),
};

export default mocks;