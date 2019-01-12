// escape string with regex for fuzzy search.
export const escapeRegex = (text: string) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
