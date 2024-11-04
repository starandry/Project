import React, { FC, useState } from 'react';
import { Button } from '../../UI/Button';
import { Input } from '../../UI/Input';
import styles from './newPasswordForm.module.scss';

type NewPasswordFormProps = {
    onSetPassword: (password: string, confirmPassword: string) => void;
};

const NewPasswordForm: FC<NewPasswordFormProps> = ({ onSetPassword }) => {
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSetPassword(password, confirmPassword);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.newPasswordForm}>
            <h2 className={styles.title}>New Password</h2>

            <Input
                type="password"
                id="new-password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
            />

            <Input
                type="password"
                id="new-confirmPassword"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
            />

            <Button type="submit" className="btn-setPassword">Set password</Button>
        </form>
    );
};

export { NewPasswordForm };
