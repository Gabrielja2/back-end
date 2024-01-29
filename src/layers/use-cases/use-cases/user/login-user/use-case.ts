import { AuthenticationProtocol, CryptographyProtocol, UnitOfWorkProtocol } from "@/layers/use-cases/ports";
import { NotFoundError } from "@/layers/use-cases/errors";
import { LoginUserDTO, LoginUserResponseDTO } from "./dtos";
import { LoginUserUseCaseProtocol } from "./protocol";
import { JWT_EXPIRE_IN_SECONDS } from "@/shared";


export class LoginUserUserCase implements LoginUserUseCaseProtocol {

    constructor(
        private readonly unitOfWork: UnitOfWorkProtocol,
        private readonly criptography: CryptographyProtocol,
        private readonly authentication: AuthenticationProtocol
    ) { }

    async execute({ email, password }: LoginUserDTO): Promise<LoginUserResponseDTO> {
        const userRepository = this.unitOfWork.getUserRepository();

        const user = await userRepository.getUserByEmail(email);

        if (!user) return new NotFoundError("Email não cadastrado");

        const compare = await this.criptography.compareHash(user.password, password);

        if (!compare) return new NotFoundError("Senha inválida");

        return this.authentication.createJsonWebToken({ id: user.id, email: user.email, name: user.username }, JWT_EXPIRE_IN_SECONDS);
    }
}