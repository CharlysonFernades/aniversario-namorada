/**
 * Interações das novas experiências da Etapa 4.
 *
 * As experiências da Etapa 4 leem o conteúdo de window.siteContent.
 * Este arquivo cuida apenas da apresentação, navegação e estado de cada interação.
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

  function initTimeCapsule(){
    const root=document.querySelector("[data-time-capsule]");
    if(!root)return;

    const capsule=content.timeCapsule||{};
    const message=capsule.message||"[MENSAGEM REVELADA]";
    let state="closed";

    root.className="time-capsule-experience";

    const object=document.createElement("div");
    object.className="time-capsule";
    object.setAttribute("aria-hidden","true");

    const lid=document.createElement("span");
    lid.className="time-capsule__lid";

    const body=document.createElement("span");
    body.className="time-capsule__body";

    const seal=document.createElement("span");
    seal.className="time-capsule__seal";
    seal.textContent="♡";

    object.append(lid,body,seal);

    const controls=document.createElement("div");
    controls.className="time-capsule__controls";

    const button=document.createElement("button");
    button.type="button";
    button.className="time-capsule__button";
    button.setAttribute("aria-expanded","false");
    button.setAttribute("aria-controls","time-capsule-message");
    button.textContent="Abrir";

    const status=document.createElement("span");
    status.className="time-capsule__status";
    status.setAttribute("aria-live","polite");

    controls.append(button,status);

    const revealed=document.createElement("div");
    revealed.className="time-capsule__message";
    revealed.id="time-capsule-message";
    revealed.setAttribute("aria-live","polite");
    revealed.hidden=true;

    const messageLabel=document.createElement("span");
    messageLabel.className="time-capsule__message-label";
    messageLabel.textContent="Uma coisa que eu guardei para você";

    const messageText=document.createElement("p");
    messageText.className="time-capsule__message-text";

    revealed.append(messageLabel,messageText);
    root.append(object,controls,revealed);

    function openCapsule(){
      if(state!=="closed")return;

      state="opening";
      button.disabled=true;
      button.setAttribute("aria-expanded","true");
      root.dataset.state="opening";
      status.textContent="Abrindo…";

      const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if(reduced){
        finishOpening();
        return;
      }

      window.setTimeout(finishOpening,420);
    }

    function finishOpening(){
      if(state!=="opening")return;

      state="open";
      root.dataset.state="open";
      messageText.textContent=message;
      revealed.hidden=false;
      status.textContent="Cápsula aberta";
      button.textContent="Aberta";
      button.disabled=true;
    }

    button.addEventListener("click",openCapsule);
    root.dataset.state="closed";
  }


  function initSurprise(){
    const root=document.querySelector("[data-surprise-experience]");
    if(!root)return;

    const surprise=content.surprise||{};
    let state="initial";

    root.className="surprise-experience";
    root.setAttribute("aria-live","polite");

    const card=document.createElement("article");
    card.className="surprise-card";

    const symbol=document.createElement("span");
    symbol.className="surprise-card__symbol";
    symbol.setAttribute("aria-hidden","true");
    symbol.textContent="✦";

    const title=document.createElement("h3");
    title.className="surprise-card__title";

    const text=document.createElement("p");
    text.className="surprise-card__text";

    const button=document.createElement("button");
    button.type="button";
    button.className="surprise-card__button";

    card.append(symbol,title,text,button);
    root.append(card);

    function render(){
      if(state==="initial"){
        title.textContent=surprise.title||"[TÍTULO DA SURPRESA]";
        text.textContent=surprise.intro||"[INTRODUÇÃO DA SURPRESA]";
        button.textContent="Continuar";
        button.setAttribute("aria-label","Continuar para a próxima mensagem");
        button.disabled=false;
      }else if(state==="confirmation"){
        title.textContent=surprise.question||"[PERGUNTA]";
        text.textContent="";
        button.textContent=surprise.confirmLabel||"[BOTÃO DE CONFIRMAÇÃO]";
        button.setAttribute("aria-label","Confirmar e continuar");
        button.disabled=false;
      }else{
        title.textContent="✦";
        text.textContent=surprise.reveal||"[REVELAÇÃO]";
        button.textContent="Próximo momento";
        button.setAttribute("aria-label","Próximo momento");
        button.disabled=true;
      }
      root.dataset.state=state;
    }

    function moveTo(nextState){
      if(state===nextState||state==="reveal")return;

      state=nextState;
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
      },180);
    }

    button.addEventListener("click",()=>{
      if(state==="initial")moveTo("confirmation");
      else if(state==="confirmation")moveTo("reveal");
    });

    render();
  }
  function init(){
    initLikes();
    initTimeCapsule();
    initSurprise();
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",init,{once:true});
  }else{
    init();
  }
})();