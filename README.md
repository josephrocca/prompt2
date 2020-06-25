A rough sketch of an async version of window.prompt that has a bunch of different input types (date, &lt;select>, color, file, etc).

https://discourse.wicg.io/t/proposal-extension-of-window-prompt-to-allow-other-types-of-common-inputs-select-date-color-password-range-file/4596

# Usage

```js
let name = await prompt2("Please type your name:", {type:"text"});
let pw = await prompt2("Please type your password:", {type:"password"});
let date = await prompt2("Please choose a date:", {type:"date"});
let files = await prompt2("Please choose a file:", {type:"file"});
let choice = await prompt2("Please choose an option:", {type:"select", options:[{content:"Thing 1", value:"1"}, {content:"Thing 2", value:"2"}]});
let choice = await prompt2("Please choose an option:", {type:"buttons", options:[{content:"Thing 1", value:"1"}, {content:"Thing 2", value:"2"}]});
```

# Demo

```js
(async function() {
  window.prompt2 = await import("https://deno.land/x/gh:josephrocca:prompt2@v0.0.2/mod.js").then(m => m.default);
  let date = await prompt2("Please choose a date:", {type:"date"});
})();
```

https://jsbin.com/qanojepapa/1/edit?html,output

![example](https://i.imgur.com/sa2qve2.png)
