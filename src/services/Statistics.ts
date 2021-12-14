const Statistics = {
  max: (array: number[]) => Math.max.apply(null, array),
  min: (array: number[]) => Math.min.apply(null, array),
  sum: (array: number[]) => array.reduce((sum, curr) => sum + curr),
  mean: (array: number[]) => Statistics.sum(array) / array.length,
  variance: (array: number[]) => {
    const array_mean = Statistics.mean(array);
    return Statistics.mean(array.map((num: number) => Math.pow(num - array_mean, 2)));
  },
  standardDeviation: (array: number[]) => Math.sqrt(Statistics.variance(array)),
}

export default Statistics;
