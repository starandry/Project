import React from 'react';
import {Background} from "../../components";
import {Logo} from "../../components/UI/Icon/icon.component.tsx";
import {SearchInput} from "../../components/UI/SearchInput";

const Main: React.FC = () => {

    const handleSearchChange = (value: string) => {
        // Заглушка: здесь можно будет добавить обработку ввода
        console.log("Введенное значение:", value);
    };

    return (
        <Background>
            <Logo/>
            <SearchInput placeholder="Search" onChange={handleSearchChange} />
        </Background>
    );
};

export { Main };
