import { HttpRequest, HttpResponse, HttpProtocol, notFound, badRequest, ok } from "@/layers/presentation";
import { GetSchedulesUseCaseProtocol, NotFoundError } from "@/layers/use-cases";

export class GetSchdulesController implements HttpProtocol {

    constructor(private readonly useCase: GetSchedulesUseCaseProtocol) { }

    async handle(request: HttpRequest): Promise<HttpResponse> {

        const response = await this.useCase.execute();

        if (response instanceof Error) return response instanceof NotFoundError ? notFound(response) : badRequest(response);

        return ok(response);
    }
}