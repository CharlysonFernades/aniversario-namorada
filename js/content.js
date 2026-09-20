/**
 * Conteúdo pessoal centralizado.
 * Nesta etapa, somente placeholders são permitidos.
 *
 * Fotos da narrativa e futuro álbum ficam separados.
 * O HTML não precisa ser alterado para adicionar/remover/trocar fotos.
 */
window.siteContent={
  hero:{title:"[TÍTULO PRINCIPAL]",subtitle:"[MENSAGEM CURTA DE ABERTURA]"},
  story:{title:"[TÍTULO DA HISTÓRIA]",text:"[ESPAÇO PARA UMA MENSAGEM OU INTRODUÇÃO DA HISTÓRIA]"},
  memories:{title:"[TÍTULO DAS MEMÓRIAS]",text:"[ESPAÇO RESERVADO PARA MEMÓRIAS, FOTOS E MOMENTOS]"},
  musicas:[
    {titulo:"Música 01",artista:"Artista",arquivo:"assets/musicas/musica01.mp3",capa:"assets/fotos/musicas/musica01.png",altCapa:"Capa da Música 01"},
    {titulo:"Música 02",artista:"Artista",arquivo:"assets/musicas/musica02.mp3",capa:"assets/fotos/musicas/musica02.png",altCapa:"Capa da Música 02"},
    {titulo:"Música 03",artista:"Artista",arquivo:"assets/musicas/musica03.mp3",capa:"assets/fotos/musicas/musica03.png",altCapa:"Capa da Música 03"},
    {titulo:"Música 04",artista:"Artista",arquivo:"assets/musicas/musica04.mp3",capa:"assets/fotos/musicas/musica04.png",altCapa:"Capa da Música 04"}
  ],
  photos:{
    narrative:{
      story:[],
      memories:[
        {image:"",alt:"[ALT DA FOTO 01]",title:"[MOMENTO 01]",caption:"[LEGENDA CURTA]"},
        {image:"",alt:"[ALT DA FOTO 02]",title:"[MOMENTO 02]",caption:"[LEGENDA CURTA]"},
        {image:"",alt:"[ALT DA FOTO 03]",title:"[MOMENTO 03]",caption:"[LEGENDA CURTA]"}
      ]
    },
    album:[]
  },
  placeholders:{name:"[NOME]",birthday:"[DATA]",photo:"[CAMINHO DA FOTO]",music:"[CAMINHO DA MÚSICA]",message:"[MENSAGEM]"}
};
