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


  function initSecretMessage(openFinale){
    const root=document.querySelector("[data-secret-message]");
    if(!root)return;

    const secret=content.secretMessage||{};
    let state="locked";

    root.className="secret-message-experience";
    root.setAttribute("aria-live","polite");

    const note=document.createElement("article");
    note.className="secret-message";
    note.setAttribute("aria-live","polite");

    const symbol=document.createElement("span");
    symbol.className="secret-message__symbol";
    symbol.setAttribute("aria-hidden","true");
    symbol.textContent="✦";

    const label=document.createElement("span");
    label.className="secret-message__label";
    label.textContent="P.S.";

    const title=document.createElement("h3");
    title.className="secret-message__title";

    const intro=document.createElement("p");
    intro.className="secret-message__intro";

    const message=document.createElement("p");
    message.className="secret-message__message";
    message.id="secret-message-content";
    message.hidden=true;

    const controls=document.createElement("div");
    controls.className="secret-message__controls";

    const button=document.createElement("button");
    button.type="button";
    button.className="secret-message__button";
    button.setAttribute("aria-controls","secret-message-content");

    const finaleButton=document.createElement("button");
    finaleButton.type="button";
    finaleButton.className="secret-message__finale-button";
    finaleButton.textContent="IR PARA ENCERRAMENTO";
    finaleButton.disabled=true;
    finaleButton.hidden=true;
    finaleButton.setAttribute("aria-label","Ir para o encerramento cinematográfico");

    const status=document.createElement("span");
    status.className="secret-message__status";
    status.setAttribute("aria-live","polite");

    controls.append(button,finaleButton,status);
    note.append(symbol,label,title,intro,message,controls);
    root.append(note);

    function render(){
      if(state==="locked"){
        title.textContent=secret.title||"[TÍTULO DA MENSAGEM SECRETA]";
        intro.hidden=false;
        intro.textContent=secret.intro||"[INTRODUÇÃO DA MENSAGEM SECRETA]";
        message.textContent="";
        message.hidden=true;
        button.textContent=secret.actionLabel||"[TEXTO DO BOTÃO]";
        button.disabled=false;
        button.setAttribute("aria-expanded","false");
        finaleButton.hidden=true;
        finaleButton.disabled=true;
        status.textContent="";
      }else if(state==="revealing"){
        button.disabled=true;
        finaleButton.hidden=true;
        finaleButton.disabled=true;
        status.textContent="Revelando…";
      }else{
        title.textContent=secret.title||"[TÍTULO DA MENSAGEM SECRETA]";
        intro.hidden=true;
        message.textContent=secret.message||"[MENSAGEM SECRETA]";
        message.hidden=false;
        button.disabled=true;
        button.textContent="Mensagem revelada";
        button.setAttribute("aria-expanded","true");
        finaleButton.hidden=false;
        finaleButton.disabled=false;
        status.textContent="Mensagem revelada";
      }
      root.dataset.state=state;
    }

    function reveal(){
      if(state!=="locked")return;

      state="revealing";
      root.dataset.state="revealing";
      button.disabled=true;

      const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if(reduced){
        finishReveal();
        return;
      }

      note.classList.add("is-revealing");
      window.setTimeout(finishReveal,320);
    }

    function finishReveal(){
      if(state!=="revealing")return;
      state="revealed";
      render();
      note.classList.remove("is-revealing");
    }

    button.addEventListener("click",reveal);
    finaleButton.addEventListener("click",()=>{
      if(state==="revealed"&&typeof openFinale==="function")openFinale();
    });
    render();
  }


  function initFinale(){
    const root=document.querySelector("[data-finale-experience]");
    const section=document.querySelector("#encerramento");
    if(!root||!section)return null;

    section.hidden=true;
    section.setAttribute("aria-hidden","true");

    const finale=content.finale||{};
    const sceneData=[
      {type:"text",data:finale.scene1||{}},
      {type:"photo",data:finale.scene2||{}},
      {type:"photo",data:finale.scene3||{}},
      {type:"photo",data:finale.scene4||{}},
      {type:"message",data:finale.scene5||{}},
      {type:"takeover",data:finale.scene6||{}},
      {type:"celebration",data:finale.scene7||{}}
    ];

    let state="idle";
    let sceneIndex=0;
    let checkpointY=0;
    let checkpointLimitY=0;
    let autoFrame=0;
    let autoTargetY=0;
    let touchStartY=null;
    let finalAudio=null;
    let takeoverTimer=0;

    root.className="finale-scenes";
    root.setAttribute("aria-live","polite");

    const scenes=sceneData.map((scene,index)=>{
      const element=document.createElement("article");
      element.className="finale-scene";
      element.dataset.scene=String(index+1);
      element.setAttribute("aria-labelledby","finale-scene-"+String(index+1)+"-title");
      root.appendChild(element);
      return element;
    });

    function titleId(index){
      return "finale-scene-"+String(index+1)+"-title";
    }

    function setSceneVisibility(activeIndex){
      scenes.forEach((scene,index)=>{
        scene.setAttribute("aria-hidden",String(index!==activeIndex));
      });
    }

    function createButton(label){
      const button=document.createElement("button");
      button.type="button";
      button.className="finale-scene__continue";
      button.textContent=label||"Continuar";
      button.addEventListener("click",()=>advanceFromCheckpoint(button));
      return button;
    }

    function renderTextScene(scene,index,data){
      const wrap=document.createElement("div");
      wrap.className="finale-scene__content finale-scene__content--text";
      const eyebrow=document.createElement("span");
      eyebrow.className="finale-scene__eyebrow";
      eyebrow.textContent="CENA "+String(index+1);
      const title=document.createElement("h2");
      title.id=titleId(index);
      title.className="finale-scene__title";
      title.textContent=data.title||"[TÍTULO DA CENA 1]";
      const message=document.createElement("p");
      message.className="finale-scene__message";
      message.textContent=data.message||"[TEXTO DA CENA 1]";
      const button=createButton(data.actionLabel||"Continuar");
      wrap.append(eyebrow,title,message,button);
      scene.append(wrap);
    }

    function renderPhotoScene(scene,index,data){
      const wrap=document.createElement("div");
      wrap.className="finale-scene__content finale-scene__content--photo";
      const eyebrow=document.createElement("span");
      eyebrow.className="finale-scene__eyebrow";
      eyebrow.textContent="CENA "+String(index+1);
      const title=document.createElement("h2");
      title.id=titleId(index);
      title.className="finale-scene__title finale-scene__title--sr";
      title.textContent="Cena "+String(index+1)+" — fotografia";
      const frame=document.createElement("figure");
      frame.className="finale-photo-frame";
      if(data.image){
        const image=document.createElement("img");
        image.src=data.image;
        image.alt=data.alt||"Fotografia da celebração";
        image.loading="lazy";
        image.decoding="async";
        image.addEventListener("error",()=>{
          frame.replaceChildren();
          frame.classList.add("is-placeholder");
          const placeholder=document.createElement("span");
          placeholder.className="finale-photo-frame__placeholder";
          placeholder.textContent="FOTO / PLACEHOLDER";
          frame.append(placeholder);
        });
        frame.append(image);
      }else{
        frame.classList.add("is-placeholder");
        const placeholder=document.createElement("span");
        placeholder.className="finale-photo-frame__placeholder";
        placeholder.textContent="FOTO / PLACEHOLDER";
        frame.append(placeholder);
      }
      const button=createButton("Continuar");
      wrap.append(eyebrow,title,frame,button);
      scene.append(wrap);
    }

    function renderMessageScene(scene,index,data){
      const wrap=document.createElement("div");
      wrap.className="finale-scene__content finale-scene__content--text";
      const eyebrow=document.createElement("span");
      eyebrow.className="finale-scene__eyebrow";
      eyebrow.textContent="CENA "+String(index+1);
      const title=document.createElement("h2");
      title.id=titleId(index);
      title.className="finale-scene__title";
      title.textContent=data.title||"[TÍTULO DA MENSAGEM FINAL]";
      const message=document.createElement("p");
      message.className="finale-scene__message";
      message.textContent=data.message||"[MENSAGEM FINAL]";
      const button=createButton(data.actionLabel||"Continuar");
      wrap.append(eyebrow,title,message,button);
      scene.append(wrap);
    }

    function renderTakeoverScene(scene,index,data){
      const wrap=document.createElement("div");
      wrap.className="finale-scene__content finale-scene__content--takeover";
      const title=document.createElement("h2");
      title.id=titleId(index);
      title.className="finale-scene__title";
      title.textContent=data.takeoverMessage||"Confiscamos sua música para dar ênfase nesse momento final.";
      const status=document.createElement("p");
      status.className="finale-scene__status";
      wrap.append(title,status);
      scene.append(wrap);
    }

    function renderCelebrationScene(scene,index,data){
      const wrap=document.createElement("div");
      wrap.className="finale-scene__content finale-scene__content--celebration";
      const symbol=document.createElement("span");
      symbol.className="finale-celebration__symbol";
      symbol.setAttribute("aria-hidden","true");
      symbol.textContent="♡";
      const title=document.createElement("h2");
      title.id=titleId(index);
      title.className="finale-scene__title";
      title.textContent=data.birthdayLabel||"Feliz aniversário ❤️";
      const confetti=document.createElement("div");
      confetti.className="finale-celebration__confetti";
      confetti.setAttribute("aria-hidden","true");
      const pieces=[
        ["♥","-38%","-25","-7","-15","-18","0"],
        ["✦","-29%","-14","-12","-20","20","70"],
        ["·","-20%","2","-16","-24","-32","140"],
        ["♥","-11%","-28","-10","-18","34","210"],
        ["✦","0%","-38","-4","-23","-12","280"],
        ["·","12%","-27","8","-21","28","350"],
        ["♥","23%","-10","12","-18","-26","60"],
        ["✦","34%","6","15","-24","18","130"],
        ["·","40%","22","8","-19","-34","200"],
        ["♥","30%","35","18","-17","12","270"],
        ["✦","16%","30","-15","-22","-20","340"],
        ["·","-2%","34","-20","-16","30","40"],
        ["♥","-17%","28","-13","-23","-28","110"],
        ["✦","-31%","18","-9","-20","22","180"],
        ["·","-42%","3","-18","-18","-16","250"],
        ["♥","-35%","-20","14","-24","34","320"],
        ["✦","-24%","-36","-11","-19","-30","30"],
        ["·","8%","-48","17","-21","16","100"],
        ["♥","27%","-32","-14","-23","-24","170"],
        ["✦","43%","-12","10","-20","28","240"],
        ["·","37%","30","-8","-18","-32","310"],
        ["♥","-44%","31","16","-22","20","80"]
      ];
      pieces.forEach(([symbol,startX,startY,driftX,driftY,rotate,delay],index)=>{
        const piece=document.createElement("span");
        piece.textContent=symbol;
        piece.style.setProperty("--finale-piece",String(index));
        piece.style.setProperty("--finale-start-x",startX);
        piece.style.setProperty("--finale-start-y",startY+"%");
        piece.style.setProperty("--finale-drift-x",driftX);
        piece.style.setProperty("--finale-drift-y",driftY);
        piece.style.setProperty("--finale-rotate",rotate+"deg");
        piece.style.setProperty("--finale-delay",delay+"ms");
        confetti.append(piece);
      });
      const note=document.createElement("p");
      note.className="finale-scene__message finale-scene__message--celebration";
      note.textContent="";
      wrap.append(confetti,symbol,title,note);
      scene.append(wrap);
    }

    renderTextScene(scenes[0],0,sceneData[0].data);
    renderPhotoScene(scenes[1],1,sceneData[1].data);
    renderPhotoScene(scenes[2],2,sceneData[2].data);
    renderPhotoScene(scenes[3],3,sceneData[3].data);
    renderMessageScene(scenes[4],4,sceneData[4].data);
    renderTakeoverScene(scenes[5],5,sceneData[5].data);
    renderCelebrationScene(scenes[6],6,sceneData[6].data);
    setSceneVisibility(0);

    function isReduced(){
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    function sceneTop(index){
      return Math.max(0,Math.round(scenes[index].getBoundingClientRect().top+window.scrollY));
    }

    function calculateCheckpointLimit(index){
      const button=scenes[index]?.querySelector(".finale-scene__continue");
      if(!button)return checkpointY;

      const margin=24;
      const rect=button.getBoundingClientRect();
      const viewportBottom=window.innerHeight-margin;
      const limit=window.scrollY+rect.bottom-viewportBottom;

      return Math.max(checkpointY,Math.round(limit));
    }

    function clampToCheckpointLimit(){
      if(state!=="checkpoint")return;
      if(window.scrollY>checkpointLimitY+1){
        window.scrollTo(0,checkpointLimitY);
      }
    }

    function recalculateCheckpointLimit(){
      if(state!=="checkpoint")return;
      checkpointLimitY=calculateCheckpointLimit(sceneIndex);
      clampToCheckpointLimit();
    }

    function setCheckpoint(index){
      sceneIndex=index;
      checkpointY=sceneTop(index);
      setSceneVisibility(index);
      state=index===6?"finished":"checkpoint";
      checkpointLimitY=state==="checkpoint"?calculateCheckpointLimit(index):checkpointY;

      const button=scenes[index].querySelector(".finale-scene__continue");
      if(button){
        button.disabled=false;
        button.classList.remove("is-fading");
        requestAnimationFrame(()=>{
          checkpointLimitY=calculateCheckpointLimit(index);
          clampToCheckpointLimit();
          button.focus({preventScroll:true});
        });
      }
    }

    function cancelAutoScroll(){
      if(autoFrame){
        cancelAnimationFrame(autoFrame);
        autoFrame=0;
      }
    }

    function setCinematicScrollMode(active){
      document.documentElement.classList.toggle("finale-is-auto",active);
    }

    function scrollToTarget(index,after){
      if(autoFrame)cancelAnimationFrame(autoFrame);
      autoTargetY=sceneTop(index);
      state="auto";
      setCinematicScrollMode(true);
      const startY=window.scrollY;
      const distance=autoTargetY-startY;
      const speed=240;
      const duration=isReduced()?40:Math.max(900,(Math.abs(distance)/speed)*1000);
      const startTime=performance.now();
      function step(now){
        if(state!=="auto")return;
        const progress=Math.min(1,(now-startTime)/duration);
        window.scrollTo(0,startY+(distance*progress));
        if(progress<1){
          autoFrame=requestAnimationFrame(step);
          return;
        }
        autoFrame=0;
        window.scrollTo(0,autoTargetY);
        setCinematicScrollMode(false);
        if(typeof after==="function")after();
      }
      autoFrame=requestAnimationFrame(step);
    }

    function fadeButton(button){
      button.disabled=true;
      button.classList.add("is-fading");
    }

    function advanceFromCheckpoint(button){
      if(state!=="checkpoint"||sceneIndex>4||button.disabled)return;
      fadeButton(button);
      window.setTimeout(()=>{
        if(state!=="checkpoint")return;
        const nextIndex=sceneIndex+1;
        if(nextIndex===5){
          beginTakeover();
          return;
        }
        scrollToTarget(nextIndex,()=>setCheckpoint(nextIndex));
      },isReduced()?0:220);
    }

    function pauseCurrentPlayer(){
      if(window.musicPlayer&&typeof window.musicPlayer.pause==="function")window.musicPlayer.pause();
    }

    function beginTakeover(){
      state="takeover";
      sceneIndex=5;
      setCinematicScrollMode(true);
      if(autoFrame)cancelAnimationFrame(autoFrame);
      pauseCurrentPlayer();
      prepareFinalMusic();
      setSceneVisibility(5);
      checkpointY=sceneTop(5);
      window.scrollTo(0,checkpointY);
      const scene=scenes[5];
      scene.classList.add("is-active");
      window.clearTimeout(takeoverTimer);
      takeoverTimer=window.setTimeout(()=>{
        scene.classList.remove("is-active");
        scrollToTarget(6,finishCelebration);
      },isReduced()?120:3600);
    }

    function prepareFinalMusic(){
      const src=sceneData[6].data.finalMusic&&sceneData[6].data.finalMusic.src;
      if(!src)return;
      if(!finalAudio){
        finalAudio=new Audio();
        finalAudio.preload="auto";
      }
      finalAudio.pause();
      finalAudio.currentTime=0;
      finalAudio.src=src;
      finalAudio.volume=1;
      finalAudio.muted=true;
      const playPromise=finalAudio.play();
      if(playPromise&&playPromise.catch)playPromise.catch(()=>{});
    }

    function startFinalMusic(){
      if(!finalAudio)return;
      finalAudio.currentTime=0;
      finalAudio.muted=false;
      const playPromise=finalAudio.play();
      if(playPromise&&playPromise.catch)playPromise.catch(()=>{});
    }

    function finishCelebration(){
      if(state!=="auto")return;
      setCinematicScrollMode(false);
      setCheckpoint(6);
      state="finished";
      startFinalMusic();
      scenes[6].classList.add("is-celebrating");
      root.classList.add("is-finished");
      window.setTimeout(()=>{
        root.classList.add("is-settled");
        enableNormalScroll();
      },isReduced()?0:900);
    }

    function enableNormalScroll(){
      if(autoFrame)cancelAnimationFrame(autoFrame);
      setCinematicScrollMode(false);
      state="finished";
      document.documentElement.classList.remove("finale-is-active");
    }

    function guardScroll(){
      if(state==="checkpoint"){
        clampToCheckpointLimit();
      }
    }

    function blockScrollInput(event){
      if(event.cancelable)event.preventDefault();
    }

    function handleWheel(event){
      if(state==="auto"||state==="takeover"){
        blockScrollInput(event);
        return;
      }

      if(state!=="checkpoint"||event.deltaY<=0)return;

      const projected=window.scrollY+event.deltaY;
      if(projected>checkpointLimitY){
        blockScrollInput(event);
        window.scrollTo(0,checkpointLimitY);
      }
    }

    function getKeyboardScrollDelta(event){
      if(event.key==="ArrowDown")return 40;
      if(event.key==="PageDown")return Math.max(1,Math.round(window.innerHeight*.9));
      if(event.key==="End")return Number.POSITIVE_INFINITY;
      if((event.key===" "||event.key==="Spacebar")&&!event.shiftKey){
        return Math.max(1,Math.round(window.innerHeight*.9));
      }
      return 0;
    }

    function handleKeydown(event){
      if(state==="auto"||state==="takeover"){
        const blocked=["ArrowUp","ArrowDown","PageUp","PageDown"," ","Spacebar","Home","End"];
        if(blocked.includes(event.key))blockScrollInput(event);
        return;
      }

      if(state!=="checkpoint")return;

      if(event.key==="ArrowUp"||event.key==="PageUp"||event.key==="Home"||
         ((event.key===" "||event.key==="Spacebar")&&event.shiftKey)){
        return;
      }

      const delta=getKeyboardScrollDelta(event);
      if(delta<=0)return;

      const projected=window.scrollY+delta;
      if(projected>checkpointLimitY){
        blockScrollInput(event);
        window.scrollTo(0,checkpointLimitY);
      }
    }

    function handleTouchStart(event){
      if(event.touches&&event.touches[0])touchStartY=event.touches[0].clientY;
    }

    function handleTouchMove(event){
      if(!event.touches||!event.touches[0]||touchStartY===null)return;

      if(state==="auto"||state==="takeover"){
        blockScrollInput(event);
        return;
      }

      if(state!=="checkpoint")return;

      const delta=touchStartY-event.touches[0].clientY;
      if(delta<=0)return;

      const projected=window.scrollY+delta;
      if(projected>checkpointLimitY){
        blockScrollInput(event);
        window.scrollTo(0,checkpointLimitY);
      }
    }

    function handleTouchEnd(){
      touchStartY=null;
    }

    function handleFinaleLinks(event){
      if(state!=="auto"&&state!=="takeover"&&state!=="checkpoint")return;
      const link=event.target.closest("a[href]");
      if(link&&link.closest(".site-nav"))event.preventDefault();
    }

    function openFinale(){
      if(state!=="idle")return;

      state="checkpoint";
      section.hidden=false;
      section.setAttribute("aria-hidden","false");
      document.documentElement.classList.add("finale-is-active");
      setSceneVisibility(0);
      section.classList.add("is-entering");

      window.requestAnimationFrame(()=>{
        if(state!=="checkpoint")return;

        checkpointY=sceneTop(0);
        checkpointLimitY=checkpointY;
        window.scrollTo({top:checkpointY,left:0,behavior:"instant"});

        window.requestAnimationFrame(()=>{
          if(state!=="checkpoint")return;

          checkpointY=sceneTop(0);
          checkpointLimitY=calculateCheckpointLimit(0);

          const button=scenes[0].querySelector(".finale-scene__continue");
          if(button){
            button.disabled=false;
            button.classList.remove("is-fading");
            button.focus({preventScroll:true});
          }

          const reduced=isReduced();
          if(reduced){
            section.classList.remove("is-entering");
            return;
          }

          window.setTimeout(()=>{
            if(state==="checkpoint")section.classList.remove("is-entering");
          },180);
        });
      });
    }

    document.addEventListener("wheel",handleWheel,{passive:false});
    document.addEventListener("keydown",handleKeydown);
    document.addEventListener("touchstart",handleTouchStart,{passive:true});
    document.addEventListener("touchmove",handleTouchMove,{passive:false});
    document.addEventListener("touchend",handleTouchEnd,{passive:true});
    document.addEventListener("click",handleFinaleLinks);
    window.addEventListener("scroll",guardScroll,{passive:true});
    window.addEventListener("resize",recalculateCheckpointLimit,{passive:true});
    window.addEventListener("orientationchange",()=>{
      window.setTimeout(recalculateCheckpointLimit,0);
    },{passive:true});

    window.addEventListener("beforeunload",()=>{
      if(autoFrame)cancelAnimationFrame(autoFrame);
      setCinematicScrollMode(false);
      window.clearTimeout(takeoverTimer);
      if(finalAudio)finalAudio.pause();
    },{once:true});

    return openFinale;
  }

  function init(){
    initLikes();
    initTimeCapsule();
    const openLetterScene=initLetterExperience();
    initSurprise(openLetterScene);
    const openFinale=initFinale();
    initSecretMessage(openFinale);
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",init,{once:true});
  }else{
    init();
  }
})();