# ConfiSafe - Integração Backend Spring Boot

## 📋 Estrutura de Serviços Criada

O frontend está preparado para se integrar com o backend Java Spring Boot através de uma camada de serviços bem estruturada:

### 🗂️ Estrutura de Arquivos

```
src/services/
├── api.js                      # Configuração Axios + Interceptors
├── authService.js              # Autenticação e JWT
├── empresaService.js           # Gerenciamento de empresas
├── usuarioService.js           # CRUD de usuários/funcionários
├── epiService.js               # Gerenciamento de EPIs
├── treinamentoService.js       # Treinamentos
├── relatorioService.js         # Relatórios
└── controleAcessoService.js    # Controle de acesso a espaços confinados
```

## 🔧 Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
REACT_APP_API_URL=http://localhost:8080/api
```

### 2. Instalar Dependências

O projeto precisa do Axios para fazer as requisições HTTP:

```bash
npm install axios
```

## 🎯 Endpoints Esperados no Backend

### Autenticação
- `POST /api/auth/login` - Login
- `GET /api/auth/validate` - Validar token

### Empresas
- `POST /api/empresas` - Cadastrar empresa
- `GET /api/empresas` - Listar empresas
- `GET /api/empresas/{id}` - Buscar por ID
- `GET /api/empresas/cnpj/{cnpj}` - Buscar por CNPJ
- `PUT /api/empresas/{id}` - Atualizar
- `DELETE /api/empresas/{id}` - Remover

### Usuários/Funcionários
- `GET /api/usuarios` - Listar usuários
- `GET /api/usuarios/{id}` - Buscar por ID
- `POST /api/usuarios` - Criar usuário
- `PUT /api/usuarios/{id}` - Atualizar
- `DELETE /api/usuarios/{id}` - Remover
- `PUT /api/usuarios/{id}/foto` - Upload foto perfil
- `GET /api/usuarios/departamento/{dept}` - Buscar por departamento

### EPIs
- `GET /api/epis` - Listar EPIs
- `GET /api/epis/{id}` - Buscar por ID
- `POST /api/epis` - Criar EPI
- `PUT /api/epis/{id}` - Atualizar
- `DELETE /api/epis/{id}` - Remover
- `GET /api/epis/status/{status}` - Filtrar por status
- `GET /api/epis/estatisticas` - Estatísticas
- `POST /api/epis/{id}/manutencao` - Registrar manutenção

### Treinamentos
- `GET /api/treinamentos` - Listar
- `GET /api/treinamentos/{id}` - Buscar por ID
- `POST /api/treinamentos` - Criar
- `PUT /api/treinamentos/{id}` - Atualizar
- `DELETE /api/treinamentos/{id}` - Remover
- `POST /api/treinamentos/{id}/participantes/{usuarioId}` - Registrar participante
- `GET /api/treinamentos/usuario/{usuarioId}` - Listar por usuário
- `GET /api/treinamentos/{id}/certificado/{usuarioId}` - Emitir certificado (PDF)

### Controle de Acesso
- `POST /api/controle-acesso/entrada` - Registrar entrada
- `POST /api/controle-acesso/{id}/saida` - Registrar saída
- `GET /api/controle-acesso/ativos` - Listar acessos ativos
- `GET /api/controle-acesso/historico` - Histórico
- `GET /api/controle-acesso/{id}` - Buscar por ID
- `GET /api/controle-acesso/verificar/{usuarioId}` - Verificar permissão
- `POST /api/controle-acesso/{id}/emergencia` - Registrar emergência

### Relatórios
- `GET /api/relatorios/acessos` - Relatório de acessos
- `GET /api/relatorios/epis` - Relatório de EPIs
- `GET /api/relatorios/treinamentos` - Relatório de treinamentos
- `GET /api/relatorios/dashboard` - Dashboard geral
- `GET /api/relatorios/{tipo}/pdf` - Exportar PDF
- `GET /api/relatorios/{tipo}/excel` - Exportar Excel

## 🔐 Autenticação JWT

O sistema está configurado para usar JWT (JSON Web Token):

1. Após login bem-sucedido, o token é armazenado em `sessionStorage`
2. Todas as requisições incluem automaticamente o header: `Authorization: Bearer {token}`
3. Se o token expirar (401), o usuário é redirecionado para login
4. O logout limpa toda a sessão

## 📄 Páginas Integradas

### ✅ Cadastro (`/cadastro`)
- Envia dados da empresa para `POST /api/empresas`
- Validações completas
- Tratamento de erros do backend (CNPJ duplicado, etc.)

### ✅ Login (`/login`)
- Autentica via `POST /api/auth/login`
- Gerencia token JWT
- Salva dados do usuário na sessão

### ✅ Funcionários (`/funcionarios`)
- CRUD completo integrado com `usuarioService`
- Carrega lista ao montar componente
- Criar, editar e deletar funcionários

### 🔄 Demais Páginas
As outras páginas (EPIs, Treinamento, Relatório, etc.) estão prontas para receber as integrações seguindo o mesmo padrão.

## 🚀 Como Usar

### Exemplo de uso em um componente:

```javascript
import { useEffect, useState } from 'react';
import usuarioService from '../services/usuarioService';

