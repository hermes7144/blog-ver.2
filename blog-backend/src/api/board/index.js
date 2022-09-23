import Router from 'koa-router';
import * as boardctrl from './board.ctrl.js';
import checkedLoggedIn from '../../lib/checkLoggedIn';

const board = new Router();

board.get('/', boardctrl.read);
board.post('/', boardctrl.insert);

board.put('/:id', checkedLoggedIn, boardctrl.update);
board.delete('/:id', checkedLoggedIn, boardctrl.remove);

board.get('/:boardId', boardctrl.boardList);

export default board;
