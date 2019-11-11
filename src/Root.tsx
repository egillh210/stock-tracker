import React, { FC } from 'react';
import { 
    Search,
    CompanyOverviewComponent as CompanyOverview,
    KeyStatsComponent as KeyStats,
    NewsComponent as News,
    Peers,
    Chart,
    Header,
    Footer
} from './features';

import styled from '@emotion/styled'

export const Title =styled.div`
    border-bottom: 2px solid #7fb3ff;
    width: 100%;
    padding-bottom: 2px;
    margin-bottom: 10px;
    color: #7fb3ff;
    font-weight: 700;
    font-size: 16px;
`

const RootContainer = styled.div`
    font-family: sans-serif;
    color: white;
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 100%;
    align-items: center;
    * {
        font-family: 'Lato', sans-serif;
    };
`

const AppContainer = styled.div`
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    margin-left: 5%;
    margin-right: 5%;
    max-width: 1368px;
`

const CompanyContainer = styled.div`
    display: flex;
    flex: 0 1 37%;
    margin-left: 53px;
    flex-direction: column;
    @media(min-width: 750px) {
        min-width: 250px;
    };
    @media(max-width: 750px) {
        margin-left: 0;
    };
`

const ChartNewsLayout = styled.div`
    display: flex;
    flex: 1 0 auto;
    margin-bottom: -120px;
    margin-top: 40px;
    @media(max-height: 1100px) {
        margin-bottom: -100px;
    }
    @media(max-width: 1000px) {
        margin-bottom: -90px;
    };
    @media(max-width: 750px) {
        flex-direction: column;
        margin-bottom: 20px;
    };
    @media(min-width: 750px) {
        min-width: 721px;
        min-height: 602px;
    };
    @media(min-width: 1200px) {
        min-width: 1065px;
    };
    @media(min-width: 1500px) {
        min-width: 1335px;
    };
`

const StatsCompanyLayout = styled.div`
    display: flex;
    flex: 1 0 auto;
    @media(max-width: 750px) {
        flex-direction: column;
    };
    @media(min-width: 750px) {
        min-width: 721px;
        min-height: 367px;
    };
    @media(min-width: 1200px) {
        min-width: 1065px;
    };
    @media(min-width: 1500px) {
        min-width: 1335px;    
    };
`

const Root: FC<{}> = () => {

    return (
        <RootContainer>
            <AppContainer>
                <Header />
                <Search />
                <ChartNewsLayout>
                    <Chart />
                    <News />
                </ChartNewsLayout>
                <StatsCompanyLayout>
                    <KeyStats />
                    <CompanyContainer>
                        <CompanyOverview />
                        <Peers />
                    </CompanyContainer>
                </StatsCompanyLayout>
            </AppContainer>
            <Footer />
        </RootContainer>
    )
}

export default Root