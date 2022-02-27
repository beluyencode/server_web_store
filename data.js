function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

function randomNumber() {
    return Math.floor(Math.random() * 10000000);
}


var array = [];

for ( var i = 0; i < 100 ; i ++ ) {
    array.push({
        id : i+1,
        name_product: makeid(7),
        price: randomNumber()
    })
}
console.log(array);


