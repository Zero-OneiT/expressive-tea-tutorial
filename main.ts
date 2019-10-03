import Boot from "@zerooneit/expressive-tea/classes/Boot"
import { ServerSettings, RegisterModule, Plug } from "@zerooneit/expressive-tea/decorators/server"
import ToDoModule from "./src/modules/todo/ToDoModule"
import { ExpressiveTeaApplication } from "@zerooneit/expressive-tea/libs/interfaces"
import { BOOT_STAGES } from "@zerooneit/expressive-tea/libs/constants"
import bodyParser from "./src/plugins/body-parser"
import databaseInitialize from "./src/plugins/database"

@ServerSettings({
	port: 8080
})
@Plug(BOOT_STAGES.INITIALIZE_MIDDLEWARES, "Database Config", databaseInitialize, true)
@Plug(BOOT_STAGES.INITIALIZE_MIDDLEWARES, "Body Parser", bodyParser, true)
class Bootstrap extends Boot {
	@RegisterModule(ToDoModule)
	async start(): Promise<ExpressiveTeaApplication> {
		return super.start()
	}
}
const bootstrap = new Bootstrap()
bootstrap.start()
