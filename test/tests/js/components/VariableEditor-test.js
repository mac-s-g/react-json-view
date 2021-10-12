import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';

import VariableEditor, { editModes } from './../../../../src/js/components/VariableEditor';

describe('<VariableEditor />', function() {
    const rjvId = 1;

    it('VariableEditor click-to-edit should be hidden when onEdit disabled', function() {
        const wrapper = shallow(
            <VariableEditor
                src={{ test: true }}
                theme="rjv-default"
                onEdit={false}
                isDragAllowed={ () => {} }
                rjvId={rjvId}
                variable={{
                    name: 'test',
                    value: 5,
                    type: 'int'
                }}
            />
        );
        wrapper.simulate('mouseover');
        expect(wrapper.find('.click-to-edit')).to.have.length(0);
    });

    it('VariableEditor click-to-edit should be hidden when editMode is active', function() {
        const wrapper = shallow(
            <VariableEditor
                src={{ test: true }}
                theme="rjv-default"
                onEdit={() => {}}
                isDragAllowed={ () => {} }
                rjvId={rjvId}
                variable={{
                    name: 'test',
                    value: 5,
                    type: 'int'
                }}
            />
        );
        wrapper.simulate('mouseover');
        wrapper.setState({ editMode: true });
        expect(wrapper.find('.click-to-edit')).to.have.length(0);
    });

    it('VariableEditor test textarea and cancel icon', function() {
        const wrapper = shallow(
            <VariableEditor
                src={{ test: true }}
                theme="rjv-default"
                onEdit={() => {}}
                isDragAllowed={ () => {} }
                rjvId={rjvId}
                variable={{
                    name: 'test',
                    value: 5,
                    type: 'int'
                }}
            />
        );
        wrapper.find('.variable-value').simulate('doubleClick');
        expect(wrapper.state('editMode')).to.equal(editModes.REGULAR);
        expect(wrapper.find('.variable-editor').length).to.equal(1);
        wrapper.find('.edit-cancel').simulate('click');
        expect(wrapper.find('.variable-editor').length).to.equal(0);
    });

    it('VariableEditor test textarea and submit icon', function() {
        const existing_value = 'existing_value';
        const new_value = 'new_value';
        const wrapper = shallow(
            <VariableEditor
                src={{ test: existing_value }}
                theme="rjv-default"
                onEdit={edit => {
                    expect(edit.updated_src.test).to.equal(new_value);
                }}
                isDragAllowed={ () => {} }
                namespace={['test']}
                rjvId={rjvId}
                variable={{
                    name: 'test',
                    value: existing_value,
                    type: 'string'
                }}
            />
        );
        wrapper.simulate('mouseover');
        //editMode defaluts to off
        expect(wrapper.state('editMode')).to.equal(null);
        //click to open textarea
        wrapper.find('.variable-value').simulate('doubleClick');
        //verify editMode is on
        expect(wrapper.state('editMode')).to.equal(editModes.REGULAR);
        //make sure default textarea value is correct
        expect(wrapper.find('.variable-editor').props().value).to.equal(
            existing_value
        );
        //update edit value
        wrapper.setState({ editValue: new_value });
        //submit new value
        wrapper.find('.edit-check').simulate('click');
        //make sure editMode is off after submit
        expect(wrapper.state('editMode')).to.equal(null);
    });

    it('VariableEditor edit after src change should respect current src', function() {
        const existing_value = 'existing_value';
        const new_value = 'new_value';
        const wrapper = shallow(
            <VariableEditor
                src={{ test: existing_value }}
                theme="rjv-default"
                onEdit={edit => {
                    expect(edit.updated_src.test).to.equal(new_value);
                }}
                isDragAllowed={ () => {} }
                namespace={['test']}
                rjvId={rjvId}
                variable={{
                    name: 'test',
                    value: existing_value,
                    type: 'string'
                }}
            />
        );
        //editMode defaluts to off
        expect(wrapper.state('editMode')).to.equal(null);
        //click to open textarea
        wrapper.find('.variable-value').simulate('doubleClick');
        //verify editMode is on
        expect(wrapper.state('editMode')).to.equal(editModes.REGULAR);
        //make sure default textarea value is correct
        expect(wrapper.find('.variable-editor').props().value).to.equal(
            existing_value
        );
        //update edit value
        wrapper.setState({ editValue: new_value });
        //cancel update
        wrapper.find('.edit-cancel').simulate('click');
        //make sure editMode is off after cancel
        expect(wrapper.state('editMode')).to.equal(null);
        //pop open textarea again
        wrapper.find('.variable-value').simulate('doubleClick');
        //make sure editMode is on
        expect(wrapper.state('editMode')).to.equal(editModes.REGULAR);
        //make sure that textarea still contains original value
        expect(wrapper.find('.variable-editor').props().value).to.equal(
            existing_value
        );
    });

    it('VariableEditor detected null', function() {
        const wrapper = shallow(
            <VariableEditor
                src={{ test: true }}
                theme="rjv-default"
                onEdit={() => {}}
                isDragAllowed={ () => {} }
                rjvId={rjvId}
                variable={{
                    name: 'test',
                    value: 'null',
                    type: 'null'
                }}
            />
        );
        wrapper.find('.variable-value').simulate('doubleClick');
        expect(wrapper.state('editMode')).to.equal(editModes.REGULAR);
        expect(wrapper.find('.variable-editor').props().value).to.equal('null');
    });

    it('VariableEditor detected undefined', function() {
        const wrapper = shallow(
            <VariableEditor
                src={{ test: true }}
                theme="rjv-default"
                onEdit={() => {}}
                isDragAllowed={ () => {} }
                rjvId={rjvId}
                variable={{
                    name: 'test',
                    value: 'undefined',
                    type: 'undefined'
                }}
            />
        );
        wrapper.find('.variable-value').simulate('doubleClick');
        expect(wrapper.state('editMode')).to.equal(editModes.REGULAR);
        expect(wrapper.find('.variable-editor').props().value).to.equal(
            'undefined'
        );
    });

    it('VariableEditor detected NaN', function() {
        const wrapper = shallow(
            <VariableEditor
                src={{ test: true }}
                theme="rjv-default"
                onEdit={() => {}}
                isDragAllowed={ () => {} }
                rjvId={rjvId}
                variable={{
                    name: 'test',
                    value: 'NaN',
                    type: 'nan'
                }}
            />
        );
        wrapper.find('.variable-value').simulate('doubleClick');
        expect(wrapper.state('editMode')).to.equal(editModes.REGULAR);
        expect(wrapper.find('.variable-editor').props().value).to.equal('NaN');
    });

    it('VariableEditor detected string', function() {
        const wrapper = shallow(
            <VariableEditor
                src={{ test: true }}
                theme="rjv-default"
                onEdit={() => {}}
                isDragAllowed={ () => {} }
                rjvId={rjvId}
                variable={{
                    name: 'test',
                    value: 'test',
                    type: 'string'
                }}
            />
        );
        wrapper.find('.variable-value').simulate('doubleClick');
        expect(wrapper.state('editMode')).to.equal(editModes.REGULAR);
        expect(wrapper.find('.variable-editor').props().value).to.equal('test');
    });

    it('VariableEditor detected function', function() {
        const wrapper = shallow(
            <VariableEditor
                src={{ test: true }}
                theme="rjv-default"
                onEdit={() => {}}
                isDragAllowed={ () => {} }
                rjvId={rjvId}
                variable={{
                    name: 'test',
                    value: 'function test() {}',
                    type: 'function'
                }}
            />
        );
        wrapper.find('.variable-value').simulate('doubleClick');
        expect(wrapper.state('editMode')).to.equal(editModes.REGULAR);
        expect(wrapper.find('.variable-editor').props().value).to.equal(
            'function test() {}'
        );
    });

    it('VariableEditor detected object', function() {
        const wrapper = shallow(
            <VariableEditor
                src={{ test: true }}
                theme="rjv-default"
                onEdit={() => {}}
                isDragAllowed={ () => {} }
                rjvId={rjvId}
                variable={{
                    name: 'test',
                    value: '{}',
                    type: 'object'
                }}
            />
        );
        wrapper.find('.variable-value').simulate('doubleClick');
        expect(wrapper.state('editMode')).to.equal(editModes.REGULAR);
        expect(wrapper.find('.variable-editor').props().value).to.equal('{}');
    });

    it('VariableEditor detected array', function() {
        const wrapper = shallow(
            <VariableEditor
                src={{ test: true }}
                theme="rjv-default"
                onEdit={() => {}}
                rjvId={rjvId}
                isDragAllowed={ () => {} }
                variable={{
                    name: 'test',
                    value: '[1,2,3]',
                    type: 'array'
                }}
            />
        );
        wrapper.find('.variable-value').simulate('doubleClick');
        expect(wrapper.state('editMode')).to.equal(editModes.REGULAR);
        expect(wrapper.find('.variable-editor').props().value).to.equal(
            '[1,2,3]'
        );
    });

    it('VariableEditor detected float', function() {
        const wrapper = shallow(
            <VariableEditor
                src={{ test: true }}
                theme="rjv-default"
                onEdit={() => {}}
                rjvId={rjvId}
                isDragAllowed={ () => {} }
                variable={{
                    name: 'test',
                    value: '-5.2',
                    type: 'float'
                }}
            />
        );
        wrapper.find('.variable-value').simulate('doubleClick');
        expect(wrapper.state('editMode')).to.equal(editModes.REGULAR);
        expect(wrapper.find('.variable-editor').props().value).to.equal('-5.2');
    });

    it('VariableEditor detected integer', function() {
        const wrapper = shallow(
            <VariableEditor
                src={{ test: true }}
                theme="rjv-default"
                onEdit={() => {}}
                rjvId={rjvId}
                isDragAllowed={ () => {} }
                variable={{
                    name: 'test',
                    value: '5',
                    type: 'integer'
                }}
            />
        );
        wrapper.find('.variable-value').simulate('doubleClick');
        expect(wrapper.state('editMode')).to.equal(editModes.REGULAR);
        expect(wrapper.find('.variable-editor').props().value).to.equal('5');
    });

    it('VariableEditor sets hoveredOver state to true/false from mouseenter and mouseleave events', function() {
        const wrapper = shallow(
            <VariableEditor
                src={{ test: true }}
                theme="rjv-default"
                onEdit={() => {}}
                rjvId={rjvId}
                isDragAllowed={ () => {} }
                variable={{
                    name: 'test',
                    value: '5',
                    type: 'integer'
                }}
            />
        );
        expect(wrapper.state('hoveredOver')).to.equal(false);

        wrapper.simulate('mouseover');
        expect(wrapper.state('hoveredOver')).to.equal(true);

        wrapper.simulate('mouseleave');
        expect(wrapper.state('hoveredOver')).to.equal(false);
    });

    it('VariableEditor displays action buttons on hover', function() {
        const wrapper = mount(
            <VariableEditor 
                src={{ test: true }}
                theme="rjv-default"
                onEdit={() => {}}
                rjvId={rjvId}
                enableClipboard={ true }
                variable={{
                    name: 'test',
                    value: '5',
                    type: 'string'
                }}
            />
        );

        wrapper.simulate('mouseover');

        expect(wrapper.find({ title: 'Cut' }).length).to.equal(1);
        expect(wrapper.find({ title: 'Paste from external clipboard' }).length).to.equal(1);
        expect(wrapper.find({ title: 'Paste after this' }).length).to.equal(1);
        expect(wrapper.find({ title: 'Edit' }).length).to.equal(1);
        expect(wrapper.find({ title: 'Remove' }).length).to.equal(1);
    })
});
