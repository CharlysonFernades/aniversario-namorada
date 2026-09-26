# Guia de edição

## Objetivo
Este projeto usa HTML5, CSS3 e JavaScript puro para construir uma experiência de aniversário em uma única página. A base foi separada por responsabilidade para permitir novas etapas sem reescrever a estrutura existente.

## Onde editar
- Conteúdo pessoal: js/content.js
- Estrutura e seções: index.html
- Aparência: css/style.css
- Lógica e navegação: js/app.js
- Fotos narrativas: js/photos.js
- Animações e revelações: js/animations.js
- Player: js/music-player.js

## Fotos

A Etapa 3 separa duas ideias que devem continuar independentes:
- **Fotos narrativas:** imagens que aparecem integradas às seções atuais. Podem usar uma galeria/carrossel quando houver várias imagens.
- **Álbum:** coleção própria para uma experiência futura, mantida separada em content.js. O álbum ainda não possui tela, botão ou navegação nesta etapa.

### Onde colocar os arquivos
- Fotos reais: assets/fotos/

### Onde cadastrar
Todo conteúdo pessoal de fotos deve ficar em js/content.js, dentro de:
- photos.narrative.story
- photos.narrative.memories
- photos.album (reservado para etapa futura)

Cada foto narrativa pode usar:
- image: caminho relativo, por exemplo assets/fotos/momento-01.jpg
- alt: descrição acessível da imagem
- title: título curto da memória
- caption: legenda curta

### Adicionar, remover ou trocar
1. Coloque o arquivo da foto em assets/fotos/.
2. Cadastre ou altere o objeto correspondente em js/content.js.
3. Para remover uma memória, remova o item da coleção.
4. Não é necessário criar ou duplicar cards manualmente no index.html.
5. Use nomes de arquivo simples e previsíveis, evitando espaços e versões ambíguas.

### Imagens
- O sistema usa loading="lazy" e decoding="async" nas imagens cadastradas.
- Preserve caminhos relativos para manter compatibilidade com GitHub Pages.
- Prefira arquivos já otimizados antes de adicioná-los ao projeto.

## Player de música — Etapa 5

### Arquivos
- Áudios: `assets/musicas/`
- Capas: `assets/fotos/musicas/`

Os MP3 permanecem independentes das capas. O player usa uma única instância de áudio.

### Cadastro em content.js
As músicas ficam na coleção `musicas`. Cada item usa `titulo`, `artista`, `arquivo`, `capa` e `altCapa`. Para adicionar, remova ou troque uma música, altere essa coleção e os arquivos correspondentes em `assets`. Não é necessário editar o HTML do player.

### Uso
O mini-player permanece fixo na parte inferior. Tocar nele abre o painel; play/pause, anterior/próxima, progresso, volume e playlist são controlados pelo próprio player. Fechar/minimizar não interrompe a música e navegar entre as seções não recria o player. Não há autoplay.

### Capas ausentes
Capa vazia ou indisponível gera placeholder visual sem impedir a reprodução do áudio.

## Álbum futuro
A coleção photos.album existe somente para manter a separação arquitetural. Não adicionar botão, tela, modal ou navegação de álbum nesta etapa.

## Animações
- Elementos com data-reveal entram em cena quando ficam visíveis.
- O timing aprovado da v0.2.1 é congelado: 1050ms e delays de 140ms, 280ms, 420ms e 560ms.
- prefers-reduced-motion: reduce desativa o deslocamento visual das revelações.
- Novas animações devem permanecer sutis e preservar a identidade visual aprovada.

## Regras
1. Não adicione frameworks ou bibliotecas externas sem decisão específica.
2. Mantenha conteúdo pessoal em js/content.js.
3. Ao alterar navegação, verifique IDs e atributos data-*.
4. Preserve caminhos relativos e compatibilidade com GitHub Pages.
5. Registre alterações relevantes em docs/CHANGELOG.md.
6. Antes de nova etapa, audite a estrutura e defina critérios de aceitação.
7. Não transformar animações em requisito para acessar o conteúdo: sempre manter fallback funcional.

