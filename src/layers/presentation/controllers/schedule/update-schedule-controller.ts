import { HttpProtocol, HttpRequest, HttpResponse, Validate, badRequest, notFound, ok } from "@/layers/presentation";
import { UpdateScheduleUseCaseProtocol, NotFoundError } from "@/layers/use-cases";


export class UpdateScheduleController implements HttpProtocol {

	constructor(private readonly useCase: UpdateScheduleUseCaseProtocol) { }

	async handle(request: HttpRequest): Promise<HttpResponse> {
		const { id, title, start, end } = request.data;

		const loggedUserId = request.userId;

		const validation = Validate.fields(
			[
				{ name: "id", type: "string" },
				{ name: "title", type: "string", nullable: true },
				{ name: "start", type: "string", nullable: true },
				{ name: "end", type: "string", nullable: true },
			],
			{ id, title, start, end }
		);

		if (validation instanceof Error) return badRequest(validation);

		const response = await this.useCase.execute(id, { title, start, end }, loggedUserId);

		if (response instanceof Error) return response instanceof NotFoundError ? notFound(response) : badRequest(response);

		return ok(response);
	}
}