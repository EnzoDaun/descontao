# Descontão Backend

Sistema de cupons de desconto - API REST em Spring Boot

## Como executar

1. **Banco de dados**: Execute o script `descontao.sql` no MySQL
2. **Configuração**: Ajuste as credenciais em `application.properties` se necessário
3. **Executar**: `mvn spring-boot:run`

A API estará em `http://localhost:8080`

## Endpoints

### Autenticação
- `POST /api/auth/login` - Login
- `POST /api/auth/register/associado` - Cadastro associado  
- `POST /api/auth/register/comercio` - Cadastro comércio

### Cupons
- `GET /api/cupons/disponiveis` - Cupons disponíveis
- `POST /api/cupons/criar` - Criar cupons
- `POST /api/cupons/reservar` - Reservar cupom
- `POST /api/cupons/utilizar` - Utilizar cupom

### Outros
- `GET /api/categorias` - Listar categorias

### Recuperação de Senha
- `POST /api/password-reset/request` - Solicitar redefinição
- `GET /api/password-reset/validate-token` - Validar token
- `POST /api/password-reset/confirm` - Confirmar nova senha

## Tecnologias

- Java 17
- Spring Boot 3.2.0
- Spring Data JPA  
- Spring Mail (Gmail SMTP)
- MySQL
- Maven

## Configuração Email (Opcional)

Para funcionar a recuperação de senha, configure no `application.properties`:

```properties
spring.mail.username=seu-email@gmail.com
spring.mail.password=sua-senha-de-app-gmail
```

