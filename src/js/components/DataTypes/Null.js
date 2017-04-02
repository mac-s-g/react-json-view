import React from 'react';


export default class extends React.Component {

    render() {
        const type_name = 'null';
        return (
        <div class={"object-value " + type_name}>
            NULL
        </div>
        );
    }

}