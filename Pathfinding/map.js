var HashMap = function(){
  this.l = [];
};
HashMap.prototype.get = function(k){
  for(var i = 0 ; i < this.l.size(); i++){
    if(this.l[i].key === k){
      return this.l[i].value;
    }
  }
};
HashMap.prototype.put = function(k, v){
  var bo = false;
  for(var i = 0 ; i < this.l.size(); i++){
    if(this.l[i].key === k){
      this.l[i].value = v;
      bo = !bo;
      break;
    }
  }
  if(!bo){
    this.l.push({
      key : k
      , value : v
    });
  }
};
HashMap.prototype.contain = function(k){
  for(var i = 0 ; i < this.l.size(); i++){
    if(this.l[i].key === k){
      return true;
    }
  }
  return false;
};
HashMap.prototype.add = function(o){
  for(var i = 0 ; i < this.l.size(); i++){
    if(this.l[i].key === o.key){
      console.log('Key is exsited already.');
    }
  }
  this.l.push(o);
};