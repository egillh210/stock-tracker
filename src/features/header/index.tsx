import React, { FC } from 'react'
import logo from './logo.png'
import styled from '@emotion/styled'

const HeaderLayoutContainer = styled.div`
    flex: 1 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: -12px;
`

const NavLayoutContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex: 0 0 400px;
    margin-right: -30px;
    min-width: 15%;
    @media(max-width: 1099px) {
        margin-right: -25px;
    };
    @media(max-width: 750px) {
        flex: 1 0 0;
        margin-left: 77px;
        margin-right: -8px;
    };
    @media(max-width: 588px) {
        display: none;
    }
`

const Logo = styled.img`
    width: 155px;
    height: 75px;
    color: white;
`

type ButtonProps = {
    color: string,
    backgroundColor: string
}

const Button = styled.button<ButtonProps>`
    background-color: ${(props: ButtonProps) => props.backgroundColor};
    color: ${(props: ButtonProps) => props.color};
    height: 31px;
    min-width: 98px;
    font-size: 18px;
    outline: none;
    border-radius: 3px;
    cursor: pointer;
    border: none;
    align-items: center;
    &:hover {
        color: white;
        background-color: rgba(0, 104, 255, 0.5);
    };
`

export const Header: FC = () => {
    return (
        <HeaderLayoutContainer>
            <Logo src={logo} />
            <NavLayoutContainer>
                <Button color='white' backgroundColor='rgba(0, 104, 255, 0.5)' >QUOTES</Button>
                <Button color='gray' backgroundColor='rgba(0,0,0,0)'>MARKETS</Button>
                <Button color='gray' backgroundColor='rgba(0,0,0,0)'>WATCHLISTS</Button>
            </NavLayoutContainer>
        </HeaderLayoutContainer>
    )
}
