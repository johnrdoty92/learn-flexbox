import { FLEX_PROPERTIES } from 'constants/flexProperties';
import { useState } from 'react';
import classes from '../css/App.module.css';

export const GameControls = () => {
  const [selectedFlexProp, setSelectedFlexProp] =
    useState<keyof (typeof FLEX_PROPERTIES)['parent']>('flexDirection');

  return (
    <div className={classes.gameControlsContainer}>
      <div className={classes.navTabOptionsGroup}>
        {Object.keys(FLEX_PROPERTIES['parent'][selectedFlexProp]).map(
          (flexValue) => {
            return (
              <button key={`${selectedFlexProp}-${flexValue}`}>
                {flexValue}
              </button>
            );
          }
        )}
      </div>
      <div className={classes.navTabGroup}>
        {(
          Object.keys(FLEX_PROPERTIES.parent) as unknown as Array<
            keyof (typeof FLEX_PROPERTIES)['parent']
          >
        ).map((flexProp) => {
          return (
            <button
              className={
                selectedFlexProp === flexProp ? classes.tab1Selected : ''
              }
              key={flexProp}
              onClick={() => setSelectedFlexProp(flexProp)}
            >
              {flexProp}
            </button>
          );
        })}
      </div>
    </div>
  );
};
