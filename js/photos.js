/**
 * Sistema de fotos da experiência.
 *
 * "narrative" alimenta fotos integradas às seções atuais.
 * "album" fica separado para uma experiência própria em etapa futura.
 */
(function(){
  "use strict";
  const content=window.siteContent||{};
  const photoContent=content.photos||{};
  const narrative=photoContent.narrative||{};
  const storyItems=Array.isArray(narrative.story)?narrative.story.filter(item=>item&&item.image):[];
  const memoryItems=Array.isArray(narrative.memories)?narrative.memories:[];

  function createImage(item){
    const figure=document.createElement("figure");
    figure.className="photo-frame";
    const image=document.createElement("img");
    image.src=item.image;
    image.alt=item.alt||"";
    image.loading="lazy";
    image.decoding="async";
    figure.appendChild(image);
    if(item.caption){
      const caption=document.createElement("figcaption");
      caption.textContent=item.caption;
      figure.appendChild(caption);
    }
    return figure;
  }

  function createPlaceholder(label,note){
    const frame=document.createElement("div");
    frame.className="photo-frame photo-frame--placeholder";
    const title=document.createElement("span");
    title.textContent=label;
    const description=document.createElement("small");
    description.textContent=note;
    frame.append(title,description);
    return frame;
  }

  function renderStoryGallery(){
    const container=document.querySelector('[data-photo-narrative="story"]');
    if(!container||!storyItems.length)return;
    container.replaceChildren();
    let current=0;
    const frameSlot=document.createElement("div");
    frameSlot.className="photo-frame-slot";
    container.appendChild(frameSlot);

    function show(index){
      current=(index+storyItems.length)%storyItems.length;
      frameSlot.replaceChildren(createImage(storyItems[current]));
      const status=container.querySelector("[data-photo-status]");
      if(status)status.textContent=String(current+1).padStart(2,"0")+" / "+String(storyItems.length).padStart(2,"0");
    }

    show(current);
    if(storyItems.length<2)return;

    container.classList.add("narrative-gallery--carousel");
    const controls=document.createElement("div");
    controls.className="photo-controls";

    const previous=document.createElement("button");
    previous.type="button";
    previous.className="photo-control";
    previous.setAttribute("aria-label","Foto anterior");
    previous.textContent="←";

    const status=document.createElement("span");
    status.className="photo-status";
    status.setAttribute("aria-live","polite");
    status.setAttribute("data-photo-status","");
    status.textContent="01 / "+String(storyItems.length).padStart(2,"0");

    const next=document.createElement("button");
    next.type="button";
    next.className="photo-control";
    next.setAttribute("aria-label","Próxima foto");
    next.textContent="→";

    controls.append(previous,status,next);
    container.appendChild(controls);
    previous.addEventListener("click",()=>show(current-1));
    next.addEventListener("click",()=>show(current+1));

    let touchStartX=0;
    let touchStartY=0;
    frameSlot.addEventListener("touchstart",event=>{
      const touch=event.changedTouches[0];
      touchStartX=touch.clientX;
      touchStartY=touch.clientY;
    },{passive:true});
    frameSlot.addEventListener("touchend",event=>{
      const touch=event.changedTouches[0];
      const deltaX=touch.clientX-touchStartX;
      const deltaY=touch.clientY-touchStartY;
      if(Math.abs(deltaX)<48||Math.abs(deltaX)<=Math.abs(deltaY))return;
      show(current+(deltaX<0?1:-1));
    },{passive:true});
  }

  function renderMemories(){
    const grid=document.querySelector('[data-photo-narrative="memories"]');
    if(!grid||!memoryItems.length)return;

    grid.replaceChildren();
    grid.classList.add("memory-carousel");

    let current=0;
    let transitionToken=0;
    const albumInvite=document.querySelector("[data-album-invite]");

    const viewport=document.createElement("div");
    viewport.className="memory-carousel__viewport";
    viewport.setAttribute("aria-live","polite");

    const previousPreview=document.createElement("div");
    previousPreview.className="memory-carousel__preview memory-carousel__preview--previous";
    previousPreview.setAttribute("aria-hidden","true");

    const nextPreview=document.createElement("div");
    nextPreview.className="memory-carousel__preview memory-carousel__preview--next";
    nextPreview.setAttribute("aria-hidden","true");

    const card=createMemoryCard(memoryItems[0],0,false);
    viewport.append(previousPreview,card,nextPreview);

    const controls=document.createElement("div");
    controls.className="memory-carousel__controls";

    const previous=document.createElement("button");
    previous.type="button";
    previous.className="photo-control";
    previous.setAttribute("aria-label","Memória anterior");
    previous.textContent="←";

    const status=document.createElement("span");
    status.className="photo-status";
    status.setAttribute("aria-live","polite");
    status.textContent=String(current+1)+" / "+String(memoryItems.length);

    const next=document.createElement("button");
    next.type="button";
    next.className="photo-control";
    next.setAttribute("aria-label","Próxima memória");
    next.textContent="→";

    controls.append(previous,status,next);
    grid.append(viewport,controls);

    function renderPreview(slot,item,index,position){
      slot.replaceChildren();
      slot.className="memory-carousel__preview memory-carousel__preview--"+position;
      if(!item){
        slot.classList.add("is-empty");
        return;
      }

      if(item.image){
        const image=document.createElement("img");
        image.src=item.image;
        image.alt="";
        image.loading="lazy";
        image.decoding="async";
        slot.appendChild(image);
      }else{
        const placeholder=document.createElement("span");
        placeholder.textContent=String(index+1).padStart(2,"0");
        slot.classList.add("is-placeholder");
        slot.appendChild(placeholder);
      }
    }

    function updatePreviews(){
      renderPreview(previousPreview,memoryItems[current-1],current-1,"previous");
      renderPreview(nextPreview,memoryItems[current+1],current+1,"next");
    }

    function updateControls(){
      previous.disabled=current===0;
      next.disabled=current===memoryItems.length-1;
      status.textContent=String(current+1)+" / "+String(memoryItems.length);

      const isLastMemory=memoryItems.length>1&&current===memoryItems.length-1;
      if(albumInvite)albumInvite.hidden=!isLastMemory;

      updatePreviews();
    }

    function show(index){
      const nextIndex=Math.max(0,Math.min(index,memoryItems.length-1));
      if(nextIndex===current){
        updateControls();
        return;
      }

      current=nextIndex;
      updateControls();

      const prefersReducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const token=++transitionToken;

      if(prefersReducedMotion){
        viewport.replaceChildren(previousPreview,createMemoryCard(memoryItems[current],current,true),nextPreview);
        updatePreviews();
        return;
      }

      viewport.classList.add("is-changing");
      window.setTimeout(()=>{
        if(token!==transitionToken)return;
        viewport.replaceChildren(previousPreview,createMemoryCard(memoryItems[current],current,true),nextPreview);
        updatePreviews();
        window.requestAnimationFrame(()=>viewport.classList.remove("is-changing"));
      },180);
    }

    previous.addEventListener("click",()=>show(current-1));
    next.addEventListener("click",()=>show(current+1));

    let touchStartX=0;
    let touchStartY=0;
    viewport.addEventListener("touchstart",event=>{
      const touch=event.changedTouches[0];
      touchStartX=touch.clientX;
      touchStartY=touch.clientY;
    },{passive:true});
    viewport.addEventListener("touchend",event=>{
      const touch=event.changedTouches[0];
      const deltaX=touch.clientX-touchStartX;
      const deltaY=touch.clientY-touchStartY;
      if(Math.abs(deltaX)<48||Math.abs(deltaX)<=Math.abs(deltaY))return;
      show(current+(deltaX<0?1:-1));
    },{passive:true});

    updateControls();
  }

  function createMemoryCard(item,index,visible){
    const card=document.createElement("article");
    card.className="memory-card reveal";
    card.setAttribute("data-reveal","");
    const number=document.createElement("span");
    number.className="memory-card__number";
    number.textContent=String(index+1).padStart(2,"0");
    const media=item.image?createImage(item):createPlaceholder("FOTO / MEMÓRIA","A imagem será adicionada posteriormente.");
    const title=document.createElement("h3");
    title.textContent=item.title||"[MOMENTO]";
    const caption=document.createElement("p");
    caption.textContent=item.caption||"";
    card.append(number,media,title,caption);
    if(visible)card.classList.add("is-visible");
    return card;
  }

  function init(){renderStoryGallery();renderMemories();}
  init();
})();
