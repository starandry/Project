import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const MasterArea = lazy(() =>
    import('@/pages/MasterArea').then((module) => ({ default: module.MasterArea }))
);
const RegisterMaster = lazy(() =>
    import('@/pages/RegisterMaster').then((module) => ({ default: module.RegisterMaster }))
);
const MasterPreLogin = lazy(() =>
    import('@/pages/MasterPreLogin').then((module) => ({ default: module.MasterPreLogin }))
);
const ClientPreLogin = lazy(() =>
    import('@/pages/ClientPreLogin/UI').then((module) => ({ default: module.ClientPreLogin }))
);
const Login = lazy(() => import('@/pages/Login').then((module) => ({ default: module.Login })));

function App() {
    return (
        <Suspense fallback={<div className="flex-center">Загрузка...</div>}>
            <Routes>
                <Route path="/" element={<MasterArea />} />
                <Route path="/master-profiles/:id/" element={<MasterArea />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register/master" element={<RegisterMaster />} />
                <Route path="/masters/pre-login" element={<MasterPreLogin />} />
                <Route path="/clients/pre-login" element={<ClientPreLogin />} />
            </Routes>
        </Suspense>
    );
}

export default App;
