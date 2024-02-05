# Sejam bem vindos ao repositório backend do My-calendar!

Este projeto foi completamente desenvolvido em TypeScript, utilizando Node.js, Express.js, Prisma, Postgresql e outras bibliotecas auxiliares como, jsonwebtoken, bcrypt, jest, entre algumas outras. 🚀

Foi totalmente desenvolvido seguindo os pilares da programação orientada a objeto (POO), e seguindo alguns padrões de projeto e arquitetura, como separaçção dos casos de uso em use-cases, para o nosso domínio da aplicação foi criadas as entidade no formato de object-value, também separei as camadas em layers e main.
A camada Layer está toda a parte das entidades, as controladoras na camada presentation, tudo que for biblioteca externa está na camada external, assim como os repositórios, qualquer import feito de módulos external são feitos na camada external.
A camada main está todas as nossas factories para atender a camada layer, além de conter todas as rotas e configurações rest.

# Orientações

## Antes de começar a desenvolver

👀 Leia essa parte atentamente, pois aqui você encontrará informações importantes para rodar corretamente o projeto.

<details>
<summary><strong> 🔰 Instruções </strong></summary><br />

1. Clone o repositório

-   `git clone https://github.com/Gabrielja2/back-end-my-calendary.git`

2. Entre na pasta do repositório que você acabou de clonar:

-   `cd pasta-do-repositório`

3. Instale as dependências

-   `npm install`

4. Configure as variáveis de ambiente, é <strong>Obrigatório</strong> para funcionar corretamente:

-   Crie um arquivo .env na raiz do projeto e preencha com as variáveis de ambiente, como as exemplo do arquivo env.ts, lembre que é obrigatório algumas dessas váriaveis para conseguir rodar o servidor como PORT, eu utilizei a porta`3333` mas pode ser qualquer uma que não esteja sendo usada na sua máquina, e DATABASE_URL, eu utilize um banco postgress que criei na vercel: `postgres://default:4Mv6qsblwaJL@ep-twilight-morning-a4zygmwo.us-east-1.postgres.vercel-storage.com:5432/verceldb`

6. Dentro do diretório back-end-my-calendary, abra um terminal e inicie rode o projeto:

-   `npm run dev`

</details><br />

# Rotas

## Autenticação

São as rotas para logar ou registrar um novo usuário

<details>
<summary><strong>Rota de Login</strong></summary>

-   Método: POST
-   URL: API_BASE_URL/users/login
-   Descrição: Realiza o login de um usuário cadastrado.
-   Parâmetros de entrada:
    -   email: String (obrigatório) - E-mail do usuário.
    -   password: String (obrigatório) - Senha do usuário.
-   Resposta de sucesso:
    -   Código: 200
    -   Corpo: Objeto contendo o token de autenticação do usuário.
    </details><br />

<details>
<summary><strong>Rota de Registro</strong></summary>

-   Método: POST
-   URL: API_BASE_URL/users
-   Descrição: Registra um novo usuário.
-   Parâmetros de entrada:
    -   username: String (obrigatório) - Nome do usuário.
    -   email: String (obrigatório) - E-mail do usuário.
    -   password: String (obrigatório) - Senha do usuário.
    -   confirmPassword: String (obrigatório) - Senha do usuário.
-   Resposta de sucesso:
    -   Código: 201
    -   Corpo: String com o email do usuário criado.
    </details><br /><br />

# ⚠️ Rotas Protegidas por Autenticação

## User

As rotas a seguir exigem autenticação utilizando o token gerado no processo de login ou registro.

<details>
<summary><strong>Rota listar usuários</strong></summary>

-   Método: GET
-   URL: API_BASE_URL/users
-   Descrição: Retorna as informações dos usuários. Requer autenticação.
-   Resposta de sucesso:
    -   Código: 200
    -   Corpo: Objeto contendo as informações dos usuários.
    </details><br />

<summary><strong>Rota de atualização do usuário</strong></summary>

-   Método: PATCH
-   URL: API_BASE_URL/users/id/:id
-   Descrição: Atualiza as informações do usuário autenticado. Requer autenticação.
-   Parâmetros de entrada:

    -   username: String (opcional) - Novo nome do usuário.
    -   email: String (opcional) - Novo e-mail do usuário.
    -   password: String (obrigatório) - Senha do usuário.
    -   confirmPassword: String (obrigatório) - Senha do usuário.

-   Resposta de sucesso:
    -   Código: 200
    -   Corpo: String com o email do usuário atualizado.
    </details><br />

<details>
<summary><strong>Rota de exclusão do usuário</strong></summary>

-   Método: DELETE
-   URL: API_BASE_URL/users/id/:id
-   Descrição: Exclui um usuário. Requer autenticação.
-   Resposta de sucesso:
    -   Código: 200
    -   Corpo: String com o id do usuário excluído.
    </details><br />

## Rotas de Schedules

<details>
<summary><strong>Rota de registro de evento</strong></summary>

-   Método: POST
-   URL: API_BASE_URL/schedules
-   Descrição: Registra um novo evento. Requer autenticação.
-   Parâmetros de entrada:
    -   title: String (obrigatório) - Sabor do suco.
    -   start: String (obrigatório) - Descrição do suco.
    -   end: Number (obrigatório) - Preço do suco.
-   Resposta de sucesso:
    -   Código: 201
    -   Corpo: String com o id do evento criado.
    </details><br />

<details>
<summary><strong>Rota de listagem de eventos</strong></summary>

-   Método: GET
-   URL: API_BASE_URL/schedules
-   Descrição: Retorna a lista de eventos cadastrados. Requer autenticação.
-   Resposta de sucesso:
    -   Código: 200
    -   Corpo: Array contendo os objetos dos eventos cadastrados.
    </details><br />

<details>
<summary><strong>Rota de listar eventos de um usuário</strong></summary>

-   Método: GET
-   URL: API_BASE_URL/schedules/user
-   Descrição: Retorna a lista de eventos cadastrados para determinado ususário. Requer autenticação.
-   Parâmetros de entrada:
    -   id: String (obrigatório) - ID do suco.
-   Resposta de sucesso:
    -   Código: 200
    -   Corpo: Array contendo os objetos dos eventos cadastrados pelo usuário.
    </details><br />

<details>
<summary><strong>Rota de atualização de evento</strong></summary>

-   Método: PATCH
-   URL: API_BASE_URL/schedules/id/:id
-   Descrição: Atualiza as informações de um evento específico pelo seu ID. Requer autenticação.
-   Parâmetros de entrada:
    -   id: String (obrigatório) - ID do evento.
    -   title: String (opcional) - Novo titulo do evento.
    -   start: String (opcional) - Nova data e hora inicial.
    -   end: Number (opcional) - Nova data e hora final.
-   Resposta de sucesso:
    -   Código: 200
    -   Corpo: String com o id do evento atualizado.
    </details><br />

<details>
<summary><strong>Rota de Exclusão de evento</strong></summary>

-   Método: DELETE
-   URL: API_BASE_URL/schedules/id/:id
-   Descrição: Exclui um evento específico pelo seu ID. Requer autenticação.
-   Parâmetros de entrada:
    -   id: String (obrigatório) - ID do evento.
-   Resposta de sucesso:
    -   Código: 200
    -   Corpo: String contendo uma mensagem de confirmação da exclusão.
    </details><br />
