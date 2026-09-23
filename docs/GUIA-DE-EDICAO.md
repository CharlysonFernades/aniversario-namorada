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
