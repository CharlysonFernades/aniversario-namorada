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

