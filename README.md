# Sistema Descontão

Sistema web de cupons de desconto entre associados e comerciantes.

Projeto desenvolvido para disciplina de Prática Extensionista V do curso de Engenharia de Software da Unaerp - RP.

## Configuração

### 1. Banco de Dados
```bash
mysql -u root -p < descontao-backend/descontao.sql
```

### 2. Backend
```bash
cd descontao-backend
mvn spring-boot:run
```

### 3. Frontend  
```bash
cd descontao-frontend
npm install
npm run dev
```

## Acesso
- Frontend: http://localhost:5173
- Backend: http://localhost:8080

## Funcionalidades
- Cadastro/Login de Associados (CPF) e Comerciantes (CNPJ)
- Criação e gestão de cupons com códigos únicos
- Reserva e validação de cupons
- Filtros e consultas por categoria/status
- **Recuperação de senha via email**

## Usuários de Teste
| Tipo | Email | CPF/CNPJ | Senha |
|------|-------|----------|-------|
| Associado | joao@teste.com | 12345678901 | 123456 |
| Comercio | comercio@teste.com | 12345678000123 | comercio123 |

## Tecnologias
- **Backend:** Java 17, Spring Boot, MySQL
- **Frontend:** React 18, Material-UI, Vite
