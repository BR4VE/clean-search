# clean-search

### ***clean-search is an utility library which has the following 3 methods:***
```javascript
.removeValues()
.lowerCase()
.searchFor()
```
# Setup
```javascript
var cleanWords = new cleanSearch([*values*]); 
```
##  .removeValues([*values*])
Removes all the following unwanted values:
```javascript
undefined
NaN
null
```
By default the values which you use for the setup are automatically cleaned
```javascript
var cleanWords = new cleanSearch([
	123,
	null,
	{
	a: NaN,
	b: {
		c: [null,undefined,NaN,"abc"]
		}
	}
]);

console.log(cleanWords.values);

// The output: [123,{ a: "", b: { c: ["abc"] }}]
 
// Another example

console.log(cleanWords.cleanValues(["def",123,null]));

// The output: ["def",123]
```
NOTE: The unwanted values in Object's are replaced with "" (empty quotes)

## .lowerCase(*[values=this.values]*)

.lowerCase() method replaces all string values with lower case versions of that values.
If you use it without a parameter it lowerCases its own values

```javascript
var cleanWords = new cleanSearch(["ABC","SES", {
	a: "HEY",
	b: {
		c: ["LUL",["DEF", {
			d: "FOO"
		}]]
	}
}]);

// ["abc", "ses", { a:"hey", b:{c:["lul", ["def", {d:"foo" }]]}}]
```


## .searchFor(*searchValue*, [*values=this.values*])

Searches for the given value, returns ```true``` if the value exists

```javascript
var cleanWords = new cleanSearch(["ABC","SES", {
	a: "HEY",
	b: {
		c: ["LUL",["DEF", {
			d: "FOO"
		}]]
	}
}]);

console.log(cleanWords.searchFor("foo")); // true
```
NOTE: .searchFor() function executes .lowerCase() before starting the search
