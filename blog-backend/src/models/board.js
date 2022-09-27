import mongoose from 'mongoose';

const boardSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    code: {
      type: String,
    },
  },
  { timestamps: true },
);

const Board = mongoose.model('Board', boardSchema);

export default Board;
