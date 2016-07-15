/**
 * Created by Administrator on 2016-07-14.
 */
//Process 属性
console.log('Process 属性:')
//输出到终端
process.stdout.write('Hello Wrold!' + '\n');

//通过参数读取
process.argv.forEach(function (val, index, array) {
    console.log(index + ':' + val);
})

//获取执行路径
console.log(process.execPath);

//平台信息
console.log(process.platform, process.arch);

//输出当期版本
console.log('当前版本：' + process.version);

//process方法
console.log('\nProcess 方法:')

//输出当前目录
console.log('当前目录：' + process.cwd());

//输出内存使用情况
console.log(process.memoryUsage());