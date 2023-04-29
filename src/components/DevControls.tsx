import Draggable from 'react-draggable';
import { Actions, useBlockContext } from '../contexts/BlockContext';
import { FormEventHandler, useRef } from 'react';
import classes from '../css/App.module.css';
import { FLEX_PROPERTIES } from 'constants/flexProperties';

export const DevControls = () => {
  const { dispatch, state } = useBlockContext();
  const nodeRef = useRef<null | HTMLFormElement>(null);

  const handleChange: FormEventHandler<HTMLFormElement> = ({ target }) => {
    if (target instanceof HTMLInputElement) {
      const { name, value } = target;
      dispatch({ action: Actions.STYLE, value: { [name]: value } });
    }
  };

  return (
    <Draggable nodeRef={nodeRef}>
      <form
        ref={nodeRef}
        className={classes.devControls}
        onChange={handleChange}
      >
        {Object.entries(FLEX_PROPERTIES.parent).map(([property, values]) => (
          <div className={classes.flexGroup} key={property}>
            <p>{property}</p>
            <div className={classes.radioButtons}>
              {Object.keys(values).map((value) => (
                <label key={`${property}${value}`}>
                  <input
                    type="radio"
                    value={value}
                    name={property}
                    defaultChecked={
                      state.parent[property as keyof typeof state.parent] ===
                      value
                    }
                  />
                  {value}
                </label>
              ))}
            </div>
          </div>
        ))}
      </form>
    </Draggable>
  );
};
