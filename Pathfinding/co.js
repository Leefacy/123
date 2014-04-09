var Co = function(opts){
  this.t  = opts.t;         //buttons
  this.b  = opts.b;         //begin button
  this.e  = opts.e;         //end button
  this.w  = opts.w;         //wall button
  this.wc = opts.wc;        //wall cancel button
  this.s  = opts.s;         //start button
  this.c  = opts.c;         //cells
  this.f  = 0;              //flag  1:b 2:w 3:e
};

Co.prototype.init = function(){
  var $t = this;
  $(this.t).click(function(){
    $(this).is($t.b) && ($t.f = config.bC.v);
    $(this).is($t.e) && ($t.f = config.eC.v);
    $(this).is($t.w) && ($t.f = config.wC.v);
  });
  $(this.c).click(function(){
    switch($t.f){
      case config.bC.v:
        $($t.c).removeClass(config.bC.k);
        $(this).addClass(config.bC.k);
        break;
      case config.eC.v:
        $($t.c).removeClass(config.eC.k);
        $(this).addClass(config.eC.k);
        break;
      case config.wC.v:
        $(this).toggleClass(config.wC.k);
        break;
      default:
        break;
    }
  });
  $(this.wc).click(function(){
    $($t.c).removeClass(config.wC.k);
    $t.f = 0;
  });
};

Co.prototype.getCellSpecies = function(k){
  return !!k ? $('.'+k) : {};
};
//{x:0,y:0,z:0}
Co.prototype.getCellLayOut = function(){
  var a = [], $t = this;
  $.each($(this.c), function(index, item){
    var klkk = item;
    a.push({
      x : $(item).attr('px')
      , y : $(item).attr('py')
      , z : $(item).is($t.getCellSpecies(config.bC.k)) ? config.bC.v : 
              ($(item).is($t.getCellSpecies(config.eC.k)) ? config.eC.v :
                ($(item).is($t.getCellSpecies(config.wC.k)) ? config.wC.v : 0))
    });
  });
  return a;
};