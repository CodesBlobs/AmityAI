var ce=Object.defineProperty;var le=(i,e,t)=>e in i?ce(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var Z=(i,e,t)=>le(i,typeof e!="symbol"?e+"":e,t);import{L as $,c as K,M as A,T as P}from"./tools.D9zwH9nK.js";import{B as V,I as de,S as ue}from"./config.CXf-J2WI.js";var j=(i=>(i.EXTENDED_HOVER="extendedHover",i.REPEATED_CLICK="repeatedClick",i.SCROLL_BACK_FORTH="scrollBackForth",i.FORM_ERROR="formError",i.ALT_KEY_PRESS="altKeyPress",i.FOCUS_CHANGE="focusChange",i.KEYBOARD_HESITATION="keyboardHesitation",i))(j||{});const ee=new $("FormScanner"),fe={email:[/email/i,/e-mail/i,/correo/i],phone:[/phone/i,/tel/i,/mobile/i,/cell/i,/telefono/i,/fax/i],firstName:[/first[\s_-]?name/i,/given[\s_-]?name/i,/fname/i,/forename/i,/first$/i,/prénom/i],lastName:[/last[\s_-]?name/i,/family[\s_-]?name/i,/surname/i,/lname/i,/last$/i,/nom$/i],fullName:[/full[\s_-]?name/i,/your[\s_-]?name/i,/^name$/i,/contact[\s_-]?name/i,/cardholder/i,/name[\s_-]?on[\s_-]?card/i],streetAddress:[/street/i,/address[\s_-]?1/i,/address[\s_-]?line[\s_-]?1/i,/^address$/i,/street[\s_-]?address/i],addressLine2:[/address[\s_-]?2/i,/address[\s_-]?line[\s_-]?2/i,/apt/i,/suite/i,/unit/i],city:[/city/i,/town/i,/suburb/i,/locality/i,/ciudad/i],state:[/state/i,/province/i,/region/i,/county/i,/prefecture/i,/estado/i],zipCode:[/zip/i,/postal/i,/postcode/i,/post[\s_-]?code/i,/código[\s_-]?postal/i],country:[/country/i,/nation/i,/país/i],cardNumber:[/card[\s_-]?number/i,/credit[\s_-]?card/i,/cc[\s_-]?num/i,/número.*tarjeta/i],cardExpiry:[/expir/i,/exp[\s_-]?date/i,/mm[\s_-]?yy/i,/validez/i],cardCvc:[/cvv/i,/cvc/i,/security[\s_-]?code/i,/csv/i,/cid/i],company:[/company/i,/organization/i,/business/i,/empresa/i,/org[\s_-]?name/i],birthDate:[/birth/i,/dob/i,/birthday/i,/fecha.*nacimiento/i,/date[\s_-]?of[\s_-]?birth/i],password:[/password/i,/pass/i,/pwd/i,/contraseña/i],username:[/username/i,/user[\s_-]?name/i,/login/i,/usuario/i]},G={shipping:[/ship/i,/delivery/i,/envío/i],billing:[/bill/i,/payment/i,/factura/i,/pago/i],contact:[/contact/i,/personal/i,/contacto/i],login:[/login/i,/sign[\s_-]?in/i,/iniciar/i],registration:[/register/i,/sign[\s_-]?up/i,/create[\s_-]?account/i,/registr/i]};class pe{constructor(){Z(this,"fields",new Map)}scan(e){ee.debug("Scanning for form fields...",{formSelector:e});let t=document;if(e){const s=document.querySelector(e);s&&(t=s)}const o=t.querySelectorAll("input, select, textarea"),n=[];return this.fields.clear(),o.forEach((s,r)=>{if(!this.isValidInput(s))return;const a=`field_${r}_${Math.random().toString(36).substr(2,5)}`;this.fields.set(a,s);const p=this.extractFieldInfo(s,a);p.isVisible&&n.push(p)}),ee.info(`Found ${n.length} visible form fields`),n}getElement(e){return this.fields.get(e)}isValidInput(e){const t=e.getAttribute("type");return!(["hidden","submit","button","image","file","reset"].includes(t||"")||e.hasAttribute("readonly")||e.hasAttribute("disabled"))}extractFieldInfo(e,t){const o=this.findLabel(e),n=this.getDomPath(e),s=this.generateSelector(e),r=this.checkVisibility(e),a=e.tagName.toLowerCase()==="select"?"select":e.getAttribute("type")||"text",p=e.getAttribute("autocomplete")||"",l=[o,e.name,e.id,e.getAttribute("placeholder")||"",p,e.getAttribute("aria-label")||""].join(" "),d=this.inferSemanticType(l,a),b=this.detectFieldGroup(e,l),y=e.closest("form");return{field_id:t,name:e.name||e.id||"",label:o||"",placeholder:e.getAttribute("placeholder")||"",type:a,inputType:a,semanticType:d,autocomplete:p,dom_path:n,selector:s,isVisible:r,isRequired:e.hasAttribute("required")||e.getAttribute("aria-required")==="true",value:e.value,formId:(y==null?void 0:y.id)||(y==null?void 0:y.getAttribute("name"))||void 0,fieldGroup:b}}findLabel(e){if(e.id){const l=document.querySelector(`label[for="${e.id}"]`);if(l!=null&&l.textContent)return this.cleanLabelText(l.textContent)}const t=e.closest("label");if(t!=null&&t.textContent){const l=t.cloneNode(!0),d=l.querySelector("input, select, textarea");d&&d.remove();const b=this.cleanLabelText(l.textContent||"");if(b)return b}const o=e.getAttribute("aria-label");if(o)return o;const n=e.getAttribute("aria-labelledby");if(n){const l=document.getElementById(n);if(l!=null&&l.textContent)return this.cleanLabelText(l.textContent)}const s=this.getPrecedingTextSibling(e);if(s)return s;const r=e.parentElement;if(r){const l=r.querySelector("label");if(l&&!l.contains(e)){const b=this.cleanLabelText(l.textContent||"");if(b)return b}const d=this.findPrecedingLabelElement(e,r);if(d)return d}const a=r==null?void 0:r.parentElement;if(a){const l=a.querySelector("label");if(l&&!l.contains(e)){const d=this.cleanLabelText(l.textContent||"");if(d&&d.length<100)return d}}const p=e.getAttribute("title");return p||e.getAttribute("placeholder")||""}getPrecedingTextSibling(e){var o;let t=e.previousSibling;for(;t;){if(t.nodeType===Node.TEXT_NODE&&((o=t.textContent)!=null&&o.trim()))return this.cleanLabelText(t.textContent);if(t.nodeType===Node.ELEMENT_NODE){const n=t;if(["LABEL","SPAN","DIV","P","STRONG","B"].includes(n.tagName)){const s=this.cleanLabelText(n.textContent||"");if(s&&s.length<100)return s}break}t=t.previousSibling}return null}findPrecedingLabelElement(e,t){const o=Array.from(t.children),n=o.indexOf(e);for(let s=n-1;s>=0;s--){const r=o[s];if(["LABEL","SPAN","DIV","P"].includes(r.tagName)){const a=this.cleanLabelText(r.textContent||"");if(a&&a.length<100&&!r.querySelector("input, select, textarea"))return a}if(r.querySelector("input, select, textarea")||r.matches("input, select, textarea"))break}return null}cleanLabelText(e){return e.replace(/\*/g,"").replace(/:/g,"").replace(/\s+/g," ").trim()}inferSemanticType(e,t){const o=e.toLowerCase();if(["email","tel","url","date","number"].includes(t))return t==="tel"?"phone":t;for(const[s,r]of Object.entries(fe))for(const a of r)if(a.test(o))return s;const n={"given-name":"firstName","family-name":"lastName",name:"fullName",email:"email",tel:"phone","street-address":"streetAddress","address-line1":"streetAddress","address-line2":"addressLine2","address-level2":"city","address-level1":"state","postal-code":"zipCode",country:"country","cc-number":"cardNumber","cc-exp":"cardExpiry","cc-csc":"cardCvc"};for(const[s,r]of Object.entries(n))if(o.includes(s))return r;return"text"}detectFieldGroup(e,t){t.toLowerCase();const o=e.closest("fieldset");if(o){const r=o.querySelector("legend");if(r!=null&&r.textContent){const a=r.textContent.toLowerCase();for(const[p,l]of Object.entries(G))for(const d of l)if(d.test(a))return p}}const n=e.closest("form");if(n){const r=(n.id+" "+n.className).toLowerCase();for(const[a,p]of Object.entries(G))for(const l of p)if(l.test(r))return a}const s=e.closest('section, [class*="shipping"], [class*="billing"], [class*="contact"], [id*="shipping"], [id*="billing"], [id*="contact"]');if(s){const r=(s.id+" "+s.className).toLowerCase();for(const[a,p]of Object.entries(G))for(const l of p)if(l.test(r))return a}}generateSelector(e){if(e.id)return`#${CSS.escape(e.id)}`;const t=e.getAttribute("name");if(t){const n=`[name="${CSS.escape(t)}"]`;try{if(document.querySelectorAll(n).length===1)return n}catch{}}const o=e.getAttribute("data-testid");return o?`[data-testid="${CSS.escape(o)}"]`:this.getDomPath(e)}getDomPath(e){const t=[];let o=e;for(;o&&o.nodeType===Node.ELEMENT_NODE&&o!==document.body;){let n=o.nodeName.toLowerCase();if(o.id){n=`#${CSS.escape(o.id)}`,t.unshift(n);break}else{let s=o,r=1;for(;s.previousElementSibling;)s=s.previousElementSibling,s.nodeName.toLowerCase()===o.nodeName.toLowerCase()&&r++;r>1&&(n+=`:nth-of-type(${r})`),t.unshift(n),o=o.parentElement}}return t.join(" > ")}checkVisibility(e){const t=window.getComputedStyle(e);if(t.display==="none"||t.visibility==="hidden"||t.opacity==="0")return!1;const o=e.getBoundingClientRect();if(o.width===0||o.height===0)return!1;const n=window.innerWidth,s=window.innerHeight;if(o.right<0||o.bottom<0||o.left>n*2||o.top>s*2)return!1;let r=e.parentElement;for(;r&&r!==document.body;){const a=window.getComputedStyle(r);if(a.display==="none"||a.visibility==="hidden")return!1;r=r.parentElement}return!0}}const me=new $("FormFiller");class ge{setNativeValue(e,t){const{set:o}=Object.getOwnPropertyDescriptor(e,"value")||{},n=Object.getPrototypeOf(e),{set:s}=Object.getOwnPropertyDescriptor(n,"value")||{};s&&o!==s?s.call(e,t):o?o.call(e,t):e.value=t}async fill(e,t){try{return e?(e.focus(),e.click(),e.scrollIntoView({behavior:"smooth",block:"center"}),await new Promise(n=>setTimeout(n,50)),this.setNativeValue(e,t),["keydown","keypress","input","keyup","change"].forEach(n=>{e.dispatchEvent(new Event(n,{bubbles:!0,cancelable:!0,composed:!0}))}),await new Promise(n=>setTimeout(n,50)),e.blur(),!0):!1}catch(o){return me.error("Error filling field",o),!1}}}const _=new $("ContentScript"),R=new pe,he=new ge,c={enabled:!0,currentElement:null,hoverStartTime:0,clickCounts:new Map,guidanceClicks:{selector:"",count:0,lastClickTime:0},lastMousePosition:{x:0,y:0},lastAnalysisRequest:0,activeHighlights:new Set,activationKey:"AltLeft",cleanupTimeout:null,fiveClickHelpEnabled:!1};function te(){_.info("Content script initializing..."),document.addEventListener("mousemove",be,{passive:!0}),document.addEventListener("click",ye,{passive:!0}),document.addEventListener("keydown",xe),document.addEventListener("keyup",ve),document.addEventListener("scroll",Ce,{passive:!0}),chrome.storage.local.get(["settings"],i=>{var e,t;(e=i.settings)!=null&&e.activationKey&&(c.activationKey=i.settings.activationKey,_.info("Loaded activation key:",c.activationKey)),((t=i.settings)==null?void 0:t.fiveClickHelpEnabled)!==void 0&&(c.fiveClickHelpEnabled=i.settings.fiveClickHelpEnabled,_.info("Loaded 5-click help enabled:",c.fiveClickHelpEnabled))}),chrome.storage.onChanged.addListener((i,e)=>{var t,o,n,s;e==="local"&&((o=(t=i.settings)==null?void 0:t.newValue)!=null&&o.activationKey)&&(c.activationKey=i.settings.newValue.activationKey,_.info("Updated activation key:",c.activationKey)),e==="local"&&((s=(n=i.settings)==null?void 0:n.newValue)==null?void 0:s.fiveClickHelpEnabled)!==void 0&&(c.fiveClickHelpEnabled=i.settings.newValue.fiveClickHelpEnabled,_.info("Updated 5-click help enabled:",c.fiveClickHelpEnabled))}),chrome.runtime.onMessage.addListener(Ee),_.info("Content script initialized")}function be(i){if(!c.enabled)return;c.lastMousePosition={x:i.clientX,y:i.clientY};const e=document.elementFromPoint(i.clientX,i.clientY);e&&e!==c.currentElement&&(we(),c.currentElement=e,c.hoverStartTime=Date.now())}function ye(i){if(!c.enabled)return;const e=i.target;if(!e)return;const t=q(e);if(!t||se(t)||!c.fiveClickHelpEnabled)return;const o=Date.now(),n=5;if(c.guidanceClicks.selector===t&&o-c.guidanceClicks.lastClickTime<3e3){if(c.guidanceClicks.count++,c.guidanceClicks.lastClickTime=o,c.guidanceClicks.count<n){const a=document.createElement("div");a.style.cssText=`
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 107, 0, 0.9);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: bold;
        z-index: 999999;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      `,a.textContent=`${c.guidanceClicks.count}/${n} clicks`,document.body.appendChild(a),setTimeout(()=>a.remove(),500)}if(c.guidanceClicks.count>=n){const a=O(e);if(a){_.info("5-click activation detected on element:",a.selector);const p=document.createElement("div");p.style.cssText=`
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(255, 107, 0, 0.95);
          color: white;
          padding: 24px 40px;
          border-radius: 12px;
          font-size: 20px;
          font-weight: bold;
          z-index: 999999;
          box-shadow: 0 4px 20px rgba(0,0,0,0.4);
          animation: guidanceConfirm 1s ease-in-out;
        `,p.textContent="✓ Guidance mode activated!",document.body.appendChild(p);const l=document.createElement("style");l.textContent=`
          @keyframes guidanceConfirm {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            30% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
            70% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
          }
        `,document.head.appendChild(l),setTimeout(()=>p.remove(),1e3),chrome.runtime.sendMessage(K(A.GUIDANCE_REQUESTED,{element:a,url:window.location.href,pageState:M()}))}c.guidanceClicks={selector:"",count:0,lastClickTime:0};return}}else c.guidanceClicks={selector:t,count:1,lastClickTime:o};const r=(c.clickCounts.get(t)??0)+1;c.clickCounts.set(t,r),r>=V.CLICK_REPEAT&&(ne({type:j.REPEATED_CLICK,timestamp:Date.now(),selector:t,element:O(e)??void 0,metadata:{clickCount:r}}),c.clickCounts.delete(t)),setTimeout(()=>{c.clickCounts.get(t)===r&&c.clickCounts.delete(t)},5e3)}let B=!1,oe=0;function xe(i){if(!c.enabled)return;const e=i.code,t=e===c.activationKey,o=i.ctrlKey&&e!=="ControlLeft"&&e!=="ControlRight"||i.altKey&&e!=="AltLeft"&&e!=="AltRight"||i.shiftKey&&e!=="ShiftLeft"&&e!=="ShiftRight"||i.metaKey&&e!=="MetaLeft"&&e!=="MetaRight";t&&!o?(B=!0,oe=Date.now()):B&&e!==c.activationKey&&(B=!1)}function ve(i){if(!c.enabled)return;const e=i.code;e===c.activationKey&&B&&(i.ctrlKey&&e!=="ControlLeft"&&e!=="ControlRight"||i.altKey&&e!=="AltLeft"&&e!=="AltRight"||i.shiftKey&&e!=="ShiftLeft"&&e!=="ShiftRight"||i.metaKey&&e!=="MetaLeft"&&e!=="MetaRight"||(Date.now()-oe<1500?(_.info(`Activation key (${c.activationKey}) solo press detected - showing question input popup`),ke()):_.debug(`Activation key (${c.activationKey}) held too long (>1500ms) - ignoring`)),B=!1)}function Ce(i){}function Ee(i,e,t){var s,r,a,p,l,d,b,y,m,v,E,L,N,F,Q,W,Y,J;if(!Fe(i))return!1;const{type:o,payload:n}=i;switch(o){case A.SHOW_GUIDANCE:Se(n),t({success:!0});break;case A.HIDE_GUIDANCE:re(),t({success:!0});break;case A.GET_PAGE_STATE:return(async()=>{try{const f=window.location.href||"";if(/amazon\.|ebay\.|walmart\./i.test(f)){let w=0;for(;w<2e3&&!window.__siteIntegrationReady;)await new Promise(S=>setTimeout(S,100)),w+=100}const u=M();t({success:!0,data:u})}catch(f){t({success:!1,error:String(f)})}})(),!0;case A.EXECUTE_TOOL:{const f=n;if((f==null?void 0:f.name)===P.ADD_TO_CART){const x=f.arguments||{},u=window.__siteIntegration||{},h=((s=u.amazon)==null?void 0:s.addToCart)||((r=u.ebay)==null?void 0:r.addToCart)||((a=u.walmart)==null?void 0:a.addToCart);return h?(Promise.resolve().then(()=>h(x)).then(g=>t({success:!0,data:g})).catch(g=>t({success:!1,error:String(g)})),!0):(t({success:!1,error:"No site integration available for add-to-cart"}),!0)}if((f==null?void 0:f.name)===P.NAVIGATE_TO_PRODUCT){const x=f.arguments||{},u=window.__siteIntegration||{},h=((p=u.amazon)==null?void 0:p.navigateToProduct)||((l=u.ebay)==null?void 0:l.navigateToProduct)||((d=u.walmart)==null?void 0:d.navigateToProduct);return h?(Promise.resolve().then(()=>h(x)).then(g=>t({success:!0,data:g})).catch(g=>t({success:!1,error:String(g)})),!0):x.link?(window.location.href=x.link,t({success:!0,data:{navigated:!0,url:x.link}}),!0):(t({success:!1,error:"No site integration available for navigation and no link provided"}),!0)}if((f==null?void 0:f.name)===P.NAVIGATE_TO_PRODUCT_SPECS){const x=f.arguments||{},u=window.__siteIntegration||{},h=((b=u.amazon)==null?void 0:b.navigateToProductSpecs)||((y=u.ebay)==null?void 0:y.navigateToProductSpecs)||((m=u.walmart)==null?void 0:m.navigateToProductSpecs);return h?(Promise.resolve().then(()=>h(x)).then(g=>t({success:!0,data:g})).catch(g=>t({success:!1,error:String(g)})),!0):(t({success:!1,error:"No site integration available for navigate-to-specs"}),!0)}if((f==null?void 0:f.name)===P.ADD_TO_CART_FROM_PRODUCT_PAGE){const x=f.arguments||{},u=window.__siteIntegration||{},h=((v=u.amazon)==null?void 0:v.addToCartFromProductPage)||((E=u.ebay)==null?void 0:E.addToCartFromProductPage)||((L=u.walmart)==null?void 0:L.addToCartFromProductPage);return h?(Promise.resolve().then(()=>h(x)).then(g=>t({success:!0,data:g})).catch(g=>t({success:!1,error:String(g)})),!0):(t({success:!1,error:"No site integration available for add-to-cart-from-product-page"}),!0)}if((f==null?void 0:f.name)===P.NAVIGATE_TO_CART){const x=f.arguments||{},u=window.__siteIntegration||{},h=((N=u.amazon)==null?void 0:N.navigateToCart)||((F=u.ebay)==null?void 0:F.navigateToCart)||((Q=u.walmart)==null?void 0:Q.navigateToCart);return h?(Promise.resolve().then(()=>h(x)).then(g=>t({success:!0,data:g})).catch(g=>t({success:!1,error:String(g)})),!0):(t({success:!1,error:"No site integration available for navigate-to-cart"}),!0)}if((f==null?void 0:f.name)===P.EXECUTE_CHECKOUT){const x=f.arguments||{},u=window.__siteIntegration||{},h=((W=u.amazon)==null?void 0:W.proceedToCheckout)||((Y=u.ebay)==null?void 0:Y.proceedToCheckout)||((J=u.walmart)==null?void 0:J.proceedToCheckout);return h?(Promise.resolve().then(()=>h(x)).then(g=>t({success:!0,data:g})).catch(g=>t({success:!1,error:String(g)})),!0):(t({success:!1,error:"No site integration available for execute-checkout"}),!0)}if((f==null?void 0:f.name)===P.FIND_FORM_FIELDS){try{const x=R.scan();t({success:!0,data:x})}catch(x){t({success:!1,error:String(x)})}return!0}if((f==null?void 0:f.name)===P.FILL_FORM){const u=(f.arguments||{}).fields||{};return(async()=>{const h={};for(const[g,w]of Object.entries(u)){const S=R.getElement(g);S?h[g]=await he.fill(S,w):h[g]=!1}t({success:!0,data:h})})(),!0}if((f==null?void 0:f.name)===P.CONFIRM_FILLED_FIELDS){const x=document.querySelectorAll("input, select, textarea");let u=0;return x.forEach(h=>{var w;const g=h;g.value&&g.value.length>0&&((w=O(g))!=null&&w.isVisible)&&(U(g,!1),u++)}),H(`Confirmed ${u} filled fields.`),t({success:!0,count:u}),!0}return!1}case A.TOGGLE_ASSISTANT:c.enabled=n.enabled,t({success:!0});break;case A.EXTRACT_MATHSPACE_PROBLEM:{const f=["#react-app-hook > div > div > div.fullHeight_1f0i6er-o_O-background_rzk2lv > div > div.fullHeight_1f0i6er > div.fullHeight_1f0i6er > div.problemContent_1tad67y-o_O-problemContentPaddingForControlPanel_vaowo8 > div:nth-child(2) > div:nth-child(1) > div > div:nth-child(2) > div.subproblemInstruction_1ctp7b","#react-app-hook > div > div > div.fullHeight_1f0i6er-o_O-background_rzk2lv > div > div.fullHeight_1f0i6er > div.fullHeight_1f0i6er > div.problemContent_1tad67y-o_O-problemContentPaddingForControlPanel_vaowo8 > div:nth-child(2) > div:nth-child(2) > div.subproblem_hptpns > div:nth-child(2) > div.subproblemInstruction_1ctp7b > div > p",'[class*="subproblemInstruction"]'],x=["#react-app-hook > div > div > div.fullHeight_1f0i6er-o_O-background_rzk2lv > div > div.fullHeight_1f0i6er > div.problemHeaderWrapper_px9xfl-o_O-problemHeaderWrapperFixed_1gqwcr > div > div.css-1d2qfry-ProblemHeaderRightColumn.e1esx8jm0 > div",".css-1d2qfry-ProblemHeaderRightColumn > div",'[class*="problemHeader"] [class*="RightColumn"] > div',".e1esx8jm0 > div",'[class*="ProblemHeader"] div'];try{let u=function(C){let k="";return C.childNodes.forEach(D=>{var I;if(D.nodeType===Node.TEXT_NODE){const z=(I=D.textContent)==null?void 0:I.trim();z&&(k+=z)}else D.nodeType===Node.ELEMENT_NODE&&(k+=u(D))}),k},h="",g="";for(const C of x){const k=document.querySelector(C);if(k){console.log("[Mathspace] Found context with selector:",C),h=u(k).trim();break}}const w=new Set;for(const C of f)document.querySelectorAll(C).forEach(D=>{const I=u(D).trim();if(I&&I.length>5){if(h.includes(I))return;w.has(I)||w.add(I)}});let S=h;if(w.size>0){const C=Array.from(w).join(`

`);S=S?`${S}

${C}`:C}if(!S){t({success:!1,error:"Could not find Mathspace problem content. Please inspect the page and update the selectors."});break}_.info("Mathspace problem extracted:",S.substring(0,100)+"..."),t({success:!0,data:{problemText:S}})}catch(u){t({success:!1,error:String(u)})}break}case A.REQUEST_ANALYSIS:{const{immediate:f,cleanup:x}=n;if(console.log("[ContentScript] Received REQUEST_ANALYSIS",{immediate:f,cleanup:x}),x)return c.activeHighlights.forEach(u=>u.remove()),c.activeHighlights.clear(),t({success:!0}),!0;if(f)try{_.info("Processing immediate analysis request (Demo Mode)"),H("⚡️ Analyzing...",2e3);const u=R.scan();let h=!1;u.forEach(C=>{const k=R.getElement(C.field_id);if(k){const D=[C.semanticType,C.name,C.label,C.placeholder,k.id].join(" ").toLowerCase(),z=["card number","credit card","cc number","card num","cvc","cvv","security code","expiry","exp date","password","pass code"].some(ae=>D.includes(ae))||["cardNumber","cardCvc","cardExpiry","password"].includes(C.semanticType);console.log("[Security Check] Field:",{id:C.field_id,type:C.semanticType,label:C.label,isSensitive:z}),z?(h||Te(k),h=!0):U(k,!1)}});const g=document.querySelectorAll('button, a[role="button"], input[type="submit"], input[type="button"]');let w=0;g.forEach(C=>{Ue(C)&&(U(C,!1),w++)});const S=u.length+w;setTimeout(()=>{h?H("⚠️ Security Alert: Sensitive fields detected. AI interaction disabled for these fields.",5e3):H(`Analysis Mode: Detected ${S} active elements`)},500),t({success:!0,data:{fieldCount:u.length,buttonCount:w}}),c.cleanupTimeout&&clearTimeout(c.cleanupTimeout),c.cleanupTimeout=setTimeout(()=>{c.activeHighlights.forEach(C=>C.remove()),c.activeHighlights.clear(),c.cleanupTimeout=null},1e4)}catch(u){_.error("Immediate analysis failed",u),t({success:!1,error:String(u)})}else t({success:!0,data:M()});break}case A.TASK_DONE:Ae(n),t({success:!0});break;default:return!1}return!0}function we(){if(!c.currentElement||!c.hoverStartTime)return;const i=Date.now()-c.hoverStartTime;if(i>=V.HOVER_DURATION){const e=q(c.currentElement);e&&!se(e)&&ne({type:j.EXTENDED_HOVER,timestamp:Date.now(),selector:e,element:O(c.currentElement)??void 0,metadata:{duration:i}})}}function ne(i){const e=Date.now();if(!(e-c.lastAnalysisRequest<V.ANALYSIS_INTERVAL)){c.lastAnalysisRequest=e;try{chrome.runtime.sendMessage(K(A.BEHAVIOR_REPORT,{behaviors:[i],pageState:M(),pageType:X()}))}catch{}}}function Se(i){if(re(),i.selector){const e=document.querySelector(i.selector);e&&U(e,i.showArrow)}i.selector||H(i.guidance)}function U(i,e=!0){const t=i.getBoundingClientRect(),o=document.createElement("div");if(o.className="elderly-assistant-highlight",o.style.cssText=`
    position: absolute;
    top: ${t.top+window.scrollY-4}px;
    left: ${t.left+window.scrollX-4}px;
    width: ${t.width+8}px;
    height: ${t.height+8}px;
    border: 3px solid #FF6B00;
    border-radius: 4px;
    background: rgba(255, 107, 0, 0.1);
    pointer-events: none;
    z-index: 999999;
    animation: elderly-assistant-pulse 1.5s infinite;
  `,document.body.appendChild(o),c.activeHighlights.add(o),e){const n=document.createElement("div");n.className="elderly-assistant-arrow",n.innerHTML="👆",n.style.cssText=`
      position: fixed;
      top: ${t.bottom+10}px;
      left: ${t.left+t.width/2-15}px;
      font-size: 30px;
      pointer-events: none;
      z-index: 999999;
      animation: elderly-assistant-bounce 1s infinite;
    `,document.body.appendChild(n),c.activeHighlights.add(n)}}function H(i,e=1e4){document.querySelectorAll(".elderly-assistant-toast").forEach(o=>o.remove());const t=document.createElement("div");t.className="elderly-assistant-toast",t.textContent=i,t.style.cssText=`
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #1a1a1a;
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    border: 1px solid #FF6B00;
    font-size: 16px;
    max-width: 80%;
    z-index: 2147483647; /* Max z-index */
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    font-family: system-ui, -apple-system, sans-serif;
  `,document.body.appendChild(t),c.activeHighlights.add(t),setTimeout(()=>{t.remove(),c.activeHighlights.delete(t)},e)}function Te(i){const e=i.getBoundingClientRect(),t=document.createElement("div");t.className="elderly-assistant-security-alert",t.style.cssText=`
    position: absolute;
    top: ${e.top+window.scrollY-10}px;
    left: ${e.left+window.scrollX+e.width-20}px;
    z-index: 2147483647;
    pointer-events: none;
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
    animation: elderly-assistant-bounce 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  `,t.innerHTML=`
    <div style="
      background: #ef4444; 
      color: white; 
      width: 40px; 
      height: 40px; 
      border-radius: 50%; 
      display: flex; 
      align-items: center; 
      justify-content: center;
      font-size: 24px;
      font-weight: bold;
      border: 3px solid white;
    ">
      ✕
    </div>
    <div style="
      position: absolute;
      top: 50px;
      right: 0;
      background: #ef4444;
      color: white;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-family: system-ui;
      width: 200px;
      text-align: right;
      font-weight: 500;
    ">
      Do not let AI enter important information for you
    </div>
  `,document.body.appendChild(t),c.activeHighlights.add(t)}function ke(){const i=document.querySelector(".elderly-assistant-question-popup");i&&i.remove();const e="elderly-assistant-question-popup-styles";if(!document.getElementById(e)){const b=document.createElement("style");b.id=e,b.textContent=`
      @keyframes questionPopupSlideIn {
        0% { opacity: 0; transform: translate(-50%, 100%); }
        100% { opacity: 1; transform: translate(-50%, 0); }
      }
      @keyframes questionPopupSlideOut {
        0% { opacity: 1; transform: translate(-50%, 0); }
        100% { opacity: 0; transform: translate(-50%, 100%); }
      }
    `,document.head.appendChild(b)}const t=document.createElement("div");t.className="elderly-assistant-question-popup",t.style.cssText=`
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    border: 2px solid #FF6B00;
    border-radius: 16px;
    padding: 20px 24px;
    z-index: 999999;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 107, 0, 0.2);
    min-width: 400px;
    max-width: 600px;
    animation: questionPopupSlideIn 0.3s ease-out;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `;const o=document.createElement("div");o.style.cssText=`
    color: #FF6B00;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  `,o.innerHTML='<span style="font-size: 20px;">📖</span> What do you want to know about this page?';const n=document.createElement("div");n.style.cssText=`
    display: flex;
    gap: 10px;
    align-items: center;
  `;const s=document.createElement("input");s.type="text",s.placeholder='e.g., "What is the main purpose of this page?" or "How do I...?"',s.style.cssText=`
    flex: 1;
    padding: 12px 16px;
    border: 1px solid #FF6B00;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 15px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  `,s.addEventListener("focus",()=>{s.style.borderColor="#FF8533",s.style.boxShadow="0 0 8px rgba(255, 107, 0, 0.4)"}),s.addEventListener("blur",()=>{s.style.borderColor="#FF6B00",s.style.boxShadow="none"});const r=document.createElement("button");r.textContent="Ask",r.style.cssText=`
    padding: 12px 24px;
    background: linear-gradient(135deg, #FF6B00 0%, #FF8533 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  `,r.addEventListener("mouseenter",()=>{r.style.transform="scale(1.05)",r.style.boxShadow="0 4px 12px rgba(255, 107, 0, 0.4)"}),r.addEventListener("mouseleave",()=>{r.style.transform="scale(1)",r.style.boxShadow="none"});const a=document.createElement("button");a.textContent="✕",a.style.cssText=`
    padding: 8px 12px;
    background: transparent;
    color: #888;
    border: 1px solid #444;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    transition: color 0.2s, border-color 0.2s;
  `,a.addEventListener("mouseenter",()=>{a.style.color="#fff",a.style.borderColor="#666"}),a.addEventListener("mouseleave",()=>{a.style.color="#888",a.style.borderColor="#444"});const p=()=>{t.style.animation="questionPopupSlideOut 0.3s ease-in",setTimeout(()=>t.remove(),300)},l=async()=>{console.log("[ContentScript] submitQuestion called"),r.textContent="Sending...",r.style.opacity="0.7";const b=s.value.trim();if(console.log("[ContentScript] submitQuestion called with:",b),!b){console.log("[ContentScript] Empty question, showing error"),r.textContent="Ask",r.style.opacity="1",s.style.borderColor="#ff4444",s.style.boxShadow="0 0 8px rgba(255, 68, 68, 0.4)",setTimeout(()=>{s.style.borderColor="#FF6B00",s.style.boxShadow="none"},1e3);return}o.innerHTML='<span style="font-size: 20px;">✓</span> Question sent! Check the sidebar for the answer.',o.style.color="#4CAF50",s.style.display="none",r.style.display="none",a.textContent="Close";try{console.log("[ContentScript] Sending PAGE_QUESTION message to background...");let y=null,m="general";try{m=X(),y=M()}catch(E){console.warn("[ContentScript] Failed to extract page state:",E)}const v={url:window.location.href,title:document.title,pageType:m,pageState:y,question:b};console.log("[ContentScript] Message payload:",v),chrome.runtime.sendMessage(K(A.PAGE_QUESTION,v),E=>{console.log("[ContentScript] PAGE_QUESTION response:",E),chrome.runtime.lastError&&console.error("[ContentScript] Error sending message:",chrome.runtime.lastError)})}catch(y){console.error("[ContentScript] Error in submitQuestion:",y)}setTimeout(()=>{p(),_e()},1500)};a.addEventListener("click",p),r.addEventListener("click",l),s.addEventListener("keydown",b=>{b.key==="Enter"?(b.preventDefault(),l()):b.key==="Escape"&&p()}),n.appendChild(s),n.appendChild(r),n.appendChild(a),t.appendChild(o),t.appendChild(n),document.body.appendChild(t),setTimeout(()=>s.focus(),100);const d=setTimeout(()=>{t.parentElement&&p()},3e4);t.addEventListener("click",()=>{clearTimeout(d)})}function _e(){const i=document.querySelector(".elderly-assistant-sidebar-prompt");i&&i.remove();const e=document.createElement("div");e.className="elderly-assistant-sidebar-prompt",e.style.cssText=`
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #FF6B00 0%, #FF8533 100%);
    color: white;
    padding: 20px 28px;
    border-radius: 12px;
    font-size: 16px;
    font-weight: bold;
    z-index: 999999;
    box-shadow: 0 8px 24px rgba(255, 107, 0, 0.4);
    cursor: pointer;
    animation: sidebarPromptPulse 2s infinite;
    transition: transform 0.2s, box-shadow 0.2s;
  `,e.innerHTML=`
    <div style="display: flex; align-items: center; gap: 12px;">
      <span style="font-size: 24px;">📖</span>
      <div>
        <div style="font-size: 16px;">Page Explanation Ready!</div>
        <div style="font-size: 12px; opacity: 0.9; font-weight: normal; margin-top: 4px;">Click to view summary & tips</div>
      </div>
      <span style="font-size: 20px; margin-left: 8px;">→</span>
    </div>
  `,e.addEventListener("mouseenter",()=>{e.style.transform="scale(1.05)",e.style.boxShadow="0 12px 32px rgba(255, 107, 0, 0.6)"}),e.addEventListener("mouseleave",()=>{e.style.transform="scale(1)",e.style.boxShadow="0 8px 24px rgba(255, 107, 0, 0.4)"}),e.addEventListener("click",async()=>{try{await chrome.runtime.sendMessage({type:"OPEN_SIDEBAR"}),e.style.animation="sidebarPromptFadeOut 0.3s ease-out",setTimeout(()=>e.remove(),300)}catch(t){console.error("Failed to open sidebar:",t)}}),document.body.appendChild(e),setTimeout(()=>{e.parentElement&&(e.style.animation="sidebarPromptFadeOut 0.5s ease-out",setTimeout(()=>e.remove(),500))},15e3)}function re(){c.activeHighlights.forEach(i=>i.remove()),c.activeHighlights.clear()}function Ae(i){const e=document.querySelector(".elderly-assistant-task-done-popup");e&&e.remove();const t="elderly-assistant-task-done-styles";if(!document.getElementById(t)){const a=document.createElement("style");a.id=t,a.textContent=`
      @keyframes taskDoneSlideIn {
        0% { opacity: 0; transform: translateX(100%); }
        100% { opacity: 1; transform: translateX(0); }
      }
      @keyframes taskDoneSlideOut {
        0% { opacity: 1; transform: translateX(0); }
        100% { opacity: 0; transform: translateX(100%); }
      }
      @keyframes taskDonePulse {
        0%, 100% { box-shadow: 0 8px 24px rgba(255, 107, 0, 0.4); }
        50% { box-shadow: 0 8px 32px rgba(255, 107, 0, 0.6), 0 0 20px rgba(255, 107, 0, 0.3); }
      }
    `,document.head.appendChild(a)}const o=document.createElement("div");o.className="elderly-assistant-task-done-popup";const n=i.success,s=n?"linear-gradient(135deg, #FF6B00 0%, #FF8533 100%)":"linear-gradient(135deg, #dc2626 0%, #ef4444 100%)",r=n?"✓":"⚠";o.style.cssText=`
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${s};
    color: white;
    padding: 20px 28px;
    border-radius: 12px;
    font-size: 16px;
    font-weight: bold;
    z-index: 999999;
    box-shadow: 0 8px 24px rgba(255, 107, 0, 0.4);
    cursor: pointer;
    animation: taskDoneSlideIn 0.4s ease-out, taskDonePulse 2s infinite 0.4s;
    transition: transform 0.2s, box-shadow 0.2s;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    max-width: 350px;
  `,o.innerHTML=`
    <div style="display: flex; align-items: center; gap: 12px;">
      <span style="font-size: 24px; background: rgba(255,255,255,0.2); padding: 8px; border-radius: 50%;">${r}</span>
      <div style="flex: 1;">
        <div style="font-size: 14px; opacity: 0.9; margin-bottom: 4px;">${n?"Task Complete!":"Attention"}</div>
        <div style="font-size: 15px; font-weight: normal; line-height: 1.4;">${i.message}</div>
      </div>
      <span style="font-size: 20px; opacity: 0.7;">→</span>
    </div>
  `,o.addEventListener("mouseenter",()=>{o.style.transform="scale(1.02)",o.style.boxShadow="0 12px 32px rgba(255, 107, 0, 0.6)"}),o.addEventListener("mouseleave",()=>{o.style.transform="scale(1)",o.style.boxShadow="0 8px 24px rgba(255, 107, 0, 0.4)"}),o.addEventListener("click",async()=>{try{await chrome.runtime.sendMessage({type:"OPEN_SIDEBAR"})}catch(a){console.error("Failed to open sidebar:",a)}o.style.animation="taskDoneSlideOut 0.3s ease-out",setTimeout(()=>o.remove(),300)}),document.body.appendChild(o),setTimeout(()=>{o.parentElement&&(o.style.animation="taskDoneSlideOut 0.5s ease-out",setTimeout(()=>o.remove(),500))},1e4)}function M(){return{url:window.location.href,title:document.title,pageType:X(),visibleInputs:Ie(),visibleButtons:Pe(),visibleLinks:Ne(),visibleErrors:De(),productCards:Le(),formState:ze(),navigation:Be(),pageStructure:Me(),captchaDetected:Re()}}function Le(){var a,p,l,d,b,y;console.log("[DEBUG] detectProductCards called"),console.log("[DEBUG] window.__siteIntegration:",window.__siteIntegration),console.log("[DEBUG] window.__siteIntegrationReady:",window.__siteIntegrationReady);const i=window.location.hostname.toLowerCase(),e=i.includes("amazon"),t=i.includes("ebay"),o=i.includes("walmart");let n=window.__siteIntegration;if((e||t||o)&&!n&&console.log("[DEBUG] On shopping site but integration not ready yet - using fallback detection"),n){if(n.ebay&&typeof n.ebay.detectProductCards=="function")try{console.log("[DEBUG] Using eBay integration");const m=n.ebay.detectProductCards();return console.log("[DEBUG] eBay cards found:",m.length,m),m}catch(m){console.log("[DEBUG] eBay integration error:",m)}if(n.amazon&&typeof n.amazon.detectProductCards=="function")try{console.log("[DEBUG] Using Amazon integration");const m=n.amazon.detectProductCards();return console.log("[DEBUG] Amazon cards found:",m.length,m),m}catch(m){console.log("[DEBUG] Amazon integration error:",m)}if(n.walmart&&typeof n.walmart.detectProductCards=="function")try{console.log("[DEBUG] Using Walmart integration");const m=n.walmart.detectProductCards();return console.log("[DEBUG] Walmart cards found:",m.length,m),m}catch(m){console.log("[DEBUG] Walmart integration error:",m)}}else console.log("[DEBUG] No site integration found, using fallback detection");const s=[],r=document.querySelectorAll('div[data-component-type="s-search-result"], .s-result-item');if(r&&r.length>0)r.forEach(m=>{if(!T(m))return;const v=m,E=v.querySelector("h2 a span, h2 a, .a-size-medium.a-color-base.a-text-normal"),L=v.querySelector(".a-price .a-offscreen"),N=v.querySelector(".a-icon-alt"),F=v.querySelector("h2 a");s.push({selector:q(v)||void 0,title:E?(E.textContent||"").trim():null,price:L?(L.textContent||"").trim():null,rating:N?(N.textContent||"").trim():null,availability:null,link:F?F.href:null,isDetailPage:!1})});else{const m=document.querySelector("#dp, #dp-container, #centerCol");if(m&&T(m)){const v=(((a=document.querySelector("#productTitle"))==null?void 0:a.textContent)||((p=document.querySelector("#title"))==null?void 0:p.textContent)||"").trim(),E=(((l=document.querySelector("#priceblock_ourprice"))==null?void 0:l.textContent)||((d=document.querySelector("#priceblock_dealprice"))==null?void 0:d.textContent)||((b=document.querySelector(".a-offscreen"))==null?void 0:b.textContent)||"").trim(),L=(((y=document.querySelector("#acrPopover .a-icon-alt"))==null?void 0:y.textContent)||"").trim();s.push({selector:q(m),title:v||null,price:E||null,rating:L||null,availability:null,link:window.location.href,isDetailPage:!0})}}return s.slice(0,10)}function Ie(){const i=document.querySelectorAll("input, textarea, select"),e=[];return i.forEach(t=>{if(!T(t))return;const o=O(t);o&&!qe(t)&&e.push(o)}),e.slice(0,20)}function Pe(){const i=document.querySelectorAll('button, [role="button"], input[type="submit"], input[type="button"], input[type="image"], a[class*="btn"], a[class*="button"], div[class*="button"]'),e=[];return i.forEach(t=>{if(!T(t))return;const o=O(t);o&&e.push(o)}),e.slice(0,30)}function Ne(){const i=document.querySelectorAll("a[href]"),e=[];return i.forEach(t=>{if(!T(t)||t.className&&(t.className.includes("btn")||t.className.includes("button")))return;const o=t.href;if(!o||o.startsWith("javascript:")||o==="#")return;const n=O(t);n&&e.push(n)}),e.slice(0,30)}function De(){const i=[];return[".error",".error-message",'[role="alert"]',".validation-error",".form-error",".invalid-feedback"].forEach(t=>{document.querySelectorAll(t).forEach(o=>{var s;const n=(s=o.textContent)==null?void 0:s.trim();n&&T(o)&&i.push({message:n,type:"validation"})})}),i.slice(0,10)}function X(){const i=window.location.href.toLowerCase(),e=document.title.toLowerCase(),t=document.body.innerText.toLowerCase().slice(0,5e3),o=[["banking",["bank","account","balance","transfer"]],["shopping",["cart","checkout","buy","add to cart","shop"]],["booking",["book","reserve","flight","hotel","ticket"]],["login",["login","sign in","log in"]],["checkout",["checkout","payment","billing"]]];for(const[n,s]of o)if(s.some(r=>i.includes(r)||e.includes(r)||t.includes(r)))return n;return"general"}function q(i){if(!i)return null;if(i.id)return`#${i.id}`;if(i.className&&typeof i.className=="string"){const o=i.className.split(" ").filter(Boolean).filter(n=>!n.includes(":")&&!n.includes("[")&&!n.includes("]")&&!n.includes("/")).slice(0,3);if(o.length>0){const n=`.${o.join(".")}`;try{if(document.querySelectorAll(n).length===1)return n}catch{}}}const e=[];let t=i;for(;t&&t!==document.body;){let o=t.tagName.toLowerCase();if(t.id){o=`#${t.id}`,e.unshift(o);break}const n=t.parentElement;if(n){const s=t.tagName,r=Array.from(n.children).filter(a=>a.tagName===s);if(r.length>1){const a=r.indexOf(t)+1;o+=`:nth-of-type(${a})`}}e.unshift(o),t=n}return e.join(" > ")}function O(i){var o;if(!i)return null;const e=i.getBoundingClientRect(),t=q(i);return t?{selector:t,tagName:i.tagName.toLowerCase(),id:i.id||void 0,className:i.className||void 0,text:((o=i.textContent)==null?void 0:o.trim().slice(0,100))||void 0,ariaLabel:i.getAttribute("aria-label")||void 0,ariaRole:i.getAttribute("role")||void 0,placeholder:i.getAttribute("placeholder")||void 0,type:i.getAttribute("type")||void 0,name:i.getAttribute("name")||void 0,href:i.getAttribute("href")||void 0,rect:{top:e.top,left:e.left,right:e.right,bottom:e.bottom,width:e.width,height:e.height},isVisible:T(i),isInteractive:Oe(i)}:null}function T(i){const e=i.getBoundingClientRect(),t=window.getComputedStyle(i);return e.width>0&&e.height>0&&t.display!=="none"&&t.visibility!=="hidden"&&parseFloat(t.opacity)>0}function Oe(i){const e=["A","BUTTON","INPUT","SELECT","TEXTAREA"],t=i.getAttribute("role"),o=["button","link","checkbox","radio","textbox"];return e.includes(i.tagName)||t!==null&&o.includes(t)||i.getAttribute("tabindex")!==null||i.getAttribute("onclick")!==null}function qe(i){const e=[i.id,i.className,i.getAttribute("name"),i.getAttribute("type"),i.getAttribute("autocomplete")].filter(Boolean).join(" ").toLowerCase();return ue.some(t=>e.includes(t))}function se(i){return de.some(e=>i.includes(e))}function Fe(i){return typeof i=="object"&&i!==null&&"type"in i&&typeof i.type=="string"}function ze(){const i=document.querySelectorAll("form");if(i.length!==0)for(const e of i){if(!T(e))continue;const t=e.querySelectorAll("input, textarea, select"),o=[],n=[],s=[],r=[];t.forEach(l=>{if(!T(l))return;const d=q(l)||"",b=l.hasAttribute("required")||l.getAttribute("aria-required")==="true",m=(l.value||"").trim()!=="";b&&(o.push({selector:d,name:l.getAttribute("name")||void 0,type:l.getAttribute("type")||void 0,label:He(l)||void 0,placeholder:l.getAttribute("placeholder")||void 0,isRequired:!0,isFilled:m}),m||s.push(d)),m&&n.push(d);const v=l.getAttribute("type"),E=l.getAttribute("pattern"),L=l.getAttribute("minlength"),N=l.getAttribute("maxlength");v==="email"?r.push({fieldSelector:d,rule:"email"}):v==="tel"||v==="phone"?r.push({fieldSelector:d,rule:"phone"}):v==="number"&&r.push({fieldSelector:d,rule:"number"}),E&&r.push({fieldSelector:d,rule:"pattern",pattern:E}),L&&r.push({fieldSelector:d,rule:"minLength",minLength:parseInt(L,10)}),N&&r.push({fieldSelector:d,rule:"maxLength",maxLength:parseInt(N,10)}),b&&r.push({fieldSelector:d,rule:"required"})});const a=e.querySelector('[type="submit"], button[type="submit"], button:not([type])');let p;return a&&T(a)&&(p=O(a)),{formId:e.id||void 0,formAction:e.getAttribute("action")||void 0,filledFields:n,emptyRequiredFields:s,invalidFields:[],submitButton:p,requiredFields:o,validationRules:r.length>0?r:void 0}}}function He(i){var s,r,a;const e=i.getAttribute("aria-label");if(e)return e;const t=i.id;if(t){const p=document.querySelector(`label[for="${t}"]`);if(p)return((s=p.textContent)==null?void 0:s.trim())||null}const o=i.closest("label");if(o)return((r=o.textContent)==null?void 0:r.trim())||null;let n=i.previousElementSibling;for(;n;){if(n.tagName==="LABEL")return((a=n.textContent)==null?void 0:a.trim())||null;n=n.previousElementSibling}return null}function Be(){const i=document.querySelector('[aria-label*="breadcrumb" i], .breadcrumb, .breadcrumbs, nav[class*="breadcrumb" i]');let e;if(i){const r=i.querySelectorAll("a, span");e=Array.from(r).map(a=>{var p;return((p=a.textContent)==null?void 0:p.trim())||""}).filter(Boolean).slice(0,10)}const o=document.body.innerText.match(/step\s+(\d+)\s+of\s+(\d+)/i);let n,s;return o&&(n=parseInt(o[1],10),s=parseInt(o[2],10)),{canGoBack:window.history.length>1,canGoForward:!1,breadcrumbs:e&&e.length>0?e:void 0,currentStep:n,totalSteps:s}}function Me(){var p,l;const i=[],e=[];for(let d=1;d<=6;d++)document.querySelectorAll(`h${d}`).forEach(y=>{var v;if(!T(y))return;const m=((v=y.textContent)==null?void 0:v.trim())||"";m.length>0&&m.length<200&&i.push({level:d,text:m,selector:q(y)||`h${d}`})});["header","nav","main","aside","footer","section","article"].forEach(d=>{document.querySelectorAll(d).forEach(y=>{var E;if(!T(y))return;const m=((E=y.textContent)==null?void 0:E.trim())||"",v=m.substring(0,200)+(m.length>200?"...":"");v&&e.push({id:y.id||void 0,ariaLabel:y.getAttribute("aria-label")||void 0,type:d,summary:v})})});const o=document.querySelector('meta[name="description"]'),n=document.querySelector('meta[name="keywords"]'),s={description:(o==null?void 0:o.getAttribute("content"))||void 0,keywords:((p=n==null?void 0:n.getAttribute("content"))==null?void 0:p.split(",").map(d=>d.trim()))||void 0};let r;const a=document.querySelector('main, [role="main"], #main, #content, .main-content');if(a&&T(a)){const d=((l=a.textContent)==null?void 0:l.trim())||"";r=d.substring(0,500)+(d.length>500?"...":"")}return{headings:i.slice(0,20),sections:e.slice(0,10),mainContent:r,meta:s.description||s.keywords?s:void 0}}function Re(){if(document.querySelector('iframe[src*="recaptcha"], .g-recaptcha, #recaptcha')||document.querySelector('iframe[src*="hcaptcha"], .h-captcha'))return!0;const i=document.body.innerText.toLowerCase();return!!(i.includes("verify you're human")||i.includes("verify you are human")||i.includes("prove you're not a robot")||i.includes("captcha")||document.querySelector("#challenge-form, .cf-browser-verification"))}function Ue(i){if(!i)return!1;const e=i.getBoundingClientRect();return!(e.width===0||e.height===0||window.getComputedStyle(i).visibility==="hidden")}function ie(){const i=document.createElement("style");i.textContent=`
    @keyframes elderly-assistant-pulse {
      0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(255, 107, 0, 0.4); }
      50% { opacity: 0.8; box-shadow: 0 0 0 10px rgba(255, 107, 0, 0); }
    }
    @keyframes elderly-assistant-bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    @keyframes sidebarPromptPulse {
      0%, 100% { box-shadow: 0 8px 24px rgba(255, 107, 0, 0.4); }
      50% { box-shadow: 0 8px 32px rgba(255, 107, 0, 0.6); }
    }
    @keyframes sidebarPromptFadeOut {
      0% { opacity: 1; transform: translateX(0); }
      100% { opacity: 0; transform: translateX(20px); }
    }
  `,document.head.appendChild(i)}function Ge(){console.log("[ContentScript] Script executing..."),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{ie(),te(),console.log("[ContentScript] Initialized (DOMContentLoaded)")}):(ie(),te(),console.log("[ContentScript] Initialized (Immediate)"))}Ge();export{Ge as onExecute};
