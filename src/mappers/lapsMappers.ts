import {ILap, IPilot} from "../types";

export const lapsMappers = (laps: ILap[], pilots: IPilot[]): ILap[] => {
    const allLaps = [] as ILap[];

    for (const pilot of pilots) {
        const lapsForPilot =  laps
            .filter((lap) => lap.pilot._id === pilot._id)
            .sort((a, b) => b.timeSystem - a.timeSystem);

        let prevTime = lapsForPilot?.[lapsForPilot?.length - 1]?.timeSystem || 0;

        for (let i = lapsForPilot?.length - 1; i >= 0; i--) {
            lapsForPilot[i].time = lapsForPilot[i].timeSystem - prevTime;
            lapsForPilot[i].pilot = pilot;
            lapsForPilot[i].num = lapsForPilot?.length - i - 1;
            prevTime = lapsForPilot[i].timeSystem;
        }
        allLaps.push(...lapsForPilot);
    }

    return allLaps.sort((a, b) => b.timeSystem - a.timeSystem);
}