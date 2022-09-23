import Board from '../../models/board';
import Joi from 'joi';

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
