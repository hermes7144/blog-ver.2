import Code from '../../models/code';
import Joi from 'joi';

/* 코드 읽기
GET /api/code
*/ export const read = async (ctx) => {
  const codes = await Code.find();

  ctx.body = codes;
};

/* 코드 추가
POSt /api/code
*/
export const insert = async (ctx) => {
  const { value, description } = ctx.request.body;
  const code = new Code({
    value,
    description,
  });
  try {
    await code.save();
    ctx.status = 201;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 특정 코드 제거
DELETE /api/code/:id
*/
export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Code.findByIdAndRemove(id).exec();
    ctx.status = 204; // No Content
  } catch (e) {
    ctx.throw(500, e);
  }
};
/* 특정 코드 수정
PATCH /api/code/:id
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
    const code = await Code.findByIdAndUpdate(id, ctx.request.body, {
      new: true,
    }).exec();

    if (!code) {
      ctx.status = 404;
      return;
    }
    ctx.body = code;
  } catch (e) {
    ctx.throw(500, e);
  }
};
