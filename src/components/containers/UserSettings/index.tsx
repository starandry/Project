import React, { useState } from 'react';
import styles from './userSettings.module.scss';
import {SubTitle} from "../../UI/SubTitle";
import {Input} from "../../UI/Input";
import {Wrapper} from "../Wrapper";
import {Button} from "../../UI/Button";
import Switch from 'react-switch';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../stores/store.ts";
import {setDarkMode} from "../../../stores/slices/themeSlice.ts";

const UserSettings: React.FC = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('Artem Lapitsky');
    const [email, setEmail] = useState('a.lapitsky@gmail.com');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const isDark = useSelector((state: RootState) => state.theme.isDark);

    const handleChange = (checked: boolean) => {
        dispatch(setDarkMode(checked)); // переключение темы
    };

    const handleSave = (event: React.FormEvent) => {
        event.preventDefault();
        //  логика для сохранения данных в Firebase и Redux
        console.log('Сохранение данных профиля:', { name, email, password, newPassword, confirmPassword });
    };

    return (
        <>
            <form className={styles.profileSettings} onSubmit={handleSave}>
                <Wrapper className={styles.section}>
                    <SubTitle text={'Profile'} className={styles.titleProfile}/>
                    <Wrapper className={styles.wrapProfile}>
                        <Input type={'text'}
                               label={'Name'}
                               value={name}
                               onChange={(e) => setName(e.target.value)}
                               placeholder={'Name'}
                               className={styles.inputName}
                               labelClassName={styles.labelUsSet}
                               containerClassName={styles.inputGroup}/>
                        <Input type={'email'}
                               label={'Email'}
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               placeholder={'Email'}
                               className={styles.inputName}
                               labelClassName={styles.labelUsSet}
                               containerClassName={styles.inputGroup}/>
                    </Wrapper>
                </Wrapper>
                <Wrapper className={styles.section}>
                    <SubTitle text={'Password'} className={styles.titleProfile}/>
                    <Wrapper className={styles.wrapPassword}>
                        <Input type={'password'}
                               label={'Password'}
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               placeholder={'Your password'}
                               className={styles.inputPassword}
                               labelClassName={styles.labelUsSet}
                               containerClassName={styles.inputGroup}/>
                        <Input type={'password'}
                               label={'New password'}
                               value={newPassword}
                               onChange={(e) => setNewPassword(e.target.value)}
                               placeholder={'New password'}
                               className={styles.inputPassword}
                               labelClassName={styles.labelUsSet}
                               containerClassName={styles.inputGroup}/>
                        <Input type={'password'}
                               label={'Confirm password'}
                               value={confirmPassword}
                               onChange={(e) => setConfirmPassword(e.target.value)}
                               placeholder={'Confirm password'}
                               className={styles.inputPassword}
                               labelClassName={styles.labelUsSet}
                               containerClassName={styles.inputConfirmPassword}/>
                    </Wrapper>
                </Wrapper>
                <Wrapper className={styles.sectionTheme}>
                    <SubTitle text={'Color mode'} className={styles.titleProfile}/>
                    <Wrapper className={styles.wrapColor}>
                        <Wrapper className={styles.wrapTheme}>
                            <label className={styles.labelUsSet}>Dark</label>
                            <span>Use dark theme</span>
                        </Wrapper>
                        <Switch
                            onChange={handleChange}      // Функция для обработки изменений
                            checked={isDark}             // Указывает текущее состояние (вкл/выкл)
                            offColor="#46494C"           // Цвет переключателя в выключенном состоянии
                            onColor="#7B61FF"            // Цвет переключателя в включенном состоянии
                            checkedIcon={false}          // Отключает иконку при включенном состоянии
                            uncheckedIcon={false}        // Отключает иконку при выключенном состоянии
                        />
                    </Wrapper>
                    <Wrapper className={styles.buttonGroup}>
                        <Button type={'button'}
                                onClick={() => console.log('Cancel')}
                                className={styles.cancelButton}>Cancel</Button>
                        <Button type={'submit'} className={styles.saveButton}>Save</Button>
                    </Wrapper>
                </Wrapper>
            </form>
            <p className={styles.spacer}></p>
        </>
    );
};

export default UserSettings;
