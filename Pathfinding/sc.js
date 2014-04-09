var Sc = function(opt){
  this.obj = opt.obj;
	this.num = opt.num;
};
Sc.prototype.cell = function(x, y){
  return $('<div>',{
    class: config.cellClass
    , px: x
    , py: y
  });
};
Sc.prototype.init = function(){
	$(this.obj).append($('<div>', {
    class : config.conClass
	}).append($('<input>',{
    type : 'button'
    , id : config.conBId
    , class : config.btnC
    , value : 'set Begin position'
  })).append($('<input>',{
    type : 'button'
    , id : config.conEId
    , class : config.btnC
    , value : 'set End position'
  })).append($('<input>',{
    type : 'button'
    , id : config.conWId
    , class : config.btnC
    , value : 'set walls'
  })).append($('<input>',{
    type : 'button'
    , id : config.conSId
    , class : config.btnC
    , value : 'Go'
  })).append($('<input>',{
    type : 'button'
    , id : config.conWCId
    //, class : config.btnC
    , value : 'Wall Clean'
  })));
  
  var cells = $('<div>',{
    class : config.cellsClass
  });

  if(this.num - 0 > 0){
    for(var i = 0; i < this.num; i++){
      $(cells).append(this.cell(i%60, Math.floor(i/60)));
    }
  }
  $(this.obj).append(cells);
};
  
Sc.prototype.getObj = function(n){                            //获取对象
  return !!n ? $('#'+n) : {};
};
Sc.prototype.getCl = function(n){                             //批量获取对象
  return !!n ? $('.'+n) : {};
};
Sc.prototype.getBeginObj = function(){                       //获取起点设置按钮对象
  return this.getObj(config.conBId);
};
Sc.prototype.getEndObj = function(){                         //获取终点设置按钮对象
  return this.getObj(config.conEId);
};
Sc.prototype.getWallObj = function(){                        //获取墙体设置按钮对象
  return this.getObj(config.conWId);
};
Sc.prototype.getStartObj = function(){                       //获取功能启动按钮对象
  return this.getObj(config.conSId);
};
Sc.prototype.getWallCleanObj = function(){                   //获取清除墙体按钮对象
  return this.getObj(config.conWCId);
};
Sc.prototype.getBtns = function(){                           //批量获取按钮
  return this.getCl(config.btnC);
};
Sc.prototype.getCell = function(){                           //批量获取单元格对象
  return this.getCl(config.cellClass);
};