import React from 'react';
import { shallow, render } from 'enzyme';
import {expect} from 'chai';

import JsonObject from './../../../src/js/components/DataTypes/Object';
import ConfigStore from './../../../src/js/stores/ConfigStore';
import AttributeStore from './../../../src/js/stores/ObjectAttributes';

describe('<JsonObject />', function () {
    const rjvId = 1;
    ConfigStore.set(rjvId, 'displayDataTypes', true);


    it('Object component should have a data type label', function () {
        ConfigStore.set(rjvId, 'displayDataTypes', true);
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
            type='object'/>
        );
        expect(
            wrapper.find('.object-key-val')
        ).to.have.length(1);
    });


    it('Object mount', function () {
        ConfigStore.set(rjvId, 'displayDataTypes', true);
        let src = {
            bool: true,         //should have label
            int: 5,             //should have label
            str: 'test',        //should have label
            nan: NaN,
            null: null,
            func: function(){}, //should have label
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
            type='object'/>
        );
        expect(
            wrapper.find('.data-type-label')
        ).to.have.length(7);
    });


    it('Object mount', function () {
        ConfigStore.set(rjvId, 'displayDataTypes', true);
        let src = {
            bool: true,         //should have label
            int: 5,             //should have label
            str: 'test',        //should have label
            nan: NaN,
            null: null,
            func: function(){}, //should have label
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
        AttributeStore.set(rjvId, 'arr_test', 'expanded', false);
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