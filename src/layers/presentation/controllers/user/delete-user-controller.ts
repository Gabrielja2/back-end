import { HttpProtocol, HttpRequest, HttpResponse, Validate, badRequest, notFound, ok } from "@/layers/presentation";
import { DeleteUserUseCaseProtocol, NotFoundError } from "@/layers/use-cases";


export class DeleteUserController implements HttpProtocol {

	constructor(private readonly useCase: DeleteUserUseCaseProtocol) { }

	async handle(request: HttpRequest): Promise<HttpResponse> {
		const { id } = request.data;

		const loggedUserId = request.userId;

		const validation = Validate.fields(
			[
				{ name: "id", type: "string" },
			],
			{ id }
		);

		if (validation instanceof Error) return badRequest(validation);

		const response = await this.useCase.execute({ id }, loggedUserId);

		if (response instanceof Error) return response instanceof NotFoundError ? notFound(response) : badRequest(response);

		return ok(response);
	}
}