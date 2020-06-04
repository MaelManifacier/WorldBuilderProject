import mongoose from 'mongoose'
const Schema = mongoose.Schema

const FamilyMemberSchema = new Schema({
    person: { type: Schema.Types.ObjectId, ref: 'Characters'},
    role: String,
    characterID: { type: Schema.Types.ObjectId, ref: 'Character' }
}, {collection:'FamilyMember'});

export const Step = mongoose.model('FamilyMember', FamilyMemberSchema)