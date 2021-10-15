//returns a string "type" of input object
export function toType(obj) {
    let type = getType(obj);
    // some extra disambiguation for numbers
    if (type === 'number') {
        if (isNaN(obj)) {
            type = 'nan';
        } else if ((obj | 0) != obj) {
            //bitwise OR produces integers
            type = 'float';
        } else {
            type = 'integer';
        }
    }
    return type;
}

//source: http://stackoverflow.com/questions/7390426/better-way-to-get-type-of-a-javascript-variable/7390612#7390612
function getType(obj) {
    return {}.toString
        .call(obj)
        .match(/\s([a-zA-Z]+)/)[1]
        .toLowerCase();
}

//validation for base-16 themes
export function isTheme(theme) {
    const theme_keys = [
        'base00',
        'base01',
        'base02',
        'base03',
        'base04',
        'base05',
        'base06',
        'base07',
        'base08',
        'base09',
        'base0A',
        'base0B',
        'base0C',
        'base0D',
        'base0E',
        'base0F'
    ];
    if (toType(theme) === 'object') {
        for (var i = 0; i < theme_keys.length; i++) {
            if (!(theme_keys[i] in theme)) {
                return false;
            }
        }
        return true;
    }
    return false;
}

export function handleObjectKeyKeyDown(type, e, isExpanded, onToggleCollapsed) {
    const wrapper = document.querySelector('.react-json-view');
    const target = e.target;

    function focusOn(which) {
        const elements = Array.from(wrapper.querySelectorAll('[tabindex="0"]'));
        const index = elements.findIndex(curr => curr === target);
        if (which === 'next' && index < elements.length - 1) {
            elements[index + 1].focus();
        }
        if (which === 'previous' && index > 0) {
            elements[index - 1].focus();
        }
    }

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        e.stopPropagation();

        focusOn('next');
    }

    if (e.key === 'ArrowUp') {
        e.preventDefault();
        e.stopPropagation();

        focusOn('previous');
    }

    if (e.key === 'ArrowRight') {
        e.preventDefault();
        e.stopPropagation();

        if (
            target.classList.contains('object-key') ||
            target.classList.contains('array-key')
        ) {
            if (!isExpanded) {
                if (onToggleCollapsed) {
                    onToggleCollapsed();
                }
            } else {
                focusOn('next');
            }
        }
    }

    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        e.stopPropagation();

        if (isExpanded && onToggleCollapsed) {
            onToggleCollapsed();
        } else {
            console.log('here', type);
            if (type === 'array-variable') {
                target
                    .closest('.object-key-val')
                    .querySelector('.object-key')
                    .focus();
            }

            if (type === 'variable') {
                target
                    .closest('.object-key-val')
                    .querySelector('.object-key, .array-key')
                    .focus();
            }

            if (type === 'object-name') {
                const closestObject = target
                    .closest('.object-key-val')
                    .parentElement.closest('.object-key-val');

                if (closestObject) {
                    closestObject
                        .querySelector('.object-key, .array-key')
                        .focus();
                }
            }
        }
    }
}
