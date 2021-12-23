/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest()
    let form = new FormData

    xhr.responseType='json'

    if(options['method'] === 'GET') {
        for (let item in options['data']) {
            options['url'] = options['url'] + '?' + `${item}=${options['data'][item]}&`
        }
    } else {
        for (let item in options['data']) {
            form.append(item, options['data'][item])
        }
    }
    
    try {
        xhr.open(options['method'], options['url'])
        options['method'] === 'GET' ? xhr.send() : xhr.send(form)
    } catch (err) {
        callback(err)
    }

    
    xhr.addEventListener('load', function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            options.callback(null, xhr.response)
        }
    })

};
