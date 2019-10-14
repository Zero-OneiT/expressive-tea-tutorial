import * as mongoose from "mongoose"

export default async function databaseInitialize() {
	await mongoose.connect(process.env.MONGO_URL || "mongodb://localhost/todo-dev", {
		useCreateIndex: true,
		useNewUrlParser: true
	})

	require("../models/todo")
}
