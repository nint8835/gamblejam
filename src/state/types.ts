import { type WritableDraft } from 'immer';
import { type ScoreCardEntryId } from '../definitions/scorecard';
import { type TransitionInvocation } from './transitions/all';

export type MainMenuState = {
    stage: 'MainMenu';
};

export type ScoreCardValue = {
    entryId: ScoreCardEntryId;
    value: number | null;
};

export type Game = {
    dice: number[];
    selectedDice: number[];
    rerolls: number;

    scoreCardValues: ScoreCardValue[];
    totalScore: number;
    targetScore: number;
};

export type ActiveGameState = {
    stage: 'ActiveGame';
    currentGame: Game;
};

export type GameLostState = {
    stage: 'GameLost';
};

export type GameWonState = {
    stage: 'GameWon';
};

export type StateMachine = MainMenuState | ActiveGameState | GameLostState | GameWonState;

export type Stage = StateMachine['stage'];

export type State = {
    stateMachine: StateMachine;

    scoreCardContents: ScoreCardEntryId[];
};

export type Actions = {
    invoke: (invocation: TransitionInvocation) => void;
};

export type CompleteState = State & Actions;

export type StagedState<T extends StateMachine> = CompleteState & { stateMachine: T };

export type Transition<T> = {
    permittedStates: Stage[];
    invoke: (state: WritableDraft<CompleteState>, invocation: T) => void;
};
