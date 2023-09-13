<script lang="ts">
  import dayjs from 'dayjs'
  import About from '../../../../../layout/about.svelte'


	export let data;
</script>

<svelte:head>
  	<title>{data.article.title} - blog.potproject.net</title>
</svelte:head>

<div class="container mx-auto xl:px-20 md:px-8 py-3">
    <div class='flex flex-wrap-reverse'>
        <div class='w-full xl:w-1/4 md:w-1/3'>
            <About list={data.list.list} count={data.count} />
        </div>
        <div class='w-full xl:w-3/4 md:w-2/3'>
            <section class='text-gray-600 body-font dark:text-gray-300'>
                <div class="pt-2 mx-auto px-1 md:px-0">
                    <div class="flex flex-wrap">
                        <div class="lg:h-48 h-40 w-full relative">
                            {#if data.article.headerImgur}
                            <img src="{data.article.headerImgur}" alt="{data.article.title}" class="lg:h-48 h-40 w-full object-cover object-center vt-image vt-image" style:--tag="vt-image-{data.article.id}" />
                            {:else}
                            <span class="lg:h-48 h-40 w-full object-cover object-center vt-image vt-image" style:--tag="vt-image-{data.article.id}"></span>
                            {/if}
                            <div class="z-10 w-full h-full">
                                <div class="absolute bottom-0 w-full h-full bg-gradient-to-t from-black to-black opacity-75"></div>
                            </div>
                            <h1 class="absolute top-4 text-teal-50 text-xl md:text-2xl font-semibold px-6 py-2 w-full h-full z-20 vt-text" style:--tag="vt-text-{data.article.id}">{data.article.title}</h1>
                            <!-- tags -->
                            <div class="absolute bottom-12 left-4 text-gray-200 text-base z-20 hidden xl:block dark:text-gray-100">
                                {#each data.article.tags as tag}
                                <span class="inline-block py-1 px-2 m-2 rounded bg-teal-200 text-gray-700 text-xs font-medium tracking-widest dark:bg-teal-700 dark:text-gray-100">{tag}</span>
                                {/each}
                            </div>
                            <div class="absolute bottom-4 left-6 text-gray-200 text-base z-20 dark:text-gray-100">
                                <span>
                                    <img src="/author.png" class="inline-block w-6 h-6 mr-1 rounded-full" alt="author" />
                                    potpro(ぼとぷろ)
                                </span>
                            </div>
                            <div class="absolute bottom-4 right-4 text-gray-200 text-base z-20 dark:text-gray-100">
                                <span>{dayjs(data.article.createdDate).format('YYYY/MM/DD')}</span>
                            </div>
                        </div>
                        <div class="px-6 py-2 w-full h-full border-2 border-gray-200 border-t-0 border-opacity-60 overflow-hidden bg-white dark:bg-gray-800 dark:text-gray-100">
                            <div class="article">
                                {#if data.article.content}
                                    {@html data.article.content}
                                {/if}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</div>