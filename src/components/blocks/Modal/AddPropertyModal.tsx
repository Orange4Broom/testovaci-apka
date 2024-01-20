import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/base';
// import { updateRootState } from '../../../store/slices/rootStates';

export const AddPropertyModal: React.FC = () => {
  // const dispatch = useDispatch();
  const rootState = useSelector((state: RootState) => state.rootState);
  console.log(rootState);
  return (
    <div>
      <h1>bruh</h1>
    </div>
  );
};
