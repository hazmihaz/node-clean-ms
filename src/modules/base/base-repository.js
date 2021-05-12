/**
 * BaseRepository
 * Implementation of repository based on mongoose model
 */
class BaseRepository {
    /**
     * @param {Object} model - mongoose model
     */
    constructor(model) {
        this.model = model
    }

    async get(_id) {
        try {
            const item = await this.model.findOne({ _id })
            return {
                data: item,
            }
        } catch (e) {
            return {
                error: true,
                message: e || 'Error get item.',
            }
        }
    }

    async find(query = {}) {
        try {
            let { skip, limit } = query
            skip = skip ? Number(skip) : 0
            limit = limit ? Number(limit) : 10
            delete query.skip
            delete query.limit

            const items = await this.model.find(query).skip(skip).limit(limit)
            return {
                data: items,
            }
        } catch (e) {
            return {
                error: true,
                message: e || 'Error finding item.',
            }
        }
    }

    async count(query = {}) {
        try {
            delete query.skip
            delete query.limit

            const count = await this.model.countDocuments(query)
            return {
                data: count,
            }
        } catch (e) {
            return {
                error: true,
                message: e || 'Error finding item.',
            }
        }
    }
}

export default BaseRepository
