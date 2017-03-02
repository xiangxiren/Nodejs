/**
 * Created by Administrator on 2017/2/27.
 */

//获取省市
var provinceCityCrawler = require('./provinceCityCrawler.js');
//挑号网
var numberSegmentByTiaoHao = require('./numberSegmentByTiaoHao.js');
//从本地文件获取号码段
var numberSegmentByLocal = require('./numberSegmentByLocal.js');
//根据地区分类号码段
var screenNumberRegion = require('./screenNumberRegion.js');

//provinceCityCrawler.run();
//numberSegmentByTiaoHao.run();
numberSegmentByLocal.run();
screenNumberRegion.run();