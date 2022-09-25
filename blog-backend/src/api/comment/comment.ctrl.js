import Comment from '../../models/comment';

/* 코멘트 조회
GET /api/comment/:id
*/
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

// 체크필요
export const read = async (ctx) => {
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

/* 특정 코멘트 제거
DELETE /api/comment/:id
*/
export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Comment.findByIdAndRemove(id).exec();
    ctx.status = 204; // No Content
  } catch (e) {
    ctx.throw(500, e);
  }
};
