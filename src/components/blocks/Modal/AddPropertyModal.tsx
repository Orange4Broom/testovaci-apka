import React, { MouseEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { RootState } from '../../../store/base';
import { getSortedProperties } from '../../../utils/property';

import { updateRootState } from '../../../store/slices/rootStates';
import { addProperty } from '../../../store/slices/properties';

import { Property } from '../../../typings/property';

import './modal.scss';

export const AddPropertyModal: React.FC = () => {
  const dispatch = useDispatch();

  const [parentId, setParentId] = useState<string>('');
  const [propertyId, setPropertyId] = useState<string>('');
  const [propertyName, setPropertyName] = useState<string>('');

  const rootState = useSelector((state: RootState) => state.rootState);
  const { properties } = useSelector((state: RootState) => state.properties);
  const { openedProperties } = useSelector(
    (state: RootState) => state.rootState
  );

  const handleAddProperty = (e: MouseEvent) => {
    e.stopPropagation();
    if (propertyId && propertyName) {
      dispatch(
        addProperty({
          id: propertyId,
          name: propertyName,
          parent_id: parentId ? parentId : null,
        })
      );
      setParentId('');
      setPropertyId('');
      setPropertyName('');
      dispatch(
        updateRootState({
          isAddPropertyOpen: false,
          openedProperties: !parentId
            ? [...openedProperties, propertyId]
            : openedProperties,
        })
      );
    } else {
      alert('Vyplňte všechny povinné údaje.');
    }
  };

  const closeModal = (e: MouseEvent) => {
    e.stopPropagation();
    setParentId('');
    setPropertyId('');
    setPropertyName('');
    dispatch(updateRootState({ isAddPropertyOpen: false }));
  };

  return (
    <div
      style={{
        display: rootState.isAddPropertyOpen ? 'flex' : 'none',
      }}
      className="modal__overlay"
      onClick={(e) => closeModal(e)}
    >
      <form
        className="modal__form"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <header>Přidání položky</header>
        <div className="modal__inputs__body">
          <div className="modal__input--wrapper">
            <label htmlFor="parentId">Id rodičovské položky</label>
            <select
              id="parentId"
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
            >
              {getSortedProperties(properties).map((property: Property) => (
                <option key={property.id} value={property.id}>
                  {property.id}
                </option>
              ))}
            </select>
          </div>
          <div className="modal__input--wrapper">
            <label htmlFor="propertyId">Id položky *</label>
            <input
              type="text"
              id="propertyId"
              placeholder="AS37"
              value={propertyId}
              onChange={(e) => setPropertyId(e.target.value)}
            />
          </div>
          <div className="modal__input--wrapper">
            <label htmlFor="propertyName">Název položky *</label>
            <input
              type="text"
              id="propertyName"
              placeholder="Bagr"
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
            />
          </div>
        </div>
        <div className="modal__buttons--wraper">
          <button
            type="button"
            className="modal__button--add"
            onClick={(e) => handleAddProperty(e)}
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
