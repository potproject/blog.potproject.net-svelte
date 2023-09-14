<script>
  export let list = [];
  let page = 1;
  const limit = 10;
  export let count = 0;
</script>

<section class="text-gray-600 dark:text-gray-100 body-font sticky xl:-top-96 lg:-top-100 md:-top-108">
  <div class="md:py-2 mx-auto pt-4">
    <div class="flex flex-wrap mx-1">
      <div
        class="p-2 w-full h-full border-2 border-gray-200 dark:border-gray-700 border-opacity-60 overflow-hidden bg-white dark:bg-gray-800"
      >
        <img
          class="h-28 w-28 mt-6 object-cover object-center m-auto rounded-full hover:shadow-lg hover:scale-110 transform transition duration-300 ease-in-out
                "
          src="/author.png"
          alt="blog"
        />
        <!-- Author -->
        <div class="flex flex-col items-center text-center justify-center">
          <h2 class="font-semibold title-font mt-4 text-teal-900 dark:text-teal-50 text-xl">potpro (ぽとぷろ)</h2>
          <div class="w-12 h-1 bg-teal-500 rounded mt-2 mb-4" />
          <p class="text-base">Full-stuck engineer(Not Full-stack)</p>
          <p class="text-base">JS/PHP/Go/Docker/Nginxなど。技術または趣味寄りの発信ブログです。</p>
          <div>
            <div class="flex justify-center mt-6">
              <a
                href="https://twitter.com/potpro"
                target="_blank"
                rel="me"
                class="ml-3 text-gray-400 hover:text-white text-lg dark:text-gray-200 dark:hover:text-gray-800"
                title="twitter(X)"
              >
                <span class="relative inline-flex justify-center items-center">
                  <i class="lab la-2x la-twitter relative" />
                  <span
                    class="absolute text-4xl text-gray-800 hover:text-gray-800 opacity-0 hover:opacity-100 dark:text-gray-50 dark:hover:text-gray-50"
                    >𝕏</span
                  >
                </span>
              </a>
              <a
                href="https://mastodon.potproject.net/@potpro"
                target="_blank"
                rel="me"
                class="ml-3 text-gray-400 hover:text-blue-600 text-lg dark:text-gray-50 dark:hover:text-blue-400"
                title="mastodon"
              >
                <i class="lab la-2x la-mastodon" />
              </a>
              <!-- github -->
              <a
                href="https://github.com/potproject/"
                target="_blank"
                rel="me"
                class="ml-3 text-gray-400 hover:text-gray-800 text-lg dark:text-gray-50 dark:hover:text-gray-600"
                title="github"
              >
                <i class="lab la-2x la-github" />
              </a>
              <!-- Bluesky -->
              <a
                href="https://bsky.app/profile/potp.ro"
                target="_blank"
                rel="me"
                class="ml-3 text-gray-400 hover:text-gray-800 text-lg dark:text-gray-50 dark:hover:text-gray-600 grayscale hover:grayscale-0"
                title="bluesky"
              >
                <span class="relative inline-flex justify-center items-center">
                  <!-- box -->
                  <span class="bg-gray-400 dark:bg-gray-50 rounded-md w-7 h-7 m-1" />
                  <img src="/social/bluesky.png"
                    class="absolute w-7 h-7 m-1 opacity-0 hover:opacity-100"
                    alt="bluesky" />
                </span>
              </a>
            </div>
          </div>
          <div class="w-12 h-1 bg-teal-500 rounded mt-4 mb-4" />
          <span class="text-sm text-gray-400 dark:text-gray-200">全 {count} 記事</span>
          <div class="w-12 h-1 bg-teal-500 rounded mt-4 mb-4" />
          <!-- 最新記事 -->
          <div class="flex flex-col">
            <div class="flex justify-center my-auto mt-4">
              <button
                class="flex items-center text-gray-400 hover:text-teal-800 dark:text-gray-200 dark:hover:text-teal-400 text-xl justify-center align-middle"
                on:click={() => {
                  if (page > 1) {
                    page -= 1;
                  }
                }}
              >
                <i class="las la-angle-left" />
              </button>
              <span class="font-semibold title-font text-teal-900 dark:text-teal-50 text-xl p-2">{page === 1 ? '最新記事' : `記事(${page}/${Math.ceil(count / limit)})`}</span>
              <button
                class="flex items-center text-gray-400 hover:text-teal-800 dark:text-gray-200 dark:hover:text-teal-400 text-xl"
                on:click={() => {
                  if (page < Math.ceil(count / limit)) {
                    page += 1;
                  }
                }}
              >
                <i class="las la-angle-right" />
              </button>
            </div>
            {#each list.slice((page - 1) * limit, (page - 1) * limit + limit) as post}
              <div class="flex flex-col text-left">
                <a
                  href={post.url}
                  class="text-base text-blue-400 hover:underline hover:text-blue-600 py-1 dark:text-blue-200 dark:hover:text-blue-400"
                  >{post.title}</a
                >
              </div>
            {/each}
          </div>
          <div class="w-12 h-1 bg-teal-500 rounded mt-4 mb-4" />
      </div>
    </div>
  </div>
</section>
