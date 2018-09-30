function cleanSearch(values) {
	this.checkType = function(type) {
		var type;
		// Strings are ok
		// Numbers are ok
		// Check NaN
		if(typeof type === "number" && type !== type) return type = "NaN";
		// Check null
		if(typeof type === "object" && !type) return type = "null";
		// Check Arrays
		if(typeof type === "object" && Array.isArray(type)) return type = "array";
		// Check functions
		return typeof type;			
	}

	this.removeValues = function(values) {
		var unwantedArray = ["NaN","null","undefined"];
		for(var i = 0; i < values.length; i ++) {
			var type = this.checkType(values[i]);
			// remove unwanted values

			for(var k = 0; k < unwantedArray.length; k ++) {
				if(type === unwantedArray[k]) {
					values.splice(i,1);
					i -=1;
				}
			}
			// remove unwanted values in arrays
			if(type === "array" && values[i].length) {
				this.removeValues(values[i]);
			}
			// remove unwanted values in objects
			if(type === "object") {
				for(var item in values[i]) {
					var propertyType = this.checkType(values[i][item]);
					for (var k = 0; k < unwantedArray.length; k++) {
						if(propertyType === unwantedArray[k]){
							values[i][item] = "";
							continue;
						}
					}
					if(propertyType === "object") {
						this.removeValues([values[i][item]]);
					}
					if(propertyType === "array") {
						this.removeValues(values[i][item]);
					}
				}
			}
		}
		return values;
	}

	this.toLower = function(type, value, key) {
		if(type === "string") {
			value[key] = value[key].toLowerCase();
		}
		if(type === "object") {
			this.lowerCase([value[key]]);
		}
		if(type === "array") {
			this.lowerCase(value[key]);
		}
	}

	this.lowerCase = function(values) {
		if(!values) values = this.values;
		for(var i = 0; i < values.length; i ++) {
			var type = this.checkType(values[i]);
			// check for objects, arrays, numbers
			if(type === "object") {

				for(var k = 0; k < Object.keys(values[i]).length ; k++) {

					var key = Object.keys(values[i])[k];

					var propertyType1 = this.checkType(values[i][key]);

					this.toLower(propertyType1, values[i],key);
				}
			}
			if(type === "array") {
				for(var t = 0; t < values[i].length; t++) {
					var propertyType2 = this.checkType(values[i][t]);
					
					this.toLower(propertyType2, values[i], t);
				}
			}
			if(type === "string") values[i] = values[i].toLowerCase();
		}
		return values;
	}
	this.recursiveConditions = function(propertyType, value, bigValue) {
		if(propertyType === "string" || propertyType === "number") {
			if(value === bigValue) return true;
		}
		if(propertyType === "object") {
			if(this.searchFor(value,[bigValue])) return true;
		}
		if(propertyType === "array") {
			if(this.searchFor(value, bigValue)) return true;
		}
	}
	this.searchFor = function(searcValue,values) {
		if(!values) values = this.values;
		values = this.lowerCase(values);
		var value = searcValue;
	
		if(typeof value !== "string" && typeof value !== "number") return;
		if(typeof value === "string") value = value.toLowerCase();
		// This search is so basic,so don't trust it to much
		// Gonna update it later
		for(var i = 0; i < values.length; i++) {
			
			var type = this.checkType(values[i]);

			if(type === "string" || type === "number") {
				if(value === values[i]) {
					return true;	
				}
			}

			if(type === "object") {
				for(var k = 0; k < Object.keys(values[i]).length; k++) {
					
					var key = Object.keys(values[i])[k];

					var propertyType = this.checkType(values[i][key]);

					if(this.recursiveConditions(propertyType, value, values[i][key])) {
						return true;
					}
				}
			}

			if(type === "array") {
				for(var t = 0; t < values[i].length; t ++) {
		
					var propertyType2 = this.checkType(values[i][t]);

					if(this.recursiveConditions(propertyType2,value,values[i][t],this.searchFor)) {
						return true;
					}
				}
			}
		}
		return false;
	}

	this.values = this.removeValues(values);		 
}



var ses = new cleanSearch([123,"abc",undefined,{ a: "ses", b: null, c: [undefined,"123"]}]);

console.log(ses.values);


