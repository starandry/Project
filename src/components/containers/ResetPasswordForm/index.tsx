import React, { FC, useState } from 'react';
import { Button } from '../../UI/Button';
import { Input } from '../../UI/Input';
import styles from './resetPasswordForm.module.scss';

type ResetPasswordFormProps = {
    onReset: (email: string) => void;
};

const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ onReset }) => {
    const [email, setEmail] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onReset(email);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.resetPasswordForm}>
            <h2 className={styles.title}>Reset Password</h2>

            <Input
                type="email"
                id="reset-email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
            />

            <Button type="submit" className="btn-reset">Reset</Button>
        </form>
    );
};

export { ResetPasswordForm };
