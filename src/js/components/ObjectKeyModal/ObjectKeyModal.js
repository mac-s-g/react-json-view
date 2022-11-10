import React from "react";

import dispatcher from "../../helpers/dispatcher";
// global theme
import Theme from "../../themes/getStyle";
import { Add as Cancel, CheckCircle } from "../icons";

// this input appears when adding a new value to an object
export default class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      input: props.input ? props.input : "",
    };
  }

  render() {
    const { theme, rjvId, isValid } = this.props;
    const { input } = this.state;

    const valid = isValid(input);

    return (
      <div
        className="key-modal-request"
        {...Theme(theme, "key-modal-request")}
        onClick={this.closeModal}
      >
        <div
          {...Theme(theme, "key-modal")}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div {...Theme(theme, "key-modal-label")}>Key Name:</div>
          <div style={{ position: "relative" }}>
            <input
              {...Theme(theme, "key-modal-input")}
              className="key-modal-input"
              ref={(el) => el && el.focus()}
              spellCheck={false}
              value={input}
              placeholder="..."
              onChange={(e) => {
                this.setState({
                  input: e.target.value,
                });
              }}
              onKeyPress={(e) => {
                if (valid && e.key === "Enter") {
                  this.submit();
                } else if (e.key === "Escape") {
                  this.closeModal();
                }
              }}
            />
            {valid ? (
              <CheckCircle
                {...Theme(theme, "key-modal-submit")}
                class="key-modal-submit"
                onClick={(e) => this.submit()}
              />
            ) : null}
          </div>
          <span {...Theme(theme, "key-modal-cancel")}>
            <Cancel
              {...Theme(theme, "key-modal-cancel-icon")}
              class="key-modal-cancel"
              onClick={() => {
                dispatcher.dispatch({
                  rjvId,
                  name: "RESET",
                });
              }}
            />
          </span>
        </div>
      </div>
    );
  }

  closeModal = () => {
    dispatcher.dispatch({
      rjvId: this.props.rjvId,
      name: "RESET",
    });
  };

  submit = () => {
    this.props.submit(this.state.input);
  };
}
