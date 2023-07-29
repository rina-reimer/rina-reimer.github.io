//This function will be called when user click changing language
function translate(lng, tagAttr){
    var translate = new Translate(tagAttr, lng);
    translate.process();
    if(lng == 'en'){
      $("#enTranslator").css('color', '#E97A60');
      $("#deTranslator").css('color', '#000');
    } 
    if(lng == 'de'){
      $("#deTranslator").css('color', '#E97A60');
      $("#enTranslator").css('color', '#000');
    }
}

$(document).ready(function(){
  //This is id of HTML element (English) with attribute lng-tag
  $("#enTranslator").click(function(){
    translate('en', 'lng-tag');
    //const typed_strings = document.getElementById("typed-intro");
    //console.log(typed_strings)
    //typed_strings.setAttribute('data-typed-items', 'translation, typed, tester, if this is showing, something went right');
  });
  //This is id of HTML element (Deutsch) with attribute lng-tag
  $("#deTranslator").click(function(){
    translate('de', 'lng-tag');
  });

});