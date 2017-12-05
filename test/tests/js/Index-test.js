import React from 'react';
import { render, mount } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import { JSDOM } from 'jsdom';

import Index from '/react/src/js/index';

const { window } = (new JSDOM());
global.window = window;
global.document = window.document;

describe('<Index />', function () {

    const rjvId = 1;


    it('check data type labels from index', function () {
        const wrapper = render(
            <Index
            src={{
                bool: true,
                str: 'test',
                int: 5,
                nan: NaN,
                null: null,
                func: (test) => {},
                obj:{
                    arrChild: [
                        1, 2, 'three'
                    ],
                    objChild: {
                        one: 1,
                        two: 'two'
                    }
                },
                arr: [
                    [1, 'two'], {one: 'one', two: 2}
                ]
            }}
            />
        );
        expect(
            wrapper.find('.data-type-label')
        ).to.have.length(13);
        expect(
            wrapper.find('.data-type-label')
        ).to.have.length(13);
    });

    it('check object-size labels from index', function () {
        const wrapper = mount(
            <Index
            src={{
                bool: true,
                str: 'test',
                int: 5,
                nan: NaN,
                null: null,
                func: (test) => {},
                obj:{
                    arrChild: [
                        1, 2, 'three'
                    ],
                    objChild: {
                        one: 1,
                        two: 'two'
                    }
                },
                arr: [
                    [1, 'two'], {one: 'one', two: 2}
                ]
            }}
            displayObjectSize={true}
            displayDataTypes={true}
            enableClipboard={false}
            />
        );
        expect(
            wrapper.find('.object-size')
        ).to.have.length(7);

        wrapper.setProps({displayObjectSize: false});
        expect(
            wrapper.find('.object-size')
        ).to.have.length(0);
    });


    it('src replaced with error message (ERROR OUTPUT EXPECTED)', function () {
        const wrapper = render(
            <Index src={'{jsonEncodedString:true, createError:true}'} />
        );
        expect(
            wrapper.find('.data-type-label')
        ).to.have.length(1);
    });


    it(
        'make sure copy to clipboard is displayed for objects and arrays',
        function () {
        const wrapper = render(
            <Index src={{
                test: true, passing: 'hopefully', arr: [], obj: {}
            }} />
        );
        expect(
            wrapper.find('.copy-to-clipboard-container')
        ).to.have.length(3);
    });


    it('index test componentWillReceiveProps', function () {
        sinon.spy(Index.prototype, 'componentWillReceiveProps');
        const wrapper = mount(
            <Index src={{test: true}} />
        );
        expect(
            wrapper.find('.data-type-label')
        ).to.have.length(1);
        wrapper.setProps({src:{test1:true, test2:false}});
        expect(
            Index.prototype.componentWillReceiveProps.calledOnce
        ).to.equal(true);
    });


    it('index can have ArrayGroup root component', function() {
        const wrapper = render(
            <Index
            name='test'
            groupArraysAfterLength={5}
            src={new Array(15).fill(0)}
            />
        );
        expect(wrapper.find('.array-group')).to.have.length(3);
    });

});
