/**
 * CONFIGURAÇÃO CENTRAL DO SITE
 * ------------------------------------------------------------
 * Todas as informações de contato, horários e links ficam aqui.
 * Para atualizar telefone, endereço, mapa ou horários, altere
 * somente este arquivo — os componentes leem tudo daqui.
 */

export const site = {
  name: 'Jambalaya Day Care',
  shortName: 'Jambalaya',
  nickname: 'Jamba',
  city: 'Jundiaí',
  state: 'SP',

  /** Tempo de atuação e ano de início */
  yearsActive: 7,
  since: 2019,

  /** Faixa etária atendida neste modelo */
  ages: { min: 7, max: 15 },

  phone: {
    display: '(11) 97235-6565',
    /** Formato internacional, só números — usado no WhatsApp e no link tel: */
    e164: '5511972356565',
  },

  whatsapp: {
    baseUrl: 'https://wa.me/5511972356565',
    messages: {
      visit: 'Olá! Vim pelo site e gostaria de agendar uma visita à Jambalaya.',
      party: 'Olá! Gostaria de saber mais sobre as festas da Jambalaya.',
      general: 'Olá! Vim pelo site e gostaria de conversar com a equipe da Jambalaya.',
      daycare: 'Olá! Vim pelo site e gostaria de saber mais sobre o Day Care e a recreação da Jambalaya.',
      workshops: 'Olá! Vim pelo site e gostaria de saber mais sobre as oficinas criativas da Jambalaya.',
      vacation: 'Olá! Vim pelo site e gostaria de saber mais sobre as Férias na Jamba.',
    },
  },

  instagram: {
    handle: '@jambalayadaycare',
    url: 'https://www.instagram.com/jambalayadaycare/',
  },

  address: {
    street: 'Rua Abílio Figueiredo, 214',
    cityLine: 'Jundiaí – SP',
    full: 'Rua Abílio Figueiredo, 214 – Jundiaí – SP',
  },

  /** Link do mapa — substitua pelo link definitivo do Google Maps quando quiser */
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Rua+Abilio+Figueiredo+214+Jundiai+SP',

  /**
   * Horários (DEMONSTRATIVOS). `open`/`close` em horas (24h) alimentam a
   * régua visual do card; deixe `null` quando o horário for "sob consulta".
   */
  hours: [
    { days: 'Segunda a sexta', short: 'Seg–Sex', label: '08h às 19h', open: 8, close: 19 },
    { days: 'Sábados', short: 'Sáb', label: '09h às 18h', open: 9, close: 18 },
    { days: 'Domingos e feriados', short: 'Dom/Fer', label: 'Sob consulta', open: null, close: null },
  ] as Array<{ days: string; short: string; label: string; open: number | null; close: number | null }>,

  /** Avisos da versão de apresentação */
  demo: {
    /** false esconde a faixa "PRÉVIA DE APRESENTAÇÃO" do topo */
    showBanner: true,
    banner: 'PRÉVIA DE APRESENTAÇÃO — Textos, horários e informações serão ajustados após a aprovação.',
    images:
      'Imagens ilustrativas utilizadas exclusivamente nesta apresentação. Na versão final, serão substituídas pelos registros reais do espaço.',
    footer: 'Modelo demonstrativo — conteúdo sujeito à confirmação.',
  },
} as const;

export type WhatsAppMessageKey = keyof typeof site.whatsapp.messages;

/** Navegação principal (âncoras das seções) */
export const navigation = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'experiencias', label: 'Experiências' },
  { id: 'festas', label: 'Festas' },
  { id: 'galeria', label: 'Galeria' },
  { id: 'duvidas', label: 'Dúvidas' },
] as const;
