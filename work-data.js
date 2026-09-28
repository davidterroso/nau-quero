export const FILTERS = [
  { key: 'identidade', label: 'Identidade', bg: '#391D01', ink: '#F3E9D2', accent: '#ACC048', glowRgb: '172,192,72', note: 'Logótipo, paleta, tipografia e manual de marca.' },
  { key: 'estrategia', label: 'Estratégia', bg: '#391D01', ink: '#F3E9D2', accent: '#D2E8FF', glowRgb: '210,232,255', note: 'Diagnóstico, posicionamento e planos de ação.' },
  { key: 'digital', label: 'Presença Digital', bg: '#391D01', ink: '#F3E9D2', accent: '#F5C232', glowRgb: '245,194,50', note: 'Redes sociais, conteúdo e comunicação online.' },
  { key: 'investigacao', label: 'Investigação Científica', bg: '#391D01', ink: '#F3E9D2', accent: '#F3E9D2', glowRgb: '105,10,32', note: 'Tese, artigos críticos e estudos de consumidor.' },
];

export const CAT_BG = { identidade: '#391D01', estrategia: '#391D01', digital: '#391D01', investigacao: '#391D01' };
export const CAT_INK = { identidade: '#F3E9D2', estrategia: '#F3E9D2', digital: '#F3E9D2', investigacao: '#F3E9D2' };
export const CAT_ACCENT = { identidade: '#ACC048', estrategia: '#D2E8FF', digital: '#F5C232', investigacao: '#F3E9D2' };
export const CAT_GLOW_RGB = { identidade: '172,192,72', estrategia: '210,232,255', digital: '245,194,50', investigacao: '105,10,32' };
export const LAYER_LABEL = { identidade: 'Cone', estrategia: 'Sabor', digital: 'Topping', investigacao: 'Research' };

export const PROJECTS = [
  {
    name: 'Gabriela Pereira', brand: 'Gabriela Pereira — Advocacia & Consultoria', year: '2026',
    category: 'identidade', categoryLabel: 'Identidade de Marca',
    photo: './images/Placa%20de%20atendimento%20profissional%20(1).png',
    tags: ['Brand Guidelines', 'Direito & Advocacia', 'Identidade Visual'],
    desc: 'Brand guidelines completos para Gabriela Pereira, advogada há mais de 20 anos com foco em Direito Criminal, da Família e Menores — uma identidade sóbria e elegante construída para transmitir confiança, proximidade e rigor. Paleta bordô, pérola e dourado, tipografia serifada em contraste com uma sans-serif moderna, e um sistema completo de aplicações, do cartão de visita à presença digital.',
    identity: {
      diagnostic: {
        before: ['Sem identidade visual ou presença digital definida.', 'Dependência do passa-a-palavra, sem materiais de comunicação.', 'Ausência de website e presença digital.', 'Comunicação informal, sem elementos diferenciadores.'],
        after: ['Identidade visual completa e coerente com o posicionamento.', 'Sistema de papelaria e materiais de comunicação profissionais.', 'Website e LinkedIn ativos, com presença e imagens que captam.', 'Comunicação profissional e consistente em todos os pontos de contacto.'],
        opportunity: 'Antes, a marca não existia visualmente. Hoje, comunica o que representa: confiança, rigor e proximidade.',
      },
      concept: {
        story: 'O conceito nasce do monograma GP entrelaçado com a balança da justiça — pessoal e profissional ao mesmo tempo. As gotas representam o peso de cada decisão. O bordô transmite autoridade e o pérola, clareza e proximidade.',
        symbolism: [
          { element: 'Monograma GP com balança', meaning: 'Une a advogada ao símbolo da justiça — pessoal e profissional ao mesmo tempo.' },
          { element: 'Bordô como cor dominante', meaning: 'Autoridade com calor.' },
          { element: 'Pérola como cor secundária', meaning: 'Clareza e leveza — contraponto humano ao bordô.' },
          { element: 'Eternalo nos títulos', meaning: 'Herança clássica — o peso e a seriedade da advocacia.' },
          { element: 'Poppins no corpo', meaning: 'Modernidade e legibilidade — comunicação direta e acessível.' },
          { element: 'Pingos no ícone', meaning: 'Simbolismo moderno do peso e da responsabilidade de cada decisão.' },
        ],
      },
      palette: [
        { name: 'Bordô', hex: '#3D0910', use: 'Cor principal — fundos e elementos-chave.', light: true },
        { name: 'Pérola', hex: '#FFFCEF', use: 'Fundo claro e texto sobre o bordô.', light: false },
        { name: 'Rosa Seco', hex: '#C8A2A6', use: 'Detalhes e acentos tipográficos.', light: false },
        { name: 'Dourado', hex: '#B08D57', use: 'Acentos secundários, com moderação.', light: false },
        { name: 'Vermelho Escuro', hex: '#5B141D', use: 'Contraste em documentos formais.', light: true },
        { name: 'Rosa Champagne', hex: '#6A4349', use: 'Equilíbrio na identidade visual.', light: true },
        { name: 'Preto', hex: '#000000', use: 'Contraste máximo, com moderação.', light: true },
        { name: 'Branco', hex: '#FFFFFF', use: 'Espaços negativos sobre fundos escuros.', light: false },
      ],
      typography: { displayLabel: 'Display / Títulos — Serif elegante', displaySample: 'Marque já a sua consulta.', bodyLabel: 'Body / Corpo — Poppins', bodySample: 'Texto secundário para legendas, notas e informação de suporte.' },
      personality: ['Confiante', 'Humana', 'Rigorosa', 'Clara', 'Discreta'],
      tone: ['Clara', 'Direta', 'Tranquilizadora', 'Respeitosa'],
      photography: {
        decor: 'Tons quentes e sóbrios. Preto e branco é permitido.',
        avoid: 'Stock genérico, filtros saturados, contrastes excessivos.',
        scenario: 'Espaços neutros, fundos lisos em tom claro ou bordô.',
      },
      vision: {
        aspiration: 'Ser referência de confiança na advocacia — pela proximidade e pela qualidade consistente do serviço.',
        publicoAlvo: 'Pessoas e empresas em momentos delicados: processos criminais, questões de família e partilhas.',
        naoE: ['Não é agressiva nem exibicionista.', 'Não usa linguagem corporativa vazia.', 'Não é distante nem inacessível.'],
      },
      logo: {
        incorrect: ['Esticar ou comprimir', 'Sombras ou efeitos', 'Alterar cores', 'Rodar', 'Sem overlay adequado'],
        sizes: [
          { label: 'Horizontal — digital', value: '280 px de largura' },
          { label: 'Horizontal — papel', value: '80 mm' },
          { label: 'Vertical — papel', value: '50 mm' },
          { label: 'Monograma — papel', value: '15 mm' },
          { label: 'Ícone oval — digital', value: '180 px de largura' },
          { label: 'Ícone oval — papel', value: '60 px' },
        ],
      },
      patterns: { text: 'Padrões nascidos das gotas do ícone, repetidos em texturas discretas que reforçam a marca sem competir com o conteúdo.', imgId: 'gp-patterns' },
      moodboard: {
        keywords: ['Elegância discreta', 'Autoridade com calor', 'Tradição e modernidade em equilíbrio'],
        note: 'Estas foram as referências visuais que guiaram todas as decisões criativas.',
        imgIds: ['gp-mood-1', 'gp-mood-2', 'gp-mood-3', 'gp-mood-4'],
      },
      digitalComm: { text: 'Uma assinatura de email cuidada gera confiança — sobretudo quando o primeiro contacto é por email.', note: 'Assinatura predefinida no e-mail profissional, com logótipo e paleta da marca.', imgId: 'gp-signature' },
      presence: { website: 'Cartão de apresentação digital da marca — a validar e a lançar.', linkedin: ['Atualizar informações acerca do percurso de Gabriela Pereira.', 'Modificar o @ para gabrielapereira.adv.'] },
      mockups: [
        { id: 'gp-mockup-cartao', label: 'Cartão de Visita', placeholder: 'Mockup — cartão de visita', src: './images/81da9fad-8bb4-4d74-9712-f31017f56090.png' },
        { id: 'gp-mockup-sinaletica', label: 'Sinalética Horário & Andar', placeholder: 'Mockup — sinalética', src: './images/Placa%20de%20atendimento%20profissional%20(1).png' },
        { id: 'gp-mockup-digital', label: 'Presença Digital', placeholder: 'Mockup — presença digital', src: './images/Espa%C3%A7o%20de%20trabalho%20elegante%20e%20sofisticado%20(1).png' },
        { id: 'gp-mockup-papel', label: 'Papel de Carta & Envelope', placeholder: 'Mockup — papel de carta e envelope' },
        { id: 'gp-mockup-agenda', label: 'Agenda & Material', placeholder: 'Mockup — agenda e material' },
      ],
      roadmap: {
        curto: ['Sessão fotográfica profissional', 'Assinatura de email em toda a comunicação'],
        medio: ['Divulgar a marca com os novos materiais', 'Presença ativa no LinkedIn'],
        longo: ['Revisão anual da marca', 'Construção de autoridade pela consistência'],
      },
    },
  },
  {
    name: 'Raízes Frescas', brand: 'Raízes Frescas — Mercearia Biológica', year: '2026',
    category: 'identidade', categoryLabel: 'Identidade de Marca',
    photo: './images/raizes-frescas-hero.png',
    tags: ['Brand Guidelines', 'Produtos Biológicos'],
    desc: 'Identidade visual e presença digital para a Raízes Frescas, mercearia biológica de proximidade — uma marca fresca, natural e de confiança, com um sistema visual construído à volta da terra, das raízes e do que é cultivado com cuidado.',
    identity: {
      diagnostic: {
        before: ['Sem identidade visual nem presença digital.', 'Comunicação informal, dependente do espaço físico da loja.', 'Sem diferenciação clara face à concorrência de proximidade.'],
        after: ['Identidade visual fresca e consistente.', 'Presença digital ativa, com loja e comunidade online.', 'Comunicação que reforça a origem biológica e local dos produtos.'],
        opportunity: 'Antes, a Raízes Frescas era só uma mercearia de bairro. Hoje, é uma marca com rosto — próxima, natural e de confiança, capaz de competir em atenção com as grandes superfícies sem perder o que a torna única: a relação direta com quem compra e com quem produz.',
      },
      concept: {
        story: 'O conceito nasce da raiz — o que sustenta, alimenta e liga a terra àquilo que dela cresce. A marca constrói-se em duas camadas: o verde, que transmite frescura, natureza e o compromisso biológico do sortido; e a terra, que transmite origem, tempo e autenticidade — a ideia de que nada ali é artificial ou apressado. Juntos, os dois territórios comunicam uma mercearia que cultiva confiança tanto quanto cultiva produtos, e que faz do biológico uma prática visível, não apenas um selo na embalagem.',
        symbolism: [
          { element: 'Raiz como ícone', meaning: 'Origem, sustento e ligação direta à terra — o ponto de partida de tudo o que a loja vende.' },
          { element: 'Verde como cor dominante', meaning: 'Frescura, natureza e o compromisso biológico como prática, não apenas rótulo.' },
          { element: 'Tons de terra como base', meaning: 'Autenticidade, proximidade e a sensação de produto que veio de algum lado real.' },
          { element: 'Traço orgânico e irregular', meaning: 'Rejeita a geometria perfeita da indústria — reforça o feito à mão, o cultivado, o de bairro.' },
        ],
      },
      palette: [
        { name: 'Verde Musgo', hex: '#3F5B3A', use: 'Cor principal — fundos e elementos-chave.', light: true },
        { name: 'Creme Aveia', hex: '#F5EFDF', use: 'Fundo claro e texto sobre o verde.', light: false },
        { name: 'Terracota', hex: '#B5674A', use: 'Acentos e destaques quentes.', light: true },
        { name: 'Castanho Terra', hex: '#5A3E2B', use: 'Contraste e profundidade.', light: true },
        { name: 'Verde Lima', hex: '#A8C258', use: 'Detalhes de frescura, com moderação.', light: false },
      ],
      typography: { displayLabel: 'Display / Títulos — Serif natural', displaySample: 'Do campo para a tua mesa.', bodyLabel: 'Body / Corpo — Sans-serif', bodySample: 'Texto secundário para legendas, notas e informação de suporte.' },
      personality: ['Fresca', 'Próxima', 'Natural', 'Honesta'],
      tone: ['Simples', 'Calorosa', 'Direta'],
      photography: {
        decor: 'Tons naturais e luz suave, coerentes com a paleta da marca — verdes e terras que reforçam a sensação de produto vivo, nunca estúdio.',
        avoid: 'Stock genérico, ambientes artificiais e composições demasiado perfeitas que contradigam a informalidade da loja.',
        scenario: 'Produtos e espaços reais — a montra, as caixas de madeira, as mãos de quem atende — com texturas naturais e imperfeições que dão confiança.',
      },
      mockups: [
        { id: 'rf-mockup-sacos', label: 'Sacos & Embalagem', placeholder: 'Mockup — sacos e embalagem', src: './images/raizes-frescas-embalagem.png' },
        { id: 'rf-mockup-montra', label: 'Montra & Sinalética', placeholder: 'Mockup — montra e sinalética', src: './images/raizes-frescas-cartao.png' },
        { id: 'rf-mockup-social', label: 'Redes Sociais', placeholder: 'Mockup — redes sociais', src: './images/raizes-frescas-social.png' },
      ],
      roadmap: { curto: ['Lançamento da presença digital', 'Fotografia de produto'], medio: ['Comunidade ativa nas redes sociais'], longo: ['Expansão dos materiais de loja'] },
    },
  },
  { name: 'Floralma', brand: 'Floralma', year: '2026', category: 'digital', categoryLabel: 'Presença Digital', tags: ['Presença Digital', 'Redes Sociais'], desc: 'Estratégia de presença digital para a Floralma — a construir.' },
  { name: 'Produflores', brand: 'Produflores', year: '2026', category: 'digital', categoryLabel: 'Presença Digital', tags: ['Presença Digital', 'Redes Sociais'], desc: 'Estratégia de presença digital para a Produflores — a construir.' },
  {
    name: 'Continente', brand: 'Continente / Sonae', year: '2024', category: 'estrategia', categoryLabel: 'Estratégia de Marca',
    tags: ['Marketing Relacional', 'Fidelização', 'Benchmarking'],
    desc: 'Plano estratégico académico para otimizar o cartão de fidelização Continente — do diagnóstico às propostas de novo valor.',
    highlight: '8 propostas de novo valor desenvolvidas, cada uma avaliada por viabilidade e impacto potencial — a proposta vencedora projetava um aumento de 12% na taxa de reativação de cartões inativos.',
    process: [
      { title: 'Diagnóstico', text: 'Análise da identidade, posicionamento, público-alvo e proposta de valor do Cartão Continente, fechada com uma Análise SWOT completa dos seus pontos fortes, fracos, oportunidades e ameaças.' },
      { title: 'Posicionamento', text: 'Benchmarking direto aos três principais concorrentes — Poupa Mais (Pingo Doce), Lidl Plus e Clube Auchan — para isolar quatro fatores-chave de sucesso: benefícios financeiros, envolvimento com o público-alvo, integração multicanal e parcerias estratégicas.' },
      { title: 'Plano Estratégico', text: 'Recolha de feedback direto junto de utilizadores reais do cartão, mapeando a jornada de relacionamento atual e identificando pontos de dor e oportunidades de melhoria concretas.' },
      { title: 'Roadmap', text: 'Desenvolvimento de oito propostas de novo valor para o Cartão Continente, cada uma avaliada quanto à viabilidade e ao impacto potencial, com sugestões práticas de implementação.' },
    ],
  },
  {
    name: 'Ativo Kids', brand: 'Ativo', year: '2024', category: 'estrategia', categoryLabel: 'Estratégia de Marca',
    tags: ['Estudo de Mercado', 'Moda Infantil', 'Plano Estratégico'],
    desc: 'Estudo de mercado e aconselhamento estratégico para a marca de vestuário infantil Ativo, com base no comportamento de compra dos "miúdos" e "graúdos".',
    highlight: 'Estudo quantitativo com 83 respondentes e 5 modelos de regressão a fundamentar um plano estratégico de curto prazo — o modelo final explicava 61% da variância na intenção de compra.',
    process: [
      { title: 'Diagnóstico', text: 'Diagnóstico do mercado da moda infantil, com Análise SWOT da marca Ativo e comparação direta com os seus principais concorrentes.' },
      { title: 'Posicionamento', text: 'Estudo quantitativo com inquérito por questionário (n=83) e cinco Modelos de Regressão Linear Múltipla, testando o impacto de produto, preço, comunicação e distribuição na intenção de compra.' },
      { title: 'Plano Estratégico', text: 'Conforto e praticidade emergem como os atributos que mais pesam na decisão de compra, tal como promoções regulares; a comunicação da marca, por outro lado, não mostrou impacto estatístico significativo — e a distribuição revelou-se o fator mais crítico na satisfação do cliente.' },
      { title: 'Roadmap', text: 'Plano estratégico de curto prazo assente em três eixos: criação de uma mascote, planeamento estratégico da rede de lojas físicas e otimização do cartão de fidelização — com objetivos SMART e KPI\'s definidos para cada um.' },
    ],
  },
  {
    name: 'BEEQ Bicycle', brand: 'BEEQ Bicycle', year: '2024', category: 'estrategia', categoryLabel: 'Estratégia de Marca',
    tags: ['Mobilidade Sustentável', 'Marketing Estratégico', 'Posicionamento'],
    desc: 'Plano estratégico para o lançamento B2C da BEEQ Bicycle no mercado das bicicletas elétricas, com posicionamento em mobilidade sustentável.',
    highlight: 'Plano a 4 anos para posicionar a BEEQ Bicycle como referência em mobilidade sustentável, do diagnóstico de mercado aos objetivos anuais — com meta de 3.000 unidades vendidas até ao 2º ano.',
    process: [
      { title: 'Diagnóstico', text: 'Análise externa ao mercado global, europeu e português das e-bikes, com PESTEL, análise à concorrência direta e benchmarking; e análise interna à BEEQ Bicycle com SWOT Dinâmica e Matriz FFI (Factos, Fontes, Impacto).' },
      { title: 'Posicionamento', text: 'Decisão pelo caminho B2C e definição da estratégia de mobilidade sustentável — um posicionamento assente num "mundo mais verde, com zero emissões" — dirigido a homens empresários dos 35 aos 50 anos, urbanos, aventureiros e ligados à sustentabilidade.' },
      { title: 'Plano Estratégico', text: 'Plano de ação omnicanal: eventos, showrooms e test-drives, redes sociais e email marketing, outdoors e mupis em locais estratégicos, lojas físicas e sessões de sensibilização em escolas secundárias para captar público mais jovem.' },
      { title: 'Roadmap', text: 'Objetivos definidos para um horizonte de quatro anos, começando por dar a conhecer os benefícios da e-bike ao público-alvo e expandir progressivamente para novos segmentos e mercados.' },
    ],
  },
  {
    name: 'Noocity', brand: 'Noocity', year: '2023', category: 'estrategia', categoryLabel: 'Estratégia de Marca',
    tags: ['Internacionalização', 'Agricultura Urbana', 'Sustentabilidade'],
    desc: 'Plano estratégico de internacionalização da Noocity, marca de hortas urbanas, para dois novos mercados europeus.',
    highlight: 'Seleção e estratégia de entrada para dois mercados — Grécia e Alemanha — com aconselhamento à medida de cada um.',
    process: [
      { title: 'Diagnóstico', text: 'Análise ao mercado europeu da agricultura urbana — consumo e produção de vegetais per capita, taxas de obesidade, urbanização, emissões de CO2 e níveis de felicidade laboral — para mapear onde a Noocity teria mais impacto.' },
      { title: 'Posicionamento', text: 'Seleção estratégica da Grécia e da Alemanha como mercados de expansão: a Grécia pela procura crescente por alimentos de qualidade e o peso do turismo gastronómico; a Alemanha pelo baixo consumo de vegetais e o índice de felicidade laboral mais reduzido da Europa.' },
      { title: 'Plano Estratégico', text: 'Análise PESTEL e SWOT Dinâmica para cada mercado, com estudo da concorrência local, perfil do consumidor e Marketing Mix adaptado à realidade grega e alemã.' },
      { title: 'Roadmap', text: 'Definição de objetivos e estratégia de entrada específica: foco em hotéis e restaurantes na Grécia, e em empresas e bem-estar laboral na Alemanha.' },
    ],
  },
  {
    name: 'Tuga\'s', brand: 'Tuga\'s - The Universal Friend', year: '2024', category: 'estrategia', categoryLabel: 'Estratégia de Marca',
    tags: ['Plano de Negócios', 'Sustentabilidade', 'Marca 100% Portuguesa'],
    desc: 'Plano de negócios para uma marca de cerveja artesanal portuguesa que transforma "fruta feia" desperdiçada em sabor.',
    highlight: 'Conceito de marca construído sobre três causas — desperdício alimentar, sustentabilidade e inclusão social — com objetivos SMART a 5 anos e um break-even projetado para o 3º ano de atividade.',
    process: [
      { title: 'Diagnóstico', text: 'Análise de oportunidade em torno de três causas — desperdício alimentar, sustentabilidade e inclusão social — cruzada com o potencial de mercado, a indústria cervejeira portuguesa e a análise à concorrência direta e indireta.' },
      { title: 'Posicionamento', text: 'Conceito Tuga\'s: cerveja artesanal aromatizada com "fruta feia" que os supermercados descartam, dirigida à geração Y universitária, empresarial e turística, com uma proposta de valor eco-friendly e 100% portuguesa.' },
      { title: 'Plano Estratégico', text: 'Business Model Canvas completo — canais (restauração local, vending universitário, redes sociais), Marketing Mix e plano operacional e financeiro que sustentam o lançamento da marca.' },
      { title: 'Roadmap', text: 'Objetivos SMART a 5 anos: parcerias de inclusão social com escolas e centros de acolhimento já no 1º ano, produção artesanal própria a partir do 3º, e expansão progressiva da frota e da distribuição pelo país.' },
    ],
  },
  {
    name: 'Nestum Pro', brand: 'Nestum Pro (Nestlé)', year: '2025', category: 'estrategia', categoryLabel: 'Estratégia de Marca',
    tags: ['Reposicionamento de Marca', 'Público Sénior', 'Plano de Ação'],
    desc: 'Plano de marketing para reposicionar o Nestum Pro como cereal premium junto do consumidor sénior português.',
    highlight: '7 ações de marketing calendarizadas para 2025, a responder ao "Grey Tsunami" do consumidor sénior — com potencial estimado para triplicar o awareness da marca junto do público 50+ em 12 meses.',
    process: [
      { title: 'Diagnóstico', text: 'Análise SWOT do Nestum Pro cruzada com pesquisa direta ao público 50+ — 73% não conhece o produto, mas 90% dos que já o experimentaram voltaria a comprá-lo — e entrevistas a key opinion leaders (enfermeiros, nutricionistas, farmacêuticos).' },
      { title: 'Posicionamento', text: 'Reposicionamento do Nestum Pro como cereal premium, sofisticado e reconfortante, dirigido a adultos 50+ ativos e aos profissionais de saúde que os influenciam — assente em sofisticação, conforto e tradição.' },
      { title: 'Plano Estratégico', text: 'Sete ações de ativação: novos sabores (Maçã e Canela, Pistáchio e Mel), um kit de receitas por QR Code, formato em barra on-the-go, saquetas individuais, vídeo publicitário, presença em congressos de nutrição e parcerias com nutricionistas.' },
      { title: 'Roadmap', text: 'Mensagem final de marca: "Nutre gerações. Fortalece laços. Mantém a tradição." — uma resposta direta e respeitosa ao crescimento do consumidor sénior, o "Grey Tsunami".' },
    ],
  },
  {
    name: 'Unveiling the Seaweed Consumer', brand: 'Tese de Mestrado, IPAM', year: '2025', category: 'investigacao', categoryLabel: 'Investigação Científica',
    tags: ['Tese de Mestrado', 'Comportamento do Consumidor', 'Alimentação Sustentável'],
    desc: 'Dissertação de mestrado sobre a intenção de consumo de produtos à base de algas em Portugal, com base na Teoria do Comportamento Planeado.',
    keyFindings: ['O nojo alimentar (food disgust) revelou-se o preditor mais forte e negativo da atitude e da intenção de consumo de algas.', 'Ao contrário da literatura internacional, o público português mais recetivo às algas tem 65+ anos, rendimento elevado e vive longe do mar.', 'Primeira validação em Portugal da escala de Neofobia Alimentar, revelando dois fatores distintos — abertura/confiança e rejeição/especificidade.'],
    publication: 'Dissertação de Mestrado, IPAM Porto, julho de 2025 — com artigos submetidos ao Management in Review e ao International Journal of Consumer Studies',
  },
  {
    name: 'Tecnologia e Cliente — Case Disney', brand: 'The Walt Disney Company (case study)', year: '2023', category: 'investigacao', categoryLabel: 'Investigação Científica',
    tags: ['Artigo Crítico', 'Tecnologias Emergentes', 'Marketing'],
    desc: 'Artigo crítico sobre o impacto das tecnologias emergentes na relação entre marcas e clientes, com a Disney como caso de estudo.',
    keyFindings: ['IA, IoT, Big Data, Realidade Aumentada/Virtual e chatbots estão a redefinir a forma como as marcas constroem relações emocionais com os seus clientes.', 'A Disney usa a tecnologia como extensão do seu storytelling — não como substituto — para tornar experiências em parques e streaming mais pessoais e imersivas.', 'A adoção tecnológica só cria valor quando as marcas sabem exatamente que problema querem resolver, sem comprometer a confiança e os dados do consumidor.'],
    publication: 'Artigo crítico, Mestrado em Gestão de Marketing, dezembro de 2023',
  },
  {
    name: 'A Força Inexorável do Tempo — The Grey Tsunami', brand: 'Artigo Crítico', year: '2024', category: 'investigacao', categoryLabel: 'Investigação Científica',
    tags: ['Artigo Crítico', 'Consumidor Sénior', 'Marketing'],
    desc: 'Artigo crítico sobre a ascensão do consumidor sénior e o desafio das marcas em se adaptarem ao "grey tsunami".',
    keyFindings: ['O consumidor sénior é cada vez mais heterogéneo e valoriza saúde, independência e vivências de valor — não bens materiais.', 'Marcas como a Sword Health e a Danone mostram como tecnologia e alimentação podem servir este público sem o infantilizar.', 'As residências sénior estão a reposicionar-se como espaços de vida independente e requintada, longe do estigma de "lar de idosos".'],
    publication: 'Artigo crítico, Mestrado em Gestão de Marketing, dezembro de 2024',
  },
  {
    name: 'Lokai — O Brilho do Simbolismo', brand: 'Artigo Crítico', year: '2023', category: 'investigacao', categoryLabel: 'Investigação Científica',
    tags: ['Artigo Crítico', 'Storytelling de Marca', 'Marketing'],
    desc: 'Artigo crítico sobre a marca Lokai e o simbolismo das suas pulseiras — equilíbrio, contraste e dualidade como narrativa de marca.',
    keyFindings: ['As pulseiras Lokai transformam um símbolo físico — água do Evereste e lama do Mar Morto — numa narrativa emocional de equilíbrio entre os altos e baixos da vida.', 'O compromisso humanitário transparente, com 10% do lucro doado, reforça a confiança e o vínculo emocional com o consumidor.', 'A comunidade #livelokai mostra como o marketing de relacionamento pode transformar clientes em porta-vozes de uma causa.'],
    publication: 'Artigo crítico, Mestrado em Gestão de Marketing, novembro de 2023',
  },
  {
    name: 'Mulheres versus Homens — O Otimismo Económico Tem Género?', brand: 'Artigo Crítico', year: '2024', category: 'investigacao', categoryLabel: 'Investigação Científica',
    tags: ['Artigo Crítico', 'Comportamento do Consumidor', 'Economia'],
    desc: 'Estudo comparativo sobre o otimismo económico de mulheres e homens face às finanças pessoais e à economia nacional, com base num inquérito a 746 indivíduos no norte de Portugal.',
    keyFindings: ['As mulheres revelaram-se mais pessimistas do que os homens, sobretudo quanto à probabilidade de perda de emprego, às políticas de combate ao desemprego e ao futuro financeiro das empresas.', 'A diferença de otimismo entre géneros mantém-se mesmo controlando o tipo de agregado familiar, alinhando-se com a literatura internacional sobre otimismo económico e género.', 'A ausência de dados sobre literacia financeira dos inquiridos foi identificada como limitação, abrindo caminho para estudos futuros.'],
    publication: 'Artigo crítico, baseado no Survey de Michigan, Mestrado em Gestão de Marketing, 2024',
  },
];

export function buildSummary(p) {
  const out = { lead: p.desc || '', bullets: [], chips: p.tags || [], dots: [], shots: [], meta: '' };
  if (p.highlight) out.bullets = [p.highlight];
  if (p.keyFindings) out.bullets = p.keyFindings.slice(0, 2);
  if (p.process) out.chips = p.process.map(s => s.title);
  if (p.publication) out.meta = p.publication;
  const id = p.identity;
  if (id) {
    if (id.palette) out.dots = id.palette.slice(0, 6).map(c => ({ hex: c.hex, name: c.name }));
    if (id.typography) out.meta = id.typography.displayLabel + ' + ' + id.typography.bodyLabel;
    if (id.mockups) out.shots = id.mockups.slice(0, 3).map(m => ({ id: m.id, label: m.label, placeholder: m.placeholder, src: m.src || '' }));
  }
  return out;
}

function sec(title, extra) {
  return Object.assign({ title, paras: [], pairs: [], chips: [], swatches: [], slots: [], lists: [] }, extra || {});
}

export function buildSections(p) {
  const out = [];
  if (p.highlight) out.push(sec('O que ficou', { paras: [p.highlight] }));
  if (p.process) out.push(sec('Processo', { pairs: p.process.map(s => ({ label: s.title, text: s.text })) }));
  if (p.keyFindings) out.push(sec('Conclusões', { paras: p.keyFindings }));
  if (p.publication) out.push(sec('Publicação', { paras: [p.publication] }));
  const id = p.identity;
  if (id) {
    if (id.palette) out.push(sec('Paleta', {
      swatches: id.palette.map(c => ({ name: c.name, hex: c.hex, use: c.use, ink: c.light ? '#F3E9D2' : '#191410' })),
    }));
    if (id.typography) out.push(sec('Tipografia', {
      pairs: [{ label: id.typography.displayLabel, text: id.typography.displaySample }, { label: id.typography.bodyLabel, text: id.typography.bodySample }],
    }));
    if (id.patterns) out.push(sec('Padrões', { slots: [{ id: id.patterns.imgId, label: 'Padrões da marca', placeholder: 'Padrões da marca' }] }));
    if (id.moodboard) out.push(sec('Moodboard', {
      chips: id.moodboard.keywords,
      slots: id.moodboard.imgIds.map((i, n) => ({ id: i, label: 'Referência ' + (n + 1), placeholder: 'Referência visual ' + (n + 1) })),
    }));
    if (id.mockups) out.push(sec('Aplicações', {
      slots: id.mockups.map(m => ({ id: m.id, label: m.label, placeholder: m.placeholder })),
    }));
  }
  return out;
}
