import mongoose from 'mongoose'
const Schema = mongoose.Schema

const StepSchema = new Schema({
    type: String,
    description: String,
}, {collection:'Step'});

export const Step = mongoose.model('Step', StepSchema)