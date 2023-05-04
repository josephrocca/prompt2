export default async function prompt2(specs, opts={}) {

  if(!opts.backgroundColor) opts.backgroundColor = prompt2.defaults.backgroundColor ?? (getComputedStyle(document.body).getPropertyValue('background-color')==="rgba(0, 0, 0, 0)" ? "#e8e8e8" : getComputedStyle(document.body).getPropertyValue('background-color'));
  if(!opts.borderColor) opts.borderColor = prompt2.defaults.borderColor ?? "#eaeaea";
  if(!opts.borderRadius) opts.borderRadius = prompt2.defaults.borderRadius ?? "3px";

  let ctn = document.createElement("div");
  let sections = "";
  let structuredSectionsI = 0;
  let i = 0;
  for(let [key, spec] of Object.entries(specs)) {
    if(spec.type == "select") {
      sections += `
        <section class="structuredInputSection" data-is-hidden-extra="${spec.hidden === true ? "yes" : "no"}" style="${spec.hidden === true ? "display:none" : ""};">
          <div class="sectionLabel" style="${structuredSectionsI === 0 ? "margin-top:0;" : ""}">${spec.label}${spec.infoTooltip ? ` <span title="${sanitizeHtml(spec.infoTooltip)}" style="cursor:pointer;" onclick="alert(this.title)">ℹ️</span>` : ""}</div>
          <div style="display:flex;">
            <div style="flex-grow:1;">
              <select data-spec-key="${sanitizeHtml(key)}" value="${sanitizeHtml(spec.defaultValue)}" ${spec.disabled === true ? "disabled" : ""} style="width:100%;height:100%; padding:0.25rem;">${spec.options.map(o => `<option value="${sanitizeHtml(o.value)}" ${o.value === spec.defaultValue ? "selected" :""}>${sanitizeHtml(o.content) || sanitizeHtml(o.value)}</option>`).join("")}</select>
            </div>
          </div>
        </section>`;
      structuredSectionsI++;
    } else if(spec.type == "textLine") {
      sections += `
        <section class="structuredInputSection" data-is-hidden-extra="${spec.hidden === true ? "yes" : "no"}" style="${spec.hidden === true ? "display:none" : ""};">
          <div class="sectionLabel" style="${structuredSectionsI === 0 ? "margin-top:0;" : ""}">${spec.label}${spec.infoTooltip ? ` <span title="${sanitizeHtml(spec.infoTooltip)}" style="cursor:pointer;" onclick="alert(this.title)">ℹ️</span>` : ""}</div>
          <div style="display:flex;">
            <div style="flex-grow:1;">
              <input data-initial-focus="${spec.focus === true ? "yes" : "no"}" data-spec-key="${sanitizeHtml(key)}" ${spec.disabled === true ? "disabled" : ""} value="${sanitizeHtml(spec.defaultValue)}" style="width:100%;height:100%; border: 1px solid lightgrey; border-radius: 3px; padding: 0.25rem;" type="text" placeholder="${sanitizeHtml(spec.placeholder)}" ${spec.validationPattern ? `pattern="${sanitizeHtml(spec.validationPattern)}"` : ""}>
            </div>
          </div>
        </section>`;
      structuredSectionsI++;
    } else if(spec.type == "text") {
      sections += `
        <section class="structuredInputSection" data-is-hidden-extra="${spec.hidden === true ? "yes" : "no"}" style="${spec.hidden === true ? "display:none" : ""};">
          <div class="sectionLabel" style="${structuredSectionsI === 0 ? "margin-top:0;" : ""}">${spec.label}${spec.infoTooltip ? ` <span title="${sanitizeHtml(spec.infoTooltip)}" style="cursor:pointer;" onclick="alert(this.title)">ℹ️</span>` : ""}</div>
          <div style="display:flex;">
            <div style="flex-grow:1;">
              <textarea data-initial-focus="${spec.focus === true ? "yes" : "no"}" data-spec-key="${sanitizeHtml(key)}" ${spec.height === "fit-content" ? `data-height="fit-content"` : ``} ${spec.disabled === true ? "disabled" : ""} style="width:100%; ${spec.height === "fit-content" ? "" : `height:${sanitizeHtml(spec.height)}`}; min-height:${spec.minHeight ?? "4rem"}; max-height:${spec.maxHeight ?? "50vh"}; border: 1px solid lightgrey; border-radius: 3px; padding:0.25rem; ${spec.cssText || ""};" type="text" placeholder="${sanitizeHtml(spec.placeholder)}">${sanitizeHtml(spec.defaultValue)}</textarea>
            </div>
          </div>
        </section>`;
      structuredSectionsI++;
    } else if(spec.type == "buttons") {
      sections += `
        <section data-spec-key="${sanitizeHtml(key)}" class="structuredInputSection" data-is-hidden-extra="${spec.hidden === true ? "yes" : "no"}" style="${spec.hidden === true ? "display:none" : ""};">
          <div class="sectionLabel" style="${structuredSectionsI === 0 ? "margin-top:0;" : ""}">${spec.label ?? ""}${spec.infoTooltip ? ` <span title="${sanitizeHtml(spec.infoTooltip)}" style="cursor:pointer;" onclick="alert(this.title)">ℹ️</span>` : ""}</div>
          <div style="display:flex;">
            <div style="flex-grow:1;">
              ${spec.buttons.map(b => `<button ${b.disabled === true ? "disabled" : ""} style="width:100%; border: 1px solid lightgrey; border-radius: 3px; padding:0.25rem; ${b.cssText || ""};">${b.text}</button>`).join(" ")}
            </div>
          </div>
        </section>`;
      structuredSectionsI++;
    } else if(spec.type == "none") {
      sections += `
        <section data-spec-key="${sanitizeHtml(key)}" data-is-hidden-extra="${spec.hidden === true ? "yes" : "no"}" data-requires-element-insert="${typeof spec.html === "string" ? "no" : "yes"}" style="${spec.hidden === true ? "display:none" : ""};">
          ${typeof spec.html === "string" ? spec.html : ""}
        </section>`;
    }
    i++;
  }
  ctn.innerHTML = `
    <div class="promptModalInnerContainer" style="background:rgba(0,0,0,0.2); position:fixed; top:0; left:0; right:0; bottom:0; z-index:9999999; display:flex; justify-content:center; color:inherit; font:inherit; padding:0.5rem;">
      <div style="width:600px; background:${sanitizeHtml(opts.backgroundColor)}; height: min-content; padding:1rem; border:1px solid ${opts.borderColor}; border-radius:${opts.borderRadius}; box-shadow: 0px 1px 10px 3px rgb(130 130 130 / 24%); max-height: calc(100% - 1rem);display: flex; flex-direction: column;">
        <div class="sectionsContainer" style="overflow:auto;">
          ${sections}
          ${Object.values(specs).find(s => s.hidden === true) ? `
          <div style="text-align:center; margin-top:1rem; display:flex; justify-content:center;">
            <button class="showHidden" style="padding: 0.25rem;">${opts.showHiddenInputsText || "Show hidden inputs"}</button>
          </div>
          ` : ""}
        </div>
        <div style="text-align:center; margin-top:1rem; ${opts.cancelButtonText === null ? "" : `display:flex; justify-content:space-between;`}">
          ${opts.cancelButtonText === null ? "" : `<button class="cancel" style="padding: 0.25rem;">${opts.cancelButtonText ?? "cancel"}</button>`}
          <button class="submit" style="padding: 0.25rem;">${opts.submitButtonText || "submit"}</button>
        </div>
      </div>
      <style>
        .promptModalInnerContainer .sectionsContainer > section .sectionLabel {
          margin:0.125rem 0;
          margin-top: 1rem;
          font-size:85%;
        }
        .promptModalInnerContainer .sectionsContainer input:invalid {
          background-color: lightpink;
        }
        .promptModalInnerContainer .sectionsContainer {
          -ms-overflow-style: none;  /* Internet Explorer 10+ */
          scrollbar-width: none;  /* Firefox */
        }
        .promptModalInnerContainer .sectionsContainer::-webkit-scrollbar { 
          display: none;  /* Safari and Chrome */
        }
        .promptModalInnerContainer .sectionsContainer.scrollFade {
          padding-bottom: 30px;
          -webkit-mask-image: linear-gradient(to bottom, black calc(100% - 30px), #ffffff00 100%);
          mask-image: linear-gradient(to bottom, black calc(100% - 30px), #ffffff00 100%);
        }
        .promptModalInnerContainer * {
          box-sizing: border-box;
        }
      </style>
    </div>
  `;
  document.body.appendChild(ctn);
  
  function updateFitHeights() { // settimeout to ensure rendered
    ctn.querySelectorAll("textarea[data-height=fit-content]").forEach(el => {
      let minHeight = el.offsetHeight; // textareas will always have min-height set, so we can use that via offsetHeight
      el.style.height = Math.max(minHeight, (el.scrollHeight+10)) + "px";
    });
  }

  setTimeout(updateFitHeights, 5);

  if(ctn.querySelector("button.showHidden")) {
    ctn.querySelector("button.showHidden").onclick = () => {
      ctn.querySelectorAll('.sectionsContainer [data-is-hidden-extra=yes]').forEach(el => {
        el.style.display='';
        el.dataset.isHiddenExtra = "no";
      });
      ctn.querySelector("button.showHidden").remove();
      updateFitHeights();
      updateInputVisibilies();
    };
  }

  // insert non-string HTML elements for type==html specs
  let elementObjects = Object.values(specs).filter(s => s.html && typeof s.html !== "string").map(s => s.html);
  ctn.querySelectorAll('.sectionsContainer [data-requires-element-insert=yes]').forEach((el, i) => {
    el.append(elementObjects[i]);
  });

  // add onclick handlers for type==button specs
  let buttonSpecKeys = Object.entries(specs).filter(([key, spec]) => spec.type === "buttons").map(([key, spec]) => key);
  for(let key of buttonSpecKeys) {
    ctn.querySelectorAll(`.sectionsContainer [data-spec-key=${key}]`).forEach(el => {
      let buttonEls = [...el.querySelectorAll("button")];
      for(let i = 0; i < buttonEls.length; i++) {
        buttonEls[i].onclick = specs[key].buttons[i].onClick;
      }
    });
  }

  setTimeout(() => {
    // add scrollFade if sectionsContainer has scroll
    let sectionsContainerEl = ctn.querySelector(".promptModalInnerContainer .sectionsContainer");
    if(sectionsContainerEl.scrollHeight > sectionsContainerEl.offsetHeight) {
      sectionsContainerEl.classList.add("scrollFade");
    }
    // focus
    let focusEl = ctn.querySelector(".promptModalInnerContainer .sectionsContainer [data-initial-focus=yes]");
    if(focusEl) {
      focusEl.focus();
      focusEl.selectionStart = focusEl.value.length;
    }
  }, 5);

  // a spec can have a `show` function which determines whether it's shown based on the values of the other inputs
  function updateInputVisibilies() {
    const values = getAllValues();
    for(const el of [...ctn.querySelectorAll("[data-spec-key]")]) {
      const showFn = specs[el.dataset.specKey].show;
      if(!showFn) continue;
      if(showFn(values)) {
        el.closest('section').style.display = "";
      } else {
        el.closest('section').style.display = "none";
      }

      // the "show advanced" hidden-ness overrides the show() function
      if(el.closest("section").dataset.isHiddenExtra === "yes") {
        el.closest("section").style.display = "none";
      }
    }
  }
  updateInputVisibilies();
  for(const el of [...ctn.querySelectorAll("[data-spec-key]")]) {
    el.addEventListener("input", updateInputVisibilies);
  }

  if(opts.controls) {
    // add a proxy to the controls object so that we can read and write spec values from the outside
    opts.controls.data = new Proxy({}, {
      set: function(obj, prop, value) {
        let el = ctn.querySelector(`[data-spec-key=${prop}]`);
        if(!el) return true;
        el.value = value;
        updateInputVisibilies();
        return true;
      },
      get: function(obj, prop) {
        let el = ctn.querySelector(`[data-spec-key=${prop}]`);
        if(!el) return undefined;
        return el.value;
      }
    });
  }

  function getAllValues() {
    let values = {};
    for(let el of [...ctn.querySelectorAll("[data-spec-key]")]) {
      if(el.tagName === "INPUT") {
        if(el.type == "file") {
          values[el.dataset.specKey] = el.files;
        } else {
          values[el.dataset.specKey] = el.value;
        }
      } else if(el.tagName === "TEXTAREA") {
        values[el.dataset.specKey] = el.value;
      } else if(el.tagName === "SELECT") {
        values[el.dataset.specKey] = el.value;
      }
    }
    return values;
  }

  let values = await new Promise((resolve) => {
    ctn.querySelector("button.submit").onclick = () => {
      let values = getAllValues();
      resolve(values);
    };
    if(ctn.querySelector("button.cancel")) {
      ctn.querySelector("button.cancel").onclick = () => {
        resolve(null);
      };
    }
  });
  ctn.remove();
  return values;
}
prompt2.defaults = {};

function sanitizeHtml(text) {
  if(text === undefined) text = "";
  text = text+"";
  return text.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
