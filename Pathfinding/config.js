var config = {
  cellClass     : 'cell draggable ui-widget-content'                              //单元格class
	, cellsClass  : 'cells'                             //单元格外框class
	, conClass    : 'controlWarp'                       //控制按钮外框class
	, cellPx      : 'px'                                //记录x坐标属性
	, cellPy      : 'py'                                //记录y坐标属性
	, conBId      : 'pfControlBegin'                    //设置起点按钮ID
	, conEId      : 'pfControlEnd'                      //设置终点按钮ID
	, conWId      : 'pfControlWalls'                    //设置墙按钮ID
	, conSId      : 'pfControlStart'                    //功能启动按钮ID
	, conWCId     : 'pfControlWallsClean'               //取消墙按钮ID
	, btnC        : 'pfBtnClass'                        //控制按钮class
  , bC          : {k : 'beginCell', v : 1}            //起点单元class
  , wC          : {k : 'wallCell', v : 2}             //墙体单元class
  , eC          : {k : 'endCell', v : 3}              //终点单元class
  , pC          : 'pathCell'                          //路劲单元class
  , bflag       : 'b'                                 //获取起点单元的标识符
  , eflag       : 'e'                                 //获取终点单元的标识符
  , wflag       : 'w'                                 //获取墙体单元的标识符
};