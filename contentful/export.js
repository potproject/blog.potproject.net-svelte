import * as dotenv from 'dotenv'
import contentfulExport from 'contentful-export'
import removeMd from 'remove-markdown'
import fs from 'fs'
import path from 'path'
import { Feed } from 'feed'
dotenv.config()

const { CONTENTFUL_SPACE_ID, CONTENTFUL_MANAGEMENT_TOKEN, CONTENTFUL_DEFAULT_LOCALE } = process.env
const dataDirectory = path.join(process.cwd(), 'data')
const staticDirectory = path.join(process.cwd(), 'static')
const entriesDirectory = path.join(dataDirectory, 'entries')

const baseUrl = 'https://blog.potproject.net'


if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_MANAGEMENT_TOKEN || !CONTENTFUL_DEFAULT_LOCALE) {
  throw new Error(
    [
      'Parameters missing...',
      'Please ensure your .env file exists and contains the variables CONTENTFUL_SPACE_ID and CONTENTFUL_MANAGEMENT_TOKEN',
    ].join('\n')
  )
}

const options = {
  spaceId: CONTENTFUL_SPACE_ID,
  managementToken: CONTENTFUL_MANAGEMENT_TOKEN,
  queryEntries: ['content_type=blogPost'],
}

contentfulExport(options)
  .then((result) => execute(result.entries))
  .catch((e) => console.error(e))

const generateFile = (entries) => {
  for (const entry of entries) {
	const url = generateUrl(entry);
	const dir = path.dirname(path.join(entriesDirectory, url));
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    // create file entry to {year}/{month}/{day}/{fields.url[CONTENTFUL_DEFAULT_LOCALE]}.json
    const file = path.join(dir, `${entry.fields.url[CONTENTFUL_DEFAULT_LOCALE]}.json`)
    fs.writeFileSync(file, JSON.stringify(entry, null, 2))
    console.log(`File has been created: ${file}`)
  }
}

const generateRedirectPath = (entries) => {
  const redirectPaths = {}
  for (const entry of entries) {
    if (entry.fields.redirectPath) {
      redirectPaths["/"+entry.fields.redirectPath[CONTENTFUL_DEFAULT_LOCALE]] = generateUrl(entry)
    }
  }
  const redirectPathFile = path.join(dataDirectory, 'redirectPaths.json')
  fs.writeFileSync(redirectPathFile, JSON.stringify(redirectPaths, null, 2))
  console.log(`Redirect path file has been created: ${redirectPathFile}`)
}

const generatePageList = (entries) => {
  const pageList = []
  for (const entry of entries) {
    if (!entry.fields.hiddenPage || !entry.fields.hiddenPage[CONTENTFUL_DEFAULT_LOCALE]) {
      let md = entry.fields.content[CONTENTFUL_DEFAULT_LOCALE]
      md = md.replace(/^(.+)\n/, '')
      const plainText = removeMd(md).replace(/\n/g, ' ').trim()

      let description = plainText.slice(0, 200)
      if (plainText.length > 200) {
        description += '...'
      }
      pageList.push({
        id: entry.sys.id,
        title: entry.fields.title[CONTENTFUL_DEFAULT_LOCALE],
        createdAt: entry.fields.createdDate[CONTENTFUL_DEFAULT_LOCALE],
        description: description,
        tags: entry.fields.tags ? entry.fields.tags[CONTENTFUL_DEFAULT_LOCALE] : [],
        url: generateUrl(entry),
        headerImgur: entry.fields.headerImgur
          ? entry.fields.headerImgur[CONTENTFUL_DEFAULT_LOCALE]
          : null,
        headerBackgroundColor: entry.fields.headerBackgroundColor
          ? entry.fields.headerBackgroundColor[CONTENTFUL_DEFAULT_LOCALE]
          : null,
      })
    }
  }

  // page list file write
  const pageListFile = path.join(dataDirectory, 'pageList.json')
  fs.writeFileSync(pageListFile, JSON.stringify(pageList, null, 2))
  console.log(`Page list file has been created: ${pageListFile}`)
}

const generateRss = (entries) => {
	const feed = new Feed({
		title: 'blog.potproject.net',
		description: '独り言とか技術的なこと。',
		id: baseUrl,
		link: baseUrl,
		language: 'ja', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
		image: `${baseUrl}/author.png`,
		copyright: 'potproject',
		generator: 'Sveltekit',
    feedLinks: {
      atom: "${baseUrl}/atom.xml",
    },
		author: {
		  name: 'potpro',
		  //email: "johndoe@example.com",
		  link: 'https://potproject.net',
		},

	  })

	for (const entry of entries.slice(0, 20)) {
		if (!entry.fields.hiddenPage || !entry.fields.hiddenPage[CONTENTFUL_DEFAULT_LOCALE]) {
      let md = entry.fields.content[CONTENTFUL_DEFAULT_LOCALE]
      md = md.replace(/^(.+)\n/, '')
      const plainText = removeMd(md).replace(/\n/g, ' ').trim()

      let description = plainText.slice(0, 300)
      if (plainText.length > 300) {
        description += '...'
      }
			const url = generateUrl(entry);
			feed.addItem({
				title: entry.fields.title[CONTENTFUL_DEFAULT_LOCALE],
				id: `${baseUrl}${url}`,
				link: `${baseUrl}${url}`,
				description: description,
				date: new Date(entry.fields.createdDate[CONTENTFUL_DEFAULT_LOCALE]),
				image: entry.fields.headerImgur ? entry.fields.headerImgur[CONTENTFUL_DEFAULT_LOCALE] : null,
			})
		}
	}

	// rss file write
	const rssFile = path.join(staticDirectory, 'rss.xml')
	fs.writeFileSync(rssFile, feed.rss2())
	console.log(`RSS file has been created: ${rssFile}`)

  // atom file write
  const atomFile = path.join(staticDirectory, 'atom.xml')
  fs.writeFileSync(atomFile, feed.atom1())
  console.log(`Atom file has been created: ${atomFile}`)
}

const generateHiddenPage = (entries) => {
  const hiddenPage = []
  for (const entry of entries) {
    if (entry.fields.hiddenPage && entry.fields.hiddenPage[CONTENTFUL_DEFAULT_LOCALE]) {
      hiddenPage.push(generateUrl(entry))
    }
  }
  const hiddenPageFile = path.join(dataDirectory, 'hiddenPage.json')
  fs.writeFileSync(hiddenPageFile, JSON.stringify(hiddenPage, null, 2))
  console.log(`Hidden page file has been created: ${hiddenPageFile}`)
}

const generateUrl = (entry) => {
  const createdDate = entry.fields.createdDate[CONTENTFUL_DEFAULT_LOCALE];
  const year = createdDate.slice(0, 4);
  const month = createdDate.slice(5, 7);
  const day = createdDate.slice(8, 10);
  return `/${year}/${month}/${day}/${entry.fields.url[CONTENTFUL_DEFAULT_LOCALE]}`;
}

const execute = (entries) => {
	// sort by createdDate
	entries.sort((a, b) => {
		const aDate = new Date(a.fields.createdDate[CONTENTFUL_DEFAULT_LOCALE]).getTime();
		const bDate = new Date(b.fields.createdDate[CONTENTFUL_DEFAULT_LOCALE]).getTime();
		return bDate - aDate;
	});
  generateFile(entries)
  generateRedirectPath(entries)
  generatePageList(entries)
  generateHiddenPage(entries)
  generateRss(entries)
  console.log('Done! Total files: ' + entries.length)
}
