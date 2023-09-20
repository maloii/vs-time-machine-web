import {IPilot} from "./IPilot";
import {ISession} from "./ISession";

export interface ILap {
    _id: number;
    timeSystem: number;
    time: number;
    gate: number;
    number: number;
    lap: number;
    login: string;
    idTransponder: number;
    startNum: number;
    isStartLap: boolean;
    isCrashLap: boolean;
    sessionId: number;
    num: number;
    isBestTime: boolean;
    session: ISession;
    pilot: IPilot;
}