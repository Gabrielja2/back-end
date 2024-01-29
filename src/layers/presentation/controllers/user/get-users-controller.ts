import { HttpProtocol, HttpResponse, badRequest, notFound, ok } from "@/layers/presentation";
import { GetUsersUseCaseProtocol, NotFoundError } from "@/layers/use-cases";


export class GetUsersController implements HttpProtocol {

	constructor(private readonly useCase: GetUsersUseCaseProtocol) { }

	async handle(): Promise<HttpResponse> {

		const response = await this.useCase.execute();

		if (response instanceof Error) return response instanceof NotFoundError ? notFound(response) : badRequest(response);

		return ok(response);
	}
}