(function (undefined) {

blocks['g-pagination'] = function (data, env) {
    assertHas(data, 'totalPages', 'Should point totalPages for pagination');
    assertHas(data, 'currentPage', 'Should point currentPage');
    assertHas(data, 'url', 'Should point url');

    return {
        block: 'g-pagination',
        totalPages: data.totalPages,
        currentPage: data.currentPage,
        url: data.url
    }
}

})()
