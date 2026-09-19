# Changelog

Todas as alterações relevantes do projeto devem ser registradas neste arquivo.

## [0.2.0] — 2026-09-19

### Adicionado
- Segunda etapa de continuidade narrativa entre abertura, história e memórias.
- Revelações graduais de conteúdo conforme as seções entram na área visível.
- Delays sutis para criar ritmo entre elementos relacionados.
- Elementos de transição visual entre as seções, sem alterar a identidade visual aprovada.
- Ajustes específicos para celular, reduzindo a sensação de blocos independentes durante a rolagem.
- Suporte explícito a prefers-reduced-motion para reduzir as animações quando solicitado pelo sistema.

### Mantido
- Identidade visual da etapa 1 como referência.
- Página única em HTML5, CSS3 e Vanilla JS.
- Conteúdo pessoal apenas por placeholders.
- Compatibilidade com GitHub Pages e ausência de dependências externas.

### Validação
- Estrutura revisada contra os critérios da etapa 2.
- IDs, atributos data-* e scripts mantidos compatíveis com a navegação existente.
- Código revisado estaticamente para responsividade, fallback de IntersectionObserver e redução de movimento.

### Limitações
- Não foi possível executar servidor local nem inspeção de DevTools neste ambiente.
- A validação visual real em dispositivo continua dependendo do teste no celular/desktop do usuário.
- Nenhum conteúdo pessoal, foto ou música foi adicionado nesta etapa.

## [0.1.0] — 2026-09-19

### Adicionado
- Fundação inicial de uma experiência cinematográfica em página única.
- Estrutura HTML5 com abertura, história e memórias.
- Identidade visual inicial em CSS puro, responsiva e sem dependências externas.
- Arquitetura JavaScript em Vanilla JS, separada por responsabilidade.
- Conteúdo pessoal centralizado em js/content.js.
- Fundação de animações em js/animations.js.
- Fundação de player em js/music-player.js, sem carregar música real.
- Placeholders explícitos para nomes, mensagens, fotos, músicas e histórias.
- Guia inicial de edição e manutenção.
- Pastas reservadas para fotos, músicas e desenhos.

### Observações
- Nenhuma foto ou música real foi adicionada.
- Nenhum framework ou biblioteca externa foi utilizado.
- A experiência permanece em uma única página e é compatível com GitHub Pages.
