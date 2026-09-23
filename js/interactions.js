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


  function initSurprise(openLetterScene){
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
        button.setAttribute("aria-label","Abrir a cena da carta");
        button.disabled=false;
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
      else if(state==="reveal" && openLetterScene)openLetterScene();
    });

    render();
  }
  function initLetterExperience(){
    const root=document.querySelector("[data-letter-experience]");
    const scene=root?.closest(".section--letter");
    if(!root||!scene)return null;

    const gift=content.gift||{};
    let state="closed";
    let sceneState="closed";
    let savedScrollY=0;
    let lastFocusedElement=null;
    let lockedElements=[];
    const body=document.body;
    const originalBodyStyles={
      position:body.style.position,
      top:body.style.top,
      width:body.style.width,
      overflow:body.style.overflow,
      paddingRight:body.style.paddingRight
    };

    root.className="letter-experience";
    root.setAttribute("aria-live","polite");

    const sceneTitle=scene.querySelector("h2");
    if(sceneTitle)sceneTitle.id="letter-scene-title";

    scene.setAttribute("role","dialog");
    scene.setAttribute("aria-modal","true");
    if(sceneTitle)scene.setAttribute("aria-labelledby","letter-scene-title");
    scene.setAttribute("aria-hidden","true");
    scene.tabIndex=-1;
    scene.classList.add("is-scene");
    scene.hidden=true;

    const backButton=document.createElement("button");
    backButton.type="button";
    backButton.className="letter-scene__back";
    backButton.textContent="← Voltar";
    backButton.setAttribute("aria-label","Voltar para a surpresa");
    scene.prepend(backButton);

    const stage=document.createElement("div");
    stage.className="letter-stage";

    const envelope=document.createElement("div");
    envelope.className="letter-envelope";
    envelope.setAttribute("aria-hidden","true");

    const paper=document.createElement("div");
    paper.className="letter-envelope__paper";

    const back=document.createElement("span");
    back.className="letter-envelope__back";

    const flap=document.createElement("span");
    flap.className="letter-envelope__flap";

    const front=document.createElement("span");
    front.className="letter-envelope__front";

    const seal=document.createElement("span");
    seal.className="letter-envelope__seal";
    seal.textContent="♥";

    envelope.append(paper,back,flap,front,seal);

    const letter=document.createElement("article");
    letter.className="letter-card";
    letter.hidden=true;

    const letterTitle=document.createElement("h3");
    letterTitle.className="letter-card__title";

    const message=document.createElement("p");
    message.className="letter-card__message";

    const closing=document.createElement("span");
    closing.className="letter-card__mark";
    closing.setAttribute("aria-hidden","true");
    closing.textContent="♥";

    letter.append(letterTitle,message,closing);
    stage.append(envelope,letter);

    const controls=document.createElement("div");
    controls.className="letter-controls";

    const button=document.createElement("button");
    button.type="button";
    button.className="letter-open-button";
    button.setAttribute("aria-expanded","false");
    button.textContent="Abrir";

    const status=document.createElement("span");
    status.className="letter-status";
    status.setAttribute("aria-live","polite");

    controls.append(button,status);
    root.append(stage,controls);

    function setBackgroundInert(value){
      if(value){
        lockedElements=[];
        const siteShell=document.querySelector(".site-shell");
        const candidates=new Set();

        document.querySelectorAll("body > *").forEach(element=>{
          if(element!==siteShell)candidates.add(element);
        });

        if(siteShell){
          Array.from(siteShell.children).forEach(element=>{
            if(element!==scene && !element.contains(scene))candidates.add(element);
          });

          const main=siteShell.querySelector("main");
          if(main){
            Array.from(main.children).forEach(element=>{
              if(element!==scene)candidates.add(element);
            });
          }
        }

        candidates.forEach(element=>{
          lockedElements.push([element,element.inert]);
          element.inert=true;
        });
        return;
      }

      lockedElements.forEach(([element,wasInert])=>{
        element.inert=wasInert;
      });
      lockedElements=[];
    }

    function lockBackgroundScroll(){
      savedScrollY=window.scrollY;
      const scrollbarGap=window.innerWidth-document.documentElement.clientWidth;

      body.style.position="fixed";
      body.style.top="-"+savedScrollY+"px";
      body.style.width="100%";
      body.style.overflow="hidden";
      if(scrollbarGap>0)body.style.paddingRight=scrollbarGap+"px";
      setBackgroundInert(true);
    }

    function unlockBackgroundScroll(){
      body.style.position=originalBodyStyles.position;
      body.style.top=originalBodyStyles.top;
      body.style.width=originalBodyStyles.width;
      body.style.overflow=originalBodyStyles.overflow;
      body.style.paddingRight=originalBodyStyles.paddingRight;
      setBackgroundInert(false);
      window.scrollTo(0,savedScrollY);
    }

    function resetLetter(){
      state="closed";
      root.dataset.state="closed";
      letter.hidden=true;
      letterTitle.textContent="";
      message.textContent="";
      button.textContent="Abrir";
      button.disabled=false;
      button.setAttribute("aria-expanded","false");
      status.textContent="";
    }

    function closeLetterScene(){
      if(sceneState!=="open")return;

      sceneState="closed";
      scene.classList.remove("is-scene-visible");
      scene.dataset.sceneState="closed";
      scene.setAttribute("aria-hidden","true");
      backButton.disabled=true;

      const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const finishClose=()=>{
        scene.hidden=true;
        unlockBackgroundScroll();
        resetLetter();

        if(lastFocusedElement&&document.contains(lastFocusedElement)){
          lastFocusedElement.focus();
        }
        lastFocusedElement=null;
      };

      if(reduced)finishClose();
      else window.setTimeout(finishClose,220);
    }

    function openLetterScene(){
      if(sceneState!=="closed")return;

      sceneState="open";
      lastFocusedElement=document.activeElement instanceof HTMLElement?document.activeElement:null;
      lockBackgroundScroll();

      scene.hidden=false;
      scene.dataset.sceneState="open";
      scene.setAttribute("aria-hidden","false");
      backButton.disabled=false;

      const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if(reduced){
        scene.classList.add("is-scene-visible");
        backButton.focus();
        return;
      }

      window.requestAnimationFrame(()=>{
        scene.classList.add("is-scene-visible");
        backButton.focus();
      });
    }

    function finishOpening(){
      if(state!=="opening")return;

      state="opened";
      root.dataset.state="opened";
      letterTitle.textContent=gift.letterTitle||"[TÍTULO DA CARTA]";
      message.textContent=gift.message||"[TEXTO DA CARTA]";
      letter.hidden=false;
      button.textContent="Carta aberta";
      button.disabled=true;
      button.setAttribute("aria-expanded","true");
      status.textContent="Carta aberta";
    }

    function openLetter(){
      if(state!=="closed")return;

      state="opening";
      root.dataset.state="opening";
      button.disabled=true;
      button.setAttribute("aria-expanded","true");
      status.textContent="Abrindo a carta…";

      const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if(reduced){
        finishOpening();
        return;
      }

      window.setTimeout(finishOpening,420);
    }

    backButton.addEventListener("click",closeLetterScene);
    button.addEventListener("click",openLetter);

    document.addEventListener("keydown",event=>{
      if(event.key==="Escape" && sceneState==="open"){
        event.preventDefault();
        closeLetterScene();
      }
    });

    resetLetter();
    scene.dataset.sceneState="closed";

    return openLetterScene;
  }

  function init(){
    initLikes();
    initTimeCapsule();
    const openLetterScene=initLetterExperience();
    initSurprise(openLetterScene);
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",init,{once:true});
  }else{
    init();
  }
})();