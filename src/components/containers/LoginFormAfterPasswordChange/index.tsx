import React, { FC, useState } from 'react';
import { Button } from '../../UI/Button';
import { Input } from '../../UI/Input';
import { CLink } from '../../UI/CLink';
import styles from './loginFormAfterPasswordChange.module.scss';

type LoginFormAfterPasswordChangeProps = {
    onLogin: (email: string, password: string) => void;
};

const LoginFormAfterPasswordChange: FC<LoginFormAfterPasswordChangeProps> = ({ onLogin }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(email, password);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.loginForm}>
            <h2 className={styles.title}>Sign In</h2>

            <p className={styles.successMessage}>Your password has been changed!</p>

            <Input
                type="email"
                id="after-email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
            />

            <Input
                type="password"
                id="after-password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
            />

            <div className={styles.forgotPassword}>
                <CLink href="#">Forgot password?</CLink>
            </div>

            <Button type="submit" className="btn-login">Sign in</Button>

            <p className={styles.footerText}>
                Don’t have an account?
                <CLink href="#" className="signupLink">Sign Up</CLink>
            </p>
        </form>
    );
};

export { LoginFormAfterPasswordChange };
