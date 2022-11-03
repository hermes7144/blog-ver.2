import Router from 'koa-router';
import * as codectrl from './code.ctrl.js';
import checkedLoggedIn from '../../lib/checkLoggedIn.js';

const code = new Router();

code.get('/', codectrl.read);
code.post('/', codectrl.insert);
code.put('/:id', checkedLoggedIn, codectrl.update);
code.delete('/:id', checkedLoggedIn, codectrl.remove);

export default code;