## Etapa 4.1 — Algumas coisas que eu gosto em você

A primeira nova experiência interativa da Etapa 4 fica em uma seção própria da página. O conteúdo pessoal é separado do comportamento.

### Onde editar os motivos

Abra:

`js/content.js`

Localize:

`likes`

A estrutura é:

```js
likes:{
  title:"Algumas coisas que eu gosto em você",
  intro:"[INTRODUÇÃO DA EXPERIÊNCIA]",
  items:[
    {title:"[MOTIVO 01]",text:"[DESCRIÇÃO DO MOTIVO 01]"},
    {title:"[MOTIVO 02]",text:"[DESCRIÇÃO DO MOTIVO 02]"},
    {title:"[MOTIVO 03]",text:"[DESCRIÇÃO DO MOTIVO 03]"}
  ]
}
```

- `title`: título da experiência.
- `intro`: texto curto apresentado abaixo do título.
- `items`: lista dos motivos/qualidades.
- `items[].title`: título de cada motivo.
- `items[].text`: descrição de cada motivo.

### Adicionar ou remover motivos

Para adicionar um motivo, acrescente outro objeto dentro de `items`.

Para remover um motivo, remova o objeto correspondente.

Não é necessário editar o HTML para criar ou remover cards.

### Como a interação funciona

O arquivo `js/interactions.js` cuida somente do comportamento da experiência 4.1.

- `current` guarda o índice do motivo atualmente exibido.
- `render()` atualiza número, título, descrição e contador.
- Os botões anterior/próximo alteram `current` dentro dos limites da lista.
- O último/primeiro item desabilita o controle correspondente.
- `prefers-reduced-motion` evita a pequena transição quando o usuário solicita redução de movimento.

O arquivo `css/style.css` cuida apenas da apresentação: card, espaçamento, tipografia, controles e transição.



## Etapa 4.2 — Cápsula do Tempo

A segunda experiência da Etapa 4 apresenta uma cápsula fechada que pode ser aberta uma única vez para revelar uma mensagem. O conteúdo continua separado do comportamento.

### Onde editar a cápsula

Abra:

`js/content.js`

Localize:

`timeCapsule`

A estrutura é:

```js
timeCapsule:{
  title:"Cápsula do Tempo",
  intro:"[INTRODUÇÃO DA CÁPSULA]",
  message:"[MENSAGEM REVELADA]"
}
```

- `title`: título exibido no cabeçalho da experiência.
- `intro`: introdução apresentada antes da cápsula.
- `message`: mensagem revelada depois de abrir a cápsula.

Para trocar a mensagem, altere somente `timeCapsule.message`. Não é necessário editar `index.html` ou `js/interactions.js`.

### Como a interação funciona

A experiência fica dentro de `js/interactions.js`, na função `initTimeCapsule()`.

- O estado começa em `closed`.
- Ao clicar em **Abrir**, passa para `opening` e inicia a transição visual.
- Depois da transição, passa para `open` e insere a mensagem uma única vez.
- O botão é desabilitado durante a abertura e permanece desabilitado depois dela.
- Com `prefers-reduced-motion: reduce`, a revelação é concluída sem a animação.
- A mensagem usa altura natural e pode crescer conforme o texto cadastrado.

O arquivo `css/style.css` cuida da cápsula fechada, abertura da tampa, selo, botão, mensagem e responsividade.


## Etapa 4.3 — Surpresa / Interação

A terceira experiência da Etapa 4 cria uma pequena sequência narrativa em três estados: inicial, confirmação e revelação.

### Onde editar a surpresa

Abra:

`js/content.js`

Localize:

`surprise`

A estrutura é:

```js
surprise:{
  title:"[TÍTULO DA SURPRESA]",
  intro:"[INTRODUÇÃO DA SURPRESA]",
  question:"[PERGUNTA]",
  confirmLabel:"[BOTÃO DE CONFIRMAÇÃO]",
  reveal:"[REVELAÇÃO]"
}
```

