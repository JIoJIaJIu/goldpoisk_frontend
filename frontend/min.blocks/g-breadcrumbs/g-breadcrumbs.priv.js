blocks['g-breadcrumbs'] = function (category, categoryUrl, title) {

    return {
        block: 'g-breadcrumbs',
        root: {
            title: 'Главная',
            url: '/'
        },
        path: [{
            title: category,
            url: categoryUrl
        }, {
            title: title,
        }]
    }
}
