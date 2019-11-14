import React, { memo } from 'react'
import styled from '@emotion/styled'
const { div, span } = styled

const TagsLayoutContainer = div`
    display: flex;
    flex-direction: row;
`

const Tag = span`
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

export const Tags = memo<TagsProps>(({
    primaryExchange, 
    tags: [sector, industry]
    }) => {
        
    return (
        <TagsLayoutContainer>
            <Tag>{primaryExchange}</Tag>
            <Tag>{sector}</Tag>
            <Tag>{industry}</Tag>
        </TagsLayoutContainer>
    )
})