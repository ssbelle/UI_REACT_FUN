import ReactDOM from 'react-dom';
import React from 'react';
import Stage from './components/stage.js';
import './style/style.css';
import {AppContainer} from 'react-hot-loader';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(Stage);

if (module.hot) {
  module.hot.accept(
    //"./components/stage.js", () => {
      //render(Stage)
      //}
  );
}
