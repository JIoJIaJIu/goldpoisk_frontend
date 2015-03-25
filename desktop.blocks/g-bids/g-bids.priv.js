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
                content: 'Ещё ' + localization(data.count, 'предложение')
            }
        ]
    }
}

function localization(count, word) {
    var sCount = count.toString();
    var lastLetters = sCount.substr(sCount.length - 2);
    if (lastLetters.length == 2)
        if (lastLetters[0] != "1")
            lastLetters = lastLetters[lastLetters.length - 1];
    var basis = word.substr(0, word.length - 3);
    var ending = word.substr(word.length - 2);
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
            case '11':
            case '12':
            case '13':
            case '14':
                return count + " " + basis + 'ий';
                break;
            default:
                return 
                break;
        }
    } else {
        return 'Oops';
    }
}