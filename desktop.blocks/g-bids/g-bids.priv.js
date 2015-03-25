/**
 *  @param {Object} data
 *      @key {Array} products
 *      @key {String} url
 *      @key {Integer} count
 **/
blocks['g-bids'] = function (data, env) {
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
            }), {
                block: 'g-link',
                mods: { 'more': true },
                url: '#',
                content: 'Ещё ' + declension(data.count, 'предложение')
            }
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
    var basis = word.substr(0, word.length - 3);
    var ending = word.substr(-2);
    var lastLetters = count.substr(-2);
    if (["11", "12", "13", "14"].indexOf(lastLetters) != -1) {
        return count + " " + basis + 'ий';
    }
    lastLetters = lastLetters.substr(-1);
    if (ending == 'ие') {
        switch (lastLetters) {
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
