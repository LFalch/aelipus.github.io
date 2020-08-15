let base, this_body;

(function() {
    const httpReq = new XMLHttpRequest();
    const baseUrl = function() {
        const scripts = document.getElementsByTagName('script');
        return scripts[scripts.length - 1].src.replace('skript.js', '');
    }();
    httpReq.open("GET", baseUrl + 'base.html', true);
    httpReq.onreadystatechange = function () {
        if (httpReq.readyState == 4 && httpReq.status == 200) {
            const base = (new DOMParser()).parseFromString(httpReq.responseText, 'text/html');
            $('*[href]', base).attr('href', function(_, href) {
                if (href.startsWith('/')) {
                    return href;
                }
                return baseUrl + href;
            })

            $(document).ready(function() {
                const html_title = $(document).filter('title').text();
                const title = html_title ? `${html_title} – Slem høgnorsk mat` : 'Slem høgnorsk mat';
                const short_title = html_title || title;

                $('title').text(title);

                $('head').prepend($('head>*', base), `<meta name="apple-mobile-web-app-title" content="${short_title}">`);

                const this_body = $('body>*').detach();

                $('body').append($('body>*', base));
                $('.innhald').prepend(this_body);

                const cur = document.location.href;

                $(`a[href="${cur}"]`).wrap('<b></b>');
            });
        }
    }
    httpReq.send(null);
}())