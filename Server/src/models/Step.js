import mongoose from 'mongoose'
const Schema = mongoose.Schema

const StepSchema = new Schema({
    type: String,
    description: String,
    scenarioID: { type: Schema.Types.ObjectId, ref: 'Scenario' }
}, {collection:'Step'});

export const Step = mongoose.model('Step', StepSchema)