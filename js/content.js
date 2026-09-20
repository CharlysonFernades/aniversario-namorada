/**
 * Conteúdo pessoal centralizado.
 * Nesta etapa, somente placeholders são permitidos.
 *
 * Fotos da narrativa e futuro álbum ficam separados.
 * O HTML não precisa ser alterado para adicionar/remover/trocar fotos.
 */
window.siteContent={
  hero:{title:"FELIZ ANIVERSÁRIO, MEU AMOR!",subtitle:"Hoje eu preparei uma pequena surpresa para você, espero que goste."},
  story:{title:"Onde tudo começou...",text:"Algumas histórias começam sem a gente perceber o que nos espera... E eu mal imaginava que você se tornaria tão importante para mim."},
  memories:{title:"Alguns dos nossos momentos, coisas que eu quero guardar.",text:"Entre tantos dias, alguns acabaram ficando guardados de um jeito diferente."},
  musicas:[
    {titulo:"Mirrors",artista:"Justim Timberlake",arquivo:"assets/musicas/musica01.mp3",capa:"assets/fotos/musicas/musica01.png",altCapa:"Capa da Música 01"},
    {titulo:"Pra Sempre com Você",artista:"Jorge & Mateus",arquivo:"assets/musicas/musica02.mp3",capa:"assets/fotos/musicas/musica02.png",altCapa:"Capa da Música 02"},
    {titulo:"Heaven",artista:"Bryan Adams",arquivo:"assets/musicas/musica03.mp3",capa:"assets/fotos/musicas/musica03.png",altCapa:"Capa da Música 03"},
    {titulo:"Lisboa",artista:"ANAVITÓRIA",arquivo:"assets/musicas/musica04.mp3",capa:"assets/fotos/musicas/musica04.png",altCapa:"Capa da Música 04"}
  ],
  photos:{
    narrative:{
      story:[image:"imagem23.webp",alt:"NOSSA PRIMEIRA FOTO JUNTOS.",title:"O começo de tudo.",caption:"Aqui fora onde nós tiramos a nossa primeira foto juntos, mal esperando o futuro incrível que nos aguardava."],
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