- `title`: título apresentado no primeiro estado.
- `intro`: introdução apresentada no primeiro estado.
- `question`: pergunta exibida na confirmação.
- `confirmLabel`: texto do botão que confirma a continuação.
- `reveal`: mensagem curta que faz a ponte narrativa para a próxima experiência.

Para alterar os textos, edite somente os campos dentro de `surprise`. Não é necessário alterar `index.html` ou `js/interactions.js`.

### Como a interação funciona

A lógica fica em `js/interactions.js`, na função `initSurprise()`.

- O estado começa em `initial`.
- **Continuar** leva a `confirmation`.
- O botão de confirmação leva a `reveal`.
- Após a revelação, a interação fica encerrada; novos cliques não executam outra transição.
- A troca de estado usa uma transição curta e respeita `prefers-reduced-motion`.

A experiência não cria dependência técnica com a futura Etapa 4.4.


### Campos editáveis da 4.3

Os campos ficam dentro de `surprise`:

- `surprise.title`
- `surprise.intro`
- `surprise.question`
- `surprise.confirmLabel`
- `surprise.reveal`

A edição desses cinco campos não exige nenhuma alteração no comportamento.

## Etapa 4.4 — Carta

A quarta experiência da Etapa 4 apresenta um envelope fechado que pode ser aberto uma única vez para revelar uma carta.

### Onde editar a carta

Abra:

`js/content.js`

Localize:

`gift`

A estrutura é:

```js
gift:{
  title:"Uma carta para você",
  intro:"[INTRODUÇÃO DA CARTA]",
  letterTitle:"[TÍTULO DA CARTA]",
  message:"[TEXTO DA CARTA]"
}
```

- `gift.title`: título da experiência exibido no cabeçalho da seção.
- `gift.intro`: introdução exibida antes do envelope.
- `gift.letterTitle`: título exibido dentro da carta aberta.
- `gift.message`: texto pessoal da carta.

Para trocar a mensagem, edite somente `gift.message`. Para trocar o título interno, edite `gift.letterTitle`. Não é necessário alterar `js/interactions.js`.

### Separação entre conteúdo, comportamento e apresentação

- `js/content.js`: guarda os textos da carta.
- `js/interactions.js`: controla os estados `closed`, `opening` e `opened`, o clique e a revelação do conteúdo.
- `css/style.css`: constrói o envelope, o selo/coração, a animação e a aparência da carta.

O envelope e o selo/coração são desenhados com CSS, usando formas geométricas e `clip-path`; nenhuma imagem externa é necessária para representar a carta. O conteúdo pessoal da carta é inserido como texto real em elementos HTML (`h3` e `p`), e não como imagem.

### Como a abertura funciona

1. O estado inicial é `closed`.
2. O botão real `Abrir` muda o estado para `opening` e fica desabilitado imediatamente.
3. Durante a abertura, a aba do envelope gira, o selo desaparece suavemente e a folha interna se desloca.
4. Depois da transição, o estado passa para `opened`, o envelope sai de cena e a carta é exibida.
5. O título e a mensagem são carregados de `gift.letterTitle` e `gift.message`.
6. O estado aberto não permite uma segunda abertura.

A abertura usa um timing próprio e isolado da Etapa 2. Os timings dos reveals continuam em `1050ms`, `140ms`, `280ms`, `420ms` e `560ms`.

### Responsividade e acessibilidade

A composição do envelope é reduzida no mobile sem manter dimensões fixas de desktop. A carta usa altura natural e quebra de texto para suportar mensagens curtas, médias ou longas.

O botão é um `<button type="button">` real, possui foco visível, área de toque adequada e é desabilitado assim que a abertura começa. O estado é anunciado por uma área de status com `aria-live`. O envelope e o selo são decorativos.

Quando `prefers-reduced-motion: reduce` está ativo, a abertura é concluída diretamente, sem a animação intermediária.

### O que não deve ser alterado nesta etapa

