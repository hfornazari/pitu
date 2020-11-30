import React from 'react';
import {Logo, HeaderContainer} from './styles';

import Icone from '../../assets/icone.png';
import vars from '../../configs/vars';

function Header(props){
    return (
        <>
            <HeaderContainer>
                <Logo src={Icone} alt='{vars.PROJECT_NAME} - Encurtador de URL' />
                <h1>{vars.PROJECT_NAME}</h1>
                <p>{props.children}</p>
            </HeaderContainer>
        </>
    )
}

export default Header;