var Mlist = function(_id, _subClass, _o){
  this._id       = _id;                       // id
  this._subClass = _subClass;                 // class of the sub
  this._o        = _o;                        // datas of the list
  
  this._count    = (new Date()).getTime();    // for subClass
};

Mlist.Settings = {
    _currentClass : 'currentPlaying'
  , _class : 'list-group teddy-mlist'
}
Mlist.prototype = {
  _getList : function(){
    return $('#'+this._id); 
  }
  , _getFirstSong : function(){
    var _c = $(this._getSongs()).eq(0);
    return new Slist($(_c).attr('class'), $(_c).attr('data-url'), $(_c).attr('title'), $(_c).text(), $(_c).attr('data-pic'), $(_c).attr('id'))
  }
  , _getSongs : function(){
    var a = $(this._getList());
    return $(this._getList()).find('.'+this._subClass);
  }
  , _current : function(){
    return $(this._getList()).find('.'+ Mlist.Settings._currentClass);
  }
  , _frash : function(i){
    $(this._getSongs()).removeClass(Mlist.Settings._currentClass);
    $(this._getSongs()).eq(i).addClass(Mlist.Settings._currentClass);
  }
  , _next : function(){
    var _c = this._current()
      , _i = $($(this._getSongs())).index(_c)
      , _l = $(this._getSongs()).length;
    _i ++;
    _i >= _l && (_i = 0)
    this._frash(_i);
    _c = this._current();
    return new Slist($(_c).attr('class'), $(_c).attr('data-url'), $(_c).attr('title'), $(_c).text(), $(_c).attr('data-pic'), $(_c).attr('id'))
  }
  , _pre : function(){
    var _c = this._current()
      , _i = $($(this._getSongs())).index(_c)
      , _l = $(this._getSongs()).length;
    _i --;
    _i < 0 && (_i = _l-1)
    this._frash(_i);
    _c = this._current();
    return new Slist($(_c).attr('class'), $(_c).attr('data-url'), $(_c).attr('title'), $(_c).text(), $(_c).attr('data-pic'), $(_c).attr('id'))
  }
  , _plus : function(slist){
    $(this._getList()).append(slist._toSubList());
  }
  , _minus : function(slist){
    var s = this._getSongs()
      , minusN = function(n){
        $(s).eq(n).remove();
      }
      , minusO = function(o){
        for(var i = 0; i < s.length; i++){
          $(s[i]).attr('data-url') == o._source && minusN(i)
        }
      };
    switch(typeof slist){
      case 'number': 
        minusN(slist);
        break;
      case 'object':
        minusO(slist);
        break;
      default:
        break;
    }
  }
  , _render : function(){
    var $r = $('<div>', {
        'id' : this._id
      , 'class' : Mlist.Settings._class
    }), $t = this;
    $.each(this._o, function(index, item){
      var s = new Slist($t._subClass, item[0], item[2], item[1], item[3], $t._count++);
      $($r).append(s._toSubList());
    });
    return $r;
  }
};