A 4.4 não exige alterações em:

- Memórias;
- História;
- Player;
- `js/animations.js`;
- 4.1;
- 4.2;
- 4.3;
- futura Etapa 4.5.
## Correção de integração 4.3 → 4.4 — Cena da Carta

A ação final da 4.3, **Próximo momento**, agora abre a 4.4 como uma cena em tela cheia dentro da mesma página.

### Fluxo

`4.3 → Próximo momento → cena da carta → Voltar → posição anterior`

A seção `#carta` continua sendo a mesma seção existente. Ela fica oculta no fluxo normal até ser aberta pela ação final da 4.3. Não foi criado `carta.html`, nova URL ou nova aplicação.

### Como a cena funciona

- `initLetterExperience()` inicializa a carta e retorna `openLetterScene()`.
- `initSurprise(openLetterScene)` recebe essa ação e a executa somente quando a 4.3 já está no estado `reveal`.
- Antes de abrir, a posição de `window.scrollY` é salva.
- O `body` é travado usando posicionamento fixo e o deslocamento salvo, evitando que o fundo continue rolando.
- As partes externas à cena recebem `inert`, impedindo foco e interação enquanto a cena está ativa.
- O foco é movido para o botão `Voltar`.
- `Voltar` ou `Escape` fecha a cena, restaura o scroll salvo e devolve o foco ao elemento que acionou a abertura.
- A carta é reinicializada ao fechar, permitindo entrar novamente nela sem duplicação.

### Visual da cena

A cena usa `position: fixed` para ocupar o viewport, mantendo o conteúdo da carta isolado do fluxo normal. O conteúdo interno pode rolar quando uma carta longa exigir espaço, enquanto o fundo permanece bloqueado.

O botão `Voltar` usa `env(safe-area-inset-*)` para respeitar áreas seguras de dispositivos com recortes e cantos arredondados.

### O que permanece congelado

A arte do envelope, o selo pixelado, a abertura da carta, `gift`, os estados internos `closed/opening/opened`, 4.1, 4.2, Memórias, História, Player e os timings da Etapa 2 não são redesenhados nesta correção.

## Etapa 4.5 — Mensagem Secreta

A quinta experiência da Etapa 4 funciona como um pequeno P.S.: um convite discreto revela uma última mensagem que ficou de fora da Carta.

### Onde editar a Mensagem Secreta

Abra:

`js/content.js`

Localize:

`secretMessage`

A estrutura é:

```js
secretMessage:{
  title:"[TÍTULO DA MENSAGEM SECRETA]",
  intro:"[INTRODUÇÃO DA MENSAGEM SECRETA]",
  actionLabel:"[TEXTO DO BOTÃO]",
  message:"[MENSAGEM SECRETA]"
}
```

Edite somente estes quatro campos:

- `secretMessage.title`: título do pequeno P.S.
- `secretMessage.intro`: convite/indício apresentado antes da revelação.
- `secretMessage.actionLabel`: texto do botão que executa a ação explícita.
- `secretMessage.message`: texto que aparece depois da revelação.

A mensagem é inserida como texto real e usa `white-space: pre-wrap`, portanto as quebras de linha digitadas no valor de `message` são preservadas. O layout usa altura natural e pode crescer para textos maiores.

### Como a interação funciona

A lógica fica em `js/interactions.js`, na função `initSecretMessage()`.

- O estado inicial é `locked`.
- O botão real leva a `revealing`.
- Durante `revealing`, o botão é desabilitado para impedir disparos duplicados.
- A transição curta termina em `revealed`.
- Em `revealed`, a mensagem permanece disponível e nenhuma nova interação é exigida.
- Com `prefers-reduced-motion: reduce`, a revelação é concluída diretamente, sem depender da animação.

A apresentação visual fica isolada em `css/style.css` pelos seletores da 4.5. Não é necessário alterar HTML estrutural ou outras experiências para trocar o conteúdo.

### Limites da 4.5

