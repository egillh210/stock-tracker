import React, { FC } from 'react';
import { Title } from '../../Root'
import styled from '@emotion/styled'
import { Loader } from '../loader/Loader'

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

type PeersProps = {
    peers: string[],
}

type ErrorLoading = {
    errorPeers: {
        message: string
    },
    isFetchingPeers: boolean,
}

const HARD_PEERS = [
    'MSFT',' NOK', 'IBM'
]

export const Peers: FC<{}> = () => {

    const renderPeer = (peer: string) => {
        return <Peer key={peer} >{peer}</Peer>
    }

    return (
            <PeersLayoutContainer>
                <Title>TOP PEERS</Title>
                {
                    !false
                    ? <ContentContainer>{HARD_PEERS.map( peer => renderPeer(peer))}</ContentContainer>
                    : <Loader className='flex-direction: column; margin-top: 30px; @media(max-width: 750px) { margin-top: 50px; margin-bottom: 50px;}' size={50} seperation={2} speed={1.4} /> 
                }
            </PeersLayoutContainer>
    );
}
