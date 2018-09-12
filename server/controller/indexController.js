
import lodash from 'lodash';
import * as codes from '../constants/code';
import { readJson } from '../util';

export function index (req, res) {
    const dataObject = lodash.merge({}, {
        login: req.isAuthenticated(),
        title: 'Bitbal',
        user: JSON.stringify(req.authUser || {})
    });

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
    return res.json({
        code: codes.SUCCESS,
        data: {
            isLoggedIn: req.isAuthenticated(),
            user: req.authUser || {}
        }
    })
    // const json = readJson('.json');
    // if (!req.cookies.token) {
    //     json.data.isLoggedIn = false;
    // }
    // return res.json(json);
}

export function preload (req, res) {
    return res.json(readJson('preload.json'));
}

const controls = [
    { path: '/', fn: index },
    { path: '/', fn: indexPost, method: 'post' },
    { path: '/api/preload', fn: preload }
];

export default controls;