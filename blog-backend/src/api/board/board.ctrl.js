import Board from '../../models/board';
import Post from '../../models/post';
import Joi from 'joi';
import sanitizeHtml from 'sanitize-html';
/* 코드 읽기
GET /api/board
*/ export const read = async (ctx) => {
  const boards = await Board.find();

  ctx.body = boards;
};

/* 코드 추가
POST /api/board
*/
export const insert = async (ctx) => {
  console.log(ctx.request.body);
  const { code, name } = ctx.request.body;
  const board = new Board({
    code,
    name,
  });
  try {
    await board.save();
    ctx.status = 201;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 특정 코드 제거
DELETE /api/board/:id
*/
export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Board.findByIdAndRemove(id).exec();
    ctx.status = 204; // No Content
  } catch (e) {
    ctx.throw(500, e);
  }
};
/* 특정 코드 수정
PATCH /api/board/:id
*/

export const update = async (ctx) => {
  const { id } = ctx.params;

  const schema = Joi.object().keys({
    value: Joi.string().required(),
    description: Joi.string().required(),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  try {
    const board = await board
      .findByIdAndUpdate(id, ctx.request.body, {
        new: true,
      })
      .exec();

    if (!board) {
      ctx.status = 404;
      return;
    }
    ctx.body = board;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const boardList = async (ctx) => {
  const { board } = ctx.params;
  const page = parseInt(ctx.query.page || '1', 10);

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  try {
    const posts = await Post.find({ boardId: board })
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec();
    const postCount = await Post.countDocuments({ boardId: board }).exec();
    ctx.set('Last-Page', Math.ceil(postCount / 10));
    ctx.body = posts.map((post) => ({
      ...post,
      body: removeHtmlAndShorten(post.body),
    }));
    console.log(ctx);
  } catch (e) {
    ctx.throw(500, e);
  }
};

const removeHtmlAndShorten = (body) => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [],
  });
  return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};
