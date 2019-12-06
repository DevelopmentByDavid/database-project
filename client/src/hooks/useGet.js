import useFetch from './useFetch';

export default function useGet(url) {
    return useFetch(url, { method: 'GET' });
}
