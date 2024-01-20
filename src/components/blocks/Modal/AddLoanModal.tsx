import React, { useState, MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/base';
import { useDispatch } from 'react-redux';
import { updateRootState } from '../../../store/slices/rootStates';
import { addLoan } from '../../../store/slices/loans';
import { v4 as uuidv4 } from 'uuid';
import './modal.scss';

export const AddLoanModal: React.FC = () => {
  const dispatch = useDispatch();
  const uuid = uuidv4();
  const rootState = useSelector((state: RootState) => state.rootState);
  const [loanState, setLoanState] = useState<string>('nová');
  const [loanEndDate, setLoanEndDate] = useState<string>('');

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
      dispatch(updateRootState({ isAddLoanOpen: false }));
    } else {
      alert('Vyplňte všechny povinné údaje.');
    }
  };

  const closeModal = (e: MouseEvent) => {
    e.stopPropagation();
    setLoanState('nová');
    setLoanEndDate('');
    dispatch(updateRootState({ isAddLoanOpen: false }));
  };

  return (
    <div
      style={{
        display: rootState.isAddLoanOpen ? 'flex' : 'none',
      }}
      className="modal__overlay"
    >
      <form className="modal__form">
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
      </form>
    </div>
  );
};
