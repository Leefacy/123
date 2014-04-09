var Picture = function(_c, _s){
  this._src = _s;
  this._class = _c;
};
Picture.Settings = {
  width: '600px'
	, height: '520px'
};
Picture.prototype = {
  _render : function(){
    var $img = $('<img>',{
          'src' : this._src
        , 'width' : '100%'
        , 'height' : '100%'
      })
      , $div = $('<div>', {
          'class' : this._class
          , 'width' : Picture.Settings.width
          , 'height' : Picture.Settings.height
      });
    $($div).append($img);
    return $div;
  }
  , _getPic : function(){
    return $('.'+this._class).find('img');
  }
  , _setSrc : function(_s){
    $(this._getPic()).attr({'src':_s});
  }
}