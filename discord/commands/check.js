const numeral = require('numeral');


module.exports = function(msg,config, Card){

  var input = msg.content.replace(config.commandPrefix + "check ", "");

  var name = "";

  //Loop through the input to check for regex characters.
  for(var j = 0; j < input.length; j++){
    if(input[j] == '*' || input[j] == '.'){
      name += '/';
    }
    name += input[j];
  }

  Card.find({name : { $regex: '.*' + name + '.*' }}, function(err, cards){

    //If no cards are found with the name given.
    if( cards[0] == null || cards[0] === null ){
      msg.channel.send("No cards found with this name, sorry!");
    }

    //If cards are found.
    else {

      //If more than one cards are found.
      if( cards.length > 1 ){

        //Character limit of 2000 per message, therefore we must establish an array of strings and a pointer incase the number of characters would go above 2000.
        //Array
        var cardsmessage = [""];
        //Pointer
        var x = 0;
        msg.channel.send("__**Multiple cards found please reenter the command with the card you want.**__")
        //For each card in the array add it's name and it's index to the current string.

        for(var i = 0; i < cards.length; i++){

          //If the current message length is greater than 1900 (for headroom) increment x by one and set it as a blank string.
          if(cardsmessage[x].length > 1900){
            x++;
            cardsmessage[x] = "";
          }

          //Add the card name to current string.
            cardsmessage[x] += ("**" + cards[i].name + "**\n");
        }

        //Send each string in the array to discord.
        for(var l = 0; l <= x; l++){
          msg.channel.send(cardsmessage[l]);
        }

      }
      //If only one card is found.
      else {

        //Print the various prices.

      }
    }
  });

}
