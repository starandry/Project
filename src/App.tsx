import { MasterArea, RegisterMaster, MasterPreLogin, ClientPreLogin, Home } from './pages';
import { Routes, Route /*, Navigate*/ } from 'react-router-dom';
import './app.scss';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            {/*<Route path="/master" element={<MasterArea />} />*/}
            <Route path="/master-profiles/:id/" element={<MasterArea />} />
            <Route path="/register/master" element={<RegisterMaster />} />
            <Route path="/masters/pre-login" element={<MasterPreLogin />} />
            <Route path="/clients/pre-login" element={<ClientPreLogin />} />
            {/* ловим всё неизвестное (в т.ч. /index.html) */}
            {/*<Route path="*" element={<Navigate to="/" replace />} />*/}
        </Routes>
    );
}

export default App;
