import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';

import './charInfo.scss';
import setContent from './../../utils/setContent';

const CharInfo = props => {
  const [char, setChar] = useState(null);

  const {
    getCharacter,
    clearError,
    processState: process,
    setProcess,
  } = useMarvelService();

  useEffect(() => {
    updateChar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.charId]);

  const updateChar = () => {
    const { charId } = props;
    if (!charId) {
      return;
    }

    clearError();
    getCharacter(charId)
      .then(onCharLoaded)
      .then(() => setProcess('confirmed'));
  };

  const onCharLoaded = char => {
    setChar(char);
  };

  return (
    <div className="char__info">
      {setContent(process, () => (
        <View char={char} />
      ))}
    </div>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;

  let imgStyle = { objectFit: 'cover' };
  if (
    thumbnail ===
    'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
  ) {
    imgStyle = { objectFit: 'contain' };
  }

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : 'There is no comics with this character'}
        {comics.map((item, i) => {
          // eslint-disable-next-line
          if (i > 9) return;
          const comicId = item.resourceURI.split('/').pop();
          return (
            <li key={i} className="char__comics-item">
              <Link to={`comics/${comicId}`}>{item.name}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CharInfo;
