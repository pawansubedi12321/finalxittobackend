export function extractMaximumFromString(str) {
  // regular expression for at least one numeric digit
  let regex = /\d+/g;

  // initialize MAX = 0
  let MAX = 0;

  // loop over matches
  let match;
  while ((match = regex.exec(str)) !== null) {
    // convert numeric string to integer
    let num = parseInt(match[0]);

    // compare num with MAX, update MAX if num > MAX
    if (num > MAX) {
      MAX = num;
    }
  }

  return MAX;
}

//
// let str = "12-14 days";
//
// console.log(extractMaximum(str));
