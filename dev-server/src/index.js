'use strict';

//import react and reactDom for browser rendering
import React from 'react';
import ReactDom from 'react-dom';

import Moment from 'moment';

//import the react-json-view component (installed with npm)
import JsonViewer from './../../src/js/index';

//render 2 different examples of the react-json-view component
ReactDom.render(
    <div>
        {/* just pass in your JSON to the src attribute */}
        <JsonViewer
            sortKeys={false}
            style={{ padding: '30px', backgroundColor: 'white' }}
            src={getExampleJson1()}
            collapseStringsAfterLength={45}
            onEdit={e => {
                if (e.new_value == 'error') {
                    return false;
                }
            }}
            onDelete={e => {
                console.log('delete callback', e);
            }}
            onAdd={e => {
                if (e.new_value == 'error') {
                    return false;
                }
            }}
            onSelect={e => {
                console.log('select callback', e);
            }}
            displayObjectSize={false}
            name={'dev-server'}
            enableClipboard={false}
            shouldCollapse={({ src, namespace, type }) => {
                if (type === 'array' && src.indexOf('test') > -1) {
                    return true;
                } else if (namespace.indexOf('moment') > -1) {
                    return true;
                }
                return false;
            }}
            defaultValue=""
            displayDataTypes={false}
            displaySearch={true}
        />

    </div>,
    document.getElementById('app-container')
);

/*-------------------------------------------------------------------------*/
/*     the following functions just contain test json data for display     */
/*-------------------------------------------------------------------------*/

//just a function to get an example JSON object
function getExampleJson1() {
    return {
        string: 'this is a test string',
        integer: 42,
        empty_array: [],
        empty_object: {},
        array: [1, 2, 3, 'test'],
        float: -2.757,
        undefined_var: undefined,
        parent: {
            sibling1: true,
            sibling2: false,
            sibling3: null,
            isString: value => {
                if (typeof value === 'string') {
                    return 'string';
                } else {
                    return 'other';
                }
            }
        },
        string_number: '#ffffff',
        string_numbershort: '#ccc',
        string_numberrgb: 'rgb(255,125,0)',
        string_numberrgb2: 'rgb(0, 0, 0)',
        string_numberrgba: [
            'rgba(0, 0, 0, .2)',
            'rgba(125, 255, 0, .66)'
        ],
        string_numberrgba2: 'rgba(0,0,0,0.5)',
        string_number_hsl: 'hsl(180, 50%, 50%)',
        string_number_hsla: 'hsla(170, 45%, 45%, 1)',
        date: new Date(),
        moment: Moment(),
        regexp: /[0-9]/gi,
        testObj: {
            'testString': 'Tree',
            'objectInside': {
                'Multilevel': {
                    'deepNested': true
                }
            }
        }
    };
}