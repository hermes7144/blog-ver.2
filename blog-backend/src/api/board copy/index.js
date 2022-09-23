import Router from 'koa-router';
import * as boardctrl from './board.ctrl.js.js';
import checkedLoggedIn from '../../lib/checkLoggedIn';

const board = new Router();

board.get('/', checkedLoggedIn, boardctrl.read);
board.post('/', checkedLoggedIn, boardctrl.insert);
board.patch('/', checkedLoggedIn, boardctrl.update);
board.delete('/:id', checkedLoggedIn, boardctrl.remove);

export default board;
