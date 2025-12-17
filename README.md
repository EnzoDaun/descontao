# Sistema Descontão

Sistema web de cupons de desconto.

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
- Cadastro/Login de Associados e Comerciantes
- Criação e gestão de cupons
- Reserva e utilização de cupons
