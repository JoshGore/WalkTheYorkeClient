import React, { useState, useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import loadable from '@loadable/component';
import MenuContainer from './app/menu/MenuContainer';
import TrailContext, { TrailContextProps } from '../contexts/TrailContext';
import CornerMenu from './CornerMenu';
import NewPointMenu from './app/NewPointMenu';
import MenuBreadcrumbs from './app/MenuBreadcrumbs';
import SelectionDetailQueryManager from './app/SelectionDetailQueryManager';

const SignupLogin = loadable(() => import('./SignupLogin'));
const Map = loadable(() => import('./app/Map'));

interface LoadingOrTextProps {
  loading: boolean;
  text: string | undefined;
}

const USER_POINT_TYPES_QUERY = gql`
  {
    types_by_pk(id: 15) {
      types {
        name
        id
        types {
          name
          id
        }
      }
    }
  }
`;

const App: React.FC = () => {
  const { loading: userPointTypesLoading, data: userPointTypes } = useQuery(
    USER_POINT_TYPES_QUERY,
  );
  const TrailSelections = useContext<TrailContextProps>(TrailContext);
  const handleHomeLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    TrailSelections.setTrailSection({ ...TrailSelections.trail });
  };
  const getCurrentSelectionName = () =>
    TrailSelections.trailSection.type === 'trail' ||
    TrailSelections.trailSection.type === undefined
      ? undefined
      : TrailSelections.trailSection.shortName;
  const [newPointCategoryTypeIds, setNewPointCategoryTypeIds] = useState<{
    parentTypeId: number | undefined;
    typeId: number | undefined;
  }>({ parentTypeId: undefined, typeId: undefined });

  return (
    <MenuContainer
      header={
        <MenuBreadcrumbs
          currentSelectionIfNotHome={getCurrentSelectionName()}
          handleHomeLinkClick={handleHomeLinkClick}
        />
      }
      body={
        TrailSelections.newTrailPoint.type === undefined ? (
          <SelectionDetailQueryManager
            type={
              TrailSelections.trailObject.type !== undefined
                ? TrailSelections.trailObject.type
                : TrailSelections.trailSection.type!
            }
            id={
              TrailSelections.trailObject.id !== undefined
                ? TrailSelections.trailObject.id
                : TrailSelections.trailSection.id!
            }
          />
        ) : (
          <NewPointMenu
            newPointCategoryTypeIds={newPointCategoryTypeIds}
            setNewPointCategoryTypeIds={setNewPointCategoryTypeIds}
            userPointTypes={userPointTypes}
            userPointTypesLoading={userPointTypesLoading}
          />
        )
      }
      mainContent={
        <>
          <SignupLogin />
          <CornerMenu
            newPointCategoryTypeIds={newPointCategoryTypeIds}
            setNewPointCategoryTypeIds={setNewPointCategoryTypeIds}
            userPointTypes={userPointTypes}
            userPointTypesLoading={userPointTypesLoading}
          />
          <Map />
        </>
      }
    />
  );
};

export default App;
