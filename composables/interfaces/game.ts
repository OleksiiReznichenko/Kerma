import Bet from './bet';

export default interface Game {
    id: string;
    winnerId: string;
    winnerBetId: string;
    winAmountEth: number;
    gameDate: string;
    bets: Bet[] | undefined[];
}
