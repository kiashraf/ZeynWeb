
function myReplace(str, before, after) {

    var array = str.split(" ");

    for(var i= 0;i<array.length;i++){

        if(array[i]===before){

            array[i] = after;
            break;
        }

    }
    var finalString ='';
    for(var j=0;j<array.length;j++){

        finalString += array[j]+' ';

    }

    finalString = finalString.substring(0, finalString.length-1);

    return finalString;
}

myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped");
