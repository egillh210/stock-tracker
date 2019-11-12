import React, { memo } from 'react'
import moment from 'moment'
import styled from '@emotion/styled'
import { Article } from 'models'
const { div, a } = styled;

const ArticleItemContainer = div`
    font-weight: 400;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
`

const Link = a`
    text-decoration: none;
    color: white;
    font-weight: 400;
    font-size: 16px;
    margin-bottom: 5px;
    &:hover {
        color: #e0be86;
    };
`

const Time = div`
    font-size: 14px;
    color: #beccdc;
    font-weight: 300;
`

export const ArticleComponent = memo<Article>(({ url, headline, datetime, source }) => {
    return (
        <ArticleItemContainer>
            <Link href={url} target='_blank'>
                <div style={{fontSize: 'inherit'}}>{headline}</div>
            </Link>
            <Time>{moment(datetime).fromNow()} - {source}</Time>
        </ArticleItemContainer>
    )
})
