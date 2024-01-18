import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Property } from '../../typings/property';

interface InitialStateDefaultObject {
  properties: Property[];
}

const INITIAL_STATE: InitialStateDefaultObject = {
  properties: [
    {
      id: 'AS34',
      name: 'bagr',
      parent_id: null,
    },
    {
      id: 'AS35',
      name: 'kladivo',
      parent_id: null,
    },
    {
      id: 'AS36',
      name: 'lopatka',
      parent_id: null,
    },
    {
      id: 'AS341',
      name: 'bagr hnědý',
      parent_id: 'AS34',
    },
    {
      id: 'AS342',
      name: 'bagr zelený',
      parent_id: 'AS34',
    },
  ],
};

export const propertiesSlice = createSlice({
  name: 'properties',
  initialState: INITIAL_STATE,
  reducers: {
    addProperty: (state, action: PayloadAction<Property>) => {
      state.properties.push(action.payload);
    },
    removeProperty: (state, action: PayloadAction<Property>) => {
      const { id } = action.payload;
      state.properties = state.properties.filter(
        (property) => property.id !== id
      );
    },
  },
});

export const { addProperty, removeProperty } = propertiesSlice.actions;
