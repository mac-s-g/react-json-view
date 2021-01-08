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
            sortKeys
            style={{ padding: '30px', backgroundColor: 'white' }}
            src={getExampleJson1()}
            collapseStringsAfterLength={12}
            onEdit={e => {
                console.log('edit callback', e);
                if (e.new_value == 'error') {
                    return false;
                }
            }}
            onDelete={e => {
                console.log('delete callback', e);
            }}
            onAdd={e => {
                console.log('add callback', e);
                if (e.new_value == 'error') {
                    return false;
                }
            }}
            onSelect={e => {
                console.log('select callback', e);
                console.log(e.namespace);
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
        string_number: '1234',
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