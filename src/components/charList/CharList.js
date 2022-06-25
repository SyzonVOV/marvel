import { Component } from 'react';
import PropTypes from 'prop-types';

import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from './../../services/MarvelService';

class CharList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chars: [],
      isLoading: true,
      isError: false,
      isNewItemLoading: false,
      offset: 210,
      charEnded: false,
    };
  }

  marvelService = new MarvelService();

  componentDidMount() {
    this.downloadCharts();
  }

  saveCharToState(newChars) {
    let ended = false;
    if (newChars.length < 9) {
      ended = true;
    }
    this.setState(({ chars, offset }) => ({
      chars: [...chars, ...newChars],
      isLoading: false,
      isError: false,
      isNewItemLoading: false,
      offset: offset + 9,
      charEnded: ended,
    }));
  }

  handleRequestNewCharts = offset => {
    this.changeCharListLoadingStatus();
    this.downloadCharts(offset);
  };

  handleError = () => {
    this.setState({ isLoading: false, isError: true });
  };

  changeCharListLoadingStatus = () => {
    this.setState({ isNewItemLoading: true });
  };

  downloadCharts = offset => {
    this.marvelService
      .getAllCharacters(offset)
      .then(res => {
        // res includes the character object, appropriate for the state
        this.saveCharToState(res);
      })
      .catch(this.handleError);
  };

  renderItems(list) {
    const items = list.map(char => {
      let imgStyle = { objectFit: 'cover' };
      if (
        char.thumbnail ===
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
      ) {
        imgStyle = { objectFit: 'unset' };
      }

      return (
        <CharItem
          key={char.id}
          id={char.id}
          name={char.name}
          thumbnail={char.thumbnail}
          style={imgStyle}
          onCharSelected={this.props.onCharSelected}
        />
      );
    });
    return <ul className="char__grid">{items}</ul>;
  }

  render() {
    const { chars, isLoading, isError, isNewItemLoading, offset, charEnded } =
      this.state;

    const items = this.renderItems(chars);

    const errorMessage = isError ? <ErrorMessage /> : null;
    const spinner = isLoading ? <Spinner /> : null;
    const content = !(isLoading || isError) ? items : null;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button
          className="button button__main button__long"
          disabled={isNewItemLoading}
          style={{ display: charEnded ? 'none' : 'block' }}
          onClick={() => {
            this.handleRequestNewCharts(offset);
          }}>
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

function CharItem(prop) {
  const { name, thumbnail, style, onCharSelected, id } = prop;

  const handleCharSelected = id => () => {
    onCharSelected(id);
  };

  return (
    <li className="char__item" onClick={handleCharSelected(id)}>
      <img src={thumbnail} alt={name} style={style} />
      <div className="char__name">{name}</div>
    </li>
  );
}

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
