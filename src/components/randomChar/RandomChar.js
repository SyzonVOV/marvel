import { Component } from 'react';
import Spinner from './../spinner/Spinner';
import MarvelService from './../../services/MarvelService';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      char: {},
      isLoading: true,
      isError: false,
    };
  }

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChar();
  }

  saveCharToState(char) {
    this.setState({ char, isLoading: false });
  }

  updateChar = () => {
    const id = Math.floor(Math.random() * (1011_400 - 1011_000) + 1011_000);
    this.marvelService
      .getCharacter(id)
      .then(res => {
        // res includes the character object, appropriate for the state
        this.saveCharToState(res);
      })
      .catch(this.handleError);
  };

  handleError = () => {
    this.setState({ isLoading: false, isError: true });
  };

  render() {
    const { char, isLoading } = this.state;

    return (
      <div className="randomchar">
        {isLoading ? <Spinner /> : <View char={char} />}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button className="button button__main">
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char;

  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className="randomchar__img" />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
