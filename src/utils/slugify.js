export const slugify = (data, id = "", separator = "-") => {
  return data
    .toString()
    .normalize("NFD") // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, "") // remove all previously split accents
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "") // remove all chars not letters, numbers and spaces (to be replaced)
    .trim()
    .replace(/\s+/g, separator)
    .concat(id && separator + id);
};
