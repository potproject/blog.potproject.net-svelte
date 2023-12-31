import { CONTENTFUL_DEFAULT_LOCALE } from '$env/static/private';
import fs from 'fs';
import { Marked, Renderer } from 'marked';
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';
import { error } from "@sveltejs/kit";
import type { BlogPost } from '../../../../../types/blogPost';
import list from '../../../../../../data/pageList.json';
import hiddlePage from '../../../../../../data/hiddenPage.json';
export const trailingSlash = 'always';

/**
 * Prerender Setup
 */
export function entries() {
    let entries = [];
    for(let entry of list){
        const url = entry.url;
        entries.push({
            year: url.split('/')[1],
            month: url.split('/')[2],
            day: url.split('/')[3],
            url: url.split('/').slice(4).join('/'),
        });

    }
    for(let url of hiddlePage){
        entries.push({
            year: url.split('/')[1],
            month: url.split('/')[2],
            day: url.split('/')[3],
            url: url.split('/').slice(4).join('/'),
        });
    }
    return entries;
}

type Query = {
    params:{
        year: string;
        month: string;
        day: string;
        url: string;
    }
}

function useWebp(url: string){
    if(url.includes('images.ctfassets.net')){
        url = url + '?fm=webp';
    }
    return url;
}

export async function load({ params }: Query) {
    
    // json load
    try{
        const limit = 10;
        const offset = 0;
        const count = list.length;

        const file = `data/entries/${params.year}/${params.month}/${params.day}/${params.url}.json`;
        const json = JSON.parse(fs.readFileSync(file, 'utf8')) as BlogPost;
        const renderer = new Renderer();
        const linkRenderer = renderer.link;
        const imageRenderer = renderer.image;
        renderer.link = (href, title, text) => {
            const html = linkRenderer.call(renderer, href, title, text);
            return html.replace(/^<a /, `<a target="_blank" rel="noreferrer noopener" `);
        };
        renderer.image = (href, title, text) => {
            href = useWebp(href);
            const html = imageRenderer.call(renderer, href, title, text);
            return html;
        };

        const marked = new Marked(
            markedHighlight({
              langPrefix: 'hljs language-',
              highlight(code, lang) {
                const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                return hljs.highlight(code, { language }).value;
              }
            })
            , { renderer }
          );
        return {
            count,
            list: {
                list,
                offset,
                limit,
            },
            article:{
                id: json.sys.id,
                title: json.fields.title[CONTENTFUL_DEFAULT_LOCALE],
                content: marked.parse(json.fields.content[CONTENTFUL_DEFAULT_LOCALE] ?? ''),
                createdDate: json.fields.createdDate[CONTENTFUL_DEFAULT_LOCALE],
                url: json.fields.url[CONTENTFUL_DEFAULT_LOCALE],
                tags: json.fields.tags?.[CONTENTFUL_DEFAULT_LOCALE] ?? [],
                headerBackgroundColor: json.fields.headerBackgroundColor?.[CONTENTFUL_DEFAULT_LOCALE] ?? '',
                redirectPath: json.fields.redirectPath?.[CONTENTFUL_DEFAULT_LOCALE] ?? '',
                headerImgur: json.fields.headerImgur?.[CONTENTFUL_DEFAULT_LOCALE] ?? '',
                hiddenPage: json.fields.hiddenPage?.[CONTENTFUL_DEFAULT_LOCALE] ?? false,
            }
        }
    }catch(e){
        console.log(e);
        throw error(404, 'Not found');
    }
}