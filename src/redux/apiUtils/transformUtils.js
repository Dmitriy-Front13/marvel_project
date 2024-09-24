export const transformCharacter = (char) => {
  return {
    id: char.id,
    name: char.name,
    description: char.description
      ? `${char.description.slice(0, 210)}...`
      : "There is no description for this character",
    thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
    homepage: char.urls[0].url,
    wiki: char.urls[1].url,
    comics: char.comics.items,
  };
};

export const transformComics = (comics) => {
  return {
    id: comics.id,
    title: comics.title,
    description: comics.description || "There is no description",
    pageCount: comics.pageCount
      ? `${comics.pageCount} p.`
      : "No information about the number of pages",
    thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
    language: comics.textObjects[0]?.language || "en-us",
    price: comics.prices[0].price
      ? `${comics.prices[0].price}$`
      : "not available",
  };
};