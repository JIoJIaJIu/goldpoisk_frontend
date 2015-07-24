/**
 *  @param {Object} data
 *      @key {Number} code
 *      @key {String} description
 **/
blocks['g-error'] = function (data, env) {
    return {
        block: 'g-error',
        code: data.code,
        content: data.description
    }
}