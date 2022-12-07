import React from "react"
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { render, mount } from "enzyme"
import { JSDOM } from "jsdom"

import Index from "../../../src/js/index"

Enzyme.configure({ adapter: new Adapter() });

const { window } = new JSDOM()
global.window = window
global.document = window.document

describe("<Index />", function() {
    const rjvId = 1

    it("check data type labels from index", function() {
        const wrapper = render(
            <Index
                src={{
                    bool: true,
                    str: "test",
                    int: 5,
                    nan: NaN,
                    null: null,
                    func: test => {},
                    obj: {
                        arrChild: [1, 2, "three"],
                        objChild: {
                            one: 1,
                            two: "two"
                        }
                    },
                    arr: [[1, "two"], { one: "one", two: 2 }],
                    regexp: /[0-9]/gi
                }}
            />
        )
        expect(wrapper.find(".data-type-label")).toHaveLength(14)
        expect(wrapper.find(".data-type-label")).toHaveLength(14)
    })

    it("check object-size labels from index", function() {
        const wrapper = mount(
            <Index
                src={{
                    bool: true,
                    str: "test",
                    int: 5,
                    nan: NaN,
                    null: null,
                    func: test => {},
                    obj: {
                        arrChild: [1, 2, "three"],
                        objChild: {
                            one: 1,
                            two: "two"
                        }
                    },
                    arr: [[1, "two"], { one: "one", two: 2 }],
                    regexp: /[0-9]/gi
                }}
                displayObjectSize={true}
                displayDataTypes={true}
                enableClipboard={false}
            />
        )
        expect(wrapper.find(".object-size")).toHaveLength(7)

        wrapper.setProps({ displayObjectSize: false })
        expect(wrapper.find(".object-size")).toHaveLength(0)
    })

    it("src replaced with error message (ERROR OUTPUT EXPECTED)", function() {
        const wrapper = render(
            <Index src={"{jsonEncodedString:true, createError:true}"} />
        )
        expect(wrapper.find(".data-type-label")).toHaveLength(1)
    })

    it("make sure copy to clipboard is displayed all properties", function() {
        const wrapper = render(
            <Index
                src={{
                    test: true,
                    passing: "hopefully",
                    arr: [5],
                    obj: {},
                    regexp: /[0-9]/gi
                }}
            />
        )
        expect(wrapper.find(".copy-to-clipboard-container")).toHaveLength(7)
    })

    it("index test getDerivedStateFromProps", function() {
        jest.spyOn(Index, "getDerivedStateFromProps").mockClear()
        // mount() will cause getDerivedStateFromProps to be called twice.
        // 1. before first render()
        // 2. result of setState() in componentDidMount()
        const wrapper = mount(<Index src={{ test: true }} />)
        expect(wrapper.find(".data-type-label")).toHaveLength(1)
        // setProps() will cause getDerivedStateFromProps to be called once.
        wrapper.setProps({ src: { test1: true, test2: false } })
        // in total, it was called thrice.
        expect(Index.getDerivedStateFromProps).toHaveBeenCalled()
    })

    it("index can have ArrayGroup root component", function() {
        const wrapper = render(
            <Index
                name="test"
                groupArraysAfterLength={5}
                src={new Array(15).fill(0)}
            />
        )
        expect(wrapper.find(".array-group")).toHaveLength(3)
    })

    it("length is correct even if an object has a length property", function () {
        const wrapper = render(
            <Index
                src={{
                    first: "first property",
                    second: "second property",
                    length: 1000
                }}
            />
        )
        expect(wrapper.find(".object-size")).toHaveLength(1)
    })
})
