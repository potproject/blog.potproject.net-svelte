import { error, redirect } from '@sveltejs/kit'
import redirectPaths from '../data/redirectPaths.json';

export async function handle({ event, resolve }) {
    const path = event.url.pathname;
    if (redirectPaths[path]) {
        throw redirect(301, redirectPaths[path]);
    }

    const response = await resolve(event);
    return response;
}