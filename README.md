# Goalfy - Sistema de Registro de Clientes

Sistema completo de gerenciamento de clientes desenvolvido seguindo os princípios de **Domain-Driven Design (DDD)**. O projeto consiste em um **Front-end** desenvolvido em **React com TypeScript** e **styled-components**, e um **Back-end** em **Java Spring Boot** com API REST.

## 📋 Descrição do Projeto

O Goalfy é uma aplicação web para registro e gerenciamento de clientes. Permite realizar operações completas de **CRUD (Create, Read, Update, Delete)** sobre clientes, incluindo validação de dados, busca integrada e preenchimento automático de endereço através de API pública de CEP.

### Funcionalidades

- ✅ **Cadastro de Clientes**: Modal com formulário completo para cadastro de novos clientes
- ✅ **Listagem de Clientes**: Tabela responsiva com todos os clientes cadastrados
- ✅ **Busca de Clientes**: Pesquisa em tempo real por nome, email, telefone ou CNPJ
- ✅ **Validação de Campos**: Validação completa de email, CNPJ, CEP e telefone
- ✅ **Integração com ViaCEP**: Preenchimento automático de endereço através do CEP
- ✅ **Interface Moderna**: Design seguindo as especificações do Figma

## 🛠 Tecnologias Utilizadas

### Front-end
- **React 19.2.0** - Biblioteca JavaScript para construção de interfaces
- **TypeScript 5.9.3** - Superset do JavaScript com tipagem estática
- **Styled-components 6.1.12** - CSS-in-JS para estilização
- **React Icons 5.5.0** - Biblioteca de ícones para React
- **Axios 1.7.7** - Cliente HTTP para requisições à API
- **Vite 7.2.4** - Build tool e dev server
- **ESLint 9.39.1** - Linter para JavaScript/TypeScript

### Back-end
- **Java 17** - Linguagem de programação
- **Spring Boot 4.0.1** - Framework para aplicações Java
- **Spring Data JPA** - Abstração para persistência de dados
- **Spring Web** - Framework web para criação de APIs REST
- **Spring Validation** - Validação de dados
- **H2 Database** - Banco de dados em memória
- **Lombok** - Redução de boilerplate code
- **Maven** - Gerenciador de dependências

## 📁 Estrutura do Projeto

### Front-end (DDD Structure)
```
frontend/src/
├── domain/                    # Camada de Domínio
│   ├── entities/             # Entidades do domínio
│   │   └── Client.ts
│   └── services/             # Serviços de domínio
│       └── validationService.ts
├── application/              # Camada de Aplicação
│   └── hooks/                # Hooks customizados
│       ├── useClients.ts
│       └── useCep.ts
├── infrastructure/           # Camada de Infraestrutura
│   └── api/                  # Integração com APIs
│       ├── clientApi.ts
│       └── cepApi.ts
├── presentation/             # Camada de Apresentação
│   ├── components/           # Componentes React
│   │   ├── Header/
│   │   ├── ActionBar/
│   │   ├── ClientTable/
│   │   └── ClientModal/
│   ├── contexts/             # Contexts do React
│   │   └── ClientContext.tsx
│   └── pages/                # Páginas da aplicação
│       └── ClientRegisterPage.tsx
└── shared/                   # Recursos compartilhados
    └── styles/               # Estilos globais e tema
        ├── theme.ts
        └── GlobalStyles.ts
```

### Back-end (DDD Structure)
```
goalfyBackend/src/main/java/com/app/goalfybackend/
├── domain/                   # Camada de Domínio
│   ├── dto/                  # Data Transfer Objects
│   │   ├── ClientRequestDTO.java
│   │   └── ClientsResponseDTO.java
│   ├── exception/            # Exceções de domínio
│   │   ├── DomainException.java
│   │   ├── ClientNotFoundException.java
│   │   ├── InvalidEmailException.java
│   │   ├── InvalidCnpjException.java
│   │   └── InvalidAddressException.java
│   ├── model/                # Modelos de domínio
│   │   └── Cnpj.java
│   └── service/              # Serviços de domínio
│       └── ClientsService.java
├── infrastructure/           # Camada de Infraestrutura
│   ├── entity/               # Entidades JPA
│   │   └── ClientsEntity.java
│   └── repository/           # Repositórios
│       └── JPAClientsRepository.java
└── interfaces/               # Camada de Interface
    └── ClientController.java # Controller REST
```

## 🚀 Instalação e Execução

### Pré-requisitos

#### Para o Front-end:
- **Node.js** 18.0.0 ou superior
- **npm** 9.0.0 ou superior (geralmente vem com Node.js)

