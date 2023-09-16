import { WatchCallback, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

export function usePagination() {
  const page = ref(0);

  const { query } = useRoute();
  const router = useRouter();

  // initialize page from query
  const initFromQuery = () => {
    const queryPage = query.page;
    if (Array.isArray(queryPage)) page.value = Number(queryPage[0]);
    else page.value = Number(queryPage ?? 0);
  };

  initFromQuery();

  // watch for query changes
  watch(query, initFromQuery);

  const watchPage = (cb: WatchCallback<number, number>) => watch(page, cb);

  const increment = () => {
    page.value++;
    router.replace({ query: { page: page.value } });
  };
  const decrement = () => {
    page.value = Math.max(0, page.value - 1);
    router.replace({ query: { page: page.value } });
  };

  return { page, watchPage, increment, decrement };
}
