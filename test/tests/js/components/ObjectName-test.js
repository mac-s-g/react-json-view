import React from "react"
import { render } from "enzyme"
import { expect } from "chai"

import ObjectName from "./../../../../src/js/components/ObjectName"

describe("<ObjectName />", function() {
    it("ObjectName mount", function() {
        const wrapper = render(
            <ObjectName
                namespace={"test"}
                name="test"
                theme="rjv-default"
                jsvRoot={false}
            />
        )
        expect(wrapper.find(".object-key")).to.have.length(1)
    })

    it("ObjectName with parent array mount", function() {
        const wrapper = render(
            <ObjectName
                namespace={"test"}
                name="test"
                parent_type="array"
                theme="rjv-default"
                jsvRoot={false}
                displayArrayKey={true}
            />
        )
        expect(wrapper.find(".array-key")).to.have.length(1)
    })

    it("ObjectName at root without name", function() {
        const wrapper = render(
            <ObjectName
                namespace={"test"}
                name={false}
                theme="rjv-default"
                jsvRoot={true}
            />
        )
        expect(wrapper.find("span").children()).to.have.length(0)
    })

    it("ObjectName with quotesOnKeys enabled (default)", function() {
        const wrapper = render(
            <ObjectName
                namespace={"test"}
                name="test"
                theme="rjv-default"
                jsvRoot={false}
                quotesOnKeys={true}
            />
        )
        expect(wrapper.find(".object-key").children('span')).to.have.length(3)
    })

    it("ObjectName with quotesOnKeys disabled", function() {
        const wrapper = render(
            <ObjectName
                namespace={"test"}
                name="test"
                theme="rjv-default"
                jsvRoot={false}
                quotesOnKeys={false}
            />
        )
        expect(wrapper.find(".object-key").children('span')).to.have.length(1)
    })
  
    it("ObjectName array hides key", function() {
      const wrapper = render(
          <ObjectName
              namespace={"test"}
              name="test"
              parent_type="array"
              theme="rjv-default"
              jsvRoot={false}
              displayArrayKey={false}
          />
      )
      expect(wrapper.find(".array-key")).to.have.length(0)
    })
})
