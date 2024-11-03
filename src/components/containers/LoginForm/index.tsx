import React, { FC, useState } from 'react';
import { Button } from '../../UI/Button';
import { Input } from '../../UI/Input';
import { Link } from '../../UI/Link';
import styles from './loginForm.module.scss';

type LoginFormProps = {
    onLogin: (email: string, password: string) => void;
};

const LoginForm: FC<LoginFormProps> = ({ onLogin }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(email, password);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.loginForm}>
            <h2 className={styles.title}>Sign In</h2>

            <Input
                type="email"
                id="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
            />

            <Input
                type="password"
                id="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
                className="passwordInput"
            />

            <div className={styles.forgotPassword}>
                <Link href="#">Forgot password?</Link>
            </div>

            <Button type="submit" className="btn-login">Sign in</Button>

            <p className={styles.basement}>
                Don’t have an account?
                <Link href="#" className="signupLink">Sign Up</Link>
            </p>
        </form>
    );
};

export { LoginForm };