import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: String,
  description: String,
  characters: [{ type: Schema.Types.ObjectId, ref: 'Character' }],
  scenarii : [{ type: Schema.Types.ObjectId, ref: 'Scenario'}],
  userID: { type: Schema.Types.ObjectId, ref: 'User' }
}, {collection:'Project'});


export const Project = mongoose.model('Project', projectSchema);
