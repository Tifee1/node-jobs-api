import { Schema, model, Types } from 'mongoose'

const JobSchema = new Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide company name'],
      maxLength: [50, 'company name too long'],
    },
    position: {
      type: String,
      required: [true, 'Please provide job position'],
      maxLength: [50, 'Job position too long'],
    },
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'interview', 'declined'],
    },
    createdBy: {
      type: Types.ObjectId,
      ref: 'User',
      required: [true, 'Please enter name'],
    },
  },
  { timestamps: true }
)

export default model('Jobs', JobSchema)