A Mensagem Secreta não cria senha, puzzle, caça ao tesouro, temporizador, sequência de cliques, modal ou nova página. Ela também não implementa a Etapa 5; a integração futura pode ser feita posteriormente sem exigir que a 4.5 controle o encerramento da experiência.


## Integração 4.5 → Etapa 5 — Entrada do Encerramento

A Etapa 5 não fica exposta no fluxo normal da página. Ela é liberada somente pela Mensagem Secreta.

### Como a entrada funciona

1. A Mensagem Secreta começa em `locked`.
2. Ao revelar a mensagem, o botão **IR PARA ENCERRAMENTO** aparece.
3. O botão é um `<button>` real e chama a ação retornada por `initFinale()`.
4. A seção `#encerramento` permanece com `hidden` até essa ação.
5. Ao abrir, a Cena 1 é posicionada como um `checkpoint`.
6. O auto-scroll só começa quando o usuário pressiona **Continuar**.

A Etapa 5 não usa `IntersectionObserver` para iniciar. Não é necessário editar HTML ou criar uma nova página/URL.

### Navegação dos checkpoints

Nas Cenas 1–5, o scroll funciona em modo de leitura:
- subir é livre;
- descer é permitido até o limite inferior calculado dinamicamente pelo botão **Continuar**;
- ultrapassar esse limite é bloqueado somente no excesso;
- resize e mudança de orientação recalculam o limite.

Durante o auto-scroll e o takeover, as entradas de rolagem são bloqueadas e a animação controla a posição.

## Etapa 5 — Encerramento Cinematográfico

A Etapa 5 fica no final da página e apresenta sete cenas: texto, três fotografias, mensagem final, aviso da música e celebração.

### Onde editar as Cenas 1–5

Abra `js/content.js` e localize `finale`.

- `finale.scene1.title`: título da Cena 1.
- `finale.scene1.message`: texto da Cena 1.
- `finale.scene1.actionLabel`: texto do botão da Cena 1.
- `finale.scene2.image` e `finale.scene2.alt`: arquivo e descrição da foto da Cena 2.
- `finale.scene3.image` e `finale.scene3.alt`: arquivo e descrição da foto da Cena 3.
- `finale.scene4.image` e `finale.scene4.alt`: arquivo e descrição da foto da Cena 4.
- `finale.scene5.title`: título da mensagem final.
- `finale.scene5.message`: mensagem final.
- `finale.scene5.actionLabel`: texto do botão da Cena 5.

As Cenas 2, 3 e 4 começam com `image:""`, portanto exibem um placeholder técnico. Para trocar uma foto, coloque o arquivo em `assets/fotos/` e substitua somente o valor de `image` pelo caminho relativo. Preencha também o `alt` com uma descrição objetiva da imagem. Não é necessário alterar `interactions.js`, `style.css` ou `index.html`.

### Onde editar o aviso da Cena 6

O texto está em `finale.scene6.takeoverMessage` e já contém exatamente o aviso definido para esta etapa.

### Como trocar a música final

A música da Cena 7 fica separada da playlist normal do mini-player em `js/content.js → finale.scene7.finalMusic.src`.

Para trocar a música final:

1. coloque o arquivo em `assets/musicas/`;
2. localize `finale.scene7.finalMusic.src` em `js/content.js`;
3. substitua somente o caminho pelo nome/caminho do arquivo escolhido;
4. mantenha a estrutura restante intacta.

A música final não deve ser adicionada a `musicas`, porque a Cena 7 usa uma instância de áudio própria e exclusiva. Não é necessário alterar `music-player.js`, `interactions.js`, `style.css` ou `index.html` para trocar a faixa.

### Comportamento do encerramento

Durante o auto-scroll, wheel/trackpad, touch de rolagem e teclas de avanço são bloqueados. Em um checkpoint, a leitura pode ser feita para cima, mas a progressão para baixo depende do botão `Continuar`. Depois da celebração, a rolagem normal é restaurada.