function MeuComponente() {
  const [usuarios, setUsuarios] = useState([]);
  
  useEffect(() => {
    carregarUsuarios();
  }, []);
  
  const carregarUsuarios = async () => {
    try {
      const data = await usuarioService.listar();
      setUsuarios(data);
    } catch (error) {
      console.error('Erro:', error);
      alert(error.message);
    }
  };
  
  // ...
}
```

## 📦 Formato de Dados Esperado

### Cadastro de Empresa
```json
{
  "razaoSocial": "Empresa Exemplo Ltda",
  "cnpj": "12.345.678/0001-90",
  "emailCorporativo": "contato@empresa.com",
  "telefone": "(11) 99999-9999",
  "nomeResponsavel": "João Silva",
  "cpf": "123.456.789-00",
  "cargo": "Gerente de Segurança",
  "senha": "senha123"
}
```

### Login
```json
{
  "email": "usuario@empresa.com",
  "senha": "senha123"
}
```

**Resposta esperada:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 1,
    "email": "usuario@empresa.com",
    "nomeCompleto": "João Silva",
    "cargo": "Gerente"
  },
  "mensagem": "Login realizado com sucesso"
}
```

### Usuário/Funcionário
```json
{
  "id": 1,
  "email": "joao@empresa.com",
  "nomeCompleto": "João Silva",
  "cargo": "Técnico de Segurança",
  "departamento": "Segurança do Trabalho",
  "telefone": "(11) 99999-9999",
  "ramal": "1234",
  "fotoPerfil": null
}
```

## ⚙️ Próximos Passos

1. **Implementar o backend Spring Boot** seguindo os endpoints documentados
2. **Configurar CORS** no Spring Boot para aceitar requisições do frontend
3. **Implementar JWT** no backend (Spring Security)
4. **Testar integração** completa
5. **Adicionar tratamento de erros** mais específico
6. **Implementar paginação** nas listagens

## 🔍 Estrutura Sugerida do Backend

```
src/main/java/com/confisafe/
├── controller/
│   ├── AuthController.java
│   ├── EmpresaController.java
│   ├── UsuarioController.java
│   ├── EpiController.java
│   ├── TreinamentoController.java
│   ├── ControleAcessoController.java
│   └── RelatorioController.java
├── model/
│   ├── Empresa.java
│   ├── Usuario.java
│   ├── Epi.java
│   ├── Treinamento.java
│   └── ControleAcesso.java
├── repository/
│   ├── EmpresaRepository.java
│   ├── UsuarioRepository.java
│   └── ...
├── service/
│   ├── AuthService.java
│   ├── EmpresaService.java
│   ├── UsuarioService.java
│   └── ...
└── security/
    ├── JwtUtil.java
    └── SecurityConfig.java
```

## 📝 Notas Importantes

- Todos os serviços já tratam erros e retornam mensagens amigáveis
- O interceptor do Axios adiciona automaticamente o token JWT
- A configuração está preparada para desenvolvimento e produção
- As páginas podem funcionar com dados mockados enquanto o backend não está pronto
- O código está documentado com JSDoc para facilitar o entendimento

---

**Desenvolvido para ConfiSafe - Sistema de Gestão de Segurança em Espaços Confinados (NR-33)**
