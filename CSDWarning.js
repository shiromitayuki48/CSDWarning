//==UserScript==
//name: [[Thành viên:Yuki Shiromita/Blog/CSDWarning|CSDWarning]] (Công cụ thêm ba dấu ! màu đỏ vào tên các trang ở không gian chính bị nghi là [[WP:BV1|BV1]])
//description: Thêm ba dấu ! màu đỏ trước tên các bài viết <1000 byte trong [[Đặc biệt:Trang mới]], chỉ trong không gian chính (lưu ý, script này chưa hỗ trợ bỏ qua các trang đổi hướng và trang định hướng)
//author: [[Thành viên:Yuki Shiromita|Yuki Shiromita]]
//version: 1.0.0
//<nowiki>
(function() {
    'use strict';
    const excludedNamespaces = [
        'Thảo luận',
        'Thành viên', 'Thảo luận Thành viên',
        'Wikipedia', 'Thảo luận Wikipedia',
        'Tập tin', 'Thảo luận Tập tin',
        'MediaWiki', 'Thảo luận MediaWiki',
        'Bản mẫu', 'Thảo luận Bản mẫu',
        'Trợ giúp', 'Thảo luận Trợ giúp',
        'Thể loại', 'Thảo luận Thể loại',
        'Cổng thông tin', 'Thảo luận Cổng thông tin',
        'Mô đun', 'Thảo luận Mô đun'
    ];
    const items = document.querySelectorAll('.mw-contributions-list li');
    items.forEach(li => {
        const byteSpan = li.querySelector('.mw-newpages-length');
        if (!byteSpan) return;
        const byteText = byteSpan.textContent;
        const match = byteText.match(/\[(\d+)\s*byte\]/i);
        if (!match) return;
        const byteCount = parseInt(match[1], 10);
        if (byteCount >= 1000) return;
        const pageLink = li.querySelector('.mw-newpages-pagename');
        if (!pageLink) return;
        const title = pageLink.textContent.trim();
        const ns = title.includes(':') ? title.split(':')[0] : '';
        if (excludedNamespaces.includes(ns)) return;
        const dateLink = li.querySelector('.mw-changeslist-date.mw-newpages-time');
        if (!dateLink) return;
        const exclam = document.createElement('span');
        exclam.textContent = '!!! ';
        exclam.style.color = 'red';
        exclam.title = 'Bài viết này có thể thuộc diện xóa nhanh BV1';
        dateLink.parentNode.insertBefore(exclam, dateLink);
    });
})();
//</nowiki>
