import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled'
import { KeyStats, AppState } from 'models';
import { Title } from 'Root'
import { StatsTable } from 'features/keystats/components'
import { Loader } from 'features/loader'
const { div } = styled;

const KeyStatsLayoutContainer = div`
    flex: 0 1 63%;
`

export const KeyStatsComponent: FC<{}> = () => {

    const keystats: KeyStats = useSelector(({ keyStats }: AppState) => keyStats);

    const nullValues = Object.values(keystats).every((item: number) => !item);

    return (
        <KeyStatsLayoutContainer>
            <Title>KEY STATS</Title>
            {
                !nullValues ? 
                <StatsTable {...keystats} /> : 
                <Loader 
                    className={`
                        flex-direction: 
                        column; 
                        margin-top: 100px; 
                        @media(max-width: 750px) 
                        {
                            margin-top: 50px; 
                            margin-bottom: 50px
                        }
                    `}
                    size={50}
                    seperation={2}
                    speed={1.4}
                />
            }
        </KeyStatsLayoutContainer>
    )
}
