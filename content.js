function _aboov() {
    var priceTag = $('#classifiedDetail > div.classifiedDetail > div.classifiedDetailContent > div.classifiedInfo > h3');
    if (priceTag) {
        var priceFull = priceTag
            .clone()
            .children()
            .remove()
            .end()
            .text().trim();

        if (priceFull) {
            var price = priceFull.split(' ')[0].trim();
            var currency = priceFull.split(' ')[1].trim();
            
            var clearPrice = parseFloat(price.split(".").join(""));
            var squareMeter = $('#classifiedDetail > div.classifiedDetail > div.classifiedDetailContent > div.classifiedInfo > ul > li:nth-child(5) > span')
                .text()
                .trim();
            if (squareMeter) {
                var squareMeterPrice = (clearPrice / parseInt(squareMeter)).toFixed(0);
                $('#classifiedDetail > div.classifiedDetail > div.classifiedDetailContent > div.classifiedInfo > ul')
                    .prepend('<li id="karometre-price" style="font-size:14px; font-weight:800; color:#f1c935;"><strong>Metrekare Fiyat</strong>' + squareMeterPrice + ' ' + currency + '</li>');
            }
        }
    }
}

function _removeAboov() {
    $('#karometre-price').remove();
}

function appendSquareMeterPrice() {
    chrome.storage.sync.get('active', function (data) {
        if (data.active) {
            _aboov();
        } else {
            _removeAboov();
        }
    });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.command === 'init') {
        _aboov();
    } else {
        _removeAboov();
    }
    sendResponse({ result: "success" });
});

window.onload = () => {
    appendSquareMeterPrice();
}

window.onpopstate = (event) => {
    appendSquareMeterPrice();
};

