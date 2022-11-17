import styled from "@emotion/styled";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import SuccessButton from "./SuccessButton";

interface Props {
    children?: React.ReactNode;
    active: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
}

const Div = styled.div`
    width: 100%;
    height: 100%;

    background-color: hsl(259 44% 15% / 0.6);

    position: fixed;
    top: 0;
    left: 0;

    display: grid;
    place-items: center;
`;

const WinningBannerDiv = styled.div`
    position: relative;

    display: grid;
    place-items: center;

    border: 2px solid yellow;
    background-color: hsl(var(--clr-white));
    color: hsl(var(--clr-violet));
    padding: 2rem 4rem;

    border: 20px solid transparent;
    border-radius: 2rem;
    background: linear-gradient(hsl(var(--clr-white)), hsl(var(--clr-white))) padding-box,
        linear-gradient(hsl(var(--clr-green)), hsl(var(--clr-dark-violet) / 0)) border-box;
`;

const H1 = styled.h1<{ children: string }>`
    position: relative;
    --text: "${({ children }) => children}";

    font-size: var(--fs-1000);
    font-weight: var(--fw-bold);
    color: transparent;

    &::before {
        position: absolute;
        content: var(--text);

        --shadow-color: hsl(var(--clr-dark-green));
        text-shadow: var(--shadow-color) 0px 0px 30px, var(--shadow-color) 0px 2px 30px,
            var(--shadow-color) 0px 5px 30px;
    }

    &::after {
        position: absolute;
        content: var(--text);
        left: 0;

        background-image: linear-gradient(
            0deg,
            hsl(var(--clr-yellow)),
            hsl(var(--clr-light-yellow))
        );
        background-clip: text;
        color: transparent;
    }
`;

const P = styled.p`
    max-width: 20ch;
    padding-block: 1rem 4rem;
`;

const BorderStars = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;

    & > :nth-child(1) {
        position: absolute;
        width: 10rem;

        top: -3.5rem;
        left: -4.5rem;
    }

    & > :nth-child(2) {
        position: absolute;
        width: 15rem;

        top: 20rem;
        left: -8rem;
    }

    & > :nth-child(3) {
        position: absolute;
        width: 15rem;

        top: 7rem;
        left: 33rem;
    }

    & > :nth-child(4) {
        position: absolute;
        width: 10rem;

        top: 23rem;
        left: 37rem;
    }
`;

const Star = styled.div`
    aspect-ratio: 1;

    background-repeat: no-repeat;
    background-image: url("/images/star-image.png");
    background-position: center;
    background-size: contain;
`;

const WinningBanner: React.FC<Props> = ({ active, setActive }) => {
    return (
        <Div>
            <WinningBannerDiv>
                <H1>Победа!</H1>
                <P>Молодец! Ты успешно справился с заданием!</P>
                <SuccessButton>
                    <Link href="/">Заново</Link>
                </SuccessButton>
                <BorderStars>
                    <Star></Star>
                    <Star></Star>
                    <Star></Star>
                    <Star></Star>
                </BorderStars>
            </WinningBannerDiv>
        </Div>
    );
};

export default WinningBanner;