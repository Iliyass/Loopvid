import mongoose from 'mongoose';
import { isEmail } from 'validator';

mongoose.Promise = require('bluebird');

const { Schema } = mongoose;

const DBSchema = new Schema({
  fullName: { type: String, required: true },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    // required: 'Email address is required',
    // validate: [isEmail, 'Please fill a valid email address'],
  },
  password: { type: String },
  avatar: { type: String },
  isActive: { type: Boolean, required: false },
  likes: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
  dislikes: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
});


const Model = mongoose.model('User', DBSchema);

// Model.collection.drop();

export default { Model };
