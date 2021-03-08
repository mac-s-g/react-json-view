'use strict';

//import react and reactDom for browser rendering
import React from 'react';

import Moment from 'moment';
import ReactDom from 'react-dom';

//import the react-json-view component (installed with npm)
import JsonViewer from './../../src/js/index';
import ObjectAttributes from '../../src/js/stores/ObjectAttributes';

class DevDemo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            collapsedState: 1,
            selectedValue: 'Wish'
        };
    }

    toggleCollapse = () => {
        if (this.state.collapsedState === 1) {
            this.setState({
                collapsedState: false
            });
        }
        else {
            this.setState({
                collapsedState: 1
            });
        }
    }

    handleDropdownChange = (e) => {
        this.setState({
            selectedValue: e.target.value
        });
    }

    render() {
        const { collapsedState, selectedValue } = this.state;
        return (
            <div id='app-container'>
                <button onClick={ () => this.toggleCollapse() }>Toggle collapse</button>
                <select defaultValue="Wish" onChange={ this.handleDropdownChange }>
                    <option value="Wish">Wish</option>
                    <option value="Holy">Holy</option>
                    <option value="Water">Water</option>
                    <option value="Greece">Greece</option>
                </select>
                <p>Selected value: {selectedValue}</p>
                {/* just pass in your JSON to the src attribute */}
                <JsonViewer
                    key={selectedValue}
                    sortKeys={false}
                    style={{ padding: '30px', backgroundColor: 'white' }}
                    src={getExampleJson1()}
                    collapseStringsAfterLength={45}
                    quotesOnKeys={false}
                    onEdit={e => {
                        if (e.new_value === 'error') {
                            return false;
                        }
                    }}
                    onDelete={e => {
                        console.log('delete callback', e);
                    }}
                    onAdd={e => {
                        if (e.new_value === 'error') {
                            return false;
                        }
                    }}
                    onSelect={e => {
                        console.log('select callback', e);
                    }}
                    shouldCollapse={({ src, namespace, type }) => {
                        if (type === 'array' && src.indexOf('test') > -1) {
                            return true;
                        } else if (namespace.indexOf('moment') > -1) {
                            return true;
                        }
                        return false;
                    }}
                    displayObjectSize={false}
                    name={'dev-server'}
                    enableClipboard={true}
                    defaultValue={null}
                    displayDataTypes={false}
                    displaySearch={true}
                    collapsed={collapsedState}
                    displayArrayKey={true}
                    customId={selectedValue}
                />

            </div>
        );
    }
}

ReactDom.render(<DevDemo/>, document.getElementById('app-container'));
// export default demo;

//render 2 different examples of the react-json-view component

/*-------------------------------------------------------------------------*/
/*     the following functions just contain test json data for display     */
/*-------------------------------------------------------------------------*/

//just a function to get an example JSON object
function getExampleJson1() {
    return {
        string: 'this is a test string',
        integer: 42,
        arrayOfObjects: [
            {
                'firstObjectInArray': 1
            },
            {
                'secondObjectInArray': 2
            },
            {
                'fourthObjectInArray': 4
            }
        ],
        empty_object: {},
        megaarray: [1, 2, 3],
        moment: Moment(),
        parent: {
            sibling1: true,
            sibling2: false,
            sibling3: null,
            isString: 'value'
        },
        string_number: '#ffffff',
        date: new Date(),
        testObj: {
            'objectInside': {
                'Multilevel': {
                    'deepNested1': true,
                    'deepNested2': false,
                    'deepNested3': 'test',
                }
            },'objectInsideThree': {
                'Multilevel': {
                    'deepNested1': true,
                    'deepNested3': 'test',
                }
            },
            'objectInsideTwo': {
                'Multilevel': {
                    'deepNested1': true,
                }
            }
        },
        testArray: [
            {
                'deepNested1': true,
                'deepNested2': false
            },2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    };
}
//just a function to get an example JSON object
function getExampleJson2() {
    return {
        test: 'testing',
        array: [{Greeting: 'hello', Greeting2: 'hi'}, 'bye', 'elephant', [1, {Number: 2, nested: [10, 20, 30,]}]]
    };
}

