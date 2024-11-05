import React from 'react';
import {Background, Button, Copyright, Footer} from "../../components";
import {Logo, SpinnerIcon} from "../../components/UI/Icon/icon.component.tsx";
import {SearchInput} from "../../components/UI/SearchInput";
import {UserProfile} from "../../components/containers/UserProfile";
import {Header} from "../../components/containers/Header";
import {Sidebar} from "../../components/containers/Sidebar";
import styles from './main.module.scss';

const Main: React.FC = () => {

    const handleSearchChange = (value: string) => {
        // Заглушка: здесь можно будет добавить обработку ввода
        console.log("Введенное значение:", value);
    };

    return (
        <Background>
            <Header>
                <Logo/>
                <SearchInput placeholder="Search" onChange={handleSearchChange} />
                <UserProfile name='Artem Lapitsky' circleColor='#7B61FF'/>
            </Header>
            <Sidebar/>
            <Footer>
                <Copyright className='sidebarCopyright'/>
                <Button className={styles.showMoreButton} type='button'>
                    <span>Show more</span>
                    <SpinnerIcon/>
                </Button>
            </Footer>
        </Background>
    );
};

export { Main };
