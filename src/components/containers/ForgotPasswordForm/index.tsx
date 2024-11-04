import React, { FC, useState } from 'react';
import { Button } from '../../UI/Button';
import { Input } from '../../UI/Input';
import styles from './forgotPasswordForm.module.scss';

type ForgotPasswordFormProps = {
    onReset: (email: string) => void;
};

const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({ onReset }) => {
    const [email, setEmail] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onReset(email);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.forgotPasswordForm}>
            <h2 className={styles.title}>Reset Password</h2>

            <p className={styles.infoText}>
                You will receive an email {email || "example@gmail.com"} with a link to reset your password!
            </p>

            <Input
                type="email"
                id="forgot-email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                required
                className="customPasswordInput"
            />

            <Button type="submit" className="btn-reset">Reset</Button>
        </form>
    );
};

export { ForgotPasswordForm };
