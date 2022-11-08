import React from "react";
import styled from "@emotion/styled";

interface Props {
    children?: React.ReactNode;
}

const Button = styled.button<Props>`
    border: none;
    border-radius: 1rem;
    cursor: pointer;

    & * {
        text-decoration: none;
    }

    &:focus,
    &:hover {
        box-shadow: inset 0 0 15px hsl(var(--clr-dark));
        transition: all 0.2s;
    }
`;

export default Button;
