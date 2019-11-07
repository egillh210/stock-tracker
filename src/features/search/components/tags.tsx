import React, { memo } from 'react'
import styled from '@emotion/styled'

const TagsLayoutContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const Tag = styled.span`
    background-color: #415f8a;
    border-radius: 2px;
    height: 22px;
    font-size: 14px;
    margin-right: 11px;
    padding-left: 16px;
    padding-right: 16px;
    display: flex;
    align-items: center;
    overflow: hidden;
`

type TagsProps = {
    primaryExchange: string | null,
    tags: string[], 
}

export const Tags = memo<TagsProps>(({primaryExchange, tags: [sector, currency]}) => {
    return (
        <TagsLayoutContainer>
            <Tag>{primaryExchange}</Tag>
            <Tag>{sector}</Tag>
            <Tag>{currency}</Tag>
        </TagsLayoutContainer>
    )
})