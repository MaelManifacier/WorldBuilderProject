import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const characterSchema = new Schema({
    name: String,
    firstName: String,
    //status: {Number, default: 0},
}, {collection:'Character'});


export const Character = mongoose.model('Character', characterSchema);
