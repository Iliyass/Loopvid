import mongoose from 'mongoose';


const connect = function connect(uri, options) {
  try {
    mongoose.connect(uri, {
      ...options,
    });
  } catch (err) {
    console.error('ERROR', err);
  }
};


export default { connect };
