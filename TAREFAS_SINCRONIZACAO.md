# Lista de Tarefas: Sincronização ConfiSafe

Este documento contém o passo a passo técnico para a integração entre o aplicativo Android e o Gestor Desktop.

## Fase 1: Backend (Spring Boot & MySQL)
- [ ] **Mapeamento do Banco de Dados**:
    - Criar Entidades JPA (`Epi`, `Ambiente`, `Funcionario`, `Cargo`, `Departamento`, `EventoIot`) seguindo rigorosamente o `ConfiSafeBD.sql`.
- [ ] **Criação de Repositórios e Serviços**:
    - Implementar `Repositories` para persistência.
    - Criar `Services` para lógica de negócio (ex: validar permissão de entrada).
- [ ] **Desenvolvimento dos Endpoints (API)**:
    - Criar `Controllers` para listar Ambientes, EPIs e registrar eventos.
    - Implementar autenticação via JWT compatível com Mobile e Desktop.
- [ ] **Sincronização em Tempo Real**:
    - Configurar WebSockets ou endpoint de polling para o Dashboard React.

## Fase 2: Mobile (Android Kotlin)
- [ ] **Configuração de Rede**:
    - Instalar e configurar Retrofit e OkHttp.
    - Definir `BASE_URL` dinâmica para conexão com o backend local.
- [ ] **Padronização de Modelos**:
    - Renomear e ajustar classes `model` para o português (ex: `RiskArea` -> `Ambiente`).
- [ ] **Substituição da Camada de Dados**:
    - Trocar o `DataSource.kt` estático por chamadas à `ApiService`.
    - Remover dependências residuais do Firebase onde a API será usada.
- [ ] **Implementação do Login Real**:
    - Integrar tela de login com o endpoint de autenticação do backend.
- [ ] **Registro de Eventos**:
    - Fazer o cronômetro de entrada/saída enviar dados para a tabela `EVENTO_IOT` no backend.

## Fase 3: Integração e Validação
- [ ] **Teste de Cadastro**: Cadastrar dado no Desktop e verificar se aparece no Mobile instantaneamente.
- [ ] **Teste de Monitoramento**: Realizar acesso no Mobile e verificar atualização no Dashboard Desktop.
- [ ] **Homologação Final**: Garantir que todos os nomes de campos batem entre SQL, Java e Kotlin.
