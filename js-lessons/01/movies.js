/*jshint strict:false */

'use strict';

var movies = [
    {
        title: "Batman begin",
        year: 2005,
        casts: ["Christian Bale", "Michael Caine", "Katie Holms", "Liam Neeson", "Gary Oldman", "Cillian Murphy"]
    },
    {
        title: "The Dark Knight",
        year: 2008,
        casts: ["Christian Bale", "Health Ledgre", "Aaron Eckhart", "Michael Kanie", "Maggie Gallenhal", "Gary Oldman", "Morgan Freeman"]
    },
    {
        title: "The Dark Knight Rieses",
        year: 2012,
        casts: ["Christian Bale", "Gary Oldman", "Joseph Gordon-Levitt", "Tom Hardy", "Anne Hathaway", "Marion Cotillard", "Morgan Freeman", "Michael Kanie"]
    }
];
var actors = [];
movies.reduce(function(actors,movie) {
    if(typeof movie['casts'] != 'undefined') {
        movie['casts'].forEach(function(name, i) {
            console.log(name);
            if (actors.indexOf(name) == '-1') {
                actors.push(name);
            }
        });
    }
    return actors;
}, actors);

console.log('----------Unique list of actors');
console.log('Count: (' + actors.length + ')');
console.log(actors);

var actors = [];
movies.reduce(function(actors,movie) {
    if(typeof movie['casts'] != 'undefined') {
        movie['casts'].forEach(function(name) {
            var pos = actors.map(function(item) {
                return item.name; 
            }).indexOf(name);

            if (pos == '-1') {
                actors.push({
                    name : name,
                    count : 1,
                    titles : [movie['title']],
                    years : [movie['year']],
                });
            } else {
                actors[pos].count += 1;
                actors[pos].titles.push(movie['title']);
                actors[pos].years.push(movie['year']);
            }
        });
    }
    return actors;
}, actors);

console.log('---------- Unique list of actors');
console.log('Count: (' + actors.length + ')');
console.log(actors);

function applySort(arr, k, direction) {
    arr.sort(function(a, b) {
        if (direction.toLowerCase == 'asc') {
            return a[k].localeCompare(b[k]);
        } else {
            return b[k].localeCompare(a[k]);
        }
    });
    return arr;
}

console.log('---------- Sorted by Name (ASC)');
console.log(applySort(actors, 'name', 'asc' ));

console.log('---------- Sorted by Name (DESC)');
console.log(applySort(actors, 'name', 'desc'));

console.log('---------- Sorted by Count (ASC)');
console.log(applySort(actors, 'count', 'asc'));

console.log('---------- Sorted by count (DESC)');
console.log(applySort(actors, 'count', 'desc'));
