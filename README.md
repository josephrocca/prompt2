Kind of an async version of prompt, but with a lot more features.

# Usage

```js
let prompt2 = await import("https://cdn.jsdelivr.net/gh/josephrocca/prompt2@v0.0.4/mod.js");

let results = await prompt2({
  foo: {label:"Enter a value for foo", type:"textLine", defaultValue:"123", placeholder:"Some placeholder text"}, // single line of text
  bar: {label: "Write a value for bar in this textarea", type:"text", defaultValue:"123\nabc"}, // multi-line text (textarea)
  baz: {label: "Select a value", type:"select", options:[{content:"abc", value:"123"}, {content:"xyz", value:"987"}]},
  xyz: {show:d=>d.baz==="987", ...}, // only show this input if baz is set to 987
  hello: {hidden:true, ...}, // this is not shown by default - user must click "show hidden inputs" button to show it
  world: {infoTooltip:"You can put some longer explanation text here to supplement the `label`", ...},
  uhh: {type:"text", minHeight:"20vh", height:"fit-content", max-height:"30vh", cssText:"white-space:pre;"},
});

console.log(result.foo);
console.log(result.bar);
console.log(result.baz);
...
```

You can pass an options object as the second parameter to `prompt2`:
```json5
{
  showHiddenInputsText: "show advanced settings", // default is "Show hidden inputs"
  submitButtonText: "save", // default is "submit"
  cancelButtonText: "back", // default is "cancel"
  backgroundColor,
  borderRadius,
  borderColor,
}
```
