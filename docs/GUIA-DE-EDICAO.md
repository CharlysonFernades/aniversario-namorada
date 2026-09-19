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
