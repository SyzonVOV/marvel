import { Component } from 'react';
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
    };
  }

  marvelService = new MarvelService();

  componentDidMount() {
    this.downloadCharts();
  }

  saveCharToState(chars) {
    this.setState({ chars, isLoading: false });
  }

  handleError = () => {
    this.setState({ isLoading: false, isError: true });
  };

  downloadCharts = () => {
    this.marvelService
      .getAllCharacters()
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
          name={char.name}
          thumbnail={char.thumbnail}
          style={imgStyle}></CharItem>
      );
    });
    return <ul className="char__grid">{items}</ul>;
  }

  render() {
    const { chars, loading, error } = this.state;

    const items = this.renderItems(chars);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

function CharItem(char) {
  const { name, thumbnail, style } = char;
  return (
    <li className="char__item">
      <img src={thumbnail} alt={name} style={style} />
      <div className="char__name">{name}</div>
    </li>
  );
}

/*  <li className="char__item">
                    <img src={abyss} alt="abyss" />
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item char__item_selected">
                    <img src={abyss} alt="abyss" />
                    <div className="char__name">Abyss</div>
                </li> */

export default CharList;
