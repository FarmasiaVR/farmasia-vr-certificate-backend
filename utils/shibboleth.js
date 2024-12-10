import headersMiddleware from 'unfuck-utf8-headers-middleware'

const headers = ['hyGroupCn']

export default headersMiddleware(headers)