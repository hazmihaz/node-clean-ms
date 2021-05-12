export default {
    name: 'user',
    schema: {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    options: { timestamps: true },
}
