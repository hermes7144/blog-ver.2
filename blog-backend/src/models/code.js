import mongoose from 'mongoose';

const codeSchema = mongoose.Schema(
  {
    value: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true },
);

const Code = mongoose.model('Code', codeSchema);

export default Code;
