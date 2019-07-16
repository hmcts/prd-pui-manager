import * as exceptionFormatter from 'exception-formatter'
import * as stringify from 'json-stringify-safe'
import * as errorStack from '../lib/errorStack'
import { shorten, valueOrNull } from '../lib/util'
import { config } from './config'
import * as log4jui from './log4jui'

const exceptionOptions = {
    maxLines: 1,
}

export function requestInterceptor(request) {
    const logger = log4jui.getLogger('outgoing')

    const url = shorten(request.url, config.maxLogLine)
    logger.info(`${request.method.toUpperCase()} to ${url}`)
    //add timings to requests
    request.metadata = { startTime: new Date() }
    return request
}

export function successInterceptor(response) {
    response.config.metadata.endTime = new Date()
    response.duration = response.config.metadata.endTime - response.config.metadata.startTime

    const logger = log4jui.getLogger('return')

    const url = shorten(response.config.url, config.maxLogLine)

    logger.trackRequest({
        duration: response.duration,
        name: `Service ${response.config.method.toUpperCase()} call`,
        resultCode: response.status,
        success: true,
        url: response.config.url,
    })

    logger.info(`Success on ${response.config.method.toUpperCase()} to ${url} (${response.duration})`)
    return response
}

export function errorInterceptor(error) {

    console.log('errorInterceptor Request')
    console.log(error.request)
    console.log('errorInterceptor Response')
    console.log(error.response)

    error.config.metadata.endTime = new Date()
    error.duration = error.config.metadata.endTime - error.config.metadata.startTime

    const logger = log4jui.getLogger('return')

    const url = shorten(error.config.url, config.maxLogLine)

    // application insights logging
    logger.trackRequest({
        duration: error.duration,
        name: `Service ${error.config.method.toUpperCase()} call`,
        resultCode: error.status,
        success: true,
        url: error.config.url,
    })

    const status = valueOrNull(error, 'response.status') ? error.response.status : Error(error).message
    let data = valueOrNull(error, 'response.data.details')
    if (!data) {
        data = valueOrNull(error, 'response.status') ? JSON.stringify(error.response.data, null, 2) : null
        logger.error(`Error on ${error.config.method.toUpperCase()} to ${url} in (${error.duration}) - ${error} \n
        ${exceptionFormatter(data, exceptionOptions)}`)
    } else {
        logger.error(`Error on ${error.config.method.toUpperCase()} to ${url} in (${error.duration}) - ${error} \n
        ${JSON.stringify(data)}`)
    }

    errorStack.push(['request', JSON.parse(stringify(error.request))])
    errorStack.push(['response', JSON.parse(stringify(error.response))])

    return Promise.reject(error.response)
}
