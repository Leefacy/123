(function(){
  var Teddy = {
        o : [ [ "music/Britney Spears - Baby One More Time.mp3",
          "Baby One More Time",
          "Britney Spears - Baby One More Time",
          "pic/sample_photo_00.jpg"
        ],
        [ "music/Evanescence - Bring Me To Life.mp3",
          "Bring Me To Life",
          "Evanescence - Bring Me To Life",
          "pic/sample_photo_01.jpg"
        ],
        [ "music/Globus - Europa.mp3",
          "Europa",
          "Globus - Europa",
          "pic/sample_photo_02.jpg"
        ],
        [ "music/HIROKO - Baby.mp3",
          "Baby",
          "HIROKO - Baby",
          "pic/sample_photo_03.jpg"
        ],
        [ "music/Hollywood Undead - Lights Out.mp3",
          "Lights Out",
          "Hollywood Undead - Lights Out",
          "pic/sample_photo_04.jpg"
        ],
        [ "music/Jessica Simpson - When You Told Me You Loved Me.mp3",
          "When You Told Me You Loved Me",
          "Jessica Simpson - When You Told Me You Loved Me",
          "pic/sample_photo_05.jpg"
        ],
        [ "music/Muse - Supermassive Black Hole.mp3",
          "Supermassive Black Hole",
          "Muse - Supermassive Black Hole",
          "pic/sample_photo_06.jpg"
        ],
        [ "music/RSP - さくら  ～あなたに出会えてよか（清明樱花祭）.mp3",
          "さくら  ～あなたに出会えてよか",
          "RSP - さくら  ～あなたに出会えてよか（清明樱花祭）",
          "pic/sample_photo_07.jpg"
        ],
        [ "music/轻音部少女 - 相遇天使.mp3",
          "相遇天使",
          "轻音部少女 - 相遇天使",
          "pic/sample_photo_08.jpg"
        ],
        [ "music/樱高轻音部 - NO, Thank You!.mp3",
          "NO, Thank You!",
          "樱高轻音部 - NO, Thank You!",
          "pic/sample_photo_09.jpg"
        ],
        [ "music/黑崎真音 - SCARS.mp3",
          "SCARS",
          "黑崎真音 - SCARS",
          "pic/sample_photo_10.jpg"
        ],
        [ "music/小坂りゆ;大剑 - 断罪の花  ～Guilty  Sky～（《大剑》）.mp3",
          "断罪の花  ～Guilty  Sky",
          "小坂りゆ;大剑 - 断罪の花  ～Guilty  Sky",
          "pic/sample_photo_11.jpg"
        ],
        [ "music/小坂りゆ;大剑 - 断罪の花  ～Guilty  Sky～（《大剑》）.mp3",
          "断罪の花  ～Guilty  Sky",
          "小坂りゆ;大剑 - 断罪の花  ～Guilty  Sky",
          "pic/sample_photo_11.jpg"
        ],
        [ "music/小坂りゆ;大剑 - 断罪の花  ～Guilty  Sky～（《大剑》）.mp3",
          "断罪の花  ～Guilty  Sky",
          "小坂りゆ;大剑 - 断罪の花  ～Guilty  Sky",
          "pic/sample_photo_11.jpg"
        ]
      ]
    , Slist : function(_class, _source, _title, _text, _pic, _id){
        this._class   = _class;                     // class
        this._source  = _source;                    // data-url
        this._title   = _title;                     // title
        this._text    = _text;                      // innerText
        this._pic     = _pic;                       // data-pic
        this._id      = _id;
      }
    , Mlist : function(_id, _subClass, _o){
        this._id       = _id;                       // id
        this._subClass = _subClass;                 // class of the sub
        this._o        = _o;                        // datas of the list
        this._count    = (new Date()).getTime();    // for subClass
      }
    , Pcontrol : function(_id){
        this._id = _id;
      }
    , Picture : function(_c, _s){
        this._src = _s;
        this._class = _c;
      }
    , ProgressBar : function(){
  
      }
    , Player : function(_opts){
      this.opts = $.extend({}, Teddy.Player.defaultOpts, _opts);
      this._c = new Teddy.Pcontrol(this.opts._controlId);
      this._m = new Teddy.Mlist(this.opts._mListId, this.opts._sclass, Teddy.o);
      this._p = new Teddy.ProgressBar();
      this._i = new Teddy.Picture(this.opts._imgClass);
      this.$t = this.opts._o;
      this._init();
    }
  };
  
  Teddy.Player.defaultOpts = {
    _controlId : 'PcontrolTeddy'
    , _mListId : 'MlistTeddy'
    , _sclass  : 'songUnitTeddy'
    , _audioId : 'audioIdTeddy'
    , _imgClass: 'teddyPic'
  };
  Teddy.Player.prototype = {
    _audio : function(){
      return '<audio autoplay id="'+this.opts._audioId+'"><source src="" type="audio/mpeg>Your browser does not support the audio element.</audio>' ;
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
  
  Teddy.ProgressBar.Settings = {
    _class : 'teddy-progress'
    , _warpClass : 'progress'
    , _barClass : 'progress-bar'
    , _timerLclass : 'progress-left-timer'
    , _timerRclass : 'progress-right-timer'
  };
  Teddy.ProgressBar.prototype = {
    _getBar : function(){
      return $('<div>', {
          'class' : Teddy.ProgressBar.Settings._barClass
        , 'role' : 'progressbar'
        , 'aria-valuemin' : '0'
        , 'aria-valuemax' : '100'
      });
    }
    , _render : function(){
      var $bar = this._getBar()
        , $progress = $('<div>', {
          'class' : Teddy.ProgressBar.Settings._warpClass
        })
        , $ltime = $('<div>', {
          'class' : Teddy.ProgressBar.Settings._timerLclass
        })
        , $rtime = $('<div>', {
          'class' : Teddy.ProgressBar.Settings._timerRclass
        })
        , $p = $('<div>', {
          'class' : Teddy.ProgressBar.Settings._class
        });
                
      $($progress).append($bar);
      $($p).append($progress)
           .append($ltime)
           .append($rtime);
      return $p;
    }
    , _getProgress : function(){
      return $('.'+Teddy.ProgressBar.Settings._warpClass);
    }
    , _getProgressBar : function(){
      return $('.'+Teddy.ProgressBar.Settings._barClass);
    }
    , _getLeftTimer : function(){
      return $('.'+Teddy.ProgressBar.Settings._timerLclass);
    }
    , _getRightTimer : function(){
      return $('.'+Teddy.ProgressBar.Settings._timerRclass);
    }
    , _stop : function(){
      clearInterval(this._timer);
    }
    , _draw : function(_b, _e){
      var _p = _b/_e * 100 + '%'
        , $bar = this._getBar();
              
      $(this._getProgress()).prepend($bar);
              
      $(this._getProgressBar()).css({'width':_p});
      $(this._getLeftTimer()).text(this._toTime(_b));
      $(this._getRightTimer()).text('-'+this._toTime(_e - _b));
    }
    , _toTime : function(_n){
      var n = Math.floor(_n)
        , _t;
      _t = Math.floor(n/60)+':'+ (n%60 < 10 ? '0':'')+ n%60;
      return _t;
    }
    , _erase : function(){
      $(this._getProgressBar()).remove();
    }
  };
  
  Teddy.Pcontrol.Settings = {
    _btnClass : 'btn btn-default'
    , _class  : 'controlWarp'
  };
  Teddy.Pcontrol.prototype = {
    _render : function(){
      var _next = $('<div>', {
             'class'   : Teddy.Pcontrol.Settings._btnClass+' _next'
           , 'title' : '下一首'
           , 'text'  : '下一首'
        })
        , _pre = $('<div>', {
            'class'   : Teddy.Pcontrol.Settings._btnClass+' _pre'
          , 'title' : '上一首'
          , 'text'  : '上一首'
        })
        , _loud = $('<div>', {
            'class'   : Teddy.Pcontrol.Settings._btnClass+' _loud'
          , 'title' : '音量+'
          , 'text'  : '音量+'
        })
        , _low = $('<div>', {
            'class'   : Teddy.Pcontrol.Settings._btnClass+' _low'
          , 'title' : '音量-'
          , 'text'  : '音量-'
        })
        , _play = $('<div>', {
            'class'   : Teddy.Pcontrol.Settings._btnClass+' _play'
          , 'title' : '播放'
          , 'text'  : '播放'
        })
        , _pause = $('<div>', {
            'class'   : Teddy.Pcontrol.Settings._btnClass+' _pause'
          , 'title' : '暂停'
          , 'text'  : '暂停'
        })
        , controlWarp = $('<div>', {
            'class'   : Teddy.Pcontrol.Settings._class
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
  
  Teddy.Mlist.Settings = {
      _currentClass : 'currentPlaying'
    , _class : 'list-group teddy-mlist'
  };
  Teddy.Mlist.prototype = {
    _getList : function(){
      return $('#'+this._id);
    }
    , _getFirstSong : function(){
      var _c = $(this._getSongs()).eq(0);
      return new Teddy.Slist($(_c).attr('class'), $(_c).attr('data-url'), $(_c).attr('title'), $(_c).text(), $(_c).attr('data-pic'), $(_c).attr('id')) ;
    }
    , _getSongs : function(){
      var a = $(this._getList());
      return $(this._getList()).find('.'+this._subClass);
    }
    , _current : function(){
      return $(this._getList()).find('.'+ Teddy.Mlist.Settings._currentClass);
    }
    , _frash : function(i){
      $(this._getSongs()).removeClass(Teddy.Mlist.Settings._currentClass);
      $(this._getSongs()).eq(i).addClass(Teddy.Mlist.Settings._currentClass);
    }
    , _next : function(){
      var _c = this._current()
        , _i = $($(this._getSongs())).index(_c)
        , _l = $(this._getSongs()).length;
      _i ++;
      _i >= _l && (_i = 0);
      this._frash(_i);
      _c = this._current();
      return new Teddy.Slist($(_c).attr('class'), $(_c).attr('data-url'), $(_c).attr('title'), $(_c).text(), $(_c).attr('data-pic'), $(_c).attr('id'));
    }
    , _pre : function(){
      var _c = this._current()
        , _i = $($(this._getSongs())).index(_c)
        , _l = $(this._getSongs()).length;
      _i --;
      _i < 0 && (_i = _l-1);
      this._frash(_i);
      _c = this._current();
      return new Teddy.Slist($(_c).attr('class'), $(_c).attr('data-url'), $(_c).attr('title'), $(_c).text(), $(_c).attr('data-pic'), $(_c).attr('id'));
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
            $(s[i]).attr('data-url') == o._source && minusN(i);
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
        , 'class' : Teddy.Mlist.Settings._class
      }), $t = this;
      $.each(this._o, function(index, item){
        var s = new Teddy.Slist($t._subClass, item[0], item[2], item[1], item[3], $t._count++);
        $($r).append(s._toSubList());
      });
      return $r;
    }
  };
  
  Teddy.Picture.Settings = {
    width: '600px'
    , height: '520px'
  };
  Teddy.Picture.prototype = {
    _render : function(){
      var $img = $('<img>',{
            'src' : this._src
          , 'width' : '100%'
          , 'height' : '100%'
        })
        , $div = $('<div>', {
            'class' : this._class
            , 'width' : Teddy.Picture.Settings.width
            , 'height' : Teddy.Picture.Settings.height
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
  };
  
  Teddy.Slist.prototype = {
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
  };
  
  $.fn.Player = function(opts){
    var $t = this, _opts = $.extend({}, Teddy.Player.defaultOpts, opts);
    _opts._o = $t;
    return new Teddy.Player(_opts);
  };
})(jQuery);