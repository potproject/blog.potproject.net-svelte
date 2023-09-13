<script>
  import GithubCorner from "./github-corner.svelte"

  const toggleDarkMode = () => {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark')
    if (isDark) {
      html.classList.remove('dark')
      localStorage.setItem('darkMode', 'false')
    } else {
      html.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
    }
  }
</script>
<header class="sticky top-0 z-30 text-gray-900 body-font shadow-md border-b-2 border-gray-100 bg-opacity-90 bg-white h-16 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
  <div class="container mx-auto flex flex-wrap px-6 py-3 flex-row items-center">
    <a href="/" class="flex title-font font-medium items-center mb-0">
      <span class="ml-3 mt-2 text-xl">blog.potproject.net</span>
    </a>
    <button class="flex ml-auto mr-10 text-gray-400 dark:text-gray-100 hover:text-gray-800 dark:hover:text-gray-400" on:click={() => toggleDarkMode()} >
      <i class="las la-moon la-2x text-2xl cursor-pointer"></i>
    </button>
      
  </div>
  <GithubCorner />
</header>