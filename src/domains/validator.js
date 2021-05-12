const validator = (schema) => (payload) => {
    const { error } = schema.validate(payload)
    if (error) {
        const message = error.details?.[0]?.message
        return {
            error: true,
            message,
        }
    }
    return true
}

export default validator
