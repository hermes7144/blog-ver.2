import Comment from '../../models/Comment';

export const getCommentsById = async (ctx, next) => {
  const { id } = ctx.params;
  try {
    const comment = await Comment.find({ postId: id });
    // 포스트가 존재하지 않을 때
    if (!comment) {
      ctx.status = 404; // Not Found
      return;
    }
    ctx.body = comment;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 특정 포스트 조회
GET /api/posts/:id
*/
export const read = async (ctx) => {
  console.log('필요없나');
  ctx.body = ctx.state.comment;
};

export const write = async (ctx) => {
  const { content, postId } = ctx.request.body;
  const post = new Comment({
    content,
    postId,
    user: ctx.state.user,
  });
  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 특정 포스트 제거
DELETE /api/posts/:id
*/
export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Comment.findByIdAndRemove(id).exec();
  } catch (e) {
    ctx.throw(500, e);
  }
};
