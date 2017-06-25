import React from 'react';
import {expect} from 'chai';

import parseInput from '/react/src/js/helpers/parseInput';

describe('parseInput', function () {

    it('parseInput suggests array', function () {

        expect(
            parseInput(JSON.stringify([1,2,"test"])).type
        ).to.equal('array');

        expect(
            parseInput(JSON.stringify({test: true})).type
        ).to.equal('object');

        expect(
            parseInput("5.22").type
        ).to.equal('float');

        expect(
            parseInput("5/22").type
        ).to.equal('date');

        expect(
            parseInput("22").type
        ).to.equal('integer');

        expect(
            parseInput("nan").type
        ).to.equal('nan');

        expect(
            parseInput("NAN").type
        ).to.equal('nan');

        expect(
            parseInput("nUlL").type
        ).to.equal('null');

        expect(
            parseInput("true").type
        ).to.equal('boolean');

        expect(
            parseInput("false").type
        ).to.equal('boolean');

        expect(
            parseInput("undeFINEd").type
        ).to.equal('undefined');

        expect(
            parseInput("test").type
        ).to.equal(false);

    });

});