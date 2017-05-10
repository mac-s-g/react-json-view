import {rjv_default, rjv_grey} from './base16/rjv-themes';
import styleConstants from './styleConstants';
import {createStyling} from 'react-base16-styling';

const colorMap = theme => ({
    backgroundColor: theme.base00,
    elipsisColor: theme.base09,
    braceColor: theme.base07,
    expandedIcon: theme.base0D,
    collapsedIcon: theme.base0E,
    keyColor: theme.base07,
    arrayKeyColor: theme.base0C,
    objectSize: theme.base04,
    copyToClipboard: theme.base0F,
    objectBorder: theme.base02,
    dataTypes: {
        boolean: theme.base0E,
        float: theme.base09,
        function: theme.base0D,
        integer: theme.base0B,
        string: theme.base0F,
        nan: theme.base08,
        null: theme.base0A,
        background: theme.base02
    }
});

const getDefaultThemeStyling = (theme, args) => {
    const colors = colorMap(theme);

    return {
        'app-container': {
            fontFamily: styleConstants.globalFontFamily,
            cursor: styleConstants.globalCursor,
            backgroundColor: colors.backgroundColor
        },
        'elipsis': {
            display: 'inline-block',
            color: colors.elipsisColor,
            fontSize: styleConstants.elipsisFontSize,
            lineHeight: styleConstants.elipsisLineHeight,
            cursor: styleConstants.elipsisCursor
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
        'object-name': {
            display: 'inline-block',
            color: colors.keyColor,
            letterSpacing: styleConstants.keyLetterSpacing,
            padding: styleConstants.keyPadding,
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
            padding: styleConstants.keyPadding,
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
            fontStyle: styleConstants.objectSizeFontStyle
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
        'copy-to-clipboard': {
            color: colors.copyToClipboard,
            cursor: styleConstants.clipboardCursor,
            margin: styleConstants.clipboardMargin
        },
        'object-meta-data': {
            display: 'inline-block',
            padding: styleConstants.metaDataPadding
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