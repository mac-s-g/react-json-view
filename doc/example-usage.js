
import ReactJson from 'react-json-view';

//you have some json to display
let my_important_data = {
    test: 'this is a test string',
    another_sibling: 45,
    basic_array: [1, 2, 3],
    how_will_floats_do: -2.757,
    parent: {
        sibling1: true,
        sibling2: false,
        sibling3: null,
        sibling4: 'test',
        'last-sibling': {
            grand_child: NaN,
            'grand-child-func': (a) => {
                let b = 5;
                return a.push(b);
            }
        }
    },
    number: 1234
}

//so put it on the page!
<ReactJson src={my_important_data} />


