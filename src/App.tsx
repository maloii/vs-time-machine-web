import React, {useCallback, useMemo, useState} from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, DocumentData, orderBy, query, where } from 'firebase/firestore';
import {PullDownContent, PullToRefresh, RefreshContent, ReleaseContent} from "react-js-pull-to-refresh";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DateTime } from 'luxon';

import { ILap, IPilot } from "./types";
import { TableLaps } from "./table-laps";
import { lapsMappers } from "./mappers/lapsMappers";
import { getPilots } from "./utils";
import {firebaseConfig} from "./firebaseConfig";

import './App.css';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [selectedPilot, setSelectedPilot] = useState<IPilot | undefined>(undefined);
  const [date, setDate] = useState<DateTime>(DateTime.now());
  const [value, loading, error] = useCollectionData<ILap>(
      query<ILap, DocumentData>(
          // @ts-ignore
          collection<ILap>(db, 'mobile_laps'),
          where("timeSystem", ">=", date.startOf('day').toMillis()),
          where("timeSystem", "<=", date.endOf('day').toMillis()),
          orderBy("timeSystem", "desc"),
      )
  );

  const pilots = useMemo(() => getPilots(value || []), [value]);

  const laps = useMemo(() => lapsMappers(value || [], selectedPilot ? [selectedPilot] : pilots), [value, selectedPilot, pilots]);
  const handleSelectedPilot = useCallback((event: SelectChangeEvent) => {
    setSelectedPilot(pilots.find((pilot) => pilot._id === Number(event.target.value)));
  }, [pilots])

  // @ts-ignore
  const handleChangeDate = useCallback((newDate) => {
    setDate(newDate);
  }, []);

  const handleRefresh = useCallback(() => {
        window.location.href = '/'
        return Promise.resolve();
    }, []);

  return (
      <PullToRefresh
          pullDownContent={<PullDownContent />}
          releaseContent={<ReleaseContent />}
          refreshContent={<RefreshContent />}
          pullDownThreshold={200}
          onRefresh={handleRefresh}
          triggerHeight={2000}
          backgroundColor='white'
          startInvisible={true}
      >
        <div className="App">
            <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterLuxon}>
                  <DatePicker label="Day" format="dd.MM.yyyy" value={date} onChange={handleChangeDate} />
                </LocalizationProvider>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="pilots-label">Pilots</InputLabel>
              <Select
                  labelId="pilots-label"
                  id="pilots"
                  value={String(selectedPilot?._id)}
                  label="Age"
                  onChange={handleSelectedPilot}
              >
                <MenuItem value={undefined}>ALL</MenuItem>
                {pilots?.map((pilot) => <MenuItem key={String(pilot._id)} value={String(pilot._id)}>{pilot.login}({pilot.transponder})</MenuItem>)}
              </Select>
            </FormControl>
            <TableLaps rows={laps} />
        </div>
      </PullToRefresh>
  );
}

export default App;
