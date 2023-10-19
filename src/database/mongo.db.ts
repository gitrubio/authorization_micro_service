import mongoose from 'mongoose';
import config from '../config';

mongoose.connect(config.DB_CONNECTION)
	.then((db) => console.log('DB is connected'))
	.catch((err) => console.log(err));
