/**
 *  @param {Object} data
 *      @key {Array} products
 *      @key {String} url
 *      @key {Integer} count
 **/
blocks['g-bids'] = function (data, env) {
    var MIN_DIFF = 5;
    var diff = data.count - data.products.length;
    return {
        block: 'g-bids',
        content: [
            {
                block: 'g-heading',
                mods: { 'size': 'm' },
                content: 'Лучшие предложения от наших партнёров'
            },
            blocks['g-goods']({
                list: data.products
            }),
            diff != 0 ? {
                block: 'g-link',
                mods: { 'more': true },
                url: '#',
                content: diff < MIN_DIFF ? 'Все предложения' : 'Ещё ' + declension(data.count, 'предложение')
            } : null
        ]
    }
}

function declension(count, word) {
    /**
     *  @param {Integer} count
     *  @param {String} word
     *  @return {String} result = count + word
     **/
    count = count.toString();
    var basis = word.substr(0, word.length - 2);
    var ending = word.substr(-2);
    var lastLetters = count.substr(-2);
    if (["11", "12", "13", "14"].indexOf(lastLetters) != -1) {
        return count + " " + basis + 'ий';
    }
    if (ending == 'ие') {
        switch (lastLetters.substr(-1)) {
            case '1':
                return count + " " + basis + ending;
                break;
            case '2':
            case '3':
            case '4':
                return count + " " + basis + 'ия';
                break;
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0':
                return count + " " + basis + 'ий';
                break;
            default:
                break;
        }
    } else {
        return 'Oops';
    }
}
