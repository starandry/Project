import {Wrapper, LoginForm, RegistrationForm, ResetPasswordForm, /*ForgotPasswordForm,*/ /*NewPasswordForm,*//*LoginFormAfterPasswordChange ,*/ Copyright} from './components';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './app.scss';
import { Logo } from './components/UI/Icon/icon.component.tsx';
import { Home } from './pages';

function App() {
    const [isRegistration, setIsRegistration] = useState(false);
    const [isResetPassword, setIsResetPassword] = useState(false);

    const handleLogin = (email: string, password: string) => {
        console.log("Email:", email);
        console.log("Password:", password);
    };

    const handleRegister = (username: string, email: string, password: string, confirmPassword: string) => {
        console.log("Username:", username);
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Confirm Password:", confirmPassword);
    };

    const handleReset = () => {
        // Логика для сброса пароля
    };

    const toggleForm = () => {
        setIsRegistration((prev) => !prev);
        setIsResetPassword(false); // Вернуться к стандартному входу
    };

    const toggleResetPasswordForm = () => setIsResetPassword((prev) => !prev);

    /* const handleSetPassword = () => {
         // Логика для установки нового пароля
     };*/
    /*const handleLogin = () => {
        // Логика для входа
    };*/

    return (
        <>
            <Wrapper className="collage-wrap">
                <Logo />
                {isResetPassword ? (
                    <ResetPasswordForm onReset={handleReset} />
                ) : isRegistration ? (
                    <RegistrationForm onRegister={handleRegister} onToggleForm={toggleForm} />
                ) : (
                    <LoginForm onLogin={handleLogin} onToggleForm={toggleForm} onForgotPassword={toggleResetPasswordForm} />
                )}
                {/*<ForgotPasswordForm onReset={handleReset} />*/}
                {/*<NewPasswordForm onSetPassword={handleSetPassword} />*/}
                {/*<LoginFormAfterPasswordChange onLogin={handleLogin} />*/}
                <Copyright />
            </Wrapper>
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </>

    );
}

export default App;