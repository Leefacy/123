var BaseTeddy = function(){
  this._INFO_ = {
    MSG : 'This is information in BaseTeddy!'
    , VERSION : '1.0'
    , AUTHOR : 'Teddy.D.Share'
    , OTHER : ''
  };
};
BaseTedy.prototype = {
  _EXTEND_ : function(/*object or objects*/s, /*object*/o){
    
  }
  , _ISARRAY_ : function(/*object*/o){
    return this._FORMATE2TYPE_(o) === 'Array';
  }
  , _FORMATE2TYPE_ : function(/*object*/o){
    var toString = Object.prototype.toString
      , temp = toString.call(o);
    return o === null ? String(o) : temp.substring(8, temp.length-1) || 'object';
  }
};

/*
BaseTeddy.prototype = {
  _EXTEND_ : function(/*object to be extended. one or some*/s, /*object extend,  null will be ok*/o){

  }
  ,   _EXTEND_ : function(/*object to be extended. one or some*/s, /*object extend, null will be ok*/o){

  }
  , _ISARRAY_ : function(o){
    return _FORMATE2TYPE_(o) === 'Array';
  }
  , _FORMATE2TYPE_: function(o){
    var toString = Object.prototype.toString
      , temp = toString.call(o);
    return o === null ? String(o) : temp.substring(8, temp.length-1) || 'object';
  }
};
*/