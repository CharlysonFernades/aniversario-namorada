# Guia de edição

## Objetivo
Este projeto usa HTML5, CSS3 e JavaScript puro para construir uma experiência de aniversário em uma única página. A base foi separada por responsabilidade para permitir novas etapas sem reescrever a estrutura existente.

## Onde editar
- Conteúdo pessoal: js/content.js
- Estrutura e seções: index.html
- Aparência: css/style.css
- Lógica e navegação: js/app.js
- Animações e revelações: js/animations.js
- Player: js/music-player.js

## Mídias
Pastas reservadas para próximas etapas:
- assets/fotos/
- assets/musicas/
- assets/desenhos/

Não adicione arquivos pessoais até a etapa correspondente.

## Animações
- Elementos com data-reveal entram em cena quando ficam visíveis.
- reveal--delay-1 até reveal--delay-4 controlam atrasos curtos entre elementos.
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
