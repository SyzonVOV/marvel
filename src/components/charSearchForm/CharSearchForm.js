import { useState } from 'react';
import * as Yup from 'yup';
import {
  Form,
  Formik,
  Field,
  ErrorMessage as FormikErrorMessage,
} from 'formik';

import useMarvelService from './../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charSearchForm.scss';
import { NavLink } from 'react-router-dom';

const SignupSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(25, 'Too Long!')
    .required('Required'),
});

function CharSearchForm() {
  const [char, setChar] = useState(null);
  const { loading, error, getCharacterByName, clearError } = useMarvelService();

  const onCharLoaded = char => {
    setChar(char);
  };

  const updateChar = name => {
    clearError();

    getCharacterByName(name).then(onCharLoaded);
  };

  const errorMessage = error ? (
    <div className="char__search-critical-error">
      <ErrorMessage />
    </div>
  ) : null;

  const results = !char ? null : char.length > 0 ? (
    <div className="char__search-wrapper">
      <div className="char__search-success">
        There is! Visit {char[0].name} page?
      </div>
      <NavLink
        to={`/characters/${char[0].id}`}
        className="button button__secondary">
        <div className="inner">To page</div>
      </NavLink>
    </div>
  ) : (
    <div className="char__search-error">
      The character was not found. Check the name and try again
    </div>
  );

  return (
    <div className="char__search-form">
      <Formik
        initialValues={{
          name: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={({ name }) => {
          updateChar(name);
        }}>
        <Form>
          <label className="char__search-label" htmlFor="name">
            Or find a character by name:
          </label>
          <div className="char__search-wrapper">
            <Field id="name" name="name" type="text" />
            <button
              type="submit"
              className="button button__main"
              disabled={loading}>
              <div className="inner">Find</div>
            </button>
          </div>
          <FormikErrorMessage
            className="char__search-error"
            name="name"
            component="div"
          />
        </Form>
      </Formik>
      {results}
      {errorMessage}
    </div>
  );
}

export default CharSearchForm;
