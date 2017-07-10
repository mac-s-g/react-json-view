import React from 'react';
import { shallow, render, mount } from 'enzyme';
import {expect} from 'chai';

import Index from '/react/src/js/index';
import VariableEditor from '/react/src/js/components/VariableEditor';
import ObjectAttributes from '/react/src/js/stores/ObjectAttributes';


describe('<VariableEditor />', function () {
    const rjvId = 1;

    it('VariableEditor click-to-edit should be visible', function () {
        const wrapper = shallow(
            <VariableEditor
            src={{test:true}}
            theme='rjv-default'
            onEdit={(edit)=>{}}
            rjvId={rjvId}
            singleIndent={1}
            variable={{
                name: 'test',
                value: 5,
                type: 'int'
            }}
            />
        );
        wrapper.instance().setHover(true);
        expect(
            wrapper.find('.click-to-edit').props().style.display
        ).to.equal('inline-block');
        expect(
            wrapper.state('hover')
        ).to.equal(true);
    });

    it('VariableEditor click-to-edit should be hidden', function () {
        const wrapper = shallow(
            <VariableEditor
            src={{test:true}}
            theme='rjv-default'
            onEdit={(edit)=>{}}
            rjvId={rjvId}
            variable={{
                name: 'test',
                value: 5,
                type: 'int'
            }}
            />
        );
        wrapper.instance().setHover(true);
        expect(
            wrapper.find('.click-to-edit').props().style.display
        ).to.equal('inline-block');
        expect(
            wrapper.state('hover')
        ).to.equal(true);
        wrapper.setState({'editMode': true});
        expect(
            wrapper.find('.click-to-edit').props().style.display
        ).to.equal('none');
    });

    it('VariableEditor test textarea and cancel icon', function () {
        const wrapper = shallow(
            <VariableEditor
            src={{test:true}}
            theme='rjv-default'
            onEdit={(edit)=>{}}
            rjvId={rjvId}
            variable={{
                name: 'test',
                value: 5,
                type: 'int'
            }}
            />
        );
        wrapper.instance().setHover(true);
        expect(
            wrapper.find('.click-to-edit-icon').length
        ).to.equal(1);
        wrapper.find('.click-to-edit-icon').simulate('click');
        expect(
            wrapper.state('editMode')
        ).to.equal(true);
        expect(
            wrapper.find('.variable-editor').length
        ).to.equal(1);
        wrapper.find('.edit-cancel').simulate('click');
        expect(
            wrapper.find('.variable-editor').length
        ).to.equal(0);
    });

    it('VariableEditor test textarea and submit icon', function () {
        const wrapper = mount(
            <Index
            src={{test:true}}
            theme='rjv-default'
            onEdit={(edit)=>{}}
            rjvId={rjvId}
            />
        );
        wrapper.find('.click-to-edit-icon').simulate('click');
        expect(
            wrapper.state('onEdit')
        ).to.not.equal(false);
        expect(
            wrapper.find('.variable-editor').length
        ).to.equal(1);
        wrapper.find('.edit-check.string-value').simulate('click');
        expect(
            wrapper.find('.variable-editor').length
        ).to.equal(0);
    });

    it('VariableEditor detected null', function () {
        const wrapper = shallow(
            <VariableEditor
            src={{test:true}}
            theme='rjv-default'
            onEdit={(edit)=>{}}
            rjvId={rjvId}
            variable={{
                name: 'test',
                value: 'null',
                type: 'null'
            }}
            />
        );
        wrapper.instance().setHover(true);
        expect(
            wrapper.find('.click-to-edit-icon').length
        ).to.equal(1);
        wrapper.find('.click-to-edit-icon').simulate('click');
        expect(
            wrapper.state('editMode')
        ).to.equal(true);
        expect(
            wrapper.find('.variable-editor textarea').props().value
        ).to.equal('null');
    });

    it('VariableEditor detected undefined', function () {
        const wrapper = shallow(
            <VariableEditor
            src={{test:true}}
            theme='rjv-default'
            onEdit={(edit)=>{}}
            rjvId={rjvId}
            variable={{
                name: 'test',
                value: 'undefined',
                type: 'undefined'
            }}
            />
        );
        wrapper.instance().setHover(true);
        expect(
            wrapper.find('.click-to-edit-icon').length
        ).to.equal(1);
        wrapper.find('.click-to-edit-icon').simulate('click');
        expect(
            wrapper.state('editMode')
        ).to.equal(true);
        expect(
            wrapper.find('.variable-editor textarea').props().value
        ).to.equal('undefined');
    });

    it('VariableEditor detected NaN', function () {
        const wrapper = shallow(
            <VariableEditor
            src={{test:true}}
            theme='rjv-default'
            onEdit={(edit)=>{}}
            rjvId={rjvId}
            variable={{
                name: 'test',
                value: 'NaN',
                type: 'nan'
            }}
            />
        );
        wrapper.instance().setHover(true);
        expect(
            wrapper.find('.click-to-edit-icon').length
        ).to.equal(1);
        wrapper.find('.click-to-edit-icon').simulate('click');
        expect(
            wrapper.state('editMode')
        ).to.equal(true);
        expect(
            wrapper.find('.variable-editor textarea').props().value
        ).to.equal('NaN');
    });

    it('VariableEditor detected string', function () {
        const wrapper = shallow(
            <VariableEditor
            src={{test:true}}
            theme='rjv-default'
            onEdit={(edit)=>{}}
            rjvId={rjvId}
            variable={{
                name: 'test',
                value: 'test',
                type: 'string'
            }}
            />
        );
        wrapper.instance().setHover(true);
        expect(
            wrapper.find('.click-to-edit-icon').length
        ).to.equal(1);
        wrapper.find('.click-to-edit-icon').simulate('click');
        expect(
            wrapper.state('editMode')
        ).to.equal(true);
        expect(
            wrapper.find('.variable-editor textarea').props().value
        ).to.equal('test');
    });

    it('VariableEditor detected function', function () {
        const wrapper = shallow(
            <VariableEditor
            src={{test:true}}
            theme='rjv-default'
            onEdit={(edit)=>{}}
            rjvId={rjvId}
            variable={{
                name: 'test',
                value: 'function test() {}',
                type: 'function'
            }}
            />
        );
        wrapper.instance().setHover(true);
        expect(
            wrapper.find('.click-to-edit-icon').length
        ).to.equal(1);
        wrapper.find('.click-to-edit-icon').simulate('click');
        expect(
            wrapper.state('editMode')
        ).to.equal(true);
        expect(
            wrapper.find('.variable-editor textarea').props().value
        ).to.equal('function test() {}');
    });

    it('VariableEditor detected object', function () {
        const wrapper = shallow(
            <VariableEditor
            src={{test:true}}
            theme='rjv-default'
            onEdit={(edit)=>{}}
            rjvId={rjvId}
            variable={{
                name: 'test',
                value: '{}',
                type: 'object'
            }}
            />
        );
        wrapper.instance().setHover(true);
        expect(
            wrapper.find('.click-to-edit-icon').length
        ).to.equal(1);
        wrapper.find('.click-to-edit-icon').simulate('click');
        expect(
            wrapper.state('editMode')
        ).to.equal(true);
        expect(
            wrapper.find('.variable-editor textarea').props().value
        ).to.equal('{}');
    });

    it('VariableEditor detected array', function () {
        const wrapper = shallow(
            <VariableEditor
            src={{test:true}}
            theme='rjv-default'
            onEdit={(edit)=>{}}
            rjvId={rjvId}
            variable={{
                name: 'test',
                value: '[1,2,3]',
                type: 'array'
            }}
            />
        );
        wrapper.instance().setHover(true);
        expect(
            wrapper.find('.click-to-edit-icon').length
        ).to.equal(1);
        wrapper.find('.click-to-edit-icon').simulate('click');
        expect(
            wrapper.state('editMode')
        ).to.equal(true);
        expect(
            wrapper.find('.variable-editor textarea').props().value
        ).to.equal('[1,2,3]');
    });

    it('VariableEditor detected float', function () {
        const wrapper = shallow(
            <VariableEditor
            src={{test:true}}
            theme='rjv-default'
            onEdit={(edit)=>{}}
            rjvId={rjvId}
            variable={{
                name: 'test',
                value: '-5.2',
                type: 'float'
            }}
            />
        );
        wrapper.instance().setHover(true);
        expect(
            wrapper.find('.click-to-edit-icon').length
        ).to.equal(1);
        wrapper.find('.click-to-edit-icon').simulate('click');
        expect(
            wrapper.state('editMode')
        ).to.equal(true);
        expect(
            wrapper.find('.variable-editor textarea').props().value
        ).to.equal('-5.2');
    });

    it('VariableEditor detected integer', function () {
        const wrapper = shallow(
            <VariableEditor
            src={{test:true}}
            theme='rjv-default'
            onEdit={(edit)=>{}}
            rjvId={rjvId}
            variable={{
                name: 'test',
                value: '5',
                type: 'integer'
            }}
            />
        );
        wrapper.instance().setHover(true);
        expect(
            wrapper.find('.click-to-edit-icon').length
        ).to.equal(1);
        wrapper.find('.click-to-edit-icon').simulate('click');
        expect(
            wrapper.state('editMode')
        ).to.equal(true);
        expect(
            wrapper.find('.variable-editor textarea').props().value
        ).to.equal('5');
    });

});