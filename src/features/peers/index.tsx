import React, { FC, MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../models/appState';
import { Title } from '../../Root'
import styled from '@emotion/styled'
import { Loader } from '../loader/Loader'
import { socketService } from '../../services/socket-service';


const PeersLayoutContainer = styled.div`
    max-height: 30%;
    @media(max-width: 1000px) {
        margin-bottom: 100px;
    };
    @media(max-width: 588px) {
        margin-bottom: 44.7px;
    }
`

const ContentContainer = styled.div`
    margin-top: 10.2px;
    display: flex;
    flex-flow: row wrap;
    color: #beccdc;
`

const Peer = styled.span`
    margin-right: 18px;
    font-size: 14px;
    &:hover {
        color: #e0be86;
        cursor: pointer;
    }
`

const HARD_PEERS = [
    'MSFT','AMZN', 'IBM'
]

const socket = socketService.get();

export const Peers: FC<{}> = () => {

    const peers: string[] = useSelector(({ peers: [stateIsNotEmpty] }: AppState) => stateIsNotEmpty ? peers : HARD_PEERS);

    const handleClick = (peer: string) => {
        socket.emit('isValid', peer);
    }

    return (
            <PeersLayoutContainer>
                <Title>TOP PEERS</Title>
                {
                    !false
                    ? <ContentContainer>{peers.map( peer => <Peer onClick={() => handleClick(peer)} key={peer}>{peer}</Peer>)}</ContentContainer>
                    : <Loader className='flex-direction: column; margin-top: 30px; @media(max-width: 750px) { margin-top: 50px; margin-bottom: 50px;}' size={50} seperation={2} speed={1.4} /> 
                }
            </PeersLayoutContainer>
    );
}
