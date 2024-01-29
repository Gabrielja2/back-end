import { HttpProtocol, HttpRequest, HttpResponse, Validate, badRequest, notFound, ok } from "@/layers/presentation";
import { DeleteScheduleUseCaseProtocol, NotFoundError } from "@/layers/use-cases";


export class DeleteScheduleController implements HttpProtocol {

	constructor(private readonly useCase: DeleteScheduleUseCaseProtocol) { }

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