export default async function prompt2(message, opts) {
  let ctn = document.createElement("div");
  let type = opts.type;
  let input;
  if(type == "select") {
    input = `<select style="width:100%;height:100%;background:white;color:inherit;font:inherit;box-sizing:border-box;">${opts.options.map(o => `<option value="${o.value}">${o.content}</option>`).join("")}</select>`;
  } else if(type == "buttons") {
    input = opts.buttons.map(o => `<button style="height:100%;margin-right:0.5rem;font:inherit;box-sizing:border-box;" data-value="${o.value}">${o.content}</button>`).join("");
  } else {
    input = `<input style="width:100%;height:100%;background:white;color:inherit;font:inherit;box-sizing:border-box;" type="${opts.type}">`;
  }
  ctn.innerHTML = `
    <div style="background:rgba(0,0,0,0.2); position:fixed; top:0; left:0; right:0; bottom:0; z-index:9999999; display:flex; justify-content:center; color:black; font-family: sans-serif;">
      <div style="width:400px; background:white; height: min-content; padding:1rem; border:1px solid #eaeaea; border-radius:3px; box-shadow: 0px 1px 10px 3px rgba(0,0,0,0.24); margin-top:0.5rem;">
        <div style="opacity:0.6;">${window.location.hostname} says:</div>
        <div style="margin:1rem 0;">${message}</div>
        <div style="display:flex; height:2.3rem;">
          <div style="flex-grow:1; padding-right:0.5rem;">${input}</div>
          ${type !== "buttons" ? `<button style="font:inherit;box-sizing:border-box;">Submit</button>` : ""}
        </div>
      </div>
    </div>
  `;
   document.body.appendChild(ctn);
   let value = await new Promise((resolve) => {
    if(type !== "buttons") {
      ctn.querySelector("button").onclick = () => {
        if(type == "file") {
          resolve(ctn.querySelector("input").files);
        } else {
          resolve(ctn.querySelector("input,select").value);
        }
      }
     } else {
        ctn.querySelectorAll("button").forEach(b => {
          b.onclick = () => resolve(b.dataset.value);
        });
     }
   });
   ctn.remove();
   return value;
}
