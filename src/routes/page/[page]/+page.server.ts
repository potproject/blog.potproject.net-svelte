import { error, redirect } from '@sveltejs/kit'
import type { Load } from '@sveltejs/kit'
import list from '../../../../data/pageList.json'

export const trailingSlash = 'always'

type Page = {
  title: string
  createdAt: string
  description: string
  url: string
  tags: string[]
  headerBackgroundColor: string | null
  headerImgur: string | null
}


export const load: Load = async ({params}) => {
  let page = params.page
  let pageInt = 1
  if (typeof page === 'string' && page.match(/^[0-9]+$/)) {
    pageInt = parseInt(page)
  } else {
    throw error(404, 'Not found')
  }

  // page = 1 redirect
  if (pageInt === 1) {
    // redirect
    throw redirect(301, `/`)
  }

  const limit = 10
  const offset = (pageInt - 1) * limit
  let count = 0
  const current = pageInt
  const prev = pageInt > 1 ? pageInt - 1 : null
  const next = list.length > (pageInt * limit) ? pageInt + 1 : null
  if (list.length === 0) {
    throw error(404, 'Not found')
  }
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
}
