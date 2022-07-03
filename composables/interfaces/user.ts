import UserAchievements from "./userAchievements";

export default interface User {
    id: string;
    nickname: string;
    avatar: string;
    rank: string;
    balanceEth: number;
    cryptoAddress: string;
    totalWins: number;
    totalMoneyWon: number;
    gamesPlayed: string[];
    achievements: UserAchievements;
}