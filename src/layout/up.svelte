<script lang="ts">
    let isTop = true;
    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', () => {
            isTop = window.scrollY < 600;
        });
    }
</script>

<button class="{isTop ? 'hidden' : ''} fixed bottom-10 right-10 z-30 rounded-full w-12 h-12 md:w-16 md:h-16 justify-center items-center shadow-md bg-teal-500 hover:bg-teal-600 text-white text-2xl dark:bg-teal-700 dark:hover:bg-teal-800 dark:text-gray-100" on:click={() => window.scroll({top: 0, behavior: 'smooth'})}>
	<i class="las la-angle-up pt-2"></i>
</button>
