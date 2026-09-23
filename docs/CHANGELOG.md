## [1.1.0] — 2026-09-23

### Etapa 4.4 — Carta
- Adicionada a sexta parte da experiência narrativa, com envelope fechado, abertura e carta revelada.
- Mantido o conteúdo da carta centralizado em `js/content.js`, dentro de `gift`.
- Reutilizado `js/interactions.js`, sem criar um arquivo específico para a carta.
- Implementados os estados `closed`, `opening` e `opened`, com bloqueio imediato contra acionamentos repetidos.
- Envelope e selo/coração construídos integralmente com CSS, formas geométricas e `clip-path`, sem imagem externa.
- Conteúdo pessoal da carta mantido como texto HTML real, com altura natural e suporte a mensagens curtas, médias ou longas.
- Implementados foco visível, botão HTML real, área de toque adequada, anúncio de estado e suporte a `prefers-reduced-motion`.
- Timings da Etapa 2 preservados; a abertura da carta utiliza timing próprio e isolado.
- 4.1, 4.2, 4.3, Memórias, História e Player permanecem fora do escopo de alteração.
- 4.5 não foi implementada nem antecipada.

### Validação
- Auditoria estrutural realizada antes da implementação, incluindo branch, HEAD, comparação com `main`, 4.3, conteúdo, comportamento e estilos existentes.
- Validação estática realizada após a implementação dos arquivos e integrações.
- Não há `package.json`/suíte npm no projeto; `npm test` permanece não aplicável.
- Validação visual real em navegador desktop/mobile depende da execução no navegador pelo responsável do projeto.
- Testes estruturais de conteúdo curto, médio e longo foram representados por altura natural e quebra de texto; não foram executados visualmente neste ambiente.

## [1.0.0] — 2026-09-23

### Etapa 4.3 — Surpresa / Interação
- Adicionada uma pequena experiência narrativa em três estados: inicial, confirmação e revelação.
- Conteúdo centralizado em `js/content.js`, dentro de `surprise`.
- Reutilizado `js/interactions.js`; nenhum novo arquivo de comportamento foi criado.
- Utilizado botão HTML real com foco visível, área de toque adequada e proteção contra transições repetidas.
- Adicionada transição discreta entre os estados e suporte a `prefers-reduced-motion`.
- Mensagens usam altura natural e quebra de texto, sem altura fixa para conteúdo.
- A 4.3 não cria dependência técnica com a futura 4.4.
- 4.1, 4.2, Memórias, História, player e timings anteriores foram preservados.
- 4.4 e 4.5 não foram implementadas.

### Validação
- Auditoria estrutural realizada antes da implementação.
- Validação estática dos arquivos e integrações realizada após a implementação.
- Não há `package.json`/suíte npm no projeto; `npm test` permanece não aplicável.
- Validação visual real em navegador desktop/mobile não foi executada neste ambiente.

## [0.9.0] — 2026-09-23

### Etapa 4.2 — Cápsula do Tempo
- Adicionada uma nova seção narrativa depois da experiência 4.1.
- Criada uma cápsula visual fechada com interação de abertura e revelação de mensagem.
- Mantido o conteúdo pessoal centralizado em `js/content.js`, dentro de `timeCapsule`.
- Reutilizado `js/interactions.js`; não foi criado um novo arquivo de comportamento.
- Implementada abertura com estados simples: fechada, abrindo e aberta.
- O botão usa elemento HTML real, possui foco visível, estado desabilitado após o acionamento e suporte a `prefers-reduced-motion`.
- A mensagem revelada usa altura natural, sem altura fixa, para suportar conteúdos curtos, médios ou longos.
- Adicionada responsividade específica para desktop e mobile, mantendo a identidade escura/ameixa e rosa-bebê.
- 4.1, Memórias, História, player e timings anteriores foram preservados.
- 4.3, 4.4 e 4.5 não foram implementadas.

