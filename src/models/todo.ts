import { model, Schema } from "mongoose";

export const TodoSchema = new Schema(
	{
		title: { type: String, required: true },
		isFinished: { type: Boolean, default: false }
	},
	{ timestamp: true }
);

export const Todo = model("Todo", TodoSchema);
