import mongoose from 'mongoose';

mongoose.Promise = require('bluebird');

const { Schema } = mongoose;

const DBSchema = new Schema({
  name: { type: String, required: true }
});


const Model = mongoose.model('Tag', DBSchema);

// Model.collection.drop();

export default { Model, Schema: DBSchema };
