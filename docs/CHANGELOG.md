# Changelog

Todas as alterações relevantes do projeto devem ser registradas neste arquivo.

## [0.3.0] — 2026-09-19

### Adicionado
- Arquitetura de fotos separando conteúdo narrativo de um futuro álbum independente.
- Renderização dinâmica das memórias a partir de js/content.js.
- Estrutura de galeria narrativa preparada para uma ou várias fotos.
- Carrossel narrativo com controles anterior/próxima e suporte a swipe no celular quando houver múltiplas fotos.
- Imagens configuradas para carregamento lazy e decodificação assíncrona.
- Estrutura de placeholders para fotos, alt texts, títulos e legendas sem adicionar fotos pessoais.

### Alterado
- A seção de história passou a usar um container próprio para mídia narrativa.
- A grade de memórias deixou de depender de conteúdo fixo no HTML e passou a ser gerada a partir de content.js.
- Criado js/photos.js para separar a lógica de mídia da navegação geral.
- Ajustada a ordem dos scripts para que o conteúdo de fotos seja renderizado antes da inicialização das revelações.

### Mantido
- Identidade visual da v0.2.1.
- Timing dos reveals: 1050ms com delays de 140ms, 280ms, 420ms e 560ms.
- HTML5, CSS3 e Vanilla JS, sem bibliotecas externas.
- Navegação existente, suporte a reduced motion e compatibilidade com GitHub Pages.
- Nenhuma foto real, música ou efeito cinematográfico final foi adicionado.

### Validação
- Estrutura revisada para manter separação entre fotos narrativas e futuro álbum.
- Sistema preparado para adicionar/remover/trocar fotos pelo content.js sem editar os cards no HTML.
- Swipe, controles e carregamento de imagens implementados sem dependências externas.
- Revisão estática dos seletores, caminhos, timing dos reveals e fallback de placeholders.

### Limitações
- Não foi possível executar servidor local nem inspeção de DevTools neste ambiente.
- A validação visual final em celular e desktop depende do teste do usuário.
- O álbum próprio ainda não foi implementado e não recebeu botão ou navegação nesta etapa.

## [0.2.1] — 2026-09-19

### Refinamento
- Aumentada moderadamente a duração dos reveals de 700ms para 1050ms.
- Aumentados levemente os delays entre elementos, mantendo progressão discreta.
- Mantida a mesma curva de easing e a mesma distância de entrada para preservar o comportamento visual.
- Mantido o tratamento de prefers-reduced-motion.

### Validação
- Refinamento limitado exclusivamente ao tempo e ritmo das transições.
- Estrutura HTML, navegação, conteúdo, layout e identidade visual não foram redesenhados.
- CSS revisado para confirmar que apenas duração/delays dos reveals foram alterados.

### Limitações
- Não foi possível executar servidor local nem inspeção de DevTools neste ambiente.
- O teste visual em dispositivo foi realizado pelo usuário e confirmou o funcionamento correto da etapa 2 antes deste refinamento.

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
