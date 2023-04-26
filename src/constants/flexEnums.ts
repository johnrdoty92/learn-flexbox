import { CSSProperties } from "react";

const _FlexProperties = {
    flexDirection: 'flexDirection',
    justifyContent: 'justifyContent',
    alignItems: 'alignItems',
} as const;

type Actions = keyof typeof _FlexProperties

type FLEX_PROPERTIES = Readonly<{
    [Key in Actions]: {
        [Value in NonNullable<CSSProperties[Key]>]: Value
    }
}>

export const FlexProperties: FLEX_PROPERTIES = {
    flexDirection: {
        "-moz-initial": "-moz-initial",
        column: "column",
        "column-reverse": "column-reverse",
        inherit: "inherit",
        initial: "initial",
        revert: "revert",
        "revert-layer": "revert-layer",
        row: "row",
        "row-reverse": "row-reverse",
        unset: "unset"
    },
    alignItems: {
        baseline: "baseline",
        center: "center",
        end: "end",
        initial: "initial",
        inherit: "inherit",
        normal: "normal",
        revert: "revert",
        start: "start",
        stretch: "stretch",
        unset: "unset",
        "flex-end": "flex-end",
        "flex-start": "flex-start",
        "self-end": "self-end",
        "self-start": "self-start",
    },
    justifyContent: {
        left: "left",
        right: "right",
        "space-around": "space-around",
        "space-evenly": "space-evenly",
        "space-between": "space-between",
        center: "center",
        end: "end",
        initial: "initial",
        inherit: "inherit",
        normal: "normal",
        revert: "revert",
        start: "start",
        stretch: "stretch",
        unset: "unset",
        "flex-end": "flex-end",
        "flex-start": "flex-start",
    }
} as const