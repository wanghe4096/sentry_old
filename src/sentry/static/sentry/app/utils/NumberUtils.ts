/// <reference path="../../declarations/node/node.d.ts" />

const numeral = require('numeral');

const NumberUtils = {
    normalizeNumber(number) {
        switch (number) {
            case "NaN":
                return NaN;
            case "Infinity":
                return Number.MAX_VALUE;
            case "-Infinity":
                return Number.MIN_VALUE;
            default:
                return number;
        }
    },
    normalizeGraphNumber(number) {
        switch (number) {
            case "NaN":
            case "Infinity":
            case "-Infinity":
                return 0;
            default:
                return number;
        }
    },
    formatNumber(number) {
        try {
            return numeral(this.normalizeNumber(number)).format('0,0.[00]');
        } catch (e) {
            return number;
        }
    },
    formatPercentage(percentage) {
        try {
            return numeral(this.normalizeNumber(percentage)).format("0.00%");
        } catch (e) {
            return percentage;
        }
    },
    isNumber(possibleNumber) {
        return possibleNumber !== "" && !isNaN(possibleNumber);
    },
};

export default NumberUtils;
