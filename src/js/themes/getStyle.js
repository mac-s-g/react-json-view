import {rjv_default, rjv_grey} from './base16/rjv-themes';
import styleConstants from './styleConstants';
import {createStyling} from 'react-base16-styling';

const colorMap = theme => ({
    backgroundColor: theme.base00,
    ellipsisColor: theme.base09,
    braceColor: theme.base07,
    expandedIcon: theme.base0D,
    collapsedIcon: theme.base0E,
    keyColor: theme.base07,
    arrayKeyColor: theme.base0C,
    objectSize: theme.base04,
    copyToClipboard: theme.base0F,
    objectBorder: theme.base02,
    editVariable: {
        editIcon: theme.base0E,
        cancelIcon: theme.base09,
        removeIcon: theme.base09,
        addIcon: theme.base0E,
        checkIcon: theme.base0E,
        background: theme.base01,
        color: theme.base0A,
        border: theme.base07
    },
    dataTypes: {
        boolean: theme.base0E,
        date: theme.base0D,
        float: theme.base0B,
        function: theme.base0D,
        integer: theme.base0F,
        string: theme.base09,
        nan: theme.base08,
        null: theme.base0A,
        undefined: theme.base05,
        background: theme.base02
    }
});

const getDefaultThemeStyling = theme => {
    const colors = colorMap(theme);

    return {
        'app-container': {
            fontFamily: styleConstants.globalFontFamily,
            cursor: styleConstants.globalCursor,
            backgroundColor: colors.backgroundColor
        },
        'ellipsis': {
            display: 'inline-block',
            color: colors.ellipsisColor,
            fontSize: styleConstants.ellipsisFontSize,
            lineHeight: styleConstants.ellipsisLineHeight,
            cursor: styleConstants.ellipsisCursor
        },
        'brace-row': {
            display: 'inline-block',
            cursor: 'pointer'
        },
        'brace': {
            display: 'inline-block',
            cursor: styleConstants.braceCursor,
            fontWeight: styleConstants.braceFontWeight,
            color: colors.braceColor,
        },
        'expanded-icon': {
            color: colors.expandedIcon
        },
        'collapsed-icon': {
            color: colors.collapsedIcon
        },
        'colon': {
            display: 'inline-block',
            margin: styleConstants.keyMargin,
            color: colors.keyColor
        },
        objectKeyVal: (component, paddingLeft) => {
            return {style: {
                paddingLeft: paddingLeft + 'px',
                paddingTop: styleConstants.keyValPaddingTop,
                paddingRight: styleConstants.keyValPaddingRight,
                paddingBottom: styleConstants.keyValPaddingBottom,
                borderLeft: styleConstants.keyValBorderLeft
                    + ' ' + colors.objectBorder,
                ':hover': {
                    paddingLeft: (paddingLeft - 1)  + 'px',
                    borderLeft: styleConstants.keyValBorderHover
                        + ' ' + colors.objectBorder
                }
            }};
        },
        'object-key-val-no-border': {
            padding: styleConstants.keyValPadding
        },
        'pushed-content': {
            marginLeft: styleConstants.pushedContentMarginLeft
        },
        'variable-value': {
            display: 'inline-block',
            paddingRight: styleConstants.variableValuePaddingRight,
            position: 'relative'
        },
        'object-name': {
            display: 'inline-block',
            color: colors.keyColor,
            letterSpacing: styleConstants.keyLetterSpacing,
            fontStyle: styleConstants.keyFontStyle,
            verticalAlign: styleConstants.keyVerticalAlign,
            opacity: styleConstants.keyOpacity,
            ':hover': {
                opacity: styleConstants.keyOpacityHover
            }
        },
        'array-key': {
            display: 'inline-block',
            color: colors.arrayKeyColor,
            letterSpacing: styleConstants.keyLetterSpacing,
            fontStyle: styleConstants.keyFontStyle,
            verticalAlign: styleConstants.keyVerticalAlign,
            opacity: styleConstants.keyOpacity,
            ':hover': {
                opacity: styleConstants.keyOpacityHover
            }
        },
        'object-size': {
            color: colors.objectSize,
            borderRadius: styleConstants.objectSizeBorderRadius,
            fontStyle: styleConstants.objectSizeFontStyle,
            margin: styleConstants.objectSizeMargin
        },
        'data-type-label': {
            fontSize: styleConstants.dataTypeFontSize,
            marginRight: styleConstants.dataTypeMarginRight,
            opacity: styleConstants.datatypeOpacity
        },
        'boolean': {
            display: 'inline-block',
            color: colors.dataTypes.boolean
        },
        'date': {
            display: 'inline-block',
            color: colors.dataTypes.date
        },
        'date-value': {
            marginLeft: styleConstants.dateValueMarginLeft
        },
        'float': {
            display: 'inline-block',
            color: colors.dataTypes.float
        },
        'function': {
            display: 'inline-block',
            color: colors.dataTypes['function'],
            whiteSpace: 'pre-line'
        },
        'integer': {
            display: 'inline-block',
            color: colors.dataTypes.integer
        },
        'string': {
            display: 'inline-block',
            color: colors.dataTypes.string
        },
        'nan': {
            display: 'inline-block',
            color: colors.dataTypes.nan,
            fontSize: styleConstants.nanFontSize,
            fontWeight: styleConstants.nanFontWeight,
            backgroundColor: colors.dataTypes.background,
            padding: styleConstants.nanPadding,
            borderRadius: styleConstants.nanBorderRadius
        },
        null: {
            display: 'inline-block',
            color: colors.dataTypes.null,
            fontSize: styleConstants.nullFontSize,
            fontWeight: styleConstants.nullFontWeight,
            backgroundColor: colors.dataTypes.background,
            padding: styleConstants.nullPadding,
            borderRadius: styleConstants.nullBorderRadius
        },
        undefined: {
            display: 'inline-block',
            color: colors.dataTypes.undefined,
            fontSize: styleConstants.undefinedFontSize,
            padding: styleConstants.undefinedPadding,
            borderRadius: styleConstants.undefinedBorderRadius,
            backgroundColor: colors.dataTypes.background,
        },
        'copy-to-clipboard': {
            cursor: styleConstants.clipboardCursor
        },
        'copy-icon': {
            color: colors.copyToClipboard,
            fontSize: styleConstants.iconFontSize,
            marginRight: styleConstants.iconMarginRight,
            verticalAlign: 'top',
        },
        'object-meta-data': {
            display: 'inline-block',
            padding: styleConstants.metaDataPadding
        },
        'icon-container': {
            display: 'inline-block',
            width: styleConstants.iconContainerWidth
        },
        'tooltip': {
            padding: styleConstants.tooltipPadding
        },
        removeVarIcon: (component, hover) => {
            let style = {
                verticalAlign: 'top',
                display: 'none',
                color: colors.editVariable.removeIcon,
                cursor: styleConstants.iconCursor,
                fontSize: styleConstants.iconFontSize,
                marginRight: styleConstants.iconMarginRight
            };
            if (hover) {
                style.display = 'inline-block';
            }
            return {style: style};
        },
        addVarIcon: (component, hover) => {
            let style = {
                verticalAlign: 'top',
                display: 'none',
                color: colors.editVariable.addIcon,
                cursor: styleConstants.iconCursor,
                fontSize: styleConstants.iconFontSize,
                marginRight: styleConstants.iconMarginRight
            };
            if (hover) {
                style.display = 'inline-block';
            }
            return {style: style};
        },
        editVarIcon: (component, hover) => {
            let style = {
                verticalAlign: 'top',
                display: 'none',
                color: colors.editVariable.editIcon,
                cursor: styleConstants.iconCursor,
                fontSize: styleConstants.iconFontSize,
                marginRight: styleConstants.iconMarginRight
            };
            if (hover) {
                style.display = 'inline-block';
            }
            return {style: style};
        },
        'edit-icon-container': {
            display: 'inline-block',
            verticalAlign: 'top'
        },
        'check-icon': {
            display: 'inline-block',
            cursor: styleConstants.iconCursor,
            color: colors.editVariable.checkIcon,
            fontSize: styleConstants.iconFontSize,
            paddingRight: styleConstants.iconPaddingRight
        },
        'cancel-icon': {
            display: 'inline-block',
            cursor: styleConstants.iconCursor,
            color: colors.editVariable.cancelIcon,
            fontSize: styleConstants.iconFontSize,
            paddingRight: styleConstants.iconPaddingRight,
        },
        'edit-input': {
            display: 'inline-block',
            minHeight: styleConstants.editInputHeight,
            minWidth: styleConstants.editInputMinWidth,
            borderRadius: styleConstants.editInputBorderRadius,
            backgroundColor: colors.editVariable.background,
            color: colors.editVariable.color,
            padding: styleConstants.editInputPadding,
            marginRight: styleConstants.editInputMarginRight,
            // border: '1px solid ' + colors.editVariable.border,
            fontFamily: styleConstants.editInputFontFamily,
        },
        'detected-row': {
            paddingTop: styleConstants.detectedRowPaddingTop,
        }
    }
};

const getStyle = (theme) => {
    let rjv_theme = rjv_default;
    if (theme === false || theme === 'none') {
        rjv_theme = rjv_grey;
    }

    return createStyling(
        getDefaultThemeStyling,
        {defaultBase16: rjv_theme}
    )(theme);
}

export default function style(theme, component, args) {
    if (!theme) {
        console.error('theme has not been set')
    }

    return getStyle(theme)(component, args);
}