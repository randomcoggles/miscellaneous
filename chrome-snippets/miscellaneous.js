function testArray(rgx){
    const nonValidValues = ['test@test..com', 'test.@test.com', '.@test.com', 'test.com'];
    return nonValidValues.filter(val => {
        return rgx.test(val);
    });
}


testArray(
/([^\.]*[^@]+[^\.])(@[^@]+)[^\.\\'"]\.([^@\.])/, 
['test@test..com', 'test.@test.com', '.@test.com', 'test.com', 
'test@email.com', 'ts@es.com'
]);

//  ([^\.]*[^@]+[^\.])(@[^@]+)\.([^@\.])
//  /([^\.]*[^@]+[^\.])(@[^@]+)[^\.\\'"]\.([^@\.])/.test('test@email.com')