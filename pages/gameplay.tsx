import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import WinningBanner from "../components/WinningBanner";
import { useAppSelector } from "../hooks/redux";
import { ICard } from "../models/ICard";
var _ = require("lodash");

interface Props {
    children?: React.ReactNode;
    card: ICard;
    indexCard?: number;
}

const Div = styled.div`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    min-height: 100vh;
`;

const GameplayDiv = styled.div`
    display: grid;
    grid-template-rows: 5fr 1fr 3fr;
    place-content: center;

    padding: 2rem;

    background-position: center;
    background-repeat: no-repeat;
    background-image: url("/images/donuts/background-donuts.png");
`;

const sketchyCard = () => css`
    width: 7rem;
    aspect-ratio: 1;
    border-radius: 50%;
    border-width: 1px;
    box-shadow: inset 0px 0px 20px 10px hsl(0, 4%, 73%);
`;

const regularCard = (imageUrl: string) => css`
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url(${imageUrl});
`;

const textStyleCard = css`
    user-select: none;

    -webkit-text-stroke: 2px hsl(var(--clr-dark-blue));
    -webkit-font-smoothing: antialiased;

    @supports (not (-webkit-text-stroke: 4px hsl(var(--clr-dark-blue)))) {
        --text-stroke-width: 2px;
        --text-stroke-color: hsl(var(--clr-dark-blue));

        text-shadow: var(--text-stroke-color) 0px 0px var(--text-stroke-width),
            var(--text-stroke-color) 0px 0px var(--text-stroke-width),
            var(--text-stroke-color) 0px 0px var(--text-stroke-width),
            var(--text-stroke-color) 0px 0px var(--text-stroke-width),
            var(--text-stroke-color) 0px 0px var(--text-stroke-width),
            var(--text-stroke-color) 0px 0px var(--text-stroke-width);
    }

    color: hsl(var(--clr-white));
`;

const CardDiv = styled.div<Props>`
    ${textStyleCard};
    font-size: var(--fs-900);

    padding: 2rem;
    position: relative;

    ${({ card, indexCard }) => {
        let resultStyle = [];

        if (card.isHidden) {
            resultStyle.push(`visibility: hidden;`);
        }

        if (card.isSketchy) {
            resultStyle.push(sketchyCard);
        } else if (card.imageUrl) {
            resultStyle.push(regularCard(card.imageUrl));
        }

        //if (length === 5)
        cardPosition5.forEach((item) => {
            if (indexCard === item.order) {
                resultStyle.push(`top: ${item.top};`);
            }
        });

        return resultStyle;
    }};
`;

const ElementsDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    place-items: center;

    & > * {
        cursor: grab;
        margin: 1rem;
    }
`;

const SortingDiv = styled.div`
    display: grid;
    position: relative;
    padding: 0.2rem;

    ${textStyleCard};

    font-size: var(--fs-800);
    height: 5rem;

    & > * {
        font-weight: var(--fw-semi-bold);
        z-index: 200;
    }
`;

const SortingDivToHigh = styled(SortingDiv)`
    justify-content: start;

    &::before {
        content: "";
        position: absolute;
        width: 30rem;
        height: inherit;
        background-repeat: no-repeat;
        background-image: url("/images/arrow-image.png");
        transform: rotate(0deg);
        justify-self: start;
        top: 0rem;
        z-index: 100;
    }
`;

const SortingDivToLow = styled(SortingDiv)`
    justify-content: end;

    &::before {
        content: "";
        position: absolute;
        width: 30rem;
        height: inherit;
        background-repeat: no-repeat;
        background-image: url("/images/arrow-image.png");
        transform: rotate(180deg);
        justify-self: end;
        top: -1rem;
        z-index: 100;
    }
`;

const DashboardDiv = styled.div`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: hsl(7, 19%, 90%);

    height: max-content;
    padding-block: 2rem;
    box-shadow: inset 0px 0px 2px 10px hsl(35, 18%, 81%);
    border-radius: 2.5rem;

    & > * {
        margin: 0.2rem;
    }

    &::before {
        content: "";
        border-radius: inherit;

        background-repeat: no-repeat;
        background-position: center;
        background-image: url("/images/donuts/background-dashboard-lollypops.png");
        position: absolute;
        inset: 0;
        opacity: 0.2;
    }
