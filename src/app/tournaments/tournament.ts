import { User } from '../account/user';
import { TournamentPlayer } from './tournament-player';

export class Tournament {
    id: number;
    title: string;
    numberOfTeams: number;
    type: string;
    players: TournamentPlayer[];
    user: User;
    street: string;
    city: string;

    constructor(title: string, numberOfTeams: number, type: string, street: string, city: string) {
        this.title = title;
        this.numberOfTeams = numberOfTeams;
        this.type = type;
        this.street = street;
        this.city = city;
    }
}
