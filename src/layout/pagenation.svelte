<script lang="ts">
    export let prev: number | null = null;
    export let current: number | null = null;
    export let next: number | null = null;
</script>

<div class="w-full justify-center flex flex-wrap my-2">
    {#if prev}
        <a class="border-2 border-gray-200 border-opacity-60 overflow-hidden bg-white hover:bg-gray-50 hover:shadow-lg text-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 py-1 px-2 inline-flex items-center"
            href={prev === 1 ? '/' : `/page/${prev}`}>
            <i class="las la-angle-left"></i>
            <span class="hidden md:inline">Prev</span>
        </a>
    {/if}
    <!-- Page Num -->
    <span class="border-2 border-gray-200 border-opacity-100 overflow-hidden bg-teal-500 dark:bg-teal-700 dark:border-teal-700 dark:text-gray-100 text-white font-bold mx-2 px-2 inline-flex items-center text-xl rounded">
        {current}
    </span>
    {#if next}
        <a class="border-2 border-gray-200 border-opacity-60 overflow-hidden bg-white hover:bg-gray-50 hover:shadow-lg text-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 py-1 px-2 inline-flex items-center"
        href={`/page/${next}`}>
            <span class="hidden md:inline">Next</span>
            <i class="las la-angle-right"></i>
        </a>
    {/if}
</div>