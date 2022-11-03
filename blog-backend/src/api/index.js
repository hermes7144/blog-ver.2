import Router from 'koa-router';
import posts from './posts/index.js';
import auth from './auth/index.js';
import comment from './comment/index.js';
import code from './code/index.js';
import board from './board/index.js';

const api = new Router();

api.use('/posts', posts.routes());
api.use('/auth', auth.routes());
api.use('/comment', comment.routes());
api.use('/code', code.routes());
api.use('/board', board.routes());

// 라우터를 내보냅니다.
export default api;
