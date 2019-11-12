import React, { FC } from 'react';
import styled from '@emotion/styled'
import { useSelector } from 'react-redux';
import { AppState } from 'models';
import { Title } from 'features/Root'
import { socketService } from 'services';
const { div, span } = styled;

const PeersLayoutContainer = div`
    max-height: 30%;
    @media(max-width: 1000px) {
        margin-bottom: 100px;
    };
    @media(max-width: 588px) {
        margin-bottom: 44.7px;
    }
`

const ContentContainer = div`
    margin-top: 10.2px;
    display: flex;
    flex-flow: row wrap;
    color: #beccdc;
`

const Peer = span`
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

    const peers: string[] = useSelector(
        ({ peers: [stateIsNotEmpty] }: AppState) => stateIsNotEmpty ? peers : HARD_PEERS);

    const handleClick = (peer: string) => {
        socket.emit('isValid', peer);
    }

    return (
            <PeersLayoutContainer>
                <Title>TOP PEERS</Title>
                    <ContentContainer>
                    {
                        peers.map(peer => 
                            <Peer key={peer} onClick={() => handleClick(peer)}>
                                {peer}
                            </Peer>)
                    }
                    </ContentContainer>
            </PeersLayoutContainer>
    );
}
