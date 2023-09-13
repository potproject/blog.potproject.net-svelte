<script>
  import { onNavigate } from '$app/navigation';
  import Footer from '../layout/footer.svelte'
  import Header from '../layout/header.svelte'
  import Up from '../layout/up.svelte'

  onNavigate(() => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
	});

</script>

<main>
  <div class="bg-stone-50 dark:bg-gray-900">
    <Header />
    <slot />
    <Up />
    <Footer />
  </div>
</main>

<style global>
  @import "../app.css";
  @import "highlight.js/styles/atom-one-dark.css";
  @import "line-awesome/dist/line-awesome/css/line-awesome.min.css";
</style>