### Validação
- Auditoria estrutural realizada antes da implementação.
- Validação estática dos arquivos e das integrações realizada após a implementação.
- Não há `package.json`/suíte npm no projeto; `npm test` permanece não aplicável.
- Este ambiente não possui navegador/DevTools para validação visual real; testes visuais finais de desktop e mobile dependem da execução no navegador.
- Testes de mensagem curta, média e longa foram tratados estruturalmente pela ausência de altura fixa e uso de quebra de conteúdo, mas não foram executados como teste visual em navegador.

## [0.8.0] — 2026-09-21

### Etapa 4.1 — Algumas coisas que eu gosto em você
- Adicionada uma nova seção narrativa depois das Memórias.
- Criada uma experiência de um motivo por vez, com navegação anterior/próxima e contador.
- Conteúdo centralizado em `js/content.js`, dentro de `likes`.
- Criado `js/interactions.js` para separar comportamento da apresentação.
- Adicionada apresentação visual própria em `css/style.css`, seguindo a identidade já aprovada.
- Mantidos placeholders claros; nenhum conteúdo pessoal novo foi inventado.
- Controles possuem estados de limite e foco visível.
- A transição é discreta e respeita `prefers-reduced-motion`.

### Validação
- Branch criada diretamente da `main` atual: `etapa-4-continuacao-da-estrutura`.
- Etapa 4.1 implementada isoladamente; 4.2–4.5 não foram antecipadas.
- Memórias, História, player e timings anteriores não foram alterados intencionalmente.
- Não há suíte npm/package.json; `npm test` permanece não aplicável.
- Validação estrutural e estática realizada; validação visual/interativa real em navegador desktop/mobile depende da execução no navegador.

## [0.7.1] — 2026-09-21

### Polimento do coração pixelado das Memórias
- Reduzido o coração para uma presença mais delicada e proporcional ao card.
- Ajustada a elevação vertical para manter o coração visualmente separado da foto, sem sobreposição.
- Mantida a forma em pixel art 2D, o preenchimento rosa-bebê e o número centralizado em tom mais escuro.
- Ajustado o tamanho do número para acompanhar a nova escala do coração sem perder legibilidade no desktop e no mobile.
- Nenhuma alteração feita na foto, prévias laterais, card, textos, controles, carrossel, História, player ou sistema de reveals.

### Validação
- Alteração restrita ao CSS do indicador das Memórias e a este registro.
- Não houve alteração em js/photos.js.
- Proporção natural das imagens, placeholders, legenda, swipe, transição e timings permanecem inalterados.
- Não há suíte npm/package.json; npm test permanece não aplicável.
- Validação visual real em navegador desktop/mobile depende do teste do projeto pelo responsável.

## [0.7.0] — 2026-09-21

### Refinamento visual das Memórias
- Criada uma composição de carrossel com a foto principal centralizada e prévias visuais discretas da memória anterior e da próxima no desktop.
- As prévias usam baixa opacidade e preservam a proporção natural das imagens, sem crop ou distorção.
- Em telas menores, as prévias são reduzidas a uma presença sutil para preservar a foto principal e evitar overflow horizontal.
- Refinada a moldura do card, com borda delicada, cantos suaves e contraste discreto.
- Refinados espaçamento, hierarquia e leitura entre foto, título e legenda sem alterar os textos.
- Controles mantidos com a mesma lógica, anterior/próxima, contador e bloqueio dos limites, apenas com integração visual refinada.
- O coração pixelado atual foi mantido sem alterações de design nesta etapa.
- História, player, conteúdo, proporção natural, placeholders, swipe e timings de reveal permanecem fora do escopo funcional.

### Validação
- Nova branch criada diretamente da main atual.
- Alterações restritas a css/style.css, js/photos.js e docs/CHANGELOG.md.
- Nenhuma outra área do projeto foi alterada.
- Não há suíte npm/package.json; npm test permanece não aplicável.
- Validação visual real em navegador desktop/mobile ainda depende do teste do projeto pelo responsável.
- Testes estáticos posteriores devem confirmar os seletores, lógica de prévias, proporção natural e preservação dos timings.

