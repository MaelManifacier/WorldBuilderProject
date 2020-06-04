import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const characterSchema = new Schema({
    name: String,
    firstName: String,
    birthDate : Date,
    birthPlace : String,
    livingPlace : String,
    gender : String,
    size : Number, //status: {Number, default: 0}
    corpulence : String,
    traits : [String],
    faults : [String],
    activities : [String],
    characteristics : [String],
    past : String,
    aims : [String],
    family : [{ type: Schema.Types.ObjectId, ref: 'FamilyMember'}],
    projectID: { type: Schema.Types.ObjectId, ref: 'Project' }
}, {collection:'Character'});


export const Character = mongoose.model('Character', characterSchema);
