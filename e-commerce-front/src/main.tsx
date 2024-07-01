import ReactDOM from 'react-dom/client';

// import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// react slick lib
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// import axios 
import './API/axios-global.js';

// import other components
import AppRouter from '@Routes/AppRouter';

// redux
import { Provider } from 'react-redux';
import { store, persistor } from '@store/index';
import { PersistGate } from 'redux-persist/integration/react';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} >
            <AppRouter />
        </PersistGate>
    </Provider>

)

