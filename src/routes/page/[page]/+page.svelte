<script>
	import dayjs from 'dayjs';
	import About from '../../../layout/about.svelte';
  import Pagenation from '../../../layout/pagenation.svelte'
	export let data;
</script>

<svelte:head>
  	<title>
	{
	data.current > 1
	  ? `${data.current}ページ目 - blog.potproject.net`
	  : 'blog.potproject.net'
  	}
	</title>
</svelte:head>

<div class="container mx-auto xl:px-20 md:px-8 py-3">
    <div class='flex flex-wrap-reverse'>
        <div class='w-full xl:w-1/4 md:w-1/3'>
            <About list={data.list.list} count={data.count} />
        </div>
        <div class='w-full xl:w-3/4 md:w-2/3'>
			<section class="text-gray-600 body-font dark:text-gray-100">
				<div class="mx-auto">
				  <div class="flex flex-wrap pt-1">
					{#if data.current > 1}
					<Pagenation prev={data.prev} current={data.current} next={data.next} />
					{/if}
					{#each data.list.list.slice(data.list.offset, data.list.offset + data.list.limit) as post}
					<div class="py-2 w-full px-1">
					  <a href={post.url}>
						  <div class="h-full border-2 border-gray-200 border-opacity-60 overflow-hidden bg-white hover:bg-gray-50 hover:shadow-lg dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 dark:hover:shadow-xl">
						  {#if post.headerImgur}
						  <img class="h-48 w-full object-cover object-center vt-image" style:--tag="vt-image-{post.id}"
						  	src={post.headerImgur.includes('images.ctfassets.net') ? post.headerImgur + '?fm=webp&w=629&h=192&fit=thumb' : post.headerImgur}
							alt={post.title}
						  >
						  {/if}
						  <div class="pt-4 p-6">
							  <div class="md:flex md:flex-wrap">
								  <div class="tracking-widest text-sm title-font text-gray-400 mr-3 py-2 font-bold my-auto dark:text-gray-300">
									  {dayjs(post.createdAt).format('YYYY/MM/DD')}
								  </div>
								  {#each post.tags as tag}
								  <span class="inline-block py-1 px-2 m-2 rounded bg-teal-200 text-gray-700 text-xs font-medium tracking-widest dark:bg-teal-700 dark:text-gray-100">{tag}</span>
								  {/each}
							  </div>
							  <h1 class="title-font text-2xl font-medium text-teal-900 dark:text-teal-50 mb-3 vt-text" style:--tag="vt-text-{post.id}">{post.title}</h1>
							  <p class="leading-relaxed mb-3">
								  {post.description}
							  </p>
							  <div class="flex items-center flex-wrap">
							  <span class="text-indigo-500 dark:text-indigo-200 inline-flex items-center md:mb-2 lg:mb-0"
							  >本文を見る
								  <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
								  <path d="M5 12h14"></path>
								  <path d="M12 5l7 7-7 7"></path>
								  </svg>
							  </span>
							  </div>
						  </div>
						  </div>
					  </a>
					</div>
					{/each}
					<Pagenation prev={data.prev} current={data.current} next={data.next} />
				  </div>
				</div>
			</section>
        </div>
    </div>
</div>

