import React from "react"
import { shallow, render, mount } from "enzyme"
import { expect } from "chai"

import JsonObject from "./../../../../../src/js/components/DataTypes/Object"

describe("<JsonObject />", function() {
    const rjvId = 1

    it("Object component should have a data type label", function() {
        let src = {
            test: true
        }
        const wrapper = shallow(
            <JsonObject
                src={src}
                namespace={["root"]}
                rjvId={rjvId}
                theme="rjv-default"
                indentWidth={1}
                depth={1}
                displayDataTypes={true}
                type="object"
            />
        )
        expect(wrapper.find(".object-key-val")).to.have.length(1)
    })

    it("Object mount, multiple data type labels", function() {
        let src = {
            bool: true, //should have label
            int: 5, //should have label
            str: "test", //should have label
            nan: NaN,
            null: null,
            undefined: undefined,
            func: function() {}, //should have label
            float: 1.325, //should have label
            arr: [
                1, //should have label
                2 //should have label
            ],
            obj: {
                test: true //should have label
            },
            empty_arr: [],
            empty_obj: {}
        }
        const wrapper = render(
            <JsonObject
                src={src}
                namespace={["root"]}
                rjvId={rjvId}
                theme="rjv-default"
                indentWidth={1}
                depth={1}
                collapsed={false}
                displayDataTypes={true}
                type="object"
            />
        )
        expect(wrapper.find(".data-type-label")).to.have.length(8)
    })

    it("Object mount, no data type labels when collapsed", function() {
        let src = {
            bool: true, //should have label
            int: 5, //should have label
            str: "test", //should have label
            nan: NaN,
            null: null,
            undefined: undefined,
            func: function() {}, //should have label
            float: 1.325, //should have label
            arr: [
                1, //should have label
                2 //should have label
            ],
            obj: {
                test: true //should have label
            }
        }
        const wrapper = render(
            <JsonObject
                src={src}
                namespace={["root"]}
                rjvId={rjvId}
                theme="rjv-default"
                indentWidth={1}
                depth={1}
                displayDataTypes={true}
                collapsed={true}
                type="object"
            />
        )
        expect(wrapper.find(".data-type-label")).to.have.length(0)
    })

    it("Array mount expanded", function() {
        let src = {
            arr1: [("arr2": ["test"])]
        }
        const wrapper = render(
            <JsonObject
                src={src}
                namespace={["arr_test"]}
                name="test"
                rjvId={rjvId}
                theme="rjv-default"
                indentWidth={1}
                collapsed={false}
                depth={1}
                displayDataTypes={true}
                type="array"
            />
        )
        expect(wrapper.find(".expanded-icon")).to.have.length(2)
        expect(wrapper.find(".collapsed-icon")).to.have.length(0)
    })

    it("Array mount collapsed", function() {
        let src = {
            arr1: [("arr2": ["test"])]
        }
        const wrapper = render(
            <JsonObject
                src={src}
                namespace={["arr_test"]}
                name="test"
                rjvId={rjvId}
                theme="rjv-default"
                collapsed={true}
                indentWidth={1}
                depth={1}
                type="array"
            />
        )
        expect(wrapper.find(".expanded-icon")).to.have.length(0)
        expect(wrapper.find(".collapsed-icon")).to.have.length(1)
    })

    it("Array mount collapsed circle", function() {
        let src = {
            arr1: [("arr2": ["test"])]
        }
        const wrapper = render(
            <JsonObject
                src={src}
                namespace={["arr_test"]}
                name="test"
                rjvId={rjvId}
                theme="rjv-default"
                collapsed={true}
                indentWidth={1}
                depth={1}
                type="array"
            />
        )
        expect(wrapper.find(".expanded-icon")).to.have.length(0)
        expect(wrapper.find(".collapsed-icon")).to.have.length(1)
    })

    it("Array mount collapsed square", function() {
        let src = {
            arr1: [("arr2": ["test"])]
        }
        const wrapper = render(
            <JsonObject
                src={src}
                namespace={["arr_test"]}
                name="test"
                rjvId={rjvId}
                theme="rjv-default"
                collapsed={true}
                indentWidth={1}
                depth={1}
                iconStyle="square"
                type="array"
            />
        )
        expect(wrapper.find(".expanded-icon")).to.have.length(0)
        expect(wrapper.find(".collapsed-icon")).to.have.length(1)
    })

    it("Array mount collapsed triangle", function() {
        let src = {
            arr1: [("arr2": ["test"])]
        }
        const wrapper = render(
            <JsonObject
                src={src}
                namespace={["arr_test"]}
                name="test"
                rjvId={rjvId}
                theme="rjv-default"
                collapsed={true}
                indentWidth={1}
                depth={1}
                iconStyle="triangle"
                type="array"
            />
        )
        expect(wrapper.find(".expanded-icon")).to.have.length(0)
        expect(wrapper.find(".collapsed-icon")).to.have.length(1)
    })

    it("non-empty object should be expanded", function() {
        let src = { test: true }

        const wrapper = shallow(
            <JsonObject
                src={src}
                theme="rjv-default"
                namespace={["root"]}
                collapsed={false}
            />
        )
        expect(wrapper.state("expanded")).to.equal(true)
    })

    it("empty object should not be expanded", function() {
        let src = {}

        const wrapper = shallow(
            <JsonObject
                src={src}
                theme="rjv-default"
                namespace={["root"]}
                rjvId={rjvId}
                collapsed={false}
            />
        )
        expect(wrapper.state("expanded")).to.equal(false)
    })

    it("non-empty array should be expanded", function() {
        let src = [1, 2, 3]

        const wrapper = shallow(
            <JsonObject
                src={src}
                theme="rjv-default"
                namespace={["root"]}
                rjvId={rjvId}
                collapsed={false}
            />
        )
        expect(wrapper.state("expanded")).to.equal(true)
    })

    it("empty array should not be expanded", function() {
        let src = []

        const wrapper = shallow(
            <JsonObject
                src={src}
                theme="rjv-default"
                namespace={["root"]}
                collapsed={false}
            />
        )
        expect(wrapper.state("expanded")).to.equal(false)
    })

    it("non-empty array should have ellipsis", function() {
        let src = [1, 2, 3]

        const wrapper = render(
            <JsonObject
                src={src}
                theme="rjv-default"
                namespace={["root"]}
                rjvId={rjvId}
                collapsed={true}
            />
        )

        expect(wrapper.find(".node-ellipsis")).to.have.length(1)
    })

    it("empty array should not have ellipsis", function() {
        let src = []

        const wrapper = render(
            <JsonObject
                src={src}
                theme="rjv-default"
                namespace={["root"]}
                rjvId={rjvId}
                collapsed={true}
            />
        )

        expect(wrapper.find(".node-ellipsis")).to.have.length(0)
    })

    it("should collapse at shouldCollapse logic", function() {
        let src = { prop1: 1, prop2: 2, prop3: 3 }

        const wrapper = shallow(
            <JsonObject
                src={src}
                theme="rjv-default"
                namespace={["root"]}
                collapsed={false}
                shouldCollapse={() => true}
            />
        )

        expect(wrapper.state("expanded")).to.equal(false)
    })

    it("should expand based on shouldCollapse logic", function() {
        let src = { prop1: 1, prop2: 2, prop3: 3 }

        const wrapper = shallow(
            <JsonObject
                src={src}
                theme="rjv-default"
                namespace={["root"]}
                collapsed={false}
                shouldCollapse={() => false}
            />
        )

        expect(wrapper.state("expanded")).to.equal(true)
    })
    it("sort object keys", () => {
        let src = {
            d: 'd',
            b: 'b',
            a: 'a',
            c: 'c',
         }

        const wrapper = render(
            <JsonObject
                src={src}
                theme="rjv-default"
                namespace={["root"]}
                sortKeys={true}
                collapsed={false}
                shouldCollapse={() => false}
            />
        )
        expect(wrapper.text()).to.equal('"":{"a":"a""b":"b""c":"c""d":"d"}');
    })

    it("do not sort object keys", () => {
        let src = {
            d: 'd',
            b: 'b',
            a: 'a',
            c: 'c',
         }

        const wrapper = render(
            <JsonObject
                src={src}
                theme="rjv-default"
                namespace={["root"]}
                collapsed={false}
                shouldCollapse={() => false}
            />
        )
        expect(wrapper.text()).to.equal('"":{"d":"d""b":"b""a":"a""c":"c"}');
    })
})
