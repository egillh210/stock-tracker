import React, { memo, FC } from 'react'
import styled from '@emotion/styled'
import { Range } from '../models/range'

const LabelRange = styled.div`
    margin: 0rem 0rem 1rem 0.5rem;
    display: inline-block;
    color: inherit;
    text-decoration: none;
    font-weight: 100;
    text-transform: uppercase;
    cursor: pointer;
`

const Input = styled.input`
    display: none;
`

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
    margin-right: 60px;
    font-family: 300;
    font-size: 12px;
    color: #beccdc;
`

type RangeButtonProps = {
    range: Range;
    update: (range: Range) => void;
    current: boolean;
}

const RangeButton: FC<RangeButtonProps> = ({ range, update, current }) => {
    const opacity = current ? 1.0 : 0.5;
    return (
        <LabelRange>
            <Input 
                type="radio" 
                name="chart" 
                defaultChecked={current}
            />
            <span onClick={() => update(range)} style={{opacity}}>{range}</span>
        </LabelRange>
    )
}

const ranges: Range[] = ['MAX', '5y', '1y', '1m', '5d', '1d'];

type TestProps = {
    range: Range,
    update: (range: Range) => void
}

export const RangeButtons = memo<TestProps>(({ range, update }) => {

    const buttons = ranges.map(rangeItem => <RangeButton key={rangeItem} current={rangeItem === range} range={rangeItem} update={update} />);

    return (
        <ButtonsContainer>
            {buttons}
        </ButtonsContainer>
    )
})
