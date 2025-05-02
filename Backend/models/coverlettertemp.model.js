import mongoose from 'mongoose';

const cLTemplatesSchema = new mongoose.Schema(
  {
    
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming users have their own collection
      required: true,
    },

    
  },
  { timestamps: true } // Auto-generates createdAt & updatedAt
);

export const cltemplates =  mongoose.model('cLtemplates', cLTemplatesSchema);
