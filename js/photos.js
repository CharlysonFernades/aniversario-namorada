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
    memoryItems.forEach((item,index)=>{
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
      if(index>0)card.classList.add("reveal--delay-"+Math.min(index,4));
      grid.appendChild(card);
    });
  }

  function init(){renderStoryGallery();renderMemories();}
  init();
})();
