import { Main } from './layouts';
import './app.scss';

function App() {

    return <Main/>








    /*const [isRegistration, setIsRegistration] = useState(false);
    const [isResetPassword, setIsResetPassword] = useState(false);
    const [userExists , setUserExists] = useState(false);

    const handleReset = () => {
        // Логика для сброса пароля
    };

    const toggleForm = () => {
        setIsRegistration((prev) => !prev);
        setIsResetPassword(false); // Вернуться к стандартному входу
    };

    const toggleResetPasswordForm = () => setIsResetPassword((prev) => !prev);

     const handleSetPassword = () => {
         // Логика для установки нового пароля
     };
    const handleLogin = () => {
        // Логика для входа
    };

    if (!userExists) {
        return  <>
                    <Wrapper className="collage-wrap">
                        <Logo />
                        {isResetPassword ? (
                            <ResetPasswordForm onReset={handleReset} />
                        ) : isRegistration ? (
                            <RegistrationForm onToggleForm={toggleForm} onReg={setUserExists}/>
                        ) : (
                            <LoginForm onLog={setUserExists} onToggleForm={toggleForm} onForgotPassword={toggleResetPasswordForm} />
                        )}
                        <Copyright />
                    </Wrapper>
                </>
    }

    return (
        <>
            <Home/>
            <Wrapper className="collage-wrap">
                <Logo />
                {isResetPassword ? (
                    <ResetPasswordForm onReset={handleReset} />
                ) : isRegistration ? (
                    <RegistrationForm onToggleForm={toggleForm} onReg={setUser}/>
                ) : (
                    <LoginForm onLogin={handleLogin} onToggleForm={toggleForm} onForgotPassword={toggleResetPasswordForm} />
                )}
                <ForgotPasswordForm onReset={handleReset} />
                <NewPasswordForm onSetPassword={handleSetPassword} />
                <LoginFormAfterPasswordChange onLogin={handleLogin} />
                <Copyright />
            </Wrapper>
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </>
    );*/
}

export default App;