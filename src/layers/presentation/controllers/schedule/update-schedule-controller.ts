import { HttpProtocol, HttpRequest, HttpResponse, Validate, badRequest, notFound, ok } from "@/layers/presentation";
import { UpdateScheduleUseCaseProtocol, NotFoundError } from "@/layers/use-cases";


export class UpdateScheduleController implements HttpProtocol {

	constructor(private readonly useCase: UpdateScheduleUseCaseProtocol) { }

	async handle(request: HttpRequest): Promise<HttpResponse> {
		const { id, description, startDate, endDate } = request.data;

		const loggedUserId = request.userId;

		const validation = Validate.fields(
			[
				{ name: "id", type: "string" },
				{ name: "description", type: "string", nullable: true },
				{ name: "startDate", type: "string", nullable: true },
				{ name: "endDate", type: "string", nullable: true },
			],
			{ id, description, startDate, endDate }
		);

		if (validation instanceof Error) return badRequest(validation);

		const response = await this.useCase.execute(id, { description, startDate, endDate }, loggedUserId);

		if (response instanceof Error) return response instanceof NotFoundError ? notFound(response) : badRequest(response);

		return ok(response);
	}
}