import { HttpProtocol } from "../protocols";
import { HttpRequest, HttpResponse } from "../ports";
import { server } from "../helpers";

export class TreatmentDecorator implements HttpProtocol {

	constructor(private readonly controller: HttpProtocol) { }

	async handle(request: HttpRequest): Promise<HttpResponse> {
		try {
			return await this.controller.handle(request);
		} catch (e) {
			return server();
		}
	}
}