#### Para o Back-end:
- **Java JDK** 17 ou superior
- **Maven** 3.6.0 ou superior (ou use o Maven Wrapper incluído no projeto)

#### Verificando as versões instaladas:
```bash
# Verificar Node.js
node --version

# Verificar npm
npm --version

# Verificar Java
java -version

# Verificar Maven (se instalado globalmente)
mvn --version
```

### Back-end

#### Passo 1: Navegar até o diretório
```bash
cd goalfyBackend
```

#### Passo 2: Instalar dependências e compilar
O projeto utiliza Maven Wrapper, então não é necessário ter Maven instalado globalmente.

**No Linux/macOS:**
```bash
./mvnw clean install
```

**No Windows:**
```bash
mvnw.cmd clean install
```

#### Passo 3: Executar a aplicação

**No Linux/macOS:**
```bash
./mvnw spring-boot:run
```

**No Windows:**
```bash
mvnw.cmd spring-boot:run
```

O servidor estará disponível em: `http://localhost:8080`

#### Configuração do Banco de Dados

O projeto utiliza **H2 Database** em memória. A configuração está em `goalfyBackend/src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:h2:mem:goalfydb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# JPA Configuration
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# H2 Console
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# Server Configuration
server.port=8080
```

**Acessando o Console H2:**

1. Com a aplicação rodando, acesse: `http://localhost:8080/h2-console`
2. Preencha os campos de conexão:
   - **JDBC URL**: `jdbc:h2:mem:goalfydb`
   - **Username**: `sa`
   - **Password**: (deixe vazio)
3. Clique em "Connect"

**⚠️ Importante:** O banco H2 é em memória, então todos os dados serão perdidos quando a aplicação for reiniciada.

### Front-end

#### Passo 1: Navegar até o diretório
```bash
cd frontend
```

#### Passo 2: Instalar dependências
```bash
npm install
```

Este comando instalará todas as dependências listadas no `package.json`:
- React e React DOM
- TypeScript
- Styled-components
- React Icons
- Axios
- Vite e plugins relacionados

#### Passo 3: Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do diretório `frontend`:

**No Linux/macOS:**
```bash
cp .env.example .env
```

**No Windows:**
```bash
copy .env.example .env
```

**Ou crie manualmente o arquivo `.env` com o seguinte conteúdo:**
```env
VITE_API_URL=http://localhost:8080/api
```

**Variáveis de ambiente disponíveis:**
- `VITE_API_URL` - URL base da API backend (padrão: `http://localhost:8080/api`)

**⚠️ Nota:** Se você alterar a porta do backend, atualize esta variável de ambiente.

#### Passo 4: Executar o servidor de desenvolvimento
```bash
npm run dev
```

A aplicação estará disponível em: `http://localhost:5173` (ou outra porta indicada pelo Vite no terminal)

**Scripts disponíveis:**
- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa o linter ESLint

### Build de Produção

#### Front-end
```bash
cd frontend
npm run build
```

Os arquivos serão gerados em `frontend/dist/`

#### Back-end
```bash
cd goalfyBackend
./mvnw clean package
```

O JAR será gerado em `goalfyBackend/target/goalfyBackend-0.0.1-SNAPSHOT.jar`

Execute com:
```bash
java -jar target/goalfyBackend-0.0.1-SNAPSHOT.jar
```

## 📡 API REST - Endpoints

Base URL: `http://localhost:8080/api/clients`

### 1. Listar todos os clientes
```http
GET /api/clients
```

**Parâmetros de query (opcional):**
- `search` - Termo de busca para filtrar clientes

