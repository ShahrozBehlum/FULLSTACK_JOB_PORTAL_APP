import mongoose, {Schema} from 'mongoose'

const jobApplicationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    jobId: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    },
    date: {
        type: Number,
        required: true
    }
}, {timestamps: true})

const JobApplication = mongoose.model('JobAppliaction', jobApplicationSchema);
export default JobApplication;