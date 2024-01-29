import { HttpProtocol, HttpRequest, HttpResponse } from "@/layers/presentation";

export class ControllerStub implements HttpProtocol {
    handle(request: HttpRequest): Promise<HttpResponse> {
        throw new Error("Method not implemented.");
    }
}