import React from 'react';
import {Background} from "../../components";
import {Logo} from "../../components/UI/Icon/icon.component.tsx";
import {SearchInput} from "../../components/UI/SearchInput";
import {UserProfile} from "../../components/containers/UserProfile";
import {Header} from "../../components/containers/Header";

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
        </Background>
    );
};

export { Main };
