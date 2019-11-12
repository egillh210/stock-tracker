import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled'
import { Article, News, AppState } from 'models'
import { Title } from 'features/Root'
import { ArticleComponent } from 'features/news/article';
import { Loader } from 'features/loader'
const { div } = styled;


const NewsLayoutContainer =div`
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

const ArticleLayoutContainer = div`
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    max-height: 400px;
    overflow: auto;
`

const NewsError = div`
    color: red;
    margin-bottom: 1rem;
`

export const NewsComponent: FC<{}> = () => {

    const news: News = useSelector(({ news }: AppState) => news)
    
    const error: boolean = useSelector(({ errors: { news } }: AppState) => news);

    const Loading = (
        <Loader 
            className={`
                margin-top: 200px; 
                @media(max-width: 750px) 
                {
                    margin-top: 50px; 
                    margin-bottom: 50px;
                };
            `}
            size={50} 
            seperation={2} 
            speed={1.4} 
        />)

    const NewsArray = news.map((article: Article) => <ArticleComponent key={article.url} {...article}/>)

    const ErrorMessage = (
        <NewsError>Error fetching news.</NewsError>
    );


    return (
        <NewsLayoutContainer>
            <Title>LATEST NEWS</Title>
            {
                error ? ErrorMessage :
                <ArticleLayoutContainer>
                    {news.length ? NewsArray : Loading}
                </ArticleLayoutContainer>
            }
        </NewsLayoutContainer>

    )
}
