import Response from './response'

class BaseController {
    returnOk(data, message) {
        return new Response('OK', message, null, data)
    }

    returnNotFound() {
        return new Response('NOT_FOUND', 'Not found')
    }

    returnOkPaging(list, page, limit, count) {
        const paging = this.paginateResult(page, limit, count)
        return new Response('OK', 'Success', null, list, paging)
    }

    returnErrMessage(error, message, code = 'ERROR') {
        return new Response(code, message, error)
    }

    returnErr(error) {
        let message = 'Something is wrong at our end. Please try again later.'
        if (error instanceof Error) {
            message = error.toString()
        }
        return new Response('ERROR', message, error)
    }

    paginateQuery({ page, limit, ...query }) {
        page = page ? Number(page) : 0
        limit = limit ? Number(limit) : 0
        limit = Math.min(limit, 100)
        let skip = (page - 1) * limit
        return {
            ...query,
            page,
            skip,
            limit,
        }
    }

    paginateResult(page, limit, count) {
        const totalPage = Math.ceil(count / limit)
        const hasNext = page < totalPage
        return {
            page,
            limit,
            count,
            totalPage,
            hasNext,
        }
    }
}

export default BaseController
