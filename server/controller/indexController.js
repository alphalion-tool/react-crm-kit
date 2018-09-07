
import lodash from 'lodash';
import { readJson } from '../util';

export function index (req, res) {
    const body = readJson('.json').data;
    const dataObject = lodash.merge({}, {
        permission: JSON.stringify(body.permission),
        login: body.isLoggedIn,
        debug: false,
        dev: true,
        title: 'Bitbal',
        name: body.name,
        user: JSON.stringify(body.user),
        constants: JSON.stringify(body.constants),
    });
    if (!req.cookies.token) {
        dataObject.login = false;
    }

    res.set('Content-Type', 'text/html');
    res.render('index.pug', dataObject, (err, html) => {
        if (err) {
            res.end(`error:  ${err.message}`);
        } else {
            res.end(html);
        }
    });
}

export function indexPost (req, res) {
    const json = readJson('.json');
    if (!req.cookies.token) {
        json.data.isLoggedIn = false;
    }
    return res.json(json);
}

const controls = [
    { path: '/', fn: index },
    { path: '/', fn: indexPost, method: 'post' },
];

export default controls;