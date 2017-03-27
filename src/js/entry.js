//app entrypoint
"use strict";

//REACT
import React from "react";
import ReactDom from "react-dom";

import JsonViewer from './components/JsonViewer';

const app = document.getElementById('app-container');


let test_json = {
    test: 'this is a test string',
    sibling: 'sibling_string',
    another_sibling: 45,
    basic_array: [1, 2, 3],
    how_will_array_do: [1, 2, 3, 'test'],
    how_will_floats_do: -2.757,
    parent: {
        sibling1: true,
        sibling2: false,
        "sibling2.5": ['first', {'second': true}, [4, 5, 'sixth']],
        sibling3: null,
        sibling4: 'test',
        'last-sibling': {
            grand_child: NaN,
            'grand-child-func': (a) => {
                let b = a*a;
                return a.push(b);
            }
        }
    },
    number: 1234
};

ReactDom.render(
    <div class="app-entry">
        <JsonViewer src={test_json} />
    </div>,
    app
);
