import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: String,
  description: String,
  characters: { type: Schema.Types.ObjectId, ref: 'Characters' },
}, {collection:'Project'});


export const Project = mongoose.model('Project', projectSchema);
