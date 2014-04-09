/*
 Act like a tool.
*/
(function(f){
  window.BaseTeddy = window.BT = f();
})(function(){
  var BaseTeddy = function(){
    this._INFO_ = {
      _MSG_ : 'Created By BaseTeddy!'
      , _VERSION : '1.0'
      , _AUTHOR_ : 'Teddy.D.Share'
      ,_OTHER_ : 'BaseTeddy._INFO_._OTHER_'
    };
  };
  BaseTeddy.prototype = {
    _EXTEND_ : function(/*object|objects*/_s, /*object*/_d, /*boolean*/bo){
      if(!!_d){
        if(!!bo){                                  //deep copy
          if(this._ISARRAY_(_s)){
            for(var i = 0; i < _s.length; i++){
              for(var p1 in _s[i]){
                _d[p1] = (_s[i])[p1];
              }
            }
          } else {
            for(var p2 in _s){
              _d[p2] = _s[p2];
            }
          }
        } else {
          if(this._ISARRAY_(_s)){
            for(var i = 0; i < _s.length; i++){
              for(var p3 in _s[i]){
                p3 in _d || (_d[p3] = (_s[i])[p3]);
              }
            }
          } else {
            for(var p4 in _s){
              p4 in _d || (_d[p4] = _s[p4]);
            }
          }
        }
      } else {
        _d = {};
        if(this._ISARRAY_(_s)){
          for(var i = 0; i < _s.length; i++){
            for(var p5 in _s[i]){
              _d[p5] = (_s[i])[p5];
            }
          }
        } else {
          return _s;
          /*
          for(var p6 in _s){
            _d[p6] = _s[p6];
          }
          */
        }
      }
      return _d;
    }
    , _ISARRAY_ : function(_o){                                                            /* To confirm it is array or not. */
      return this._FORMATE2TYPE_(_o) === 'Array';
    }
    , _FORMATE2TYPE_ : function(_o){                                                       /* [object Array] to Array*/
      var toString = Object.prototype.toString;
      var type = toString.call(_o);
      return _o === null ? toString(_o) : (!!type ? type.substring(8, type.length - 1) : 'object');
    }
    , _SETINFO_ : function(_o){                                                            /* set extra information to the object _o*/
      var inf;
      //_o instanceof this ? (inf = '')
      //                   : ();
      var a = this.constructor.toString();
      this[inf] = this._INFO_;
      return this;
    }
    
    /* new object created! */
    , _CREATE_ : function(/*object*/_o){
      var _d = {
        _TRACK_ : {                                                                       // track information.
          _DATE_ : new Date()                                                             // create time
          , _INFO_ : this._INFO_                                                          // BT._INFO_
        }
      };
      return this._EXTEND_(_o, _d, false);
    }
    , _NEW_ : function(/*object*/_o){
      return this._CREATE_(new _o());
    }
    , _TOSTRING_ : function(x){                                                           // toString.
      return x + '->' + this._TRACK_._DATE_ + ':' + this._TRACK_._DATE_.getTime();
    }
  };
  return new BaseTeddy();
});