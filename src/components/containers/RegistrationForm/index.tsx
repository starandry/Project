import React, { FC, useState } from 'react';
import { Button } from '../../UI/Button';
import { Input } from '../../UI/Input';
import { Link } from 'react-router-dom';
import { db } from '../../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import styles from './registrationForm.module.scss';

type RegistrationFormProps = {
    onToggleForm: () => void;
    onReg: (b: boolean) => void;
};

const RegistrationForm: FC<RegistrationFormProps> = ({ onToggleForm, onReg }) => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    // Функция для добавления пользователя в Firestore
    const addUserToFirestore = async () => {
        try {
            const docRef = await addDoc(collection(db, "users"), {
                username: username,
                email: email,
                password: password // без хеширования
            });
            console.log("Document written with ID: ", docRef.id);
            setError(null); // Сброс ошибки при успешной регистрации
            return true; // Возвращаем true при успешной регистрации
        } catch (e) {
            console.error("Error adding document: ", e);
            setError("Failed to register. Please try again.");
            return false; // Возвращаем false при ошибке
        }
    };

    const handleSubmit = async  (e: React.FormEvent) => {
        e.preventDefault();

        // Проверка совпадения пароля и подтверждения пароля
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        // Сохранение данных в Firebase
        onReg(await addUserToFirestore());

    };

    return (
        <form onSubmit={handleSubmit} className={styles.registrationForm}>
            <h2 className={styles.title}>Sign Up</h2>

            {error && <p className={styles.error}>{error}</p>}

            <Input
                type="text"
                id="username"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your username"
                required
            />

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
            />

            <Input
                type="password"
                id="confirmPassword"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
            />

            <Button type="submit" className="btn-register">Sign Up</Button>

            <p className={styles.basement}>
                Already have an account?
                <Link to="#" onClick={onToggleForm} className="signinLink">Sign In</Link>
            </p>
        </form>
    );
};

export { RegistrationForm };
