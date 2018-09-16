import queryString from 'query-string';

export default function joinParams(url, query) {
    let path = url;
    const queryStr = queryString.stringify(query);
    if (!queryStr) {
        return path;
    }
    if (path.match(/\?/)) {
        path = `${path}&${queryStr}`;
    } else {
        path = `${path}?${queryStr}`;
    }
    return path;
}

const parseUrl = path => {
    let tmpPath = path;
    if (tmpPath.lastIndexOf('?') !== -1) {
        tmpPath = tmpPath.substring(tmpPath.lastIndexOf('?') + 1);
    }
    return queryString.parse(tmpPath);
};

export {
    parseUrl
};
