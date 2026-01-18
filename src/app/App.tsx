import { Routes, Route } from 'react-router-dom';
import { MasterArea, RegisterMaster, MasterPreLogin, ClientPreLogin, Login } from '@/pages';

function App() {
    return (
        <Routes>
            <Route path="/" element={<MasterArea />} />
            <Route path="/master-profiles/:id/" element={<MasterArea />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register/master" element={<RegisterMaster />} />
            <Route path="/masters/pre-login" element={<MasterPreLogin />} />
            <Route path="/clients/pre-login" element={<ClientPreLogin />} />
        </Routes>
    );
}

export default App;
