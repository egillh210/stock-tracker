import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { CompanyOverview } from './models'
import { AppState } from '../../models/appState';
import styled from '@emotion/styled'
import { Title } from '../../Root'
import { Loader } from '../loader/Loader'

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

const OverflowContainer = styled.div`
    overflow: auto;
    max-height: 200px;
`


export const Company: FC<CompanyOverview> = ({ companyName, symbol, website, description }) => {
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

export const CompanyOverviewComponent: FC<{}> = () => {

    const { ...companyProps }: CompanyOverview = useSelector((store: AppState) => store.companyOverview)

    return (
        <CompanyOverviewContainer>
            <Title>COMPANY OVERVIEW</Title>
            {companyProps.symbol
                ? <Company {...companyProps} />
                : <Loader className='margin-top: 50px; margin-bottom: 50px;' size={50} seperation={2} speed={1.4} />
            }
        </CompanyOverviewContainer>
    );
}
