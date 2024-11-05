import React, { FC, useState } from 'react';
import { Button } from '../../UI/Button';
import { Input } from '../../UI/Input';
import { Link } from 'react-router-dom';
import { db } from '../../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import styles from './loginForm.module.scss';

type LoginFormProps = {
    onLog: (b: boolean) => void;
    onToggleForm: () => void;
    onForgotPassword: () => void;
};

const LoginForm: FC<LoginFormProps> = ({ onLog, onToggleForm, onForgotPassword }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null); // Состояние для ошибки

    // Проверка существования пользователя в Firestore
    const checkUserExists = async (email: string) => {
        try {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("email", "==", email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                console.log("User exists in Firestore");
                return true;
            } else {
                console.log("User does not exist in Firestore");
                return false;
            }
        } catch (error) {
            console.error("Error checking user existence: ", error);
            setError("An error occurred while checking user.");
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userExists = await checkUserExists(email);

        if (userExists) {
            console.log("Proceeding with sign-in...");
            onLog(true);
        } else {
            setError("User does not exist. Please register.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.loginForm}>
            <h2 className={styles.title}>Sign In</h2>

            {/* Отображаем сообщение об ошибке, если оно есть */}
            {error && <p className={styles.error}>{error}</p>}

            <Input
                type="email"
                id="log-email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
            />

            <Input
                type="password"
                id="log-password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
                className="passwordInput"
            />

            <div className={styles.forgotPassword}>
                <Link to="#" onClick={onForgotPassword}>Forgot password?</Link>
            </div>

            <Button type="submit" className="btn-login">Sign in</Button>

            <p className={styles.basement}>
                Don’t have an account?
                <Link to="#" onClick={onToggleForm} className={styles.signupLink}>Sign Up</Link>
            </p>
        </form>
    );
};

export { LoginForm };