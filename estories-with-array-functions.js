/*
In this document I'll tell you a storie all using javascript arrays functions. I hope you'll enjoy it.

*/


// Merge two or more arrays
/*
	TeamA and TeamB get together for a happy hour at a nearby pub.
*/
//Meet TeamA
var teamA = [{"name":"John","score":1,"team":"A"},{"name":"Mary","score":1,"team":"A"},{"name":"Mike","score":1,"team":"A"}]
//Meet TeamB
var teamB = [{"name":"Martha","score":1,"team":"B"},{"name":"Rose","score":1,"team":"B"}]


//When they arrived at the pub they learned that only people 21 years old and above were allowed in the pub. So they split in two groups

// Equivalent:
Array.from([1, 2, 3], x => x + x); 
[1, 2, 3].map( x => x + x);


//  Reduce example:
// To sum all scores from team A
var teamsArray = [{name: 'John', score: 1, team: 'A'}, {name: 'Mary', score: 1, team: 'A'}, {name: 'Martha', score: 1, team: 'B'}, {name: 'Rose', score: 1, team: 'B'}, {name: 'Mike', score: 1, team: 'A'}]

var teamATotalScore = teamsArray.reduce( 
(accumulator, currentValue, currentIndex, array) => {
	return accumulator + ( currentValue.team === 'A'? currentValue.score : 0);
}, 0/*initial value*/);
teamATotalScore; // 3


//Create a new array from a variable number of arguments:
var myNumbers = Array.of(1,2,3);
myNumbers; // [1, 2, 3]


// Merge two or more arrays
var teamA = [{"name":"John","score":1,"team":"A"},{"name":"Mary","score":1,"team":"A"},{"name":"Mike","score":1,"team":"A"}]
var teamB = [{"name":"Martha","score":1,"team":"B"},{"name":"Rose","score":1,"team":"B"}]

var teams = teamA.concat(teamB); // [{"name":"John","score":1,"team":"A"},{"name":"Mary","score":1,"team":"A"},{"name":"Mike","score":1,"team":"A"},{"name":"John","score":1,"team":"A"},{"name":"Mary","score":1,"team":"A"},{"name":"Mike","score":1,"team":"A"}]
// es6: var teams = [...teamA, ...teamB];



//shallow copies part of an array to another location in the same array and returns it, without modifying its size.

// Example: Make 'a' and 'b' repeate in the array replacing 'd' and 'e'
var array1 = ['a', 'b', 'c', 'd', 'e'];
console.log(array1.copyWithin(3, 0, 2)); // ["a", "b", "c", "a", "b"]


// Test whether all elements in the array pass the test implemented by the provided function
var players = 
[
   {
      name: "John",
      score: 1,
      team: "A",
	  age: 21
   },
   {
      name: "Mary",
      score: 1,
      team: "A",
	  age: 22
   },
   {
      name: "Mike",
      score: 1,
      team: "A",
	  age: 23
   },
   {
      name: "Martha",
      score: 1,
      team: "B",
	  age: 20
   },
   {
      name: "Rose",
      score: 1,
      team: "B",
	  age: 17
   }
];

var allPlayersCanDrinnk = players.every(function(player){ return player.age >= 21; });
// Es6: var allPlayersCanDrinnk = players.every(player => player.age >= 21);
// Not all players can drink because Marthe and Rose are less than 21
console.log('Can all players drink?: ', allPlayersCanDrinnk); // Can all players drink?:  false




// Creates a new array with all elements that pass the test implemented by the provided function
// Get the names of all players who can drink:
var players = 
[
   {
      name: "John",
      score: 1,
      team: "A",
	  age: 21
   },
   {
      name: "Mary",
      score: 1,
      team: "A",
	  age: 22
   },
   {
      name: "Mike",
      score: 1,
      team: "A",
	  age: 23
   },
   {
      name: "Martha",
      score: 1,
      team: "B",
	  age: 20
   },
   {
      name: "Rose",
      score: 1,
      team: "B",
	  age: 17
   }
];

var playersWhoCanDrink = players.filter(function(player){ return player.age >= 21; });
JSON.stringify(playersWhoCanDrink.map(function(player){ return player.name; })); // ["John","Mary","Mike"]
// ES6: var playersWhoCanDrink = players.filter(player => player.age >= 21);
//  JSON.stringify(playersWhoCanDrink.map(player => player.name)); // ["John","Mary","Mike"]

