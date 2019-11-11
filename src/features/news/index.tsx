import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Article, News } from './models'
import { AppState } from '../../models/appState';
import { Error } from '../../models/errors';
import styled from '@emotion/styled'
import { Title } from '../../Root'
import { ArticleComponent } from './article';
import { Loader } from '../loader/Loader'


const NewsLayoutContainer =styled.div`
    flex: 0 1 34%;
    margin-top: 40px;
    margin-left: 26px;
    max-height: 400px;
    @media(max-width: 1000px) {
        margin-left: 29px;
    }
    @media(min-width: 750px) {
        min-width: 250px;
    };
    @media(max-width: 750px) {
        margin-top: 0;
        margin-left: 0;
    }
`

const ArticleLayoutContainer = styled.div`
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    max-height: 400px;
    overflow: auto;
`

export const NewsComponent: FC<{}> = () => {

    const news: News = useSelector(({ news }: AppState) => news)
    
    const error: Error = useSelector(({ errors }: AppState) => errors);

    const Loading = <Loader className='margin-top: 200px; @media(max-width: 750px) {margin-top: 50px; margin-bottom: 50px;};' size={50} seperation={2} speed={1.4} />

    const News = news.length > 0 ? news.map((article: Article) => <ArticleComponent key={article.headline} {...article}/>) : Loading;

    const NewsError = news.length > 0 ? (
        <div style={{color: 'red', marginBottom: '1rem'}}>Connection to server lost.</div>
    ) : null;


    return (
        <NewsLayoutContainer>
            <Title>LATEST NEWS</Title>
            {
                error && error.news
                ? NewsError 
                : <ArticleLayoutContainer>{News}</ArticleLayoutContainer>}
        </NewsLayoutContainer>

    )
}
