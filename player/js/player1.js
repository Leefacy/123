var Player = function(_opts){
  this.opts = $.extend({}, Player.defaultOpts, _opts);
  this._c = new Pcontrol(this.opts._controlId);
  this._m = new Mlist(this.opts._mListId, this.opts._sclass, o);
  this._p = new ProgressBar();
  this._i = new Picture(this.opts._imgClass);
  this.$t = this.opts._o;
  this._init();
};
Player.defaultOpts = {
  _controlId : 'PcontrolTeddy'
  , _mListId : 'MlistTeddy'
  , _sclass  : 'songUnitTeddy'
  , _audioId : 'audioIdTeddy'
  , _imgClass: 'teddyPic'
};
Player.prototype = {
  _audio : function(){
    return '<audio autoplay id="'+this.opts._audioId+'"><source src="" type="audio/mpeg>Your browser does not support the audio element.</audio>'
  }
  , _init : function(){
    this._render();
    this._listener();
  }
  , _render : function(){
    $(this.$t).append(this._m._render())
              .append(this._i._render())
              .append(this._c._render())
              .append(this._p._render())
              .append(this._audio());
              
    this._a = document.getElementById(this.opts._audioId);
    this._play(this._m._getFirstSong());
  }
  , _listener : function(){
    
    var $t = this;
    //mlist listener
    $(this._m._getSongs()).click(function(){
      var _s = new Slist($(this).attr('class'), $(this).attr('data-url'), $(this).attr('title'), $(this).text(), $(this).attr('data-pic'), $(this).attr('id'));
      $t._play(_s);
    });
    //pcontrol listener
    $(this._c._getNext()).click(function(){
      $t._play($t._m._next());
    });
    $(this._c._getPre()).click(function(){
      $t._play($t._m._pre());
    });
    $(this._c._getLoud()).click(function(){
      $t._a.volume > 0.9 || ($t._a.volume += 0.1);
    });
    $(this._c._getLow()).click(function(){
      $t._a.volume < 0.1 || ($t._a.volume -= 0.1);
    });
    $(this._c._getPlay()).click(function(){
      $t._a.play();
    });
    $(this._c._getPause()).click(function(){
      $t._a.pause();
    });
    
    // progress listener
    $(this._p._getProgress()).mousedown(function(e){
      var offset = $(this).offset()
        , _x = e.pageX
        , _l = $(this).width()
        , _c = _x - offset.left
        , _e = $t._a.duration
        , _t = _e * _c / _l;
                  
      $t._p._erase();
      $t._p._draw(_t, _e);
      $t._a.currentTime = _t;
    });
    
    var func = function(){
      var _c = $t._a.currentTime
        , _l = $t._a.duration;
      $t._p._erase();
      $t._p._draw(_c, _l);
    };
    this._timer = setInterval(func, 10);
    
    //slideshow
    $(this._a).bind('ended', function(){
      $($t._c._getNext()).click();
    });
  }
  , _play : function(_s){                                       // _s: Slist
    var _i = $(this._m._getSongs()).index($('#'+_s._id));
    
    this._m._frash(_i);
    this._i._setSrc(_s._pic);
    this._a.src = _s._source;
  }
};
$.fn.Player = function(opts){
  var $t = this, _opts = $.extend({}, Player.defaultOpts, opts);
  _opts._o = $t;
  return new Player(_opts);
};