## [0.5.3] — 2026-09-21

### Correção da legenda duplicada nas Memórias
- Removida a legenda sobreposta dentro da área da foto das Memórias.
- A legenda das Memórias permanece somente abaixo do título, na área de texto do card.
- A legenda da seção de História permanece inalterada.
- Nenhuma alteração foi feita na proporção das imagens, controles do carrossel, swipe, reveals, player ou conteúdo.

### Validação
- Correção restrita ao CSS das Memórias.
- `js/photos.js` não foi alterado.
- Não há suíte npm/package.json; npm test permanece não aplicável.
- Validação visual final depende do teste no navegador/GitHub Pages.
  
## [0.5.2] — 2026-09-20

### Correção da proporção das imagens das Memórias
- Removida a altura fixa aplicada às imagens reais do carrossel de Memórias.
- Imagens reais agora mantêm a largura disponível e acompanham automaticamente sua proporção natural, sem corte ou deformação.
- Placeholders sem imagem mantêm uma altura visual mínima de 190px, evitando o colapso da área de mídia.
- Nenhuma alteração foi feita no conteúdo das Memórias, nos controles do carrossel, no sistema de reveals ou no player de música.

### Validação
- Estrutura de js/photos.js revisada: imagens reais continuam sendo renderizadas apenas quando item.image existe; placeholders continuam usando photo-frame--placeholder.
- Alteração de layout concentrada em css/style.css.
- Timings dos reveals permanecem 1050ms, 140ms, 280ms, 420ms e 560ms.
- Não há suíte npm/package.json; npm test permanece não aplicável.
- Este ambiente não possui navegador/servidor local/DevTools para validação visual real; testes finais de desktop e mobile dependem da execução no navegador.

## [0.5.1] — 2026-09-19

### Refinamento da Etapa 5 — Player de música
- Reduzido o painel expandido no mobile para aproximadamente 68svh, mantendo o conteúdo rolável dentro do bottom-sheet.
- Ampliada a área de abertura do mini-player: a box principal agora abre o painel, enquanto o play/pause mantém sua ação própria.
- Removidas completamente as setas de expansão/fechamento do player.
- Mantidos reprodução, playlist, controles, acessibilidade, reduced-motion e demais comportamentos existentes.

### Validação
- Revisão estática dos pontos de abertura do mini-player e dos elementos de expansão.
- Sintaxe de js/music-player.js validada após a alteração.
- CSS revisado para confirmar a regra mobile de 68svh e preservação do layout desktop.
- Não há suíte npm/package.json; npm test permanece não aplicável.
- Validação visual/interativa real em navegador ainda depende do teste no GitHub Pages/dispositivo, pois este ambiente não possui navegador/DevTools.

## [0.5.0] — 2026-09-19

### Etapa 5 — Player de música
- Implementado mini-player fixo inferior e painel bottom sheet com backdrop.
- Implementados play/pause, anterior/próxima, progresso, duração, volume e playlist.
- Implementada uma única instância de HTMLAudioElement.
- Reprodução somente após interação válida; sem autoplay.
- Estado de reprodução preservado durante a navegação.
- Capas independentes dos MP3, com fallback quando ausentes/indisponíveis.
- Destaque da faixa atual, estados ARIA, foco visível e suporte a prefers-reduced-motion.
- Layout mobile com safe-area e suporte à orientação horizontal.
- Identidade rosa-bebê/rosa escuro com detalhes discretos, sem logo ou identidade do Spotify.
- Timings da Etapa 2 e carrossel de memórias preservados.

### Arquivos alterados
- css/style.css
- js/content.js
- js/music-player.js
- docs/GUIA-DE-EDICAO.md
- docs/CHANGELOG.md
- assets/fotos/musicas/.gitkeep

