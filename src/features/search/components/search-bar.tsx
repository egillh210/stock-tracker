import React, {
    Dispatch, 
    SetStateAction, 
    memo, 
    KeyboardEvent,
    ChangeEvent,
} from 'react'
import styled from '@emotion/styled'
const { div, input } = styled;

const SearchBarLayoutContainer = div`
    display: flex;
    flex: 1 0 0;
    align-items: center;
    justify-content: center;
    position: relative;
`

const SearchIcon = div`
    height: 23.5px;
    width: 23.5px;
    transform: rotate(-45deg);
    margin-bottom: 10px;
    margin-right: 30px;
    color: #7fb3ff;
    font-size: 40px;
`

const Input = input`
    background-color: rgba(0,0,0,0);
    color: rgba(255, 255, 255, 0);
    font-size: 40px;
    outline: none;
    border: none;
    max-width: 100%;
    width: 100%;
    font-weight: 300;
    z-index: 2;
    &:focus {
        color: #fff;
    };
    &:focus + label {
        display: none;
    };
`


type SearchBarProps = {
    query: string,
    setQuery: Dispatch<SetStateAction<string>>,
    selectedStock: string,
    socket: SocketIOClient.Socket,
}

export const SearchBar = memo<SearchBarProps>(({ 
    query, 
    setQuery, 
    selectedStock, 
    socket 
    }) => {

    const onKeyPress = ({ key }: KeyboardEvent) => {
        if(key === 'Enter') {
            socket.emit('isValid', query);
        }
    }

    const onChange = (
        { target: { value }}: ChangeEvent<HTMLInputElement>
        ) => setQuery(value);

    return (
        <SearchBarLayoutContainer>
            <SearchIcon>⚲</SearchIcon>
            <Input 
                id='search' 
                placeholder={selectedStock}
                value={query} 
                onChange={onChange}
                onKeyPress={onKeyPress} 
            />
        </SearchBarLayoutContainer>
    )
})