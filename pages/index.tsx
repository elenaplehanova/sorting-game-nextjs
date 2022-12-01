import Head from "next/head";
import Link from "next/link";
import Button from "../components/Button";
import Slider from "../components/Slider";
import styled from "@emotion/styled";
import { useState } from "react";
import { SliderValue } from "../services/types";
import SuccessButton from "../components/SuccessButton";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { mapArtifacts, mapValues, settingsSlice } from "../store/reducers/SettingsSlice";

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
    display: grid;
    gap: 3rem;

    position: relative;
    padding: 2rem;
    margin: auto;
    color: hsl(var(--clr-dark));
    background-color: hsl(var(--clr-white));

    border: 10px solid transparent;
    border-radius: 2rem;
    background: linear-gradient(hsl(var(--clr-white)), hsl(var(--clr-white))) padding-box,
        linear-gradient(hsl(var(--clr-light-violet)), hsl(var(--clr-dark-violet))) border-box;
`;

const ButtonsDiv = styled.div`
    display: flex;
    gap: 2rem;
`;

const WarningButton = styled(Button)`
    background-color: hsl(var(--clr-yellow));
    border-radius: 2rem;
    padding-inline: 2rem;
    color: hsl(var(--clr-dark) / 0.5);

    &[disabled] {
        color: hsl(var(--clr-dark));
    }
`;

const LinkButton = styled(Link)`
    text-decoration: none;
    padding-top: 1.5rem;
`;

export default function Home() {
    const { gameSettings } = useAppSelector((state) => state.settingsReducer);

    const { setGameSettings } = settingsSlice.actions;
    const dispatch = useAppDispatch();

    const [countArtifacts, setCountArtifacts] = useState<number>(mapArtifacts[0]);
    const [value, setValue] = useState<SliderValue>(mapValues[0]);
    const [orderToHigh, setOrderToHigh] = useState<boolean>(gameSettings.orderToHigh);

    const gameSettingsLocal = {
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
                <Slider<number>
                    title="Кол-во предметов"
                    values={mapArtifacts}
                    setValue={setCountArtifacts}
                ></Slider>
                <Slider<SliderValue>
                    title="Значения"
                    values={mapValues}
                    setValue={setValue}
                ></Slider>
                <ButtonsDiv>
                    <WarningButton disabled={orderToHigh} onClick={buttonHandler}>
                        По возрастанию
                    </WarningButton>
                    <WarningButton disabled={!orderToHigh} onClick={buttonHandler}>
                        По убыванию
                    </WarningButton>
                </ButtonsDiv>
                <LinkButton
                    onClick={() => {
                        dispatch(setGameSettings(gameSettingsLocal));
                    }}
                    href="/gameplay"
                >
                    <SuccessButton>Играть</SuccessButton>
                </LinkButton>
            </Form>
        </Div>
    );
}
