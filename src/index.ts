import { Ai, Difficulties } from "./ai.js";
import { Game } from "./game.js";
import { GameMetadata } from "./game-metadata.js";

const ais: Array<Ai> = [new Ai(Difficulties.VeryEasy), new Ai(Difficulties.Easy), new Ai(Difficulties.Average), new Ai(Difficulties.Hard), new Ai(Difficulties.VeryHard)];
const games: Array<GameMetadata> = [];
const numberOfGamesToSimulate = 100000;
const numberOfMatches = 15;

function getData(ai1Difficulty: Difficulties, ai2Difficulty: Difficulties, didAi1Win: boolean, didAi1Start: boolean): Array<GameMetadata> {
    return games.filter(g => g.ai1.difficulty === ai1Difficulty && g.ai2.difficulty === ai2Difficulty && g.didAi1Win === didAi1Win && g.didAi1Start === didAi1Start);
}

function getGameCountWhereA1Won(ai1Difficulty: Difficulties, ai2Difficulty: Difficulties): number {
    return games.filter(g => g.ai1.difficulty === ai1Difficulty && g.ai2.difficulty === ai2Difficulty && g.didAi1Win).length;
}

function getGameCount(ai1Difficulty: Difficulties, ai2Difficulty: Difficulties): number {
    return games.filter(g => g.ai1.difficulty === ai1Difficulty && g.ai2.difficulty === ai2Difficulty).length;
}

function getCountOfBordState(remainingMatches: number): number {
    let count: number = 0;
    games.forEach(g => { count += g.turns.filter(t => t.remainingMatches === remainingMatches).length });
    return count;
}


ais.forEach(ai1 => {
    ais.forEach(ai2 => {
        for (let i: number = 0; i < (numberOfGamesToSimulate / 2); i++) {
            console.debug("simulating", ai1.difficulty, "vs", ai2.difficulty, "match", i + 1, "of", numberOfGamesToSimulate)
            games.push(new Game(numberOfMatches, ai1, ai2, true).simulate());
            games.push(new Game(numberOfMatches, ai1, ai2, false).simulate());
        }
    })
});

ais.forEach(ai1 => {
    ais.forEach(ai2 => {
        console.warn(ai1.difficulty, "VS", ai2.difficulty);
        var gameCount = getGameCount(ai1.difficulty, ai2.difficulty);
        console.log("A1 started and won:", getData(ai1.difficulty, ai2.difficulty, true, true).length, "of", gameCount);
        console.log("A1 started and lost:", getData(ai1.difficulty, ai2.difficulty, false, true).length, "of", gameCount);
        console.log("A2 started and won:", getData(ai1.difficulty, ai2.difficulty, false, false).length, "of", gameCount);
        console.log("A2 started and lost:", getData(ai1.difficulty, ai2.difficulty, true, false).length, "of", gameCount);
        console.log("A1 won a total of :", getGameCountWhereA1Won(ai1.difficulty, ai2.difficulty), "/", gameCount);
    })
});

console.warn("Bord States")
for (let i = 0; i < 16; i++) {
    console.log(i, "matches remaining in", getCountOfBordState(i),"turns")
}
