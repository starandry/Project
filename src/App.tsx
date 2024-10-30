import {Background} from './components';
import './app.module.scss';

function App() {
    return (
        <Background
            path={'../../../public/images/collage-of-movie-posters.jpg'}
            desc={'A movie mosaic.'}
            className={'movie-collage'}
        />
    );
}

export default App;
