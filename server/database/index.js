import mongoose from 'mongoose';
import Seeders from '../models/seeders';


const connect = function connect(uri, options) {
  try {
    mongoose.connect(uri, {
      ...options,
    });

    // mongoose.connection.on('open', function(){
    //   mongoose.connection.db.dropDatabase(function (err) {
    //     console.log('db dropped');
    //     Seeders()        
    //   });
    //  })
  } catch (err) {
    console.error('ERROR', err);
  }
};


export default { connect };
