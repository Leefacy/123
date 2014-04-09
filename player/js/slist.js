var Slist = function(_class, _source, _title, _text, _pic, _id){
  this._class   = _class;                     // class
  this._source  = _source;                    // data-url
  this._title   = _title;                     // title
  this._text    = _text;                      // innerText
  this._pic     = _pic;                       // data-pic
  this._id      = _id;
};
Slist.prototype = {
  _toSubList : function(){                    // formate to a div.
    return $('<div>',{
        'data-url': this._source 
      , 'title'   : this._title
      , 'class'   : this._class + ' list-group-item teddy-list'
      , 'text'    : this._text
      , 'data-pic': this._pic
      , 'id'      : this._id
    });
  }
}