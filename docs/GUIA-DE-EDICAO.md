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