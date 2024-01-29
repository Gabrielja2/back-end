import { HttpProtocol, HttpRequest, HttpResponse, badRequest, created } from "@/layers/presentation";
import { CreateUserUseCaseProtocol } from "@/layers/use-cases";
import { Validate } from "../utils";

export class CreateUserController implements HttpProtocol {

	constructor(private readonly useCase: CreateUserUseCaseProtocol) { }

	async handle(request: HttpRequest): Promise<HttpResponse> {
		const { username, email, password, confirmPassword } = request.data;

		const validation = Validate.fields(
			[
				{ name: "username", type: "string" },
				{ name: "email", type: "string" },
				{ name: "password", type: "string" },
				{ name: "confirmPassword", type: "string" },

			],
			{ username, email, password, confirmPassword }
		);

		if (validation instanceof Error) return badRequest(validation);

		const response = await this.useCase.execute({ username, email, password, confirmPassword });

		if (response instanceof Error) return badRequest(response);

		return created(response);
	}
}