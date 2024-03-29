import './index.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-tuby/css/main.css';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
