"use strict";

//import react and reactDom for browser rendering
import React from "react";
import ReactDom from "react-dom";

//import the react-json-view component (installed with npm)
import JsonViewer from './../src/js/index';

//render 2 different examples of the react-json-view component
ReactDom.render(
    <div>
        {/* just pass in your JSON to the src attribute */}
        <JsonViewer src={getExampleJson1()} />
        <br />
        <JsonViewer src={getExampleJson2()} />
    </div>,
    document.getElementById('app-container')
);

//just a function to get an example JSON object
function getExampleJson1() {
    return {
        test: 'this is a test string',
        another_sibling: 42,
        how_will_array_do: [1, 2, 3, 'test'],
        how_will_floats_do: -2.757,
        parent: {
            sibling1: true,
            sibling2: false,
            sibling3: null,
            'last-sibling': {
                grand_child: NaN,
                'grand-child-func': (a) => {
                    let b = a*a;
                    return a.push(b);
                }
            }
        },
        string_number: "1234"
    };
}

//and another a function to get an example JSON object
function getExampleJson2() {
    return {"normalized":{
        "1-grams":{
            "body":1,
            "testing":1
        },
        "2-grams":{
            "testing body":1
        },
        "3-grams":{}
        },
        "noun_phrases":{
            "body":1
        },"lemmatized":{
            "1-grams":{
                "test":1,
                "body":1
            },"2-grams":{
                "test body":1
            },"3-grams":{}
        },"dependency":{
            "1-grams":{
                "testingVERBROOTtestingVERB":1,
                "bodyNOUNdobjtestingVERB":1
            },
            "2-grams":{
                "testingVERBROOTtestingVERB bodyNOUNdobjtestingVERB":1
            },"3-grams":{}
        }
    };
}