Com `prefers-reduced-motion: reduce`, o auto-scroll é reduzido ao mínimo e as cenas continuam acessíveis sem depender de animações.

A Etapa 5 não altera os timings congelados da Etapa 2 e não cria nenhuma Etapa 6.


## Etapa 7 — Identidade artística e decoração
Os elementos decorativos da Etapa 7 ficam separados dos assets pessoais em assets/desenhos/.

### Assets decorativos
- assets/desenhos/capivara-01.svg: capivara line-art usada no Hero e como marca-d'água das Memórias/Mensagem Secreta.
- assets/desenhos/capivara-02.svg: capivara line-art secundária usada na História, Cápsula do Tempo e início do Encerramento.
- assets/desenhos/dupla-azul-rosa.svg: dupla original azul/rosa usada no Hero, Surpresa e parte final do Encerramento.
- assets/desenhos/ornamento-01.svg: ramo floral com corações/brilhos usado como ornamento do Hero e da experiência 4.1.
- assets/desenhos/ornamento-02.svg: ramo floral secundário usado na História e na Carta.

### Integração
As imagens decorativas são inseridas por elementos .art-decoration em index.html e estilizadas exclusivamente em css/style.css. Todas possuem aria-hidden=true, alt vazio, pointer-events:none e não recebem foco.

### Edição futura
Para trocar uma ilustração decorativa, substitua o arquivo SVG mantendo o mesmo nome/caminho. A posição, escala e opacidade por seção ficam em css/style.css. Não é necessário alterar js/content.js, pois esses assets não representam conteúdo pessoal.


## ÁLBUM DE FOTOS — Etapa 8

O Álbum é uma experiência separada da narrativa de Memórias e fica acessível imediatamente depois dela.

### Onde cadastrar uma foto
As fotos do Álbum ficam em `js/content.js`, na coleção `photos.album`.

Cada item usa `image`, `alt`, `title` e `caption`.

As 21 fotos atuais foram reutilizadas sem duplicar arquivos físicos. A mesma foto pode aparecer no Álbum e na narrativa de Memórias.

### Trocar, remover ou editar
Edite a coleção `photoLibrary` em `js/content.js`. Altere `image`, `alt`, `title` ou `caption` no item correspondente. Para remover uma foto do Álbum, remova o item da coleção. Não é necessário editar o HTML.

### Memórias x Álbum
- **Memórias:** seleção narrativa menor, definida por `memorySelectionIndexes`.
- **Álbum:** coleção completa das 21 fotos mantidas em `photos.album`.

Uma mesma foto pode existir nos dois lugares sem duplicar o arquivo em `assets/fotos/`.

### Conteúdo editável
Os textos do convite ficam em `album.intro` e `album.ctaLabel`. O título da experiência usa `album.title`.


### Visibilidade do convite do Álbum nas Memórias

O convite `[data-album-invite]` reutiliza o mesmo `current` do carrossel de Memórias.

Uma constante pode guardar uma referência para um elemento existente no DOM:

`const albumInvite = document.querySelector("[data-album-invite]");`

Nesse caso, `albumInvite` guarda a referência ao elemento do convite. Usar `const` significa que essa variável não recebe outro valor por reatribuição; isso não significa que tudo relacionado ao objeto referenciado seja necessariamente imutável.

Outra constante pode guardar o resultado de uma condição:

`const isLastMemory = memoryItems.length > 1 && current === memoryItems.length - 1;`

- `current` representa a posição atual do carrossel.
- Arrays JavaScript começam no índice `0`.
- `memoryItems.length - 1` representa o índice da última memória.
- A comparação produz um valor booleano: `true` ou `false`.
- Esse resultado pode controlar a interface, neste caso exibindo o convite somente na última memória.
- O trecho `memoryItems.length > 1` mantém o convite oculto no caso-limite de existir apenas uma memória.

A atualização acontece dentro de `updateControls()`, que já é executada na inicialização e após mudanças feitas pelos botões ou pelo swipe. Assim, voltar da última memória para uma anterior também oculta o convite novamente.
