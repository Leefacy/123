var ProgressBar = function(){

};
ProgressBar.Settings = {
  _class : 'teddy-progress'
  , _warpClass : 'progress'
  , _barClass : 'progress-bar'
  , _timerLclass : 'progress-left-timer'
  , _timerRclass : 'progress-right-timer'
}
ProgressBar.prototype = {
  _getBar : function(){
    return $('<div>', {
        'class' : ProgressBar.Settings._barClass
      , 'role' : 'progressbar'
      , 'aria-valuemin' : '0'
      , 'aria-valuemax' : '100'
    });
  }
  , _render : function(){
    var $bar = this._getBar()
      , $progress = $('<div>', {
        'class' : ProgressBar.Settings._warpClass
      })
      , $ltime = $('<div>', {
        'class' : ProgressBar.Settings._timerLclass
      })
      , $rtime = $('<div>', {
        'class' : ProgressBar.Settings._timerRclass
      })
      , $p = $('<div>', {
        'class' : ProgressBar.Settings._class
      });
              
    $($progress).append($bar);
    $($p).append($progress)
         .append($ltime)
         .append($rtime);
    return $p;
  }
  , _getProgress : function(){
    return $('.'+ProgressBar.Settings._warpClass)
  }
  , _getProgressBar : function(){
    return $('.'+ProgressBar.Settings._barClass);
  }
  , _getLeftTimer : function(){
    return $('.'+ProgressBar.Settings._timerLclass);
  }
  , _getRightTimer : function(){
    return $('.'+ProgressBar.Settings._timerRclass);
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