### Validação
- Sintaxe JS validada estaticamente.
- Quatro MP3 existentes confirmados no repositório.
- Quatro caminhos de capa cadastrados; capas reais ainda não presentes, com fallback implementado.
- Uma única instância de áudio confirmada no código.
- Controles, limites, seleção, progresso, volume, erro, reduced-motion e persistência por navegação revisados estaticamente.
- Sem package.json/suíte npm; npm test não é aplicável.
- Sem navegador/DevTools/servidor local neste ambiente; reprodução real, console e validação visual mobile/desktop dependem do teste no navegador.

### Limitações
- Capas reais ainda não foram adicionadas.
- GitHub confirmou os MP3, mas esta ferramenta não reproduz áudio.
- Nenhum status de CI foi retornado para o HEAD auditado.

# Changelog

## [0.3.3] — 2026-09-19

### Refinamento visual do carrossel de memórias
- Destacado o botão de próxima memória com rosa-bebê para melhorar a percepção de ação.
- Refinado o botão anterior para manter contraste e coerência visual sem competir com a ação principal.
- Transformado o contador em um elemento visual próprio, com cápsula, linhas laterais e maior contraste.
- Adicionada transição suave entre memórias, com fade e deslocamento horizontal discreto.
- Mantido suporte a prefers-reduced-motion sem aplicar a transição animada quando a redução de movimento estiver ativa.

### Mantido
- Uma memória por vez.
- Navegação anterior/próxima, contador e swipe.
- Estrutura de conteúdo em js/content.js.
- Timings da Etapa 2: 1050ms, 140ms, 280ms, 420ms e 560ms.
- HTML5, CSS3 e Vanilla JS, sem dependências externas.

### Validação
- Alterações limitadas ao comportamento/transição do carrossel e ao estilo dos controles/contador.
- Não foram alterados content.js ou animations.js.
- Validação estrutural realizada e teste visual real confirmado pelo usuário após a publicação no GitHub Pages.


## [0.3.2] — 2026-09-19

### Correção visual
- A seção de memórias passou de uma grade de três cards simultâneos para uma apresentação de uma memória em destaque por vez.
- Adicionados controles anterior/próxima e contador de posição específicos para as memórias.
- Mantido o swipe horizontal no viewport das memórias, com limites na primeira e na última memória.
- Mantida a área própria do indicador numérico acima da foto.

### Mantido
- Conteúdo das memórias continua centralizado em js/content.js.
- js/photos.js continua responsável pela renderização e navegação das fotos.
- Imagens continuam usando loading="lazy" e decoding="async" quando configuradas.
- Identidade visual, arquitetura de conteúdo e sistema de reveals da Etapa 2 foram preservados.
- Não foram adicionadas bibliotecas, frameworks ou dependências externas.

### Validação
- Revisão estática da lógica de navegação, limites, swipe, acessibilidade dos controles e estrutura de renderização.
- Confirmado que animations.js e os timings dos reveals não foram alterados.
- Não foi realizada validação visual em navegador neste ambiente.

## [0.3.1] — 2026-09-19

### Correção visual
- Corrigido o posicionamento do indicador numérico das memórias para que ele permaneça em sua própria área acima da foto.
- Removido o deslocamento vertical negativo da mídia das memórias que fazia a foto subir sobre a área do indicador.
- Mantidos a proporção/altura da foto, a arquitetura dinâmica de fotos, o carousel/swipe narrativo e os timings dos reveals.

### Validação
- Revisão estática confirmou que a correção ficou restrita ao layout da mídia dos cards de memória.
- Não houve alteração em `js/content.js`, `js/photos.js` ou `js/animations.js`.
- Timings dos reveals mantidos em 1050ms com delays de 140ms, 280ms, 420ms e 560ms.

### Limitações
- Não foi possível executar navegador/DevTools ou servidor local neste ambiente; a validação de dimensões reais em mobile e desktop depende do teste visual no dispositivo.

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
- Ajustada a ordem dos scripts e a inicialização de js/photos.js para que o conteúdo dinâmico seja renderizado antes da inicialização das revelações.

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
