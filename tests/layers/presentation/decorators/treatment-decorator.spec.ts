import { ControllerStub } from "./stubs";
import { TreatmentDecorator, server } from "@/layers/presentation";

describe("Presentation - TreatmentDecorator", () => {

    test("Should return server error", async () => {
        const controllerStub = new ControllerStub();
        const sut = new TreatmentDecorator(controllerStub);

        const result = await sut.handle({ headers: {} });

        expect(result).toEqual(server());
    });
});