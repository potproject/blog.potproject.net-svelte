<script>
  import { page } from '$app/stores';
</script>

<svelte:head>
  <meta name="robots" content="noindex,nofollow" />
  <title>{$page.error.message} - blog.potproject.net</title>
</svelte:head>

<div class="container mx-auto xl:px-20 md:px-8 py-3 w-screen h-full flex justify-center items-center">
  <div class="px-6 py-12 w-full h-full border-2 border-gray-200 border-opacity-60 overflow-hidden bg-white dark:bg-gray-800 dark:text-gray-100">
    <h1 class="text-2xl font-bold text-center">{$page.status} {$page.error.message}</h1>
    <p class="text-center mt-4">
      {$page.status === 404 ? 'お探しのページは見つかりませんでした。' : 'エラーが発生しました。'}
    </p>
    <a href="/" class="text-center block mt-4 text-blue-400 hover:underline hover:text-blue-600 dark:text-blue-200 dark:hover:text-blue-400">トップページへ戻る</a>
  </div>
</div>