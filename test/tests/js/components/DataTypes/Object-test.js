import React from 'react';
import { shallow, render } from 'enzyme';
import {expect} from 'chai';

import JsonObject from '/react/src/js/components/DataTypes/Object';

describe('<JsonObject />', function () {
    const rjvId = 1;


    it('Object component should have a data type label', function () {
        let src = {
            test: true
        }
        const wrapper = shallow(
            <JsonObject
            src={src}
            namespace={['root']}
            rjvId={rjvId}
            theme='rjv-default'
            indentWidth={1}
            depth={1}
            displayDataTypes={true}
            type='object'/>
        );
        expect(
            wrapper.find('.object-key-val')
        ).to.have.length(1);
    });


    it('Object mount', function () {
        let src = {
            bool: true,         //should have label
            int: 5,             //should have label
            str: 'test',        //should have label
            nan: NaN,
            null: null,
            undefined: undefined,
            func: function(){}, //should have label
            float: 1.325,       //should have label
            arr: [
                1,              //should have label
                2               //should have label
            ],
            obj: {
                test: true      //should have label
            }
        }
        const wrapper = render(
            <JsonObject
            src={src}
            namespace={['root']}
            rjvId={rjvId}
            theme='rjv-default'
            indentWidth={1}
            depth={1}
            collapsed={false}
            displayDataTypes={true}
            type='object'/>
        );
        expect(
            wrapper.find('.data-type-label')
        ).to.have.length(8);
    });


    it('Object mount', function () {
        let src = {
            bool: true,         //should have label
            int: 5,             //should have label
            str: 'test',        //should have label
            nan: NaN,
            null: null,
            undefined: undefined,
            func: function(){}, //should have label
            float: 1.325,       //should have label
            arr: [
                1,              //should have label
                2               //should have label
            ],
            obj: {
                test: true      //should have label
            }
        }
        const wrapper = render(
            <JsonObject
            src={src}
            namespace={['root']}
            rjvId={rjvId}
            theme='rjv-default'
            indentWidth={1}
            depth={1}
            displayDataTypes={true}
            type='object'/>
        );
        expect(
            wrapper.find('.data-type-label.hidden')
        ).to.have.length(0);
    });


    it('Array mount expanded', function () {
        let src = {
            'arr1' : [
                'arr2' : [
                    'test'
                ]
            ]
        }
        const wrapper = render(
            <JsonObject
            src={src}
            namespace={['arr_test']}
            name='test'
            rjvId={rjvId}
            theme='rjv-default'
            indentWidth={1}
            collapsed={false}
            depth={1}
            displayDataTypes={true}
            type='array'/>
        );
        expect(
            wrapper.find('.expanded-icon')
        ).to.have.length(2);
                expect(
            wrapper.find('.collapsed-icon')
        ).to.have.length(0);
    });


    it('Array mount collapsed', function () {
        let src = {
            'arr1' : [
                'arr2' : [
                    'test'
                ]
            ]
        }
        const wrapper = render(
            <JsonObject
            src={src}
            namespace={['arr_test']}
            name='test'
            rjvId={rjvId}
            theme='rjv-default'
            collapsed={true}
            indentWidth={1}
            depth={1}
            type='array'/>
        );
        expect(
            wrapper.find('.expanded-icon')
        ).to.have.length(0);
                expect(
            wrapper.find('.collapsed-icon')
        ).to.have.length(1);
    });

});