import { badRequest, created, HttpResponse, HttpProtocol, HttpRequest, Validate } from "@/layers/presentation";
import { CreateScheduleUseCaseProtocol } from "@/layers/use-cases";

export class CreateScheduleController implements HttpProtocol {

    constructor(private readonly useCase: CreateScheduleUseCaseProtocol) { }

    async handle(request: HttpRequest): Promise<HttpResponse> {
        const { description, startDate, endDate } = request.data;
        const loggedUserId = request.userId;

        const validation = Validate.fields(
            [
                { name: "description", type: "string" },
                { name: "startDate", type: "string" },
                { name: "endDate", type: "string" }

            ],
            { description, startDate, endDate }
        );

        if (validation instanceof Error) return badRequest(validation);

        const response = await this.useCase.execute({ description, startDate, endDate }, loggedUserId);

        if (response instanceof Error) return badRequest(response);

        return created(response);
    }
}