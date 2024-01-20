import React, { MouseEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/base';
import { useDispatch } from 'react-redux';
import { updateRootState } from '../../../store/slices/rootStates';
import { updateLoan } from '../../../store/slices/loans';
import './modal.scss';
import { Loan } from '../../../typings/loan';

export const UpdateLoanModal: React.FC = () => {
  const dispatch = useDispatch();
  const rootState = useSelector((state: RootState) => state.rootState);
  const [prevLoan, setPrevLoan] = useState<Loan[]>([]);
  const [loanId, setLoanId] = useState<string>('');
  const [newState, setNewState] = useState<string>('');
  const [newStartDate, setNewStartDate] = useState<string>('');
  const [newEndDate, setNewEndDate] = useState<string>('');

  useEffect(() => {
    setPrevLoan(rootState.loan);
    setLoanId(rootState.loanId);
    setNewState(rootState.state);
    setNewStartDate(rootState.startDate);
    setNewEndDate(rootState.endDate);
  }, [rootState]);

  const handleUpdateLoan = (e: MouseEvent) => {
    e.stopPropagation();
    const updatedLoan = {
      id: loanId,
      propertyId: prevLoan[0].propertyId,
      name: prevLoan[0].name,
      ...prevLoan,
      state: newState,
      startDate: newStartDate,
      endDate: newEndDate,
    };
    dispatch(
      updateLoan({
        id: loanId,
        newLoan: updatedLoan,
      })
    );
    setNewState('');
    setNewStartDate('');
    setNewEndDate('');
    dispatch(updateRootState({ isUpdateLoanOpen: false }));
  };

  const closeModal = (e: MouseEvent) => {
    e.stopPropagation();
    dispatch(updateRootState({ isUpdateLoanOpen: false }));
  };
  return (
    <div
      style={{
        display: rootState.isUpdateLoanOpen ? 'flex' : 'none',
      }}
      className="modal__overlay"
    >
      <form
        className="modal__form"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <header>Úprava zápůjčky {rootState.loanId}</header>
        <div className="modal__inputs__body">
          <div className="modal__input--wrapper">
            <label htmlFor="parentId">Id rodičovské položky</label>
            <select
              id="parentId"
              value={newState}
              onChange={(e) => setNewState(e.target.value)}
            >
              <option value="nová">Nová</option>
              <option value="v přípravě">V přípravě</option>
              <option value="hotová">Hotová</option>
            </select>
          </div>
          <div className="modal__input--wrapper">
            <label htmlFor="loanStartDate">Začátek zápůjčky</label>
            <input
              type="date"
              id="loanStartDate"
              value={newStartDate}
              onChange={(e) => setNewStartDate(e.target.value)}
            />
          </div>
          <div className="modal__input--wrapper">
            <label htmlFor="loanStartDate">Konec zápůjčky</label>
            <input
              type="date"
              id="loanStartDate"
              value={newEndDate}
              onChange={(e) => setNewEndDate(e.target.value)}
            />
          </div>
        </div>
        <div className="modal__buttons--wraper">
          <button
            type="button"
            className="modal__button--add"
            onClick={(e) => handleUpdateLoan(e)}
          >
            Přidat položku
          </button>
          <button
            type="button"
            className="modal__button--cancel"
            onClick={(e) => closeModal(e)}
          >
            Zrušit
          </button>
        </div>
      </form>
    </div>
  );
};
