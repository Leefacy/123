var pfd = function(l){
  this.dataSource = l;  //this.dataSource
  this.wP = [];          
  this.init();
};

pfd.option = {
  x : 1
  , y : 1
};
pfd.prototype.init = function(){
  var l = this.dataSource
    , datamap = {};
 
  for(var i = 0; i < l.length; i++){            //transform dataSource to datamap
    datamap[this.otf(l[i])] = l[i].z;
    switch(l[i].z){
      case config.bC.v:
        this.bP = {                   //this.bP
          x : l[i].x - 0
          , y : l[i].y - 0
        };
        break;
      case config.wC.v:
        this.wP.push({                   //this.wP                                              
          x : l[i].x - 0
          , y : l[i].y - 0
        });
        break;
      case config.eC.v:
        this.eP = {                   //this.eP                                              
          x : l[i].x - 0
          , y : l[i].y - 0
        };
        break;
      default:
        break;
    }
  }
  this.datamap = datamap;            //this.datamap
  
  !!this.bP || (console.log('Begin Cell is not existed!'), alert('Begin Cell is not setted!'));
  !!this.eP || (console.log('End Cell is not existed!'), alert('End Cell is not setted!'));
};


pfd.prototype.invoke = function(){
  var open = []
    , closed = []
    , rlist = []
    , around
    , temp = Number.MAX_VALUE
    , s = this.formateCell(this.bP)
    , flag = true
    , _fc = function(o1, o2){
      return o1.f*100000+o1.u - o2.f*100000-o2.u;
    }
    , _fs = function(o1, o2){
      return o1.g*100000+o1.u - o2.g*100000-o2.u;
    }
    , index = 0;
  closed.push(s);
  /*
   算法描述:
       1.将当前坐标位置周围的方块放入open列表.
       2.计算出open列表中最小F值的S
       3.open.del(S),close.add(S).
       4.将S视为当前坐标.
       5.S周围的方块T
         1> closed.contains(T) continue;
         2> open.contains(T) update the value of F to be min of them.
         3> !open.contains(T) open.add(T)
      loop : 2-5
  */
  while(flag){
    
    around = this.getAround(s);
    for(var i = 0 ; i < around.length; i++){
      if(this.isEndCell(around[i])){
        flag = false;
        break;
      }
      if(this.contains(closed, around[i])) continue;               
      if(this.contains(open, around[i])){
        open = this.updateF(open, around[i]);
      } else {
        open.push(around[i]);
      }
    }
    if(flag){
      open.sort(_fc);
      s = open.shift();
      closed.push(s);
    }
  }
  
  /*
   Descriptioin:
    1: find the S which get the min value of G, and adjacent to E.
    2: E = S.
    loop 1-2 till S = BeginCell.
  */
  flag = true;
  s = this.formateCell(this.eP);
  while(flag){
    around = this.getAroundIn(s, closed);
    console.log(around);
    if(this.contains(around, this.bP)){
      flag = false;
    }else{
      around.sort(_fs);
      s = around[0];
      console.log(s);
      rlist.push(s);
    }
  }
  return rlist;
};
pfd.prototype.updateF = function(_l, _o){
  for(var i = 0 ; i < _l.length; i ++){
    if(_l[i].x == _o.x && _l[i].y ==_o.y){
      _l[i].f > _o.f && (_l[i].f = _o.f);
      break;
    }
  }
  return _l;
};
pfd.prototype.contains = function(_l, _c, _f){
  for(var i = 0 ; i < _l.length; i ++){
    if(_l[i].x == _c.x && _l[i].y ==_c.y){
      return  !!_f ? _l[i] : true;
    }
  }
  return false;
};
pfd.prototype.formateCell = function(_o, _f){
  var k = this.isBeginCell(_o) ? 0 :(!!_f ?  _f.g + (_f.x == _o.x ? pfd.option.y : pfd.option.x) : Number.MAX_VALUE) ;
  var temp = {
    x : _o.x-0
    , y : _o.y-0
    , h : Math.abs(this.eP.x - _o.x)*pfd.option.x + Math.abs(this.eP.y - _o.y)*pfd.option.y
    , g : this.isBeginCell(_o) ? 0 :(!!_f ?  _f.g + (_f.x == _o.x ? pfd.option.y : pfd.option.x) : Number.MAX_VALUE) 
    , u : !!_f ? (_f.y < _o.y ? 4 : (_f.x < _o.x ? 1 :(_f.x == _o.x ? 2 : 3))) : 0
  };
  temp.f = temp.h + temp.g;
  //console.log(temp);
  return temp;
};
pfd.prototype.isBeginCell = function(_o){
  return _o.x == this.bP.x && _o.y == this.bP.y;
};
pfd.prototype.isEndCell = function(_o){
  return _o.x == this.eP.x && _o.y == this.eP.y;
};
pfd.prototype.otf = function(_o){          // object -> string
  return _o.x + ':' + _o.y;
};
pfd.prototype.fto = function(_s){         // string -> object
  var i = _s.indexOf(':');
  return i > 0 ? { x : _s.substring(0, i)-0, y : _s.substring(i+1)-0} : {};
};
pfd.prototype.notWall = function(_o){
  for(var i = 0 ; i < this.wP.length; i++){
    if(this.wP[i].x == _o.x && this.wP[i].y == _o.y){
      return false;
    }
  }
  return true;
};
pfd.prototype.getAround = function(_t){
  var _l = [], $t = this, tl
    , _fo = function(_o){
      tl = [$t.formateCell({x : _o.x -1, y : _o.y}, _t),$t.formateCell({x : _o.x+1, y : _o.y}, _t),$t.formateCell({x : _o.x, y : _o.y-1}, _t),$t.formateCell({x : _o.x, y : _o.y+1}, _t)];
      for(var i = 0; i < tl.length; i++){
        if($t.notWall(tl[i]) && tl[i].x >= 0 && tl[i].y >= 0){
          //console.log('.'+tl[i]);
          _l.push(tl[i]);
        }
      }
    }
    , _fs = function(_s){
      _fo($t.fto(_s));
    };
  switch(typeof _t){
    case 'string':
      _fs(_t);
      break;
    case 'object':
      _fo(_t);
      break;
    default:
      break;
  }
  return _l;
};
pfd.prototype.getAroundIn = function(_t, _l){
  var temp = this.getAround(_t)
    , rl = []
    , f;
  for(var i = 0; i < temp.length; i++){
    f = this.contains(_l, temp[i], 1);
    !!f && rl.push(f);
  }
  return rl;
};