**Resposta (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Integrare Assessoria de Marketing",
    "email": "anton_archer@hotmail.com",
    "telephone": "47999615273",
    "cnpj": "11049277996",
    "cep": "89201-000",
    "address": "R. Benjamin Constant, 3.2...",
    "city": "Joinville"
  }
]
```

### 2. Buscar cliente por ID
```http
GET /api/clients/{id}
```

**Resposta (200 OK):**
```json
{
  "id": 1,
  "name": "Integrare Assessoria de Marketing",
  "email": "anton_archer@hotmail.com",
  "telephone": "47999615273",
  "cnpj": "11049277996",
  "cep": "89201-000",
  "address": "R. Benjamin Constant, 3.2...",
  "city": "Joinville"
}
```

### 3. Criar novo cliente
```http
POST /api/clients
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Nome do Cliente",
  "email": "cliente@email.com",
  "telephone": "47999999999",
  "cnpj": "12345678000199",
  "cep": "89201-000",
  "address": "Rua Exemplo, 123",
  "city": "Joinville"
}
```

**Resposta (201 Created):**
```json
{
  "id": 1,
  "name": "Nome do Cliente",
  "email": "cliente@email.com",
  "telephone": "47999999999",
  "cnpj": "12345678000199",
  "cep": "89201-000",
  "address": "Rua Exemplo, 123",
  "city": "Joinville"
}
```

### 4. Atualizar cliente
```http
PUT /api/clients/{id}
Content-Type: application/json
```

**Body:** (mesmo formato do POST)

**Resposta (200 OK):**
```json
{
  "id": 1,
  "name": "Nome Atualizado",
  ...
}
```

### 5. Deletar cliente
```http
DELETE /api/clients/{id}
```

**Resposta (204 No Content)**

### Exemplos de Requisições para a API

#### Usando cURL

**1. Listar todos os clientes:**
```bash
curl -X GET http://localhost:8080/api/clients
```

**2. Buscar clientes (com filtro de busca):**
```bash
curl -X GET "http://localhost:8080/api/clients?search=Integrare"
```

**3. Buscar cliente por ID:**
```bash
curl -X GET http://localhost:8080/api/clients/1
```

**4. Criar novo cliente:**
```bash
curl -X POST http://localhost:8080/api/clients \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Novo Cliente",
    "email": "novo@email.com",
    "telephone": "47999999999",
    "cnpj": "12345678000199",
    "cep": "89201-000",
    "address": "Rua Exemplo, 123",
    "city": "Joinville"
  }'
```

**5. Atualizar cliente existente:**
```bash
curl -X PUT http://localhost:8080/api/clients/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Cliente Atualizado",
    "email": "atualizado@email.com",
    "telephone": "47999999999",
    "cnpj": "12345678000199",
    "cep": "89201-000",
    "address": "Rua Exemplo, 123",
    "city": "Joinville"
  }'
```

**6. Deletar cliente:**
```bash
curl -X DELETE http://localhost:8080/api/clients/1
```

#### Usando Postman ou Insomnia

**Configuração básica:**
- **Base URL**: `http://localhost:8080/api/clients`
- **Headers**: `Content-Type: application/json`

**Exemplo de Body (POST/PUT):**
```json
{
  "name": "Empresa Exemplo LTDA",
  "email": "contato@empresaexemplo.com.br",
  "telephone": "47999999999",
  "cnpj": "12345678000199",
  "cep": "89201-000",
  "address": "Rua Benjamin Constant, 320",
  "city": "Joinville"
}
```

#### Usando JavaScript (Fetch API)

```javascript
// Listar todos os clientes
fetch('http://localhost:8080/api/clients')
  .then(response => response.json())
  .then(data => console.log(data));

// Criar novo cliente
fetch('http://localhost:8080/api/clients', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Novo Cliente',
    email: 'novo@email.com',
    telephone: '47999999999',
    cnpj: '12345678000199',
    cep: '89201-000',
    address: 'Rua Exemplo, 123',
    city: 'Joinville'
  })
})
  .then(response => response.json())
  .then(data => console.log(data));
```

#### Códigos de Resposta HTTP

- **200 OK** - Requisição bem-sucedida (GET, PUT)
- **201 Created** - Recurso criado com sucesso (POST)
- **204 No Content** - Recurso deletado com sucesso (DELETE)
- **400 Bad Request** - Dados inválidos na requisição
- **404 Not Found** - Cliente não encontrado
- **500 Internal Server Error** - Erro interno do servidor

## 🎨 Validações Implementadas

### Front-end

O front-end possui validação em tempo real através do `ValidationService`:

- **Nome do Cliente**: Campo obrigatório, não pode estar vazio
- **Email**: 
  - Campo obrigatório
  - Validação de formato usando regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- **Telefone**: 
  - Campo obrigatório
  - Validação de 10 ou 11 dígitos (com ou sem caracteres especiais)
- **CNPJ**: 
  - Campo obrigatório
  - Validação de 11 ou 14 dígitos (aceita CPF ou CNPJ)
- **Endereço**: 
  - Campo obrigatório
  - Preenchimento automático quando CEP é detectado no texto
- **CEP e Cidade**: 
  - Preenchidos automaticamente via API ViaCEP
  - Não são campos obrigatórios no formulário (ocultos)

### Back-end

O back-end possui validações em múltiplas camadas:

- **Validações JPA**:
  - `@Column(nullable = false)` - Campos obrigatórios
  - `@Column(unique = true)` - Email e CNPJ únicos
- **Validações de Domínio**:
  - Exceções customizadas para casos específicos
  - `ClientNotFoundException` - Cliente não encontrado
  - `InvalidEmailException` - Email inválido
  - `InvalidCnpjException` - CNPJ inválido
  - `InvalidAddressException` - Endereço inválido
