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
// Array of strings to CAML case
['eds-input-field', 'eds-footer', 'eds-avatar', 'eds-menu-item', 'eds-icon', 'eds-button', 'eds-personal-menu', 'eds-avatar', 'eds-primary-header', 'eds-secondary-header' , 'eds-card', 'eds-badge', 'eds-popover', 'eds-breadcrumbs', 'eds-tag', 'eds-modal'] .map(name => {
    return name.split('-').map(str => {
    return (str[0].toUpperCase() + str.substr(1))
}).join('')
}).join(',\n')

// Get max value in an array:
[13,2,3,4,5,6,7,8,9].reduce((a, b) => { return a > b ? a : b }, 0);
// 13
