import Draggable from 'react-draggable';
import { Actions, useBlockContext } from '../contexts/BlockContext';
import { FormEventHandler, useRef } from 'react';
import classes from '../css/App.module.css';
import { FLEX_PROPERTIES } from 'constants/flexProperties';

export const DevControls = () => {
    const { dispatch } = useBlockContext();
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
                {Object.entries(FLEX_PROPERTIES.parent).map(
                    ([property, values]) => (
                        <div className={classes.flexGroup} key={property}>
                            <p>{property}</p>
                            <div className={classes.radioButtons}>
                                {Object.keys(values).map((value, i) => (
                                    <label key={`${property}${value}`}>
                                        <input
                                            type="radio"
                                            value={value}
                                            name={property}
                                            defaultChecked={i === 0}
                                        />
                                        {value}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )
                )}
                {/* {Object.entries(FlexProperties).map(([property, values]) => (
                    <Fragment key={property}>
                        <p>{property}</p>
                        {Object.values(values).map((value, i) => (
                            <label key={`${property}${value}`}>
                                <input
                                    type="radio"
                                    value={value}
                                    name={property}
                                    defaultChecked={i === 0}
                                />
                                {value}
                            </label>
                        ))}
                    </Fragment>
                ))} */}
            </form>
        </Draggable>
    );
};
