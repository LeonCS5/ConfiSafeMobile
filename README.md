# ConfiSafeMobile 🛡️

O **ConfiSafeMobile** é uma solução Android robusta voltada para a gestão de segurança do trabalho e conformidade técnica. O aplicativo foi projetado para facilitar o controle de Equipamentos de Proteção Individual (EPIs), o monitoramento de áreas de risco e a comunicação eficiente de incidentes ou danos.

## 🚀 Funcionalidades Principais

*   **Autenticação Centralizada:** Sistema de login integrado ao Firebase para identificação de funcionários.
*   **Gestão de EPIs:** Catálogo detalhado e consulta de equipamentos necessários por função.
*   **Registro de EPIs Danificados:** Interface simplificada para reportar danos em equipamentos, garantindo a reposição ágil.
*   **Monitoramento de Áreas de Risco:** Visualização de zonas críticas que exigem protocolos específicos de segurança.
*   **Controle de Acesso:** Registro e validação de entrada em locais restritos.
*   **Relatórios em Tempo Real:** Sincronização de dados via Firebase Firestore para análise administrativa.

## 📸 Demonstração do App

Abaixo, apresentamos o fluxo principal do aplicativo e suas interfaces:

1.  **Tela de Login:** Acesso seguro do funcionário utilizando ID e senha integrados ao Firebase Auth.
2.  **Boas-vindas:** Interface personalizada que identifica o nome do colaborador logado através do Firestore.
3.  **Menu Principal (Dashboard):** Painel central intuitivo para navegação rápida entre as ferramentas de segurança.
4.  **Lista de EPIs por Área:** Exibição organizada dos equipamentos obrigatórios para o setor selecionado.
5.  **Áreas de Risco:** Catálogo de setores da empresa com indicação de periculosidade.
6.  **Informar EPI Danificado:** Formulário inteligente para reporte de danos com lógica de filtros por área.
7.  **Controle de Acesso:** Registro e validação de permissões para entrada em áreas restritas.
8.  **Alerta de Acidente:** Sistema de emergência para emissão de alertas críticos imediatos em vermelho.
9.  **Detalhes Técnicos:** Informações aprofundadas sobre as normas de cada equipamento.
10. **Perfil e Status:** Visualização de dados do usuário e status da conta.

<div align="center">
  <img width="200" alt="Login" src="https://github.com/user-attachments/assets/6d1e76b4-8652-461c-8a75-e68ed386c383" />
  <img width="200" alt="Welcome" src="https://github.com/user-attachments/assets/16bf6a8a-c875-40f9-8ac8-3b4210467251" />
  <img width="200" alt="Menu" src="https://github.com/user-attachments/assets/dc9c4279-24d2-4b1b-91fa-a8872e9443a1" />
  <img width="200" alt="EPI List" src="https://github.com/user-attachments/assets/03f0da55-0ac9-466f-8f57-9273bca3a271" />
  <img width="200" alt="Risk Area" src="https://github.com/user-attachments/assets/f7248bc4-e4cd-4b8b-b62d-ed6f261c7caa" />
  <br/>
  <img width="200" alt="Damaged EPI" src="https://github.com/user-attachments/assets/a76c5129-2e1a-4caa-abab-1aa53a7b3b63" />
  <img width="200" alt="Access Control" src="https://github.com/user-attachments/assets/58bce5ea-ef67-40d1-87a1-1056b8799d9a" />
  <img width="200" alt="Report" src="https://github.com/user-attachments/assets/63aa44a1-39ee-458d-8955-8acaa91d5fdf" />
  <img width="200" alt="Details" src="https://github.com/user-attachments/assets/75a72d4a-0907-4ccd-963e-f902f789f27f" />
  <img width="200" alt="Profile" src="https://github.com/user-attachments/assets/a8b65561-5ae3-495c-adde-a66a0b35ae05" />
</div>

## 🛠️ Stack Tecnológica

*   **Linguagem:** [Kotlin](https://kotlinlang.org/)
*   **UI/UX:** XML Layouts, Material Design 3, ViewBinding.
*   **Backend & Cloud:** [Firebase](https://firebase.google.com/) (Firestore e Authentication).
*   **Build System:** Gradle (Kotlin DSL).
*   **Min SDK:** 24 (Android 7.0) | **Target SDK:** 35 (Android 15).

## ⚠️ Checklist de Requisitos (Evite Erros)

Se o projeto não compilar ou o app crashar ao abrir, verifique os pontos abaixo:

1.  **Arquivo `google-services.json`:** Certifique-se de que o arquivo baixado do console do Firebase foi colocado dentro da pasta `/app`. Sem ele, o app não inicia.
2.  **Versão do Android Studio:** Use o **Android Studio Ladybug (2024.2.1)** ou superior. Versões antigas podem ter problemas com o Gradle 8.9 e o Kotlin 2.0.
3.  **Configuração do Java (JDK):** O Gradle deve estar configurado para usar o **Java 17 ou 21**. Verifique em `Settings > Build, Execution, Deployment > Build Tools > Gradle`.
4.  **Emulador (AVD):**
    *   Se o emulador fechar sozinho, use a opção **"Wipe Data"** no Device Manager.
    *   Recomenda-se o uso da **API 34 ou 35** para maior estabilidade.
    *   Garanta que seu PC tenha pelo menos 8GB de RAM livres para rodar o emulador e a IDE simultaneamente.

## ⚙️ Configuração e Instalação

### Pré-requisitos
*   Android Studio Ladybug ou superior.
*   Conta no Firebase configurada com as chaves `google-services.json` no diretório `/app`.

### Passos para execução
1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/ConfiSafeMobile.git
   ```
2. Importe o projeto no Android Studio.
3. Aguarde a sincronização do Gradle.
4. Execute o app em um emulador ou dispositivo físico (API 24+).

---
*Desenvolvido para promover um ambiente de trabalho mais seguro e tecnológico.*
