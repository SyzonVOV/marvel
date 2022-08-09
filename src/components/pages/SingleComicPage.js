import { useParams } from 'react-router-dom';

import SingleComic from '../singleComic/SingleComic';
import AppBanner from './../appBanner/AppBanner';

const SingleComicPage = () => {
  return (
    <>
      <AppBanner />
      <SingleComic />
    </>
  );
};

export default SingleComicPage;
