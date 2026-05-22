# Plano de Implementação: Sincronização ConfiSafe (Mobile + Desktop)

Este plano detalha a unificação do ecossistema ConfiSafe, permitindo que o aplicativo Android e o Gestor Desktop (React) compartilhem o mesmo banco de dados MySQL através de uma API centralizada em Spring Boot.

## Objetivo
- Substituir dados estáticos e Firebase no Android por chamadas à API Spring Boot.
- Padronizar nomenclaturas (Português/SQL) em todas as camadas.
- Garantir que ações no celular (ex: entrada em área) reflitam instantaneamente no desktop.

---

## 1. Backend (Spring Boot) - A "Ponte" Central

O backend será responsável por gerenciar as regras de negócio e persistir os dados no MySQL.

### Modelagem JPA (Entidades)
Criar classes Java que mapeiam exatamente o [ConfiSafeBD.sql](file:///C:/Users/Muffin/AndroidStudioProjects/ConfiSafeMobile/ConfiSafeBD.sql).

- **Epi.java**: Mapeia a tabela `EPI`.
- **Ambiente.java**: Mapeia a tabela `AMBIENTE`.
- **Funcionario.java**: Mapeia a tabela `FUNCIONARIO` (com FK para Cargo e Departamento).
- **EventoIot.java**: Mapeia a tabela `EVENTO_IOT` para registrar entradas/saídas.
- **Ocorrencia.java**: Mapeia a tabela `OCORRENCIA`.

### Camada de API (Controllers)
Expor os dados para Mobile e Desktop:
- `GET /api/ambientes`: Lista áreas de risco para o celular.
- `GET /api/ambientes/{id}/epis`: Lista EPIs obrigatórios para aquela área.
- `POST /api/eventos-iot`: Recebe registros de entrada/saída do celular.
- `GET /api/eventos-iot/recentes`: Consumido pelo Desktop para monitoramento em tempo real.

---

## 2. Mobile (Android Kotlin) - Consumidor de Dados

O aplicativo deixará de ser isolado e passará a ser um "terminal" do sistema.

### Refatoração de Modelos
Alterar `Epi.kt` e `RiskArea.kt` para usar os nomes do SQL:
- `RiskArea` -> `Ambiente` (campos: `id_ambiente`, `nome`, `descricao`).
- `Epi` -> `Epi` (campos: `id_epi`, `nome`, `tipo`, `ca`).

### Camada de Rede (Retrofit)
Configurar o Android para se comunicar com o PC local:
- Usar o IP da rede local (ex: `192.168.x.x`) ou `10.0.2.2` para emulador.
- Criar interface `ApiService` com as chamadas necessárias.

### Migração de Lógica
- **Login**: Autenticar contra a tabela `GESTOR` ou `FUNCIONARIO` da API, em vez de Firebase.
- **Listagem**: Carregar áreas e EPIs dinamicamente do banco de dados.
- **Ações**: Ao clicar em "Entrar", enviar o evento para o backend.

---

## 3. Desktop (React) - Painel de Controle

### Monitoramento Real-time
- Implementar **Polling** (consulta periódica) ou **WebSockets** na página de Dashboard do React para buscar os últimos registros da tabela `EVENTO_IOT`.

---

## Plano de Verificação

### Testes de Sincronização
1. **Fluxo de Dados**:
   - Abrir o Desktop Manager e cadastrar um novo `Ambiente` (ex: "Almoxarifado").
   - Abrir o App Android e verificar se o "Almoxarifado" aparece na lista automaticamente.
2. **Monitoramento**:
   - No App Android, registrar entrada no ambiente "Fábrica".
   - Verificar se no Desktop Manager aparece o alerta/registro de entrada do funcionário sem recarregar a página (ou com refresh curto).
3. **Persistência**:
   - Verificar via Workbench/DBeaver se os dados enviados pelo celular estão salvos corretamente nas tabelas do MySQL.

### Comandos de Execução
- **Backend**: `./mvnw spring-boot:run`
- **Frontend**: `npm start`
- **Mobile**: Rodar via Android Studio no emulador ou dispositivo físico na mesma rede.

---

> [!IMPORTANT]
> A comunicação entre o Celular e o PC requer que ambos estejam na mesma rede Wi-Fi e que o Firewall do Windows permita conexões na porta 8080.
