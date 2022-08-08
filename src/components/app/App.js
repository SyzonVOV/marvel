import { useState, useCallback } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';

import decoration from '../../resources/img/vision.png';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import AppBanner from './../appBanner/AppBanner';
import ComicsList from './../comicsList/ComicsList';

const App = props => {
  const [selectedChar, setSelectedChar] = useState(null);
  const onCharSelected = useCallback(id => {
    setSelectedChar(id);
  }, []);

  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Switch>
            <Route exact path="/">
              <RandomChar />
              <div className="char__content">
                <CharList onCharSelected={onCharSelected} />
                <ErrorBoundary>
                  <CharInfo charId={selectedChar} />
                </ErrorBoundary>
              </div>
              <img className="bg-decoration" src={decoration} alt="vision" />
            </Route>
            <Route path="/comics">
              <AppBanner />
              <ComicsList />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;
