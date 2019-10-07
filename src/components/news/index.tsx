import React from 'react';
import styled from '@emotion/styled'
import {Title} from '../Root'
import moment from 'moment';
import { _News } from '../../models'

const NewsContainer = styled.div`
    width: 25%;
    height: 45vh;
`

const Article = styled.div`
    margin-bottom: 5%;
    font-size: 0.7rem;
`

const Link = styled.a`
    text-decoration: none;
    color: white;
    &:hover {
        color: yellow;
    }
`

type NewsProps = {
    news: _News
}

const News: React.FC<NewsProps> = ({ news }) => {
    return (
        <NewsContainer>
            <Title>LATEST NEWS</Title>
            {
                news.map(article => {
                    const { url, headline, datetime, source } = article;
                    return (
                        <Article>
                            <Link href={url}>
                                <div style={{fontSize: '0.8rem'}} >{headline}</div>
                                <div style={{opacity: 0.5}} >{moment(datetime).fromNow()} - {source}</div>
                            </Link>
                        </Article>
                    )
                })
            }
        </NewsContainer>
    )
}


export default News;