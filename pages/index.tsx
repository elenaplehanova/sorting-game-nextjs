import Head from "next/head";
import Link from "next/link";
import Button from "../components/Button";
import Slider from "../components/Slider";
import styled from "@emotion/styled";
import { useState } from "react";
import { SliderValue } from "../services/types";
import SuccessButton from "../components/SuccessButton";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { mapArtifacts, mapValues, setupSlice } from "../store/reducers/SetupSlice";

const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    min-height: 100vh;

    background-position: center;
    background-repeat: no-repeat;
    background-image: url("/images/background-setup.png");
`;

const Form = styled.form`
    position: relative;
    padding: 2rem;
    margin: auto;
    color: hsl(var(--clr-dark));
    background-color: hsl(var(--clr-white));

    border: 10px solid transparent;
    border-radius: 2rem;
    background: linear-gradient(hsl(var(--clr-white)), hsl(var(--clr-white))) padding-box,
        linear-gradient(hsl(var(--clr-light-violet)), hsl(var(--clr-dark-violet))) border-box;

    & > *:not(:first-child) {
        margin-top: 4rem;
    }
`;

const ButtonsDiv = styled.div`
    display: flex;
    gap: 2rem;
`;

const WarningButton = styled(Button)`
    background-color: hsl(var(--clr-yellow));
    border-radius: 2rem;
    padding-inline: 2rem;

    & * {
        color: hsl(var(--clr-dark));
    }
`;

export default function Home() {
    const { gameSetup } = useAppSelector((state) => state.setupReducer);

    const { setGameSetup } = setupSlice.actions;
    const dispatch = useAppDispatch();

    const [countArtifacts, setCountArtifacts] = useState<SliderValue>(mapArtifacts[0]);
    const [value, setValue] = useState<SliderValue>(mapValues[0]);
    const [orderToHigh, setOrderToHigh] = useState<boolean>(gameSetup.orderToHigh);

    const gameSetupLocal = {
        countArtifacts: countArtifacts,
        typeValues: value,
        orderToHigh: orderToHigh,
    };

    const buttonHandler = () => {
        setOrderToHigh(!orderToHigh);
    };

    return (
        <Div>
            <Head>
                <title>Sorting game</title>
                <meta
                    name="description"
                    content="Sorting game for numbers from larger to smaller and vice versa. Created as test project for 'Sirius Future' company."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Form>
                <Slider
                    title="Кол-во предметов"
                    values={mapArtifacts}
                    setValue={setCountArtifacts}
                ></Slider>
                <Slider title="Значения" values={mapValues} setValue={setValue}></Slider>
                <ButtonsDiv>
                    <WarningButton disabled={!orderToHigh} onClick={buttonHandler}>
                        По возрастанию
                    </WarningButton>
                    <WarningButton disabled={orderToHigh} onClick={buttonHandler}>
                        По убыванию
                    </WarningButton>
                </ButtonsDiv>
                <SuccessButton onClick={() => dispatch(setGameSetup(gameSetupLocal))}>
                    <Link href="/gameplay">Играть</Link>
                </SuccessButton>
            </Form>
        </Div>
    );
}
