import { Ai } from "./ai.js";
import { TurnMetadata } from "./turn-metadata.js";

export class GameMetadata{
    public matches: number;
    public ai1: Ai;
    public ai2: Ai;
    public turns: Array<TurnMetadata>;
    public didAi1Win: boolean;
    public didAi1Start: boolean;

    constructor(matches: number, ai1: Ai, ai2: Ai, didAi1Start: boolean, didAi1Win: boolean, turns: Array<TurnMetadata>){
        this.matches = matches;
        this.ai1 = ai1;
        this.ai2 = ai2;
        this.turns = turns;
        this.didAi1Win = didAi1Win;
        this.didAi1Start = didAi1Start;
    } 
} 