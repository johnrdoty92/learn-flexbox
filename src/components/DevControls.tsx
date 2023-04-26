import Draggable from "react-draggable"
import { Actions, useBlockContext } from "../contexts/BlockContext"
import { FormEventHandler, Fragment, useRef } from "react"
import classes from "../css/App.module.css"
import { FlexProperties } from "constants/flexEnums"

export const DevControls = () => {
    const {dispatch} = useBlockContext()
    const nodeRef = useRef<null | HTMLFormElement>(null)

    const handleChange: FormEventHandler<HTMLFormElement> = ({target}) => {
        if (target instanceof HTMLInputElement) {
            // TODO: type this better
            dispatch({action: target.name, value: target.value})
        }
    }

    return (
        <Draggable nodeRef={nodeRef}>
            <form
                ref={nodeRef}
                className={classes.devControls}
                onChange={handleChange}
            >
                {Object.entries(FlexProperties).map(([property, values]) => (
                    <Fragment key={property}>
                        <p>{property}</p>
                        {Object.values(values).map((value, i) => (
                            <label key={`${property}${value}`}>
                                <input type="radio" value={value} name={property} defaultChecked={i === 0}/>
                                {value}
                            </label>
                        ))}
                    </Fragment>
                ))}

                {/* <p>flex-direction</p>
                <label>
                    <input type="radio" value="row" name={Actions.FLEX_DIRECTION} defaultChecked/>
                    Row
                </label>
                <label>
                    <input type="radio" value="column" name={Actions.FLEX_DIRECTION}/>
                    Column
                </label>

                <p>justify-content</p>
                <label>
                    <input type="radio" value="" name="" defaultChecked/>
                    Value
                </label>

                <p>align-items</p>
                <label>
                    <input type="radio" value="" name="" defaultChecked/>
                    Value
                </label> */}
            </form>
        </Draggable>
    )
}