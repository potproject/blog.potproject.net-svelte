import { error } from '@sveltejs/kit'
import list from '../../data/pageList.json';

export const trailingSlash = 'always';

type Page = {
  title: string;
  createdAt: string;
  description: string;
  url: string;
  tags: string[];
  headerBackgroundColor: string|null;
  headerImgur: string|null;
}

export async function load() {
  try{
      const page = 1;
      const limit = 10;
      const offset = 0;
      const count = list.length;
      const prev = null;
      const current = page;
      const next = list.length > (page * limit) ? page + 1 : null;
      return {
          count,
          list: {
              list,
              offset,
              limit,
          },
          prev,
          current,
          next,
      }
  }catch(e){
      console.log(e);
      throw error(404, 'Not found');
  }
}
