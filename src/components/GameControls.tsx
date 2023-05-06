import { FLEX_PROPERTIES } from 'constants/flexProperties';
import { useState } from 'react';
import classes from '../css/App.module.css';
import { animated, config, useTransition } from '@react-spring/web';

export const GameControls = () => {
  const [selectedFlexProp, setSelectedFlexProp] =
    useState<keyof (typeof FLEX_PROPERTIES)['parent']>('flexDirection');
  const flexProps = Object.keys(FLEX_PROPERTIES.parent[selectedFlexProp]).map(
    (key) => ({
      id: key + selectedFlexProp,
      value: key,
    })
  );
  const transitions = useTransition(flexProps, {
    keys: (item) => item.id,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { scale: 0, opacity: 0, config: { clamp: true } },
    exitBeforeEnter: true,
    config: config.wobbly,
  });

  return (
    <div className={classes.gameControlsContainer}>
      <div className={classes.flexPropertyValueBtnContainer}>
        {transitions((style, item) => (
          <animated.button style={style}>
            <p className={classes.flexPropertyValueText}>{item.value}</p>
          </animated.button>
        ))}
      </div>
      <div className={classes.flexPropertyBtnContainer}>
        {(
          Object.keys(FLEX_PROPERTIES.parent) as unknown as Array<
            keyof (typeof FLEX_PROPERTIES)['parent']
          >
        ).map((flexProp) => {
          return (
            <button
              className={selectedFlexProp === flexProp ? classes.selected : ''}
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
