import useFetch from './useFetch';

export default function useGet(url, body) {
    const [loading, data] = useFetch(url, {
        method: 'POST',
        body,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // TODO: add a snack
    return [loading, data];
}
