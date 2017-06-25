import React from 'react';
import { shallow, render, mount } from 'enzyme';
import {expect} from 'chai';

import Index from '/react/src/js/index';
import AddKeyRequest from '/react/src/js/components/AddKeyRequest';
import ObjectAttributes from '/react/src/js/stores/ObjectAttributes';


describe('<AddKeyRequest />', function () {
    const rjvId = 1;

    it('AddKeyRequest should be on page when active', function () {
        ObjectAttributes.set(
            rjvId, 'action', 'new-key-request', {
                existing_value: {}
            }
        );
        const wrapper = shallow(
            <AddKeyRequest
            active={true}
            theme='rjv-default'
            rjvId={rjvId}
            />
        );
        expect(
            wrapper.find('.add-key-request').length
        ).to.equal(1);
        expect(
            wrapper.find('.add-key-cancel').length
        ).to.equal(1);
        expect(
            wrapper.find('.add-key-submit').length
        ).to.equal(0);
        wrapper.setState({input: 'test'});
        expect(
            wrapper.find('.add-key-submit').length
        ).to.equal(1);
    });

    it('AddKeyRequest should not be on page when inactive', function () {
        const wrapper = shallow(
            <AddKeyRequest
            active={false}
            theme='rjv-default'
            rjvId={rjvId}
            />
        );
        expect(
            wrapper.find('.add-key-request').length
        ).to.equal(0);
    });

    it('AddKeyRequest test input field and submit', function () {
        ObjectAttributes.set(
            rjvId, 'action', 'new-key-request', {
                existing_value: {},
                namespace: []
            }
        );
        ObjectAttributes.set(
            rjvId, 'global', 'src', {}
        );
        const wrapper = mount(
            <AddKeyRequest
            active={true}
            theme='rjv-default'
            rjvId={rjvId}
            />
        );
        wrapper.setState({input: 'test'})

        expect(
            wrapper.find('.add-key-submit').length
        ).to.equal(1);
        wrapper.find('.add-key-submit').simulate('click');
        expect(
            wrapper.state('input')
        ).to.equal('');
    });

    it('AddKeyRequest submit with Enter key', function () {
        ObjectAttributes.set(
            rjvId, 'action', 'new-key-request', {
                existing_value: {},
                namespace: []
            }
        );
        ObjectAttributes.set(
            rjvId, 'global', 'src', {}
        );
        const wrapper = mount(
            <AddKeyRequest
            active={true}
            theme='rjv-default'
            rjvId={rjvId}
            />
        );
        wrapper.setState({input: 'test'})

        expect(
            wrapper.find('.add-key-input').length
        ).to.equal(1);
        wrapper.find('.add-key-input').simulate(
            'keyPress', {key: 'Enter'}
        );
        expect(
            wrapper.state('input')
        ).to.equal('');
    });


    it('AddKeyRequest non-Enter key press', function () {
        ObjectAttributes.set(
            rjvId, 'action', 'new-key-request', {
                existing_value: {},
                namespace: []
            }
        );
        ObjectAttributes.set(
            rjvId, 'global', 'src', {}
        );
        const wrapper = mount(
            <AddKeyRequest
            active={true}
            theme='rjv-default'
            rjvId={rjvId}
            />
        );
        wrapper.setState({input: 'test'})

        expect(
            wrapper.find('.add-key-input').length
        ).to.equal(1);
        wrapper.find('.add-key-input').simulate(
            'keyPress', {key: 'up arrow'}
        );
        expect(
            wrapper.state('input')
        ).to.equal('test');
    });


    it('AddKeyRequest test invalid input', function () {
        ObjectAttributes.set(
            rjvId, 'action', 'new-key-request', {
                existing_value: {test:true},
                namespace: [],
                new_value: {test: null}
            }
        );
        ObjectAttributes.set(
            rjvId, 'global', 'src', {test:true}
        );
        const wrapper = mount(
            <AddKeyRequest
            active={true}
            theme='rjv-default'
            rjvId={rjvId}
            />
        );
        wrapper.setState({input: 'test'})

        expect(
            wrapper.find('.add-key-submit').length
        ).to.equal(0);
    });

    it('AddKeyRequest simulate modal close click', function () {
        ObjectAttributes.set(
            rjvId, 'action', 'new-key-request', {
                existing_value: {},
                namespace: []
            }
        );
        ObjectAttributes.set(
            rjvId, 'global', 'src', {}
        );
        const wrapper = mount(
            <AddKeyRequest
            active={true}
            theme='rjv-default'
            rjvId={rjvId}
            />
        );
        wrapper.setState({input: 'test'})

        expect(
            wrapper.find('.add-key-input').length
        ).to.equal(1);
        wrapper.find('.add-key-request').simulate('click');
        expect(
            wrapper.state('input')
        ).to.equal('');
    });

    it('AddKeyRequest simulate modal close click 2', function () {
        ObjectAttributes.set(
            rjvId, 'action', 'new-key-request', {
                existing_value: {},
                namespace: []
            }
        );
        ObjectAttributes.set(
            rjvId, 'global', 'src', {}
        );
        const wrapper = mount(
            <AddKeyRequest
            active={true}
            theme='rjv-default'
            rjvId={rjvId}
            />
        );
        wrapper.setState({input: 'test'})

        expect(
            wrapper.find('.add-key-input').length
        ).to.equal(1);
        wrapper.find('.add-key-cancel').simulate('click');
        expect(
            wrapper.state('input')
        ).to.equal('');
    });

    it('AddKeyRequest input change', function () {
        ObjectAttributes.set(
            rjvId, 'action', 'new-key-request', {
                existing_value: {},
                namespace: []
            }
        );
        ObjectAttributes.set(
            rjvId, 'global', 'src', {}
        );
        const wrapper = mount(
            <AddKeyRequest
            active={true}
            theme='rjv-default'
            rjvId={rjvId}
            />
        );
        wrapper.setState({input: 'test'})

        expect(
            wrapper.find('.add-key-input').length
        ).to.equal(1);
        wrapper.find('.add-key-input').simulate(
            'change', {target: {value: 'tests'}}
        );
        expect(
            wrapper.state('input')
        ).to.equal('tests');
    });

});