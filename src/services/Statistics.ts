/* Simple module that provides statistical functions */

const Statistics = {
    max: (array: number[]) => Math.max.apply(null, array),
    min: (array: number[]) => Math.min.apply(null, array),
    sum: (array: number[]) => array.reduce((sum, curr) => sum + curr, 0),
    mean: (array: number[]) => Statistics.sum(array) / array.length,
    variance: (array: number[]) => {
        if (array.length === 0) {
            return 0;
        }
        const array_mean = Statistics.mean(array);
        return Statistics.mean(array.map((num: number) => Math.pow(num - array_mean, 2)));
    },
    standardDeviation: (array: number[]) => Math.sqrt(Statistics.variance(array)),
    quartile: (array: number[], q: number) => {
        array = array.sort(function (a, b) {
            return a - b;
        });
        const pos = ((array.length) - 1) * q;
        const base = Math.floor(pos);
        const rest = pos - base;
        if (array[base + 1] !== undefined) {
            return array[base] + rest * (array[base + 1] - array[base]);
        } else {
            return array[base];
        }
    }
}

export default Statistics;