- **Tratamento Global de Exceções**:
  - `GlobalExceptionHandler` - Centraliza tratamento de erros
  - Retorna respostas HTTP apropriadas com mensagens de erro

## 🔗 Integração com API de CEP

O projeto utiliza a **API ViaCEP** (https://viacep.com.br) para preenchimento automático de endereços. Quando o usuário informa um CEP válido e perde o foco do campo, o sistema busca automaticamente os dados de endereço e preenche os campos correspondentes.

**Endpoint utilizado:**
```
GET https://viacep.com.br/ws/{cep}/json/
```

## 📝 Contexts e Hooks

### Contexts
- **ClientContext**: Contexto React para gerenciamento global do estado de clientes

### Hooks Customizados
- **useClients**: Hook para operações CRUD de clientes
- **useCep**: Hook para busca de endereço através do CEP

## 🏗 Arquitetura DDD

O projeto segue os princípios de **Domain-Driven Design**:

1. **Domain Layer**: Contém as entidades, serviços de domínio e regras de negócio
2. **Application Layer**: Contém casos de uso e orquestração através de hooks
3. **Infrastructure Layer**: Contém implementações técnicas (APIs, repositórios)
4. **Presentation Layer**: Contém componentes UI e contexts

## 📄 Licença

Este projeto foi desenvolvido como parte de um teste técnico.

## 👤 Autor

Desenvolvido seguindo as especificações do teste técnico Goalfy.

## 🔧 Configuração de Dependências

### Front-end

As dependências são gerenciadas pelo `npm` e estão listadas no arquivo `frontend/package.json`.

**Principais dependências:**
- `react` e `react-dom` - Framework React
- `typescript` - Compilador TypeScript
- `styled-components` - Estilização CSS-in-JS
- `react-icons` - Biblioteca de ícones
- `axios` - Cliente HTTP

**Instalação:**
```bash
cd frontend
npm install
```

### Back-end

As dependências são gerenciadas pelo `Maven` e estão listadas no arquivo `goalfyBackend/pom.xml`.

**Principais dependências:**
- `spring-boot-starter-web` - Framework web Spring
- `spring-boot-starter-data-jpa` - Persistência de dados
- `spring-boot-starter-validation` - Validação
- `h2` - Banco de dados H2
- `lombok` - Redução de boilerplate

**Instalação:**
O Maven Wrapper (`mvnw`) baixa automaticamente as dependências na primeira execução.

## 🌐 Variáveis de Ambiente

### Front-end

Arquivo: `frontend/.env`

```env
# URL base da API backend
VITE_API_URL=http://localhost:8080/api
```

**Como alterar:**
1. Edite o arquivo `.env` na raiz do diretório `frontend`
2. Altere o valor de `VITE_API_URL` conforme necessário
3. Reinicie o servidor de desenvolvimento (`npm run dev`)

### Back-end

As configurações estão no arquivo `goalfyBackend/src/main/resources/application.properties`.

**Para alterar a porta do servidor:**
```properties
server.port=8080
```

**Para usar banco de dados diferente (ex: PostgreSQL):**
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/goalfydb
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

## 📝 Notas Importantes

- ⚠️ **Banco de Dados H2**: O banco de dados H2 é em memória, portanto todos os dados serão perdidos ao reiniciar a aplicação. Para produção, recomenda-se substituir por PostgreSQL, MySQL ou outro banco de dados persistente.

- 🔒 **CORS**: A aplicação está configurada para aceitar requisições de qualquer origem (`@CrossOrigin(origins = "*")`). Em produção, configure adequadamente para restringir origens permitidas.

- 🚀 **Performance**: O projeto utiliza Vite para desenvolvimento rápido e build otimizado. O build de produção gera arquivos otimizados e minificados.

- 📦 **Build**: Os arquivos de build do front-end são gerados em `frontend/dist/`. O JAR do back-end é gerado em `goalfyBackend/target/`.

## 🐛 Troubleshooting

### Problemas comuns

**Front-end não conecta ao backend:**
- Verifique se o backend está rodando em `http://localhost:8080`
- Confirme que a variável `VITE_API_URL` no arquivo `.env` está correta
- Verifique o console do navegador para erros de CORS

**Erro ao instalar dependências:**
- Certifique-se de estar usando Node.js 18+
- Tente deletar `node_modules` e `package-lock.json`, depois execute `npm install` novamente

**Backend não inicia:**
- Verifique se a porta 8080 está disponível
- Confirme que Java 17+ está instalado
- Verifique os logs no console para erros específicos

**Banco de dados não conecta:**
- Verifique as credenciais no `application.properties`
- Confirme que o H2 está nas dependências do `pom.xml`
