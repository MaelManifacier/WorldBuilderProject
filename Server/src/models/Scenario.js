import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ScenarioSchema = new Schema({
    description: String,
    steps: { type: Schema.Types.ObjectId, ref: 'Steps' },
}, {collection:'Scenario'});

export const Scenario = mongoose.model('Scenario', ScenarioSchema)