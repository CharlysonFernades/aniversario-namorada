/**
 * Álbum de fotos — Etapa 8.
 * Mantém a exploração das fotos separada da narrativa de Memórias.
 */
(function(){
  "use strict";

  const content=window.siteContent||{};
  const albumContent=content.album||{};
  const photos=Array.isArray(content.photos?.album)?content.photos.album.filter(item=>item&&item.image):[];
  const trigger=document.querySelector("[data-album-trigger]");
  if(!trigger||!photos.length)return;

  let albumOpen=false;
  let lightboxOpen=false;
  let savedScrollY=0;
  let albumTriggerElement=trigger;
  let lightboxReturnElement=null;
  let currentIndex=0;
  let touchStartX=0;
  let touchStartY=0;

  const body=document.body;
  const siteShell=document.querySelector(".site-shell");

  const modal=document.createElement("div");
  modal.className="album-modal";
  modal.hidden=true;
  modal.setAttribute("aria-hidden","true");

  const decoration=document.createElement("img");
  decoration.className="album-modal__decoration";
  decoration.src="assets/desenhos/capivara-02.svg";
  decoration.alt="";
  decoration.setAttribute("aria-hidden","true");

  const panel=document.createElement("section");
  panel.className="album-modal__panel";
  panel.setAttribute("role","dialog");
  panel.setAttribute("aria-modal","true");
  panel.setAttribute("aria-labelledby","album-modal-title");

  const header=document.createElement("header");
  header.className="album-modal__header";

  const headingWrap=document.createElement("div");
  const eyebrow=document.createElement("p");
  eyebrow.className="album-modal__eyebrow";
  eyebrow.textContent="MEMÓRIAS";

  const title=document.createElement("h2");
  title.className="album-modal__title";
  title.id="album-modal-title";
  title.textContent=albumContent.title||"Álbum";

  const intro=document.createElement("p");
  intro.className="album-modal__intro";
  intro.textContent=albumContent.intro||"Todas as lembranças reunidas em um só lugar.";

  const closeButton=document.createElement("button");
  closeButton.type="button";
  closeButton.className="album-modal__close";
  closeButton.setAttribute("aria-label","Fechar álbum");
  closeButton.textContent="×";

  headingWrap.append(eyebrow,title,intro);
  header.append(headingWrap,closeButton);

  const count=document.createElement("p");
  count.className="album-modal__count";
  count.textContent=photos.length+" "+(photos.length===1?"momento nosso":"momentos nossos");

  const grid=document.createElement("div");
  grid.className="album-grid";
  grid.setAttribute("aria-label","Fotos do álbum");

  const lightbox=document.createElement("div");
  lightbox.className="album-lightbox";
  lightbox.hidden=true;
  lightbox.setAttribute("aria-label","Foto ampliada");

  const lightboxBackdrop=document.createElement("div");
  lightboxBackdrop.className="album-lightbox__backdrop";
  lightboxBackdrop.setAttribute("aria-hidden","true");

  const lightboxFrame=document.createElement("div");
  lightboxFrame.className="album-lightbox__frame";

  const lightboxClose=document.createElement("button");
  lightboxClose.type="button";
  lightboxClose.className="album-lightbox__close";
  lightboxClose.setAttribute("aria-label","Fechar foto ampliada");
  lightboxClose.textContent="×";

  const previousButton=document.createElement("button");
  previousButton.type="button";
  previousButton.className="album-lightbox__nav album-lightbox__nav--previous";
  previousButton.setAttribute("aria-label","Foto anterior");
  previousButton.textContent="←";

  const nextButton=document.createElement("button");
  nextButton.type="button";
  nextButton.className="album-lightbox__nav album-lightbox__nav--next";
  nextButton.setAttribute("aria-label","Próxima foto");
  nextButton.textContent="→";

  const lightboxMedia=document.createElement("figure");
  lightboxMedia.className="album-lightbox__media";

  const lightboxImage=document.createElement("img");
  lightboxImage.className="album-lightbox__image";
  lightboxImage.alt="";
  lightboxImage.decoding="async";
  lightboxImage.draggable=false;

  const lightboxCaption=document.createElement("figcaption");
  lightboxCaption.className="album-lightbox__caption";

  const lightboxTitle=document.createElement("strong");
  const lightboxText=document.createElement("span");
  const lightboxCounter=document.createElement("span");
  lightboxCounter.className="album-lightbox__counter";
  lightboxCounter.setAttribute("aria-live","polite");

  lightboxCaption.append(lightboxTitle,lightboxText,lightboxCounter);
  lightboxMedia.append(lightboxImage,lightboxCaption);
  lightboxFrame.append(lightboxMedia,previousButton,nextButton,lightboxClose);
  lightbox.append(lightboxBackdrop,lightboxFrame);

  panel.append(header,count,grid);
  modal.append(decoration,panel,lightbox);
  document.body.appendChild(modal);

  function lockPage(){
    savedScrollY=window.scrollY;
    body.style.position="fixed";
    body.style.top="-"+savedScrollY+"px";
    body.style.width="100%";
    body.style.overflow="hidden";
    if(siteShell){
      siteShell.inert=true;
      siteShell.setAttribute("aria-hidden","true");
    }
    document.documentElement.classList.add("album-is-open");
  }

  function unlockPage(){
    body.style.position="";
    body.style.top="";
    body.style.width="";
    body.style.overflow="";
    if(siteShell){
      siteShell.inert=false;
      siteShell.removeAttribute("aria-hidden");
    }
    document.documentElement.classList.remove("album-is-open");
    window.scrollTo(0,savedScrollY);
  }

  function renderGrid(){
    grid.replaceChildren();
    photos.forEach((item,index)=>{
      const button=document.createElement("button");
      button.type="button";
      button.className="album-tile";
      button.setAttribute("aria-label","Abrir foto "+String(index+1)+" de "+String(photos.length)+(item.title?": "+item.title:""));

      const image=document.createElement("img");
      image.src=item.image;
      image.alt=item.alt||"";
      image.loading="lazy";
      image.decoding="async";

      button.appendChild(image);
      button.addEventListener("click",()=>{
        lightboxReturnElement=button;
        openLightbox(index);
      });
      grid.appendChild(button);
    });
  }

  function renderLightbox(){
    const item=photos[currentIndex]||{};
    lightboxImage.src=item.image||"";
    lightboxImage.alt=item.alt||"";
    lightboxTitle.textContent=item.title||"";
    lightboxText.textContent=item.caption||"";
    lightboxCounter.textContent=String(currentIndex+1)+" / "+String(photos.length);
    previousButton.disabled=currentIndex===0;
    nextButton.disabled=currentIndex===photos.length-1;
  }

  function openAlbum(){
    if(albumOpen)return;
    albumOpen=true;
    albumTriggerElement=document.activeElement instanceof HTMLElement?document.activeElement:trigger;
    lockPage();
    renderGrid();
    modal.hidden=false;
    modal.setAttribute("aria-hidden","false");
    window.requestAnimationFrame(()=>closeButton.focus({preventScroll:true}));
  }

  function closeLightbox(){
    if(!lightboxOpen)return;
    lightboxOpen=false;
    lightbox.hidden=true;
    if(lightboxReturnElement instanceof HTMLElement){
      lightboxReturnElement.focus({preventScroll:true});
    }
  }

  function openLightbox(index){
    if(!albumOpen)return;
    currentIndex=Math.max(0,Math.min(index,photos.length-1));
    lightboxOpen=true;
    renderLightbox();
    lightbox.hidden=false;
    window.requestAnimationFrame(()=>lightboxClose.focus({preventScroll:true}));
  }

  function closeAlbum(){
    if(!albumOpen)return;
    lightboxOpen=false;
    lightbox.hidden=true;
    albumOpen=false;
    modal.hidden=true;
    modal.setAttribute("aria-hidden","true");
    unlockPage();
    if(albumTriggerElement instanceof HTMLElement){
      albumTriggerElement.focus({preventScroll:true});
    }
  }

  function moveLightbox(delta){
    if(!lightboxOpen)return;
    const next=Math.max(0,Math.min(currentIndex+delta,photos.length-1));
    if(next===currentIndex)return;
    currentIndex=next;
    renderLightbox();
  }

  trigger.addEventListener("click",openAlbum);
  closeButton.addEventListener("click",closeAlbum);
  lightboxClose.addEventListener("click",closeLightbox);
  lightboxBackdrop.addEventListener("click",closeLightbox);
  previousButton.addEventListener("click",()=>moveLightbox(-1));
  nextButton.addEventListener("click",()=>moveLightbox(1));

  lightboxMedia.addEventListener("touchstart",event=>{
    const touch=event.changedTouches[0];
    touchStartX=touch.clientX;
    touchStartY=touch.clientY;
  },{passive:true});

  lightboxMedia.addEventListener("touchend",event=>{
    const touch=event.changedTouches[0];
    const deltaX=touch.clientX-touchStartX;
    const deltaY=touch.clientY-touchStartY;
    if(Math.abs(deltaX)<48||Math.abs(deltaX)<=Math.abs(deltaY))return;
    moveLightbox(deltaX<0?1:-1);
  },{passive:true});

  document.addEventListener("keydown",event=>{
    if(!albumOpen)return;
    if(event.key==="Escape"){
      event.preventDefault();
      if(lightboxOpen)closeLightbox();
      else closeAlbum();
      return;
    }
    if(!lightboxOpen)return;
    if(event.key==="ArrowLeft"){
      event.preventDefault();
      moveLightbox(-1);
    }else if(event.key==="ArrowRight"){
      event.preventDefault();
      moveLightbox(1);
    }
  });

  renderGrid();
})();
