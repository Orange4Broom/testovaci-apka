import React, { useState, MouseEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { updateRootState } from '../../../store/slices/rootStates';
import { addLoan } from '../../../store/slices/loans';
import { updateLoan } from '../../../store/slices/loans';
import { RootState } from '../../../store/base';
import { useDispatch } from 'react-redux';

import { Loan } from '../../../typings/loan';

import './modal.scss';

export const LoanModal: React.FC = () => {
  const dispatch = useDispatch();
  const uuid = uuidv4();
  const rootState = useSelector((state: RootState) => state.rootState);
  const shouldLoanOpen = rootState.shouldAddLoanOpen;
  const [loanState, setLoanState] = useState<string>('nová');
  const [loanEndDate, setLoanEndDate] = useState<string>('');
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

  const handleAddLoan = (e: MouseEvent) => {
    e.stopPropagation();
    if (loanEndDate) {
      dispatch(
        addLoan({
          id: uuid,
          propertyId: rootState.propertyId,
          name: rootState.propertyName,
          state: loanState,
          startDate: rootState.startDate,
          endDate: loanEndDate,
        })
      );
      setLoanState('nová');
      setLoanEndDate('');
      dispatch(updateRootState({ isLoanOpen: false }));
    } else {
      alert('Vyplňte všechny povinné údaje.');
    }
  };

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
    dispatch(updateRootState({ isLoanOpen: false }));
  };

  const closeModal = (e: MouseEvent) => {
    e.stopPropagation();
    setLoanState('nová');
    setLoanEndDate('');
    dispatch(updateRootState({ isLoanOpen: false }));
  };

  return (
    <div
      style={{
        display: rootState.isLoanOpen ? 'flex' : 'none',
      }}
      className="modal__overlay"
    >
      <form className="modal__form">
        {shouldLoanOpen ? (
          <>
            <header>Přidání zápůjčky</header>
            <div className="modal__inputs__body">
              <div className="modal__input--wrapper">
                <label htmlFor="loanState">Stav *</label>
                <select
                  id="loanState"
                  value={loanState}
                  onChange={(e) => setLoanState(e.target.value)}
                >
                  <option value="nová">Nová</option>
                  <option value="v přípravě">V přípravě</option>
                  <option value="hotová">Hotová</option>
                </select>
              </div>
              <div className="modal__input--wrapper">
                <label htmlFor="loanStartDate">Začátek zápůjčky *</label>
                <input
                  type="date"
                  id="loanStartDate"
                  value={rootState.startDate}
                  disabled
                />
              </div>
              <div className="modal__input--wrapper">
                <label htmlFor="loanEndDate">Konec zápůjčky *</label>
                <input
                  type="date"
                  id="loanEndDate"
                  value={loanEndDate}
                  onChange={(e) => setLoanEndDate(e.target.value)}
                />
              </div>
            </div>
            <div className="modal__buttons--wraper">
              <button
                type="button"
                className="modal__button--add"
                onClick={(e) => handleAddLoan(e)}
              >
                Přidat zápůjčku
              </button>
              <button
                type="button"
                className="modal__button--cancel"
                onClick={(e) => closeModal(e)}
              >
                Zrušit
              </button>
            </div>
          </>
        ) : (
          <>
            <header>Úprava zápůjčky {rootState.loanId}</header>
            <div className="modal__inputs__body">
              <div className="modal__input--wrapper">
                <label htmlFor="parentId">Stav zápůjčky</label>
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
                Upravit zápůjčku
              </button>
              <button
                type="button"
                className="modal__button--cancel"
                onClick={(e) => closeModal(e)}
              >
                Zrušit
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};
