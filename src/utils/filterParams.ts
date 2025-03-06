export function getFilterParams(filter: string) {
  return {
    title_like: filter,
    description_like: filter,
    id_like: filter,
    author_like: filter,
    post_like: filter,
    image_like: filter,
  };
}
