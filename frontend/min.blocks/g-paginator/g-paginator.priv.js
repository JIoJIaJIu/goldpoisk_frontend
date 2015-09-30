(function (undefined) {

blocks['g-paginator'] = function (data, env) {
    assertHas(data, 'totalPages', 'Should point totalPages for pagination');
    assertHas(data, 'currentPage', 'Should point currentPage');
    assertHas(data, 'url', 'Should point url');
    assertHas(data, 'config', 'Should point config');

    return {
        block: 'g-paginator',
        totalPages: data.totalPages,
        currentPage: data.currentPage,
        url: data.url,
        config: data.config
    }
}

})()
