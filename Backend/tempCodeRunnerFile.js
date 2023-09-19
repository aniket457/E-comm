(arr) => {
  var sum = 0;
  arr.map((item) => (sum += item));

  console.log(sum / arr.length);
};