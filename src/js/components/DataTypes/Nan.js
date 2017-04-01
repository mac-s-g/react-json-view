import React from 'react';


export default class extends React.Component {

    render() {
        const type_name = 'nan';
        return (
        <div class={"object-value " + type_name}>
            <span class="data-type">{type_name}</span>
            NULL
        </div>
        );
    }

}