Kind of an async version of prompt, but with a lot more features.

# Usage

```js
let prompt2 = await import("https://cdn.jsdelivr.net/gh/josephrocca/prompt2@v0.0.4/mod.js");

let results = await prompt2({
  foo: {type:"textLine", defaultValue:"123", placeholder:"Some placeholder text"},
  bar: {type:"text", defaultValue:"123\babc"},
  baz: {type:"select", options:[{content:"abc", value:"123"}, {content:"xyz", value:"987"}]},
});

console.log(result.foo);
console.log(result.bar);
console.log(result.baz);
```
