//app entrypoint
"use strict";

//REACT
import React from "react";
import ReactDom from "react-dom";

const app = document.getElementById('app-container');

import PrettyJson from './components/PrettyJson';

ReactDom.render(
    <div class="app-entry">
        <PrettyJson src={

{
    test: 'this is a test string',
    sibling: 'sibling_string',
    another_sibling: 45,
    how_will_floats_do: -2.757,
    parent: {
        sibling1: true,
        sibling2: false,
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
}

        } />
    </div>,
    app
);
