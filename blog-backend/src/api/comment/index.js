import Router from 'koa-router';
import * as commentctrl from './comment.ctrl.js';
import checkedLoggedIn from '../../lib/checkLoggedIn';

const comment = new Router();

comment.get('/', commentctrl.read);
comment.post('/', checkedLoggedIn, commentctrl.write);
comment.delete('/:id', checkedLoggedIn, commentctrl.remove);

comment.use('/:id', commentctrl.getCommentsById, comment.routes());

export default comment;
