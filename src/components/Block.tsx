import {HTMLAttributes, DetailedHTMLProps, FC, useRef, useEffect} from "react"
import classes from "../css/App.module.css"
import {animated, useSpring} from "@react-spring/web"

export const Block: FC<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = (props) => {
    const blockRef = useRef<HTMLDivElement>(null)
    const [styles, api] = useSpring(() => ({
        top: blockRef.current?.offsetTop,
        left: blockRef.current?.offsetLeft
    }))

    useEffect(() => {
        if (!blockRef.current) return
        api.start({
            top: blockRef.current.offsetTop,
            left: blockRef.current.offsetLeft
        })
    })
    return (<>
        <div {...props} ref={blockRef} className={classes.dataBlock}/>
        <animated.div className={classes.visibleBlock} style={{...styles}}/>
    </>)
}