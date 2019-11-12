import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { CompanyOverview, AppState } from 'models'
import { Title } from 'features/Root'
import { Loader } from 'features/loader'
const { div, a } = styled;

const CompanyOverviewContainer = div`
    max-height: 400px;
    margin-bottom: 25px;
    @media(max-width: 750px) {
        margin-top: 40px;
        margin-bottom: 20px;
    }
`

const Name = div`
    margin-top: 10px;
    font-size: 24px;
`

const Website = div`
    margin-top: 8px;
    margin-bottom: 8px;
`

const Link = a`
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

const Description = div`
    font-size: 16px;
    max-height: 140px;
`

const OverflowContainer = div`
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

    const company: CompanyOverview = useSelector(({ companyOverview}: AppState) => companyOverview)

    return (
        <CompanyOverviewContainer>
            <Title>COMPANY OVERVIEW</Title>
            {company.symbol
                ? <Company {...company} />
                : <Loader className='margin-top: 50px; margin-bottom: 50px;' size={50} seperation={2} speed={1.4} />
            }
        </CompanyOverviewContainer>
    );
}
