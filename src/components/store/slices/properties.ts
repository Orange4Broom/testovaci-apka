import { createSlice } from '@reduxjs/toolkit';
import { PropertyPayload } from '../../../typings/payload';
import { PropertyState } from '../../../typings/state';

interface PropertyType {
  id: string;
  name: string;
  parent_id?: string;
}

const INITIAL_STATE: { [x: string]: PropertyType } = {
  AS34: {
    id: 'AS34',
    name: 'bagr',
  },
  AS35: {
    id: 'AS35',
    name: 'kladivo',
  },
  AS36: {
    id: 'AS36',
    name: 'lopatka',
  },
  AS341: {
    id: 'AS341',
    parent_id: 'AS34',
    name: 'bagr hnědý',
  },
  AS342: {
    id: 'AS342',
    parent_id: 'AS34',
    name: 'bagr zelený',
  },
};

export const propertiesSlice = createSlice({
  name: 'properties',
  initialState: INITIAL_STATE,
  reducers: {
    addProperty: (
      state: PropertyState,
      action: { payload: PropertyPayload }
    ) => {
      const { id, parent_id, name } = action.payload;
      state[id] = {
        id,
        parent_id,
        name,
      };
    },
    removeProperty: (
      state: PropertyState,
      action: { payload: PropertyPayload }
    ) => {
      const { id } = action.payload;
      delete state[id];
    },
  },
});

export const { addProperty, removeProperty } = propertiesSlice.actions;
