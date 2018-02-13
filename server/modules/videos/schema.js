import mongoose from 'mongoose';
import Tag from '../tags/schema';

mongoose.Promise = require('bluebird');

const { Schema } = mongoose;

const Resolutions = ['SD', 'HD'];

const DBSchema = new Schema({
  title: { type: String, required: true },
  src: { type: String, required: true },
  desc: { type: String, required: true },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  resolution: {
    type: String,
    enum: Resolutions,
  },
  viewCount: { type: Number, default: 0 },
  thumbnail: { type: String, required: true },
  isPublished: { type: Boolean, required: false },
  minuteLength: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  published_at: Date,
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  tags: [Tag.Schema]
});


const Model = mongoose.model('Video', DBSchema);

// Model.collection.drop();

export default { Model };
