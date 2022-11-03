import Comment from '../../models/comment.js';

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
  const comment = new Comment({
    content,
    postId,
    user: ctx.state.user,
  });
  try {
    await comment.save();
    ctx.body = comment;
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
    ctx.body = id;
  } catch (e) {
    ctx.throw(500, e);
  }
};
