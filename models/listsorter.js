// 2022-09-20
// Philippe C. Léger
// Class ListSorter: class used to sort an array of
// objects by a single or multiple properties.

const utilities = require("../utilities");

class ListSorter{
    constructor(key, isDescending){
        this.key = key;
        this.isDescending = isDescending;
        this.child = null;
    }
 
    addNewChild(key, isDescending){
        if(!this.child)
            this.child = new ListSorter(key, isDescending);
        else
            this.child.addNewChild(key, isDescending);
    }
    
    addChild(newChild){
        if(!this.child)
            this.child = newChild;
        else
            this.child.addChild(newChild);
    }
  
    compare(o0, o1){
        let comparison = utilities.innerCompare(o0[this.key], o1[this.key]);
        comparison = this.isDescending ? -comparison : comparison;
        return comparison == 0 && this.child ? this.child.compare(o0, o1) : comparison;
    }
}

function buildListSorter2(value){
	let s = value.split(",");
    let key = utilities.capitalizeFirstLetter(s[0]);
    let isDescending = s.length > 1 && s[1].toLowerCase() == "desc";
    return new ListSorter(key, isDescending);
}

function buildListSorter(sortParams){
    if(!sortParams) return null;
    if(!Array.isArray(sortParams)) return buildListSorter2(sortParams);
    let listSorter = buildListSorter2(sortParams[0]);
    if(sortParams.length > 1) listSorter.addChild(buildListSorter(sortParams.slice(1)))
	return listSorter;
}

module.exports.ListSorter = ListSorter;
module.exports.buildListSorter = buildListSorter;