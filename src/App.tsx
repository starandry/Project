import {Wrapper, LoginForm, Copyright} from './components';
import './app.scss';
import { Logo } from './components/UI/Icon/icon.component.tsx';

function App() {
    const handleLogin = (email: string, password: string) => {
        // Реализация аутентификации пользователя
        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
        <Wrapper className="collage-wrap">
            <Logo />
            <LoginForm onLogin={handleLogin}/>
            <Copyright />
        </Wrapper>
    );
}

export default App;
