import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { Icon } from '../Icon/Icon';
import { CalendarColumn } from './CalendarColumn';
import { RootState } from '../../../store/base';

import { Property } from '../../../typings/property';
import { DayInfo } from '../../../typings/date';
import { updateRootState } from '../../../store/slices/rootStates';

interface Props {
  property: Property;
  daysInfo: DayInfo[];
}

const CalendarRow: React.FC<Props> = React.memo(({ property, daysInfo }) => {
  const dispatch = useDispatch();
  const [isChildrensOpened, setIsChildrensOpened] = useState<boolean>(false);

  const { loans } = useSelector((state: RootState) => state.loans);
  const { properties } = useSelector((state: RootState) => state.properties);
  const { openedProperties } = useSelector(
    (state: RootState) => state.rootState
  );

  const filteredLoans = loans?.filter(
    (loan) => loan.propertyId === property.id
  );

  const cellHeight = daysInfo.map((day) => {
    const loansOnDay = filteredLoans?.filter((loan) => {
      return (
        new Date(loan.startDate).getTime() <=
          new Date(day.dateString).getTime() &&
        new Date(loan.endDate).getTime() >= new Date(day.dateString).getTime()
      );
    });

    return loansOnDay?.length || 0;
  });

  const maxCellHeight = Math.max(...cellHeight) * 34;

  const showPropertyChildrens = (propertyId: string) => {
    setIsChildrensOpened(true);
    const childrens = properties.filter(
      (property) => property.parent_id === propertyId
    );

    dispatch(
      updateRootState({
        openedProperties: [...openedProperties, ...childrens.map((p) => p.id)],
      })
    );
  };

  const hideAllPropertyChildrens = (propertyId: string) => {
    setIsChildrensOpened(false);
    const getChildren = (propertyId: string): Property[] => {
      return properties
        .filter((property) => property.parent_id === propertyId)
        .reduce((children: Property[], property: Property) => {
          return children.concat(property, ...getChildren(property.id));
        }, []);
    };

    const childrens = getChildren(propertyId);

    dispatch(
      updateRootState({
        openedProperties: openedProperties.filter(
          (openedProperty) =>
            !childrens.map((p) => p.id).includes(openedProperty)
        ),
      })
    );
  };

  const checkIfPropertyHaveChildrens = (propertyId: string): boolean => {
    return properties.some((property) => property.parent_id === propertyId);
  };

  return (
    <tr
      className="calendar-table-row"
      style={{
        height: maxCellHeight,
        display: openedProperties.includes(property.id) ? 'table-row' : 'none',
      }}
    >
      <td className="calendar-table-row__cell--short"></td>
      <td className="calendar-table-row__cell">{property.id}</td>
      <td className="calendar-table-row__cell--long">
        {checkIfPropertyHaveChildrens(property.id) ? (
          <>
            <button
              style={{ display: isChildrensOpened ? 'none' : 'initial' }}
              className="calendar-table-row__cell__button"
              onClick={() => showPropertyChildrens(property.id)}
            >
              <Icon name="plus" type="fas" color="" />
            </button>
            <button
              style={{ display: isChildrensOpened ? 'initial' : 'none' }}
              className="calendar-table-row__cell__button"
              onClick={() => hideAllPropertyChildrens(property.id)}
            >
              <Icon name="minus" type="fas" color="" />
            </button>
          </>
        ) : null}

        {property.name}
      </td>
      {daysInfo.map((day) => (
        <CalendarColumn
          key={day.dateString}
          dateString={day.dateString}
          property={property}
        />
      ))}
    </tr>
  );
});

CalendarRow.displayName = 'CalendarRow';

export { CalendarRow };
