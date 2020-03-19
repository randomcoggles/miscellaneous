function isInteger(n){       //
      return (n - n) === 0;
}

var testArray = [
    {value: null, shouldAvaluateToTrue: false},
    {value: undefined, shouldAvaluateToTrue: false},
    {value: '', shouldAvaluateToTrue: false},
    {value: 'aw123sd', shouldAvaluateToTrue: false},
    {value: ('str1' - 'str2'), shouldAvaluateToTrue: false},
    {value: '123', shouldAvaluateToTrue: true},
    {value: '12.3', shouldAvaluateToTrue: true},
    {value: '123456789', shouldAvaluateToTrue: true},
    {value: '123as', shouldAvaluateToTrue: true},
    {value: '-123', shouldAvaluateToTrue: true}
].forEach(item => {
	const num = parseInt(item.value);
	if(isInteger(num) === item.shouldAvaluateToTrue){
		console.info( item.value + ' passed: ', num);
    } else {
		console.warn(item.value + ' passed: ', num);
    }

});

// null passed:  NaN
// undefined passed:  NaN
//  passed:  NaN
// aw123sd passed:  NaN
// NaN passed:  NaN
// 123 passed:  123
// 12.3 passed:  12
// 123456789 passed:  123456789
// 123as passed:  123
// -123 passed:  -123

// Front-end challenges
// https://github.com/felipefialho/frontend-challenges
