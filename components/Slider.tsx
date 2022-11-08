import React, { Dispatch, SetStateAction, useState } from "react";
import styled from "@emotion/styled";
import { SliderValue } from "../types";

interface Props {
    children?: React.ReactNode;
    title: string;
    values: SliderValue[];
    setValue: Dispatch<SetStateAction<SliderValue>>;
}

const SliderDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const InputDiv = styled.div`
    display: grid;
    width: min-content;
`;

const Datalist = styled.datalist`
    font-family: var(--ff-sans-special);
    font-size: var(--fs-600);

    display: flex;
    gap: 4rem;

    & > option {
        width: 2rem;
        text-align: center;
    }
`;

const Input = styled.input`
    appearance: none;
    cursor: pointer;
    border-radius: 2rem;
    background-color: hsl(var(--clr-yellow));

    ::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 1.5rem;
        aspect-ratio: 1;
        border-radius: 50%;
        background-color: hsl(var(--clr-blue));
    }

    ::-moz-range-thumb {
        -moz-appearance: none;
        width: 1.5rem;
        aspect-ratio: 1;
        border-radius: 50%;
        background-color: hsl(var(--clr-blue));
    }
`;

const Slider: React.FC<Props> = ({ title, values, setValue }) => {
    const [index, setIndex] = useState(0);

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newIndex = event.target.valueAsNumber;
        setIndex(newIndex);
        setValue(values[newIndex]);
    };

    return (
        <SliderDiv>
            <label htmlFor="slider">{title}</label>
            <InputDiv>
                <Datalist id="values">
                    {values.map((item, index) => (
                        <option key={index} value={index} label={item.toString()}></option>
                    ))}
                </Datalist>
                <Input
                    id="slider"
                    name="slider"
                    list="values"
                    type="range"
                    value={index}
                    onChange={inputHandler}
                    min="0"
                    max={values.length - 1}
                    step="1"
                ></Input>
            </InputDiv>
        </SliderDiv>
    );
};
export default Slider;
