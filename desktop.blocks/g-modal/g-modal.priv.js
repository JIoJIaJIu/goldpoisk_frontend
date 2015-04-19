blocks['g-modal'] = function (data, env) {
    /**
     *  @param {Object} data
     *      @key {Array} products
     **/

    var block = {
        block: 'g-modal',
        content: [{
            block: 'g-heading',
            mods: { dark: true, size: 'l' }
        }]
    }

    if (data.desires) {
        block.mods = { type: 'desires' };
        block.count = data.desires.count;
    }


    return block;
}