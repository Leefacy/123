var pf = function(opts){
  this.s = new Sc({obj : opts.layout , num : 1800});
  this.init();
};
pf.prototype.init = function(){
  var $t = this;
  //界面渲染
  this.s.init();

  this.c = new Co({
    t : this.s.getBtns()
    , b : this.s.getBeginObj()
    , e : this.s.getEndObj()
    , w : this.s.getWallObj()
    , s : this.s.getStartObj()
    , wc : this.s.getWallCleanObj()
    , c : this.s.getCell()
  });
  //事件绑定
  this.c.init();
  
  $(this.s.getStartObj()).click(function(){
    var k = new pfd($t.c.getCellLayOut())
      , _p = k.invoke();

    for(var i = 0; i < _p.length; i++){
      $('div[class="cell"][px='+_p[i].x+'][py='+_p[i].y+']').addClass('pathCell');
    }
  });
};
$.fn.pf = function(opts){
  var $t = this;
  return new pf({'layout':$t});
};
