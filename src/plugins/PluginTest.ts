import { Plugin, BOOT_STAGES } from "@expressive-tea/plugin"
import { Stage } from "@expressive-tea/plugin/decorators"
import { Express } from "express"

export default class PluginTest extends Plugin {
	protected name: string = "Plugin Test"
	protected priority: number = 100
	protected dependencies: string[] = []

	@Stage(BOOT_STAGES.BOOT_DEPENDENCIES)
	test(server: Express) {
		console.log("Executed Test???")
		server.use((req, res, next) => {
			console.log("TEST from Plugin")
			next()
		})
	}

	@Stage(BOOT_STAGES.APPLICATION)
	secondTest(server: Express) {
		console.log("Executed Second Test???")
		server.use((req, res, next) => {
			console.log("SECOND TEST from Plugin")
			next()
		})
	}
}
