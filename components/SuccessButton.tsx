import styled from "@emotion/styled";
import Button from "./Button";

const SuccessButton = styled(Button)`
    display: block;
    margin: auto;
    background-color: hsl(var(--clr-green));
    padding-inline: 3rem;

    & * {
        color: hsl(var(--clr-white));
    }
`;

export default SuccessButton;
