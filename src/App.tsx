import { MasterArea, RegisterMaster, MasterPreLogin, ClientPreLogin, Home, Login } from './pages';
import { Routes, Route } from 'react-router-dom';
import './app.scss';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/master-profiles/:id/" element={<MasterArea />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register/master" element={<RegisterMaster />} />
            <Route path="/masters/pre-login" element={<MasterPreLogin />} />
            <Route path="/clients/pre-login" element={<ClientPreLogin />} />
        </Routes>
    );
}

export default App;
