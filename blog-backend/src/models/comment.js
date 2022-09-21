import mongoose from 'mongoose';
const { Schema } = mongoose;

const commentSchema = mongoose.Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'post',
    },
    responseTo: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    content: {
      type: String,
    },
    user: {
      _id: mongoose.Types.ObjectId,
      username: String,
    },
  },
  { timestamps: true },
);

const Comment = mongoose.model('comment', commentSchema);

export default Comment;
