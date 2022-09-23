import Router from 'koa-router';
import posts from './posts';
import auth from './auth';
import comment from './comment';
import code from './code';
import board from './board';

const api = new Router();

api.use('/posts', posts.routes());
api.use('/auth', auth.routes());
api.use('/comment', comment.routes());
api.use('/code', code.routes());
api.use('/board', board.routes());

// 라우터를 내보냅니다.
export default api;
