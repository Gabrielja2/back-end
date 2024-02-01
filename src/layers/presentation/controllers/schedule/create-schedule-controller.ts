import { badRequest, created, HttpResponse, HttpProtocol, HttpRequest, Validate } from "@/layers/presentation";
import { CreateScheduleUseCaseProtocol } from "@/layers/use-cases";

export class CreateScheduleController implements HttpProtocol {

    constructor(private readonly useCase: CreateScheduleUseCaseProtocol) { }

    async handle(request: HttpRequest): Promise<HttpResponse> {
        const { title, start, end } = request.data;
        const loggedUserId = request.userId;

        const validation = Validate.fields(
            [
                { name: "title", type: "string" },
                { name: "start", type: "string" },
                { name: "end", type: "string" }

            ],
            { title, start, end }
        );

        if (validation instanceof Error) return badRequest(validation);

        const response = await this.useCase.execute({ title, start, end }, loggedUserId);

        if (response instanceof Error) return badRequest(response);

        return created(response);
    }
}