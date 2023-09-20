import {ILap, IPilot} from "../types";

export const getPilots = (laps: ILap[]): IPilot[] => {
    return laps.reduce((acc, lap) => {
        if (!acc.map((pilot) => pilot._id).includes(lap.pilot._id)) {
            acc.push(lap.pilot);
        }
        return acc;
    }, [] as IPilot[]);
}