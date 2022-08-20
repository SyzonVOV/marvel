import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp();

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = `apikey=${process.env.REACT_APP_API_KEY}`;
  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`,
    );
    return res.data.results.map(_transformCharacter);
  };

  const getCharacterByName = async name => {
    const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async id => {
    let res = await request(`${_apiBase}characters/${id}?${_apiKey}`);

    return _transformCharacter(res.data.results[0]);
  };

  const getAllComics = async (offset = 0) => {
    const res = await request(
      `${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`,
    );
    return res.data.results.map(_transformComics);
  };

  const getComic = async id => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  };

  const _transformCharacter = hero => {
    return {
      id: hero.id,
      name: hero.name,
      description: _fillMockedText(hero.description),
      thumbnail: hero.thumbnail.path + '.' + hero.thumbnail.extension,
      homepage: hero.urls[0].url,
      wiki: hero.urls[1].url,
      comics: hero.comics.items,
    };
  };

  const _transformComics = comics => {
    return {
      id: comics.id,
      title: comics.title,
      description: _fillMockedText(comics.description),
      pageCount: comics.pageCount
        ? `${comics.pageCount} p.`
        : 'No information about the number of pages',
      thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
      language: comics.textObjects.language || 'en-us',
      price: comics.prices.price ? `${comics.prices.price}$` : 'not available',
    };
  };

  const _fillMockedText = text => {
    if (!text) return 'No description';
    // return `${text.slice(0, 210)}...`;
    return text;
  };

  return {
    loading,
    error,
    clearError,
    getAllCharacters,
    getCharacter,
    getCharacterByName,
    getAllComics,
    getComic,
  };
};

export default useMarvelService;
