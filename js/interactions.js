/**
 * Interações das novas experiências da Etapa 4.
 *
 * Esta primeira experiência lê somente window.siteContent.likes.
 * O conteúdo pessoal permanece no content.js; este arquivo cuida apenas
 * da apresentação, navegação e estado do item ativo.
 */
(function(){
  "use strict";

  const content=window.siteContent||{};
  const likes=content.likes||{};
  const items=Array.isArray(likes.items)?likes.items:[];

  function initLikes(){
    const root=document.querySelector("[data-likes-experience]");
    if(!root||!items.length)return;

    let current=0;

    root.className="likes-experience";
    root.setAttribute("aria-live","polite");

    const card=document.createElement("article");
    card.className="likes-card";
    card.setAttribute("aria-live","polite");

    const index=document.createElement("span");
    index.className="likes-card__index";

    const title=document.createElement("h3");
    title.className="likes-card__title";

    const text=document.createElement("p");
    text.className="likes-card__text";

    const controls=document.createElement("div");
    controls.className="likes-controls";

    const previous=document.createElement("button");
    previous.type="button";
    previous.className="likes-control";
    previous.setAttribute("aria-label","Motivo anterior");
    previous.textContent="←";

    const status=document.createElement("span");
    status.className="likes-status";
    status.setAttribute("aria-live","polite");

    const next=document.createElement("button");
    next.type="button";
    next.className="likes-control";
    next.setAttribute("aria-label","Próximo motivo");
    next.textContent="→";

    controls.append(previous,status,next);
    card.append(index,title,text);
    root.append(card,controls);

    function render(){
      const item=items[current]||{};
      index.textContent=String(current+1).padStart(2,"0");
      title.textContent=item.title||"[MOTIVO]";
      text.textContent=item.text||"";
      status.textContent=String(current+1)+" / "+String(items.length);
      previous.disabled=current===0;
      next.disabled=current===items.length-1;
    }

    function moveTo(nextIndex){
      const target=Math.max(0,Math.min(nextIndex,items.length-1));
      if(target===current)return;

      current=target;
      card.classList.add("is-switching");

      const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if(reduced){
        render();
        card.classList.remove("is-switching");
        return;
      }

      window.setTimeout(()=>{
        render();
        card.classList.remove("is-switching");
      },160);
    }

    previous.addEventListener("click",()=>moveTo(current-1));
    next.addEventListener("click",()=>moveTo(current+1));

    render();
  }

  function init(){
    initLikes();
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",init,{once:true});
  }else{
    init();
  }
})();