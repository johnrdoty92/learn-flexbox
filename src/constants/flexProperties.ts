import { Property, Globals, StandardLonghandProperties } from 'csstype';

type GetNonGlobalProps<T extends string | number | symbol> = {
    [P in Exclude<T, Globals>]: P;
};

// TODO: CHILD FLEX STATE
// Flex
// FlexBasis
// FlexGrow
// FlexShrink
// AlignSelf
// JustifySelf

// TODO: type FlexFlow = GetNonGlobalProps<Property.FlexFlow> // shorthand for flexDirection and flexWrap
// TODO: type AlignContent = GetNonGlobalProps<Property.AlignContent> // only works where flex wrap is set
// type FlexDirection = GetNonGlobalProps<Property.FlexDirection>;
// type FlexWrap = GetNonGlobalProps<Property.FlexWrap>;
// type JustifyContent = GetNonGlobalProps<Property.JustifyContent>;
// type AlignItems = GetNonGlobalProps<Property.AlignItems>;

type FlexProperties = {
    parent: {
        [P in keyof StandardLonghandProperties]: GetNonGlobalProps<
            NonNullable<StandardLonghandProperties[P]>
        >;
    };
};

export const FLEX_PROPERTIES = {
    parent: {
        flexDirection: {
            column: 'column',
            'column-reverse': 'column-reverse',
            row: 'row',
            'row-reverse': 'row-reverse',
        },
        flexWrap: {
            nowrap: 'nowrap',
            wrap: 'wrap',
            'wrap-reverse': 'wrap-reverse',
        },
        justifyContent: {
            left: 'left',
            right: 'right',
            'space-around': 'space-around',
            'space-between': 'space-between',
            'space-evenly': 'space-evenly',
            stretch: 'stretch',
            center: 'center',
            end: 'end',
            'flex-end': 'flex-end',
            'flex-start': 'flex-start',
            start: 'start',
        },
        alignItems: {
            stretch: 'stretch',
            center: 'center',
            end: 'end',
            'flex-end': 'flex-end',
            'flex-start': 'flex-start',
            start: 'start',
            normal: 'normal',
            'self-end': 'self-end',
            'self-start': 'self-start',
            baseline: 'baseline',
        },
    },
    // TODO: child: {},
} as const satisfies FlexProperties;

export type ParentFlexPayload = {
    flexDirection: Property.FlexDirection;
    flexWrap: Property.FlexWrap;
    justifyContent: Property.JustifyContent;
    alignItems: Property.AlignItems;
};

// TODO: need a predicate for isValidParentFlexKey and isValidFlexPropertyValue
