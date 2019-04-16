




const response = (status, dev_msg, data) => {
    switch (status) {
        case 200: return { status: 200, message: "OK", dev_msg: dev_msg, result: data }
        case 201: return { status: 201, message: "Created", dev_msg: dev_msg, result: data }
        case 202: return { status: 202, message: "Accepted", dev_msg: dev_msg, result: data }
        case 203: return { status: 203, message: "Non-Authoritative Information", dev_msg: dev_msg, result: data }
        case 204: return { status: 204, message: "No Content", dev_msg: dev_msg, result: data }
        case 205: return { status: 205, message: "Reset Content", dev_msg: dev_msg, result: data }
        case 206: return { status: 206, message: "Partial Content", dev_msg: dev_msg, result: data }

        case 300: return { status: 300, message: "Multiple Choice", dev_msg: dev_msg, result: data }
        case 301: return { status: 301, message: "Moved Permanently", dev_msg: dev_msg, result: data }
        case 302: return { status: 302, message: "Found", dev_msg: dev_msg, result: data }
        case 303: return { status: 303, message: "See Other", dev_msg: dev_msg, result: data }
        case 304: return { status: 304, message: "Not Modified", dev_msg: dev_msg, result: data }

        case 400: return { status: 400, message: "Bad Request", dev_msg: dev_msg, result: data }
        case 401: return { status: 401, message: "Unauthorized", dev_msg: dev_msg, result: data }
        case 402: return { status: 402, message: "Payment Required", dev_msg: dev_msg, result: data }
        case 403: return { status: 403, message: "Forbidden", dev_msg: dev_msg, result: data }
        case 404: return { status: 404, message: "Not Found", dev_msg: dev_msg, result: data }
        case 405: return { status: 405, message: "Method Not Allowed", dev_msg: dev_msg, result: data }
        case 406: return { status: 406, message: "Not Acceptable", dev_msg: dev_msg, result: data }
        case 413: return { status: 413, message: "Request Entity Too Large", dev_msg: dev_msg, result: data }
        case 414: return { status: 414, message: "Request-URI Too Long", dev_msg: dev_msg, result: data }
        case 415: return { status: 415, message: "Unsupported Media Type", dev_msg: dev_msg, result: data }

        case 500: return { status: 500, message: "Internal Server Error", dev_msg: dev_msg, result: data }
        case 501: return { status: 501, message: "Not Implemented", dev_msg: dev_msg, result: data }
        case 502: return { status: 502, message: "Bad Gateway", dev_msg: dev_msg, result: data }
        case 503: return { status: 503, message: "Service Unavailable", dev_msg: dev_msg, result: data }
        case 504: return { status: 504, message: "Gateway Timeout", dev_msg: dev_msg, result: data }
    }
}
module.exports = {
    
    server_response: response
  
}