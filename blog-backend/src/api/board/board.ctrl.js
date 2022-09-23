import Board from '../../models/Board';

// 체크필요
export const read = async (ctx) => {
  ctx.body = ctx.state.board;
};

export const insert = async (ctx) => {
  const { code, name } = ctx.request.body;
  console.log(code, name);
  const board = new Board({
    code,
    name,
  });
  console.log(board);
  try {
    await board.save();
    ctx.status = 201;
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
    await Board.findByIdAndRemove(id).exec();
    ctx.status = 204; // No Content
  } catch (e) {
    ctx.throw(500, e);
  }
};
