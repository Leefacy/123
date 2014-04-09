var Pcontrol = function(_id){
  this._id = _id;
};
Pcontrol.Settings = {
  _btnClass : 'btn btn-default'
  , _class  : 'controlWarp'
}
Pcontrol.prototype = {
  _render : function(){
    var _next = $('<div>', {
           'class'   : Pcontrol.Settings._btnClass+' _next'
         , 'title' : '下一首'
         , 'text'  : '下一首'
      })
      , _pre = $('<div>', {
          'class'   : Pcontrol.Settings._btnClass+' _pre'
        , 'title' : '上一首'
        , 'text'  : '上一首'
      })
      , _loud = $('<div>', {
          'class'   : Pcontrol.Settings._btnClass+' _loud'
        , 'title' : '音量+'
        , 'text'  : '音量+'
      })
      , _low = $('<div>', {
          'class'   : Pcontrol.Settings._btnClass+' _low'
        , 'title' : '音量-'
        , 'text'  : '音量-'
      })
      , _play = $('<div>', {
          'class'   : Pcontrol.Settings._btnClass+' _play'
        , 'title' : '播放'
        , 'text'  : '播放'
      })
      , _pause = $('<div>', {
          'class'   : Pcontrol.Settings._btnClass+' _pause'
        , 'title' : '暂停'
        , 'text'  : '暂停'
      })
      , controlWarp = $('<div>', {
          'class'   : Pcontrol.Settings._class
        , 'id'    : this._id
      });
      
    $(controlWarp).append(_next)
                  .append(_pre)
                  .append(_loud)
                  .append(_low)
                  .append(_play)
                  .append(_pause);
    return $(controlWarp);
  }
  , _getControlWarp : function(){
    return $('#'+this._id);
  }
  , _getNext : function(){
    return $(this._getControlWarp()).find('._next');
  }
  , _getPre : function(){
    return $(this._getControlWarp()).find('._pre');
  }
  , _getLoud : function(){
    return $(this._getControlWarp()).find('._loud');
  }
  , _getLow : function(){
    return $(this._getControlWarp()).find('._low');
  }
  , _getPlay : function(){
    return $(this._getControlWarp()).find('._play');
  }
  , _getPause : function(){
    return $(this._getControlWarp()).find('._pause');
  }
};