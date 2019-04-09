//Business Logic for DM screen
function CharacterList() {
  this.character = [];
  this.characterId = 0;
}

CharacterList.prototype.addCharacter = function(character){
  character.id = this.assignId();
  this.character.push(character);
}

CharacterList.prototype.assignId = function(){
  this.characterId += 1;
  return this.characterId;
}

CharacterList.prototype.findCharacter = function(id){
  for (var i = 0; i < this.character.length; i++) {
    if (this.character[i]){
      if (this.character[i].id == id){
        return this.character[i];
      }
    }
  };
  return false;
}

CharacterList.prototype.deleteCharacter = function(id){
  for (var i = 0; i < this.character.length; i++) {
    if (this.character[i]){
      if (this.character[i].id == id){
        delete this.character[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Characters
function Character(charName, charRace, charClass, location, notes, picture) {
  this.charName = charName,
  this.charRace = charRace,
  this.charClass = charClass,
  this.location = location,
  this.notes = notes,
  this.picture = picture
}

// Character.prototype.fullName = function(){
//   return this.charName;
// }
//User Interface Logic
var characterList = new CharacterList();

function attachCharacterListeners() {
  $("ul#characters").on("click", "li", function(){
    showCharacter(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    characterList.deleteCharacter(this.id);
    $("#showCharacter").hide();
    displayCharacterDetails(characterList);
  });
  $("#findFunction").keyup(function() {
    showCharacter($("#findFunction").val());
    displayCharacterDetails(characterList);
  });
};

function showCharacter(characterId) {
  var character = characterList.findCharacter(characterId);
  $("#showCharacter").show();
  $(".charName").html(character.charName);
  $(".charRace").html(character.charRace);
  $(".charClass").html(character.charClass);
  $(".location").html(character.location);
  $(".notes").html(character.notes);
  $(".picture").html(character.picture);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class= 'deleteButton' id=" + character.id + ">Delete</button>");
}

function displayCharacterDetails(characterToDisplay) {
  var characterList = $("ul#characters");
  var htmlForCharacters = "";
  characterToDisplay.character.forEach(function(character){
    htmlForCharacters += "<li id=" + character.id + ">" + character.charName + "</li" + "<hr>";
  });
  characterList.html(htmlForCharacters);
};

function readURL(input) {
  if(input.files && input.files[0]){
    var reader = new FileReader();
    reader.onload = function(e){
      $("#newPicture").attr("src", e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

$(document).ready(function(){
  attachCharacterListeners();
  $("form#new-character").submit(function(event){
    event.preventDefault();
    var inputtedCharName = $("input#newCharName").val();
    var inputtedRaceName = $("input#newCharRace").val();
    var inputtedClassName = $("input#newCharClass").val();
    var inputtedLocation = $("input#newLocation").val();
    var inputtedNotes = $("input#newNotes").val();
    var inputtedPicture = '<img src="' + $("#newPicture").attr("src")+'">';
    var newChar = new Character (inputtedCharName, inputtedRaceName,  inputtedClassName, inputtedLocation, inputtedNotes, inputtedPicture);
    characterList.addCharacter(newChar);
    displayCharacterDetails(characterList);
  })
})
