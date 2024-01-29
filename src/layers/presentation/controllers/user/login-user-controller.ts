import { HttpProtocol, HttpRequest, HttpResponse, badRequest, ok, unauthorized } from "@/layers/presentation";
import { LoginUserUseCaseProtocol } from "@/layers/use-cases";
import { Validate } from "../utils";

export class LoginUserController implements HttpProtocol {

    constructor(private readonly useCase: LoginUserUseCaseProtocol) { }

    async handle(request: HttpRequest): Promise<HttpResponse> {
        const { email, password } = request.data;

        const validation = Validate.fields([

            { name: "email", type: "string" },
            { name: "password", type: "string" },

        ],
            { email, password }
        );

        if (validation instanceof Error) return badRequest(validation);

        const response = await this.useCase.execute({ email, password });

        if (response instanceof Error) return unauthorized(response);

        return ok(response);
    }
}