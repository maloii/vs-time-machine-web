export interface IPilot {
    _id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    login: string;
    transponder: number;
    isSpeak: boolean;
    sessionId: number;
    countLaps: number;
}