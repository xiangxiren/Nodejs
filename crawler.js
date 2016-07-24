/**
 * Created by Administrator on 2016/7/19.
 */
var http = require('http');
var cheerio = require('cheerio');
var url = 'http://www.imooc.com/learn/348';
var fs = require('fs');

function filterChapter(html) {
    var $ = cheerio.load(html);
    var chapters = $('.chapter');
    var courseData = [];
    chapters.each(function () {
        var chapter = $(this);
        var chapterTitle = chapter.find('strong').text();
        var videos = chapter.find('.video').children('li');
        var chapterData = {
            chapterTitle: chapterTitle,
            videos: []
        };

        videos.each(function () {
            var video = $(this).find('.studyvideo');
            var videoTitle = video.text();
            var id = video.attr('href').split('video/')[1];
            chapterData.videos.push({
                title: videoTitle,
                id: id
            });
        });

        courseData.push(chapterData);
    });

    return courseData;
}

function printCourseDataInfo(courseData) {
    courseData.forEach(function (item) {
        var chapterTitle = item.chapterTitle;
        console.log(chapterTitle + '\n');

        item.videos.forEach(function (video) {
            console.log('  【' + video.id + '】' + video.title );
        });
    });
}

http.get(url, function (res) {
    var html = '';

    res.on('data', function (data) {
        html += data;
    });

    res.on('end', function () {
        fs.writeFile('index.htm', html, 'utf8', function (err) {
            if (err) {
                return console.log(err.message);
            }
        })
        var courseData = filterChapter(html);

        printCourseDataInfo(courseData);
    });
}).on('error', function () {
    console.log('获取课程数据出错')
});