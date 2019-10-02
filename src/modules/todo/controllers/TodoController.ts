import {Route,Get,Param,Post,Put,Patch,Delete} from "@zerooneit/expressive-tea/decorators/router"
import { ITodo, todos } from "../data/todos"
import { find, max, map, remove } from "lodash"
import { BadRequestException } from "@zerooneit/expressive-tea/exceptions/RequestExceptions"

@Route("/")
export default class TodoController {
	@Get("/")
	async index(req, res) {
		res.json(todos)
	}

	@Param("todoId")
	getTodoItem(req, res, next, todoId) {
		req.selectedTodoItem = find(todos, { id: parseInt(todoId, 10) })
		if (!req.selectedTodoItem)
			return next(new BadRequestException("Maybe you should look in another castle"))
		next()
	}

	@Get("/:todoId")
	async getTodo(req, res) {
		res.json(req.selectedTodoItem)
	}

	@Post("/")
	createTodo(req, res) {
		const todo: ITodo = {
			id: max(map(todos, t => t.id)) + 1,
			title: req.body.title,
			isFinished: false
		}

		todos.push(todo)
		res.json(todo)
	}

	@Put("/:todoId")
	editTodo(req, res) {
		const { title } = req.body
		req.selectedTodoItem.title = title
		res.json(req.selectedTodoItem)
	}

	@Patch("/:todoId/complete")
	completeTodo(req, res) {
		req.selectedTodoItem.isFinished = true
		res.json(req.selectedTodoItem)
	}

	@Delete("/:todoId")
	deleteTodo(req, res) {
		const deletedTodos = remove(todos, { id: req.selectedTodoItem.id })
		res.json(deletedTodos)
	}
}