import { HttpProtocol, HttpRequest, HttpResponse, Validate, badRequest, ok } from "@/layers/presentation";
import { UpdateUserByIdUseCaseProtocol } from "@/layers/use-cases";

export class UpdateUserController implements HttpProtocol {

	constructor(private readonly useCase: UpdateUserByIdUseCaseProtocol) { }

	async handle(request: HttpRequest): Promise<HttpResponse> {
		const { id, username, email, password } = request.data;

		const loggedUserId = request.userId;

		const validation = Validate.fields(
			[
				{ name: "id", type: "string" },
				{ name: "username", type: "string", nullable: true },
				{ name: "email", type: "string", nullable: true },
				{ name: "password", type: "string", nullable: true },
			],
			{ id, username, email, password }
		);

		if (validation instanceof Error) return badRequest(validation);

		const response = await this.useCase.execute({ id, username, email, password }, loggedUserId);

		if (response instanceof Error) return badRequest(response);

		return ok(response);
	}
}