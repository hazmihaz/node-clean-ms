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
                error: e || 'Error get item.',
            }
        }
    }

    async find({ page, skip, limit, ...query }) {
        try {
            const items = await this.model.find(query).skip(skip).limit(limit)
            return {
                data: items,
            }
        } catch (e) {
            return {
                error: e || 'Error finding item.',
            }
        }
    }

    async count({ page, skip, limit, ...query }) {
        try {
            const count = await this.model.countDocuments(query)
            return {
                data: count,
            }
        } catch (e) {
            return {
                error: e || 'Error finding item.',
            }
        }
    }
}

export default BaseRepository