`;

const cardPosition5 = [
    { order: 1, top: "-50px" },
    { order: 2, top: "50px" },
    { order: 3, top: "-50px" },
];

export default function Gameplay() {
    const myElements = [
        { id: 0, order: 0, title: "36", imageUrl: "/images/donuts/image-donut-1.png" },
        {
            id: 1,
            order: 1,
            title: "42",
            imageUrl: "/images/donuts/image-donut-2.png",
        },
        {
            id: 2,
            order: 2,
            title: "46",
            imageUrl: "/images/donuts/image-donut-3.png",
        },
        {
            id: 3,
            order: 3,
            title: "57",
            imageUrl: "/images/donuts/image-donut-4.png",
        },
        { id: 4, order: 4, title: "64", imageUrl: "/images/donuts/image-donut-1.png" },
        { id: 5, order: 5, title: "112", imageUrl: "/images/donuts/image-donut-2.png" },
    ];

    const [elements, setElements] = useState<ICard[]>([]);
    useEffect(() => {
        let array: ICard[] = _.shuffle(myElements.filter((card) => card.id !== 0));
        setElements(
            array.map((card) => {
                return { ...card, hidden: false };
            })
        );
    }, []);

    const [dashboardElements, setDashboardElements] = useState<ICard[]>([]);
    useEffect(() => {
        setDashboardElements(
            myElements.map((card) => {
                return { ...card, isSketchy: card.id !== 0 ? true : false };
            })
        );
    }, []);

    const [currentCard, setCurrentCard] = useState<ICard | null>(null);

    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, card: ICard) => {
        setCurrentCard(card);
    };

    const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const dropHandler = (e: React.DragEvent<HTMLDivElement>, card: ICard) => {
        e.preventDefault();

        if (currentCard !== null) {
            if (card.order === currentCard.order) {
                setDashboardElements((prevState) =>
                    prevState.map((element) => {
                        if (element.order === currentCard.order) {
                            element = { ...currentCard, isSketchy: false };
                        }

                        return element;
                    })
                );

                setElements((prevState) =>
                    prevState.map((element) => {
                        if (element.order === currentCard.order) {
                            element = { ...currentCard, isHidden: true };
                        }

                        return element;
                    })
                );
            }
        }
    };
    const dropCardHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const { gameSetup } = useAppSelector((state) => state.setupReducer);
    const win = !dashboardElements.some((item) => item.isSketchy === true);

    return (
        <Div>
            <GameplayDiv>
                <ElementsDiv>
                    {elements.length > 0 && (
                        <>
                            {elements.map((card, index) => (
                                <CardDiv
                                    key={`${card.id}_Card`}
                                    draggable
                                    onDragStart={(e) => dragStartHandler(e, card)}
                                    onDragOver={dragOverHandler}
                                    card={card}
                                    indexCard={index}
                                >
                                    {card.title}
                                </CardDiv>
                            ))}
                        </>
                    )}
                </ElementsDiv>
                {gameSetup.orderToHigh ? (
                    <SortingDivToHigh>
                        <h3>По возрастанию</h3>
                    </SortingDivToHigh>
                ) : (
                    <SortingDivToLow>
                        <h3>По убыванию</h3>
                    </SortingDivToLow>
                )}
                <DashboardDiv onDragOver={dragOverHandler} onDrop={dropCardHandler}>
                    {dashboardElements.length > 0 && (
                        <>
                            {dashboardElements.map((card) => (
                                <CardDiv
                                    key={`${card.id}_DashboardCard`}
                                    onDrop={(e) => dropHandler(e, card)}
                                    card={card}
                                >
                                    {card.isSketchy ? "" : <span>{card.title}</span>}
                                </CardDiv>
                            ))}
                        </>
                    )}
                </DashboardDiv>
            </GameplayDiv>
            {win && <WinningBanner></WinningBanner>}
        </Div>
    );
}
