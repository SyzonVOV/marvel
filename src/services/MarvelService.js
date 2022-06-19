class MarvelService {
  #apiBase = 'https://gateway.marvel.com:443/v1/public/';
  #apiKey = `apikey=${process.env.REACT_APP_API_KEY}`;

  getResource = async url => {
    try {
      let res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
      }

      return await res.json();
    } catch (err) {
      console.error(err);
    }
  };

  getAllCharacters = async () => {
    const res = await this.getResource(
      `${this.#apiBase}characters?limit=9&offset=210&${this.#apiKey}`,
    );
    return res.data.results.map(this.#transformCharacter);
  };

  getCharacter = async id => {
    let res = await this.getResource(
      `${this.#apiBase}characters/${id}?${this.#apiKey}`,
    );

    return this.#transformCharacter(res.data.results[0]);
  };

  #transformCharacter = hero => {
    return {
      id: hero.id,
      name: hero.name,
      description: this.#fillMockedText(hero.description),
      thumbnail: hero.thumbnail.path + '.' + hero.thumbnail.extension,
      homepage: hero.urls[0].url,
      wiki: hero.urls[1].url,
    };
  };

  #fillMockedText = text => {
    if (!text) return 'No description';
    // return `${text.slice(0, 210)}...`;
    return text;
  };
}

export default MarvelService;
