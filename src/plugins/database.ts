import * as mongoose from "mongoose"

export default async function databaseInitialize() {
	await mongoose.connect(process.env.MONGO_URL, {
		useCreateIndex: true,
		useNewUrlParser: true
	})

	require("../models/todo")
}
