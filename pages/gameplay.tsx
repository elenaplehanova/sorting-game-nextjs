import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import WinningBanner from "../components/WinningBanner";
import { useAppSelector } from "../hooks/redux";
import { ICard } from "../models/ICard";

var _ = require("lodash");

const Div = styled.div`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    min-height: 100vh;
`;

const GameplayDiv = styled.div`
    display: flex;
    flex-direction: column;

    width: 50rem;
    padding: 2rem;

    background-position: center;
    background-repeat: no-repeat;
    background-image: url("/images/donuts/background-left-image.svg"),
        url("/images/donuts/background-right-image.svg");
    background-position: left top, right top;
    background-size: 35%, 20%;
    background-color: hsl(32, 44%, 77%);
`;

const sketchyCard = () => css`
    width: 6rem;
    aspect-ratio: 1;
    border-radius: 50%;
    border-width: 1px;
    box-shadow: inset 0px 0px 20px 10px hsl(0, 4%, 73%);
`;

const regularCard = (imageUrl: string) => css`
    position: relative;
    width: 6rem;
    aspect-ratio: 1;

    background-size: contain;
    background-repeat: no-repeat;
    background-image: url(${imageUrl});

    & > span {
        position: absolute;
        display: inline-table;
        inset: 0;
        margin: auto;
    }
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

interface Props {
    children?: React.ReactNode;
    card: ICard;
    indexCard?: number;
    countCards?: number;
}
const CardDiv = styled.div<Props>`
    ${textStyleCard};
    font-size: var(--fs-900);

    position: relative;

    ${({ card, indexCard, countCards }) => {
        let resultStyle = [];

        if (card.isHidden) {
            resultStyle.push(`visibility: hidden;`);
        }

        if (card.isSketchy) {
            resultStyle.push(sketchyCard);
        } else if (card.imageUrl) {
            resultStyle.push(regularCard(card.imageUrl));
        }

        let cardPosition: {
            order: number;
            top: string;
        }[] = [];
        if (countCards) {
            switch (countCards) {
                case 2:
                    cardPosition = cardPosition2;
                    break;
                case 3:
                    cardPosition = cardPosition3;
                    break;
                case 4:
                    cardPosition = cardPosition4;
                    break;
                case 5:
                    cardPosition = cardPosition5;
                    break;
            }
        }

        cardPosition.forEach((item) => {
            if (indexCard === item.order) {
                resultStyle.push(`top: ${item.top};`);
            }
        });

        return resultStyle;
    }};
`;

const ElementsDiv = styled.div`
    display: flex;
    justify-content: center;
    padding-block: 4rem;

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
    padding-block: 1.5rem;
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

const cardPosition2 = [
    { order: 0, top: "-3rem" },
    { order: 1, top: "-3rem" },
];

const cardPosition3 = [{ order: 1, top: "-3rem" }];

const cardPosition4 = [
    { order: 1, top: "-3.5rem" },
    { order: 3, top: "-3.5rem" },
];

const cardPosition5 = [
    { order: 1, top: "-3.5rem" },
    { order: 2, top: "2rem" },
    { order: 3, top: "-3.5rem" },
];

export default function Gameplay() {
    const { gameSettings } = useAppSelector((state) => state.settingsReducer);

    const generateElements = () => {
        let countImages = 4;

        let elements: ICard[] = [];

        let countArtifacts = gameSettings.countArtifacts + 1;
        let typeValues = gameSettings.typeValues;

        let randomArray = [];

        if (typeValues === "A") {
            randomArray = _.sampleSize(
                _.range("A".charCodeAt(0), "Z".charCodeAt(0) + 1).map((i: number) =>
                    String.fromCharCode(i)
                ),
                countArtifacts
            ).sort();
        } else {
            randomArray = _.sampleSize(_.range(1, typeValues), countArtifacts).sort(
                (a: number, b: number) => a - b
            );
        }

        for (let i = 0; i < countArtifacts; i++) {
            let indexImage = i + 1;
            if (indexImage > countImages) {
                indexImage -= countImages;
            }

            elements.push({
                id: i,
                order: i,
                title: randomArray[i],
                imageUrl: `/images/donuts/image-donut-${indexImage}.png`,
            });
        }

        return elements;
    };

    const [myElements, setMyElements] = useState<ICard[]>(() => generateElements());

    let whichElementDontShow = gameSettings.orderToHigh ? 0 : myElements.length - 1;

    const [elements, setElements] = useState<ICard[]>([]);
    useEffect(() => {
        let array: ICard[] = _.shuffle(
            myElements.filter((card) => card.id !== whichElementDontShow)
        );
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
                return { ...card, isSketchy: card.id !== whichElementDontShow ? true : false };
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

    return (
        <Div>
            <GameplayDiv>
                {elements.length > 0 && (
                    <ElementsDiv>
                        {elements.map((card, index) => (
                            <CardDiv
                                key={`${card.id}_Card`}
                                draggable
                                onDragStart={(e) => dragStartHandler(e, card)}
                                onDragOver={dragOverHandler}
                                card={card}
                                indexCard={index}
                                countCards={elements.length}
                            >
                                <span>{card.title}</span>
                            </CardDiv>
                        ))}
                    </ElementsDiv>
                )}
                {gameSettings.orderToHigh ? (
                    <SortingDivToHigh>
                        <h3>По возрастанию</h3>
                    </SortingDivToHigh>
                ) : (
                    <SortingDivToLow>
                        <h3>По убыванию</h3>
                    </SortingDivToLow>
                )}
                {dashboardElements.length > 0 && (
                    <DashboardDiv onDragOver={dragOverHandler} onDrop={dropCardHandler}>
                        {dashboardElements.map((card) => (
                            <CardDiv
                                key={`${card.id}_DashboardCard`}
                                onDrop={(e) => dropHandler(e, card)}
                                card={card}
                            >
                                {card.isSketchy ? "" : <span>{card.title}</span>}
                            </CardDiv>
                        ))}
                    </DashboardDiv>
                )}
            </GameplayDiv>
            {!dashboardElements.some((item) => item.isSketchy === true) && (
                <WinningBanner></WinningBanner>
            )}
        </Div>
    );
}
