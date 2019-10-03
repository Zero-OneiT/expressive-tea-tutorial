import {
	Route,
	Get,
	Param,
	Post,
	Put,
	Patch,
	Delete
} from "@zerooneit/expressive-tea/decorators/router"
import { BadRequestException } from "@zerooneit/expressive-tea/exceptions/RequestExceptions"
import { Todo } from "../../../models/todo"

@Route("/")
export default class TodoController {
	@Get("/")
	async index(req, res) {
		res.json(await Todo.find())
	}

	@Param("todoId")
	async getTodoItem(req, res, next, todoId) {
		try {
			req.selectedTodoItem = await Todo.findById(todoId)
			if (!req.selectedTodoItem)
				return next(new BadRequestException("Maybe you should look in another castle"))
			next()
		} catch (e) {
			return next(new BadRequestException("Maybe you should look in another castle"))
		}
	}

	@Get("/:todoId")
	async getTodo(req, res) {
		res.json(req.selectedTodoItem)
	}

	@Post("/")
	async createTodo(req, res) {
		try {
			const todo = new Todo({
				title: req.body.title
			})

			await todo.save()
			res.json(todo)
		} catch (e) {
			res.status(400).json(e)
		}
	}

	@Put("/:todoId")
	async editTodo(req, res) {
		const { title } = req.body
		req.selectedTodoItem.title = title
		res.json(await req.selectedTodoItem.save())
	}

	@Patch("/:todoId/complete")
	async completeTodo(req, res) {
		req.selectedTodoItem.isFinished = true
		res.json(await req.selectedTodoItem.save())
	}

	@Delete("/:todoId")
	async deleteTodo(req, res) {
		res.json(await req.selectedTodoItem.remove())
	}
}
