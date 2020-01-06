const html = '<!DOCTYPE html>\n' +
    '<html lang="en">\n' +
    '<head>\n' +
    '    <meta charset="UTF-8">\n' +
    '    <title>Title</title>\n' +
    '</head>\n' +
    '<body>\n' +
    '<div>\n' +
    '    <h2 style="text-align: center">标题</h2>\n' +
    '    <img src="https://upload.jianshu.io/users/upload_avatars/13567550/8fa3288f-70d8-47d4-be80-faface644b1d?imageMogr2/auto-orient/strip|imageView2/1/w/80/h/80/format/webp" alt="">\n' +
    '    <img src="https://upload.jianshu.io/users/upload_avatars/13567550/8fa3288f-70d8-47d4-be80-faface644b1d?imageMogr2/auto-orient/strip|imageView2/1/w/80/h/80/format/webp" alt="">\n' +
    '    <ul style="padding: 100px">\n' +
    '        <li>1</li>\n' +
    '        <li>2</li>\n' +
    '        <li><img src="https://upload.jianshu.io/users/upload_avatars/13567550/8fa3288f-70d8-47d4-be80-faface644b1d?imageMogr2/auto-orient/strip|imageView2/1/w/80/h/80/format/webp" alt=""></li>\n' +
    '        <li>4</li>\n' +
    '        <li>5</li>\n' +
    '    </ul>\n' +
    '    <img src="https://upload.jianshu.io/users/upload_avatars/13567550/8fa3288f-70d8-47d4-be80-faface644b1d?imageMogr2/auto-orient/strip|imageView2/1/w/80/h/80/format/webp" alt="">\n' +
    '    <img src="https://upload.jianshu.io/users/upload_avatars/13567550/8fa3288f-70d8-47d4-be80-faface644b1d?imageMogr2/auto-orient/strip|imageView2/1/w/80/h/80/format/webp" alt="">\n' +
    '    <img src="https://upload.jianshu.io/users/upload_avatars/13567550/8fa3288f-70d8-47d4-be80-faface644b1d?imageMogr2/auto-orient/strip|imageView2/1/w/80/h/80/format/webp" alt="">\n' +
    '    <p style="height: 500px; background: #87cefa">行内文字</p>\n' +
    '</div>\n' +
    '</body>\n' +
    '</html>';

const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // await page.goto('https://www.ximalaya.com/');
    page.setContent(html);
    await page.screenshot({path: '11.png'});
    await page.pdf({path: '11.pdf', format: 'A4'});
    await browser.close();
})();