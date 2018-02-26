import { Game } from './game';

export class BadmintonMatch {
    id: number;
    title: string;
    type: string;
    player1: string;
    player2: string;
    player3: string;
    player4: string;
    games: Game[];

    constructor(title: string, type: string, player1: string, player2: string, player3: string, player4: string) {
        this.title = title;
        this.type = type;
        this.player1 = player1;
        this.player2 = player2;
        this.player3 = player3;
        this.player4 = player4;
    }
}
