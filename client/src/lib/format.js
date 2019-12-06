// eslint-disable-next-line import/prefer-default-export
export function formatQuery(url, obj) {
    let base = `${url}?`;
    Object.entries(obj).forEach(([key, value], idx) => {
        let start = '&';
        if (idx === 0) {
            start = ''
        }
        // eslint-disable-next-line prefer-template
        base = base + start + `${key}=${value}`
    });
    return base;
}