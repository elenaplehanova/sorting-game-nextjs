import React from "react";
import styled from "@emotion/styled";

interface Props {
    children?: React.ReactNode;
}

const Button = styled.button<Props>`
    border: none;
    border-radius: 1rem;

    &:focus:not([disabled]),
    &:hover:not([disabled]) {
        cursor: pointer;
        box-shadow: inset 0 0 0.5rem hsl(var(--clr-dark));
        transition: all 0.2s;
    }
`;

export default Button;
