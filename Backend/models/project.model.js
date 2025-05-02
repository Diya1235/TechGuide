import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      required: true,
    },
    prerequisites: {
      type: String,
      required: true,
    },
    roadmap: {
      type: [String],
      default: [],
    },
    scope: {
      type: [String],
      default: [],
    },
    technology: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    resources: {
      type: [String],
      default: [],
    },
    linksyt: {
      type: [String],
      default: [],
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model('Project', projectSchema);


