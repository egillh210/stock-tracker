import React from 'react';
import { _CompanyOverview } from './models/companyOverview'
import styled from '@emotion/styled'
import { Title } from '../Root'
import FetchingError from '../errors/Error_Fetching'
import AdaptiveLoader from '../loader/Loader'

const CompanyOverviewContainer = styled.div`
    max-height: 400px;
    margin-bottom: 25px;
    @media(max-width: 750px) {
        margin-top: 40px;
        margin-bottom: 20px;
    }
`

const Name = styled.div`
    margin-top: 10px;
    font-size: 24px;
`

const Website = styled.div`
    margin-top: 8px;
    margin-bottom: 8px;
`

const Link = styled.a`
    text-decoration: none;
    font-size: 14px;
    color: #beccdc;
    &:hover {
        color: #e0be86;
    };
    &:visited {
        color: #608fd1;
    }
`

const Description = styled.div`
    font-size: 16px;
    max-height: 140px;
`

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 50px;
`

const OverflowContainer = styled.div`
    overflow: auto;
    max-height: 200px;
`

type ErrorLoading = {
    errorCompany: any,
    isFetchingCompany: boolean,
}

const Company: React.FC<_CompanyOverview> = ({ companyName, symbol, website, description }) => {
    return (
        <>
            <Name>{companyName} ({symbol})</Name>
            <Website>
                {website ?
                <Link href={website}><i>{website}</i></Link>
                :
                <span><i>{website}</i></span>
            }
            </Website>
            <OverflowContainer>
                <Description>{description}</Description>
            </OverflowContainer>
        </>
    )
}

const CompanyOverview: React.FC<_CompanyOverview & ErrorLoading> = ({ errorCompany, isFetchingCompany, ...companyProps }) => {

    const CompanyError = <FetchingError message={errorCompany.message}/>

    const Loading = <LoadingContainer><AdaptiveLoader size={50} seperation={2} speed={1.4} /></LoadingContainer>

    return (
        <CompanyOverviewContainer>
            <Title>COMPANY OVERVIEW</Title>
            {
                errorCompany && !isFetchingCompany ? CompanyError 
                : isFetchingCompany ? Loading 
                : <Company {...companyProps} />
            }
        </CompanyOverviewContainer>
    );
}

export default CompanyOverview;