import { HttpRequest, HttpResponse, HttpProtocol, notFound, badRequest, ok } from "@/layers/presentation";
import { GetSchedulesByUserIdUseCaseProtocol, NotFoundError } from "@/layers/use-cases";

export class GetSchdulesByUserIdController implements HttpProtocol {

    constructor(private readonly useCase: GetSchedulesByUserIdUseCaseProtocol) { }

    async handle(request: HttpRequest): Promise<HttpResponse> {
        const userId = request.userId;

        const response = await this.useCase.execute({ userId });

        if (response instanceof Error) return response instanceof NotFoundError ? notFound(response) : badRequest(response);

        return ok(response);
    }
}