var a = 1;
var b = "world";
var c = function (x) {
    console.log('hello ' + x + a);
}

c(b);

let person = {name: 'John', age: 20};
for (let attr in person) {
    console.log(`${attr}:${person[attr]}`);
}

let arr = [1, 3, 4, 6, 7, 80];
for (let index in arr) {
    console.log(`typeof index:${typeof index},arr[${index}]:${arr[index]}`);
}

Array.prototype.test = function () {

}
for (let index in arr) {
    console.log(`typeof index:${typeof index},arr[${index}]:${arr[index]},typeof arr[index]:${typeof arr[index]}`);
}