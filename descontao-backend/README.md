# Descontão Backend

Sistema de cupons de desconto - API REST em Spring Boot

## Como executar

1. **Banco de dados**: Execute o script `descontao.sql` no MySQL
2. **Configuração**: Ajuste as credenciais em `application.properties`
3. **Executar**: `mvn spring-boot:run`

A API estará em `http://localhost:8080`

## Endpoints

- `POST /api/auth/login` - Login
- `POST /api/auth/register/associado` - Cadastro associado  
- `POST /api/auth/register/comercio` - Cadastro comércio
- `GET /api/cupons/disponiveis` - Cupons disponíveis
- `POST /api/cupons/criar` - Criar cupons
- `POST /api/cupons/reservar` - Reservar cupom
- `POST /api/cupons/utilizar` - Utilizar cupom
- `GET /api/categorias` - Listar categorias

## Tecnologias

- Java 17
- Spring Boot 3.2.0
- Spring Data JPA  
- MySQL
- Maven

