// EXEMPLO: Como integrar as páginas restantes com o backend
// Use este arquivo como referência para implementar as outras páginas

// ============================================
// EXEMPLO 1: Gestão de EPIs
// ============================================
import React, { useState, useEffect } from 'react';
import epiService from '../services/epiService';

function GestaoEpisExemplo() {
  const [epis, setEpis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarEpis();
  }, []);

  const carregarEpis = async () => {
    try {
      setLoading(true);
      const data = await epiService.listar();
      setEpis(data);
    } catch (error) {
      console.error('Erro:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCriarEpi = async (epiData) => {
    try {
      await epiService.criar(epiData);
      alert('EPI criado com sucesso!');
      await carregarEpis();
    } catch (error) {
      console.error('Erro:', error);
      alert(error.message);
    }
  };

  const handleAtualizarEpi = async (id, epiData) => {
    try {
      await epiService.atualizar(id, epiData);
      alert('EPI atualizado!');
      await carregarEpis();
    } catch (error) {
      console.error('Erro:', error);
      alert(error.message);
    }
  };

  const handleRemoverEpi = async (id) => {
    if (!window.confirm('Deseja remover este EPI?')) return;
    
    try {
      await epiService.remover(id);
      alert('EPI removido!');
      await carregarEpis();
    } catch (error) {
      console.error('Erro:', error);
      alert(error.message);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div>
          {epis.map(epi => (
            <div key={epi.id}>
              <h3>{epi.nome}</h3>
              <button onClick={() => handleRemoverEpi(epi.id)}>Remover</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================
// EXEMPLO 2: Treinamentos
// ============================================
import treinamentoService from '../services/treinamentoService';

async function exemploTreinamentos() {
  // Listar todos os treinamentos
  const treinamentos = await treinamentoService.listar();

  // Criar novo treinamento
  const novoTreinamento = await treinamentoService.criar({
    titulo: 'NR-33 - Espaços Confinados',
    descricao: 'Treinamento obrigatório',
    dataInicio: '2025-01-15',
    dataFim: '2025-01-17',
    cargaHoraria: 16,
    instrutor: 'João Silva'
  });

  // Registrar participante
  await treinamentoService.registrarParticipante(novoTreinamento.id, usuarioId);

  // Listar treinamentos de um funcionário
  const treinamentosUsuario = await treinamentoService.listarPorUsuario(usuarioId);

  // Emitir certificado (retorna PDF Blob)
  const pdfBlob = await treinamentoService.emitirCertificado(treinamentoId, usuarioId);
  
  // Criar URL para download
  const url = window.URL.createObjectURL(pdfBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'certificado.pdf';
  link.click();
}

// ============================================
// EXEMPLO 3: Controle de Acesso
// ============================================
import controleAcessoService from '../services/controleAcessoService';

async function exemploControleAcesso() {
  // Verificar se funcionário pode acessar
  const permissao = await controleAcessoService.verificarPermissao(usuarioId);
  
  if (permissao.permitido) {
    // Registrar entrada
    const acesso = await controleAcessoService.registrarEntrada({
      usuarioId: usuarioId,
      espacoConfinadoId: 1,
      observacoes: 'Entrada para manutenção',
      episUtilizados: ['capacete', 'mascara', 'luvas']
    });

    // Mais tarde... registrar saída
    await controleAcessoService.registrarSaida(acesso.id);
  } else {
    alert('Acesso negado: ' + permissao.motivos.join(', '));
  }

  // Listar quem está dentro agora
  const acessosAtivos = await controleAcessoService.listarAcessosAtivos();

  // Histórico com filtros
  const historico = await controleAcessoService.listarHistorico({
    dataInicio: '2025-01-01',
    dataFim: '2025-01-31',
    usuarioId: usuarioId
  });

  // Em caso de emergência
  await controleAcessoService.registrarEmergencia(acessoId, {
    tipo: 'ACIDENTE',
    descricao: 'Queda',
    gravidade: 'ALTA'
  });
}

// ============================================
// EXEMPLO 4: Relatórios
// ============================================
import relatorioService from '../services/relatorioService';

async function exemploRelatorios() {
  // Relatório de acessos
  const relAcessos = await relatorioService.relatorioAcessos({
    dataInicio: '2025-01-01',
    dataFim: '2025-01-31'
  });

  // Relatório de EPIs
  const relEpis = await relatorioService.relatorioEpis();

  // Dashboard completo
  const dashboard = await relatorioService.relatorioDashboard();

  // Exportar PDF
  const pdfBlob = await relatorioService.exportarPDF('acessos', {
    dataInicio: '2025-01-01',
    dataFim: '2025-01-31'
  });
  
  // Download automático
  const url = window.URL.createObjectURL(pdfBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'relatorio-acessos.pdf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);

  // Exportar Excel
  const excelBlob = await relatorioService.exportarExcel('epis');
  // ... mesmo processo de download
}

// ============================================
// EXEMPLO 5: Tratamento de Erros Avançado
// ============================================
async function exemploTratamentoErros() {
  try {
    const usuario = await usuarioService.criar(dadosUsuario);
  } catch (error) {
    // error.message contém a mensagem de erro do backend
    // error também pode conter campos específicos:
    
    if (error.email) {
      // Email duplicado, por exemplo
      console.error('Erro no email:', error.email);
    }
    
    if (error.validationErrors) {
      // Múltiplos erros de validação
      error.validationErrors.forEach(err => {
        console.error(`${err.field}: ${err.message}`);
      });
    }
    
    // Exibir mensagem amigável
    alert(error.message || 'Erro ao criar usuário');
  }
}

// ============================================
// EXEMPLO 6: Upload de Foto de Perfil
// ============================================
async function exemploUploadFoto(usuarioId, fileInput) {
  const file = fileInput.files[0];
  
  if (!file) {
    alert('Selecione uma foto');
    return;
  }

  // Validar tipo e tamanho
  if (!file.type.startsWith('image/')) {
    alert('Selecione apenas imagens');
    return;
  }

  if (file.size > 5 * 1024 * 1024) { // 5MB
    alert('Imagem muito grande (máx 5MB)');
    return;
  }

  try {
    const response = await usuarioService.atualizarFotoPerfil(usuarioId, file);
    alert('Foto atualizada com sucesso!');
    
    // Atualizar UI com nova foto
    // response.fotoPerfilUrl contém a URL da foto
  } catch (error) {
    console.error('Erro ao fazer upload:', error);
    alert(error.message);
  }
}

// ============================================
// EXEMPLO 7: Filtros e Busca
// ============================================
async function exemploBuscaAvancada() {
  // Buscar EPIs por status
  const episAtivos = await epiService.buscarPorStatus('ATIVO');
  const episManutencao = await epiService.buscarPorStatus('MANUTENCAO');

  // Buscar usuários por departamento
  const usuariosSeguranca = await usuarioService.buscarPorDepartamento('Segurança');

  // Estatísticas de EPIs
  const stats = await epiService.obterEstatisticas();
  console.log('Total:', stats.total);
  console.log('Ativos:', stats.ativos);
  console.log('Em manutenção:', stats.emManutencao);
}

// ============================================
// EXEMPLO 8: Integração com Página Inicial
// ============================================
import relatorioService from '../services/relatorioService';
import controleAcessoService from '../services/controleAcessoService';
import epiService from '../services/epiService';

async function carregarDadosInicial() {
  try {
    // Carregar tudo em paralelo
    const [dashboard, acessosAtivos, estatisticasEpis] = await Promise.all([
      relatorioService.relatorioDashboard(),
      controleAcessoService.listarAcessosAtivos(),
      epiService.obterEstatisticas()
    ]);

    return {
      dashboard,
      acessosAtivos,
      estatisticasEpis
    };
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    throw error;
  }
}

// ============================================
// DICAS IMPORTANTES
// ============================================

/*
1. SEMPRE use try/catch para tratar erros
2. Use loading states para melhor UX
3. Recarregue dados após criar/atualizar/deletar
4. Valide dados no frontend antes de enviar
5. Mostre mensagens de erro amigáveis ao usuário
6. Use Promise.all() para carregar múltiplos dados em paralelo
7. Implemente debounce em campos de busca
8. Cache dados quando apropriado
9. Implemente paginação para listas grandes
10. Trate tokens expirados (401) - já configurado no interceptor

ESTRUTURA DE DADOS ESPERADA DO BACKEND:

EPIs:
{
  id: number,
  nome: string,
  tipo: string,
  codigo: string,
  status: 'ATIVO' | 'MANUTENCAO' | 'INATIVO',
  dataAquisicao: string,
  dataValidade: string,
  quantidade: number,
  localizacao: string
}

Treinamentos:
{
  id: number,
  titulo: string,
  descricao: string,
  tipo: string,
  dataInicio: string,
  dataFim: string,
  cargaHoraria: number,
  instrutor: string,
  participantes: number[]
}

Controle de Acesso:
{
  id: number,
  usuarioId: number,
  espacoConfinadoId: number,
  dataEntrada: string,
  dataSaida: string | null,
  observacoes: string,
  episUtilizados: string[],
  status: 'ATIVO' | 'FINALIZADO'
}
*/

export {};
