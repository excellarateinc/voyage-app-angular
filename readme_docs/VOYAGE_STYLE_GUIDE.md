## Voyage Style Guide
This guide represents coding styles used when writing ES2017+ and TypeScript, specifically when working with Angular 5+.  This guide takes heavily from AirBnb's ES Style Guide, but with some parts removed or modified, generally when they conflicted with the Official Angular Style Guide, which takes priority.  

Wherever possible these best practices are enforced with ESLint.  Violations that are likely to result in bugs are marked as **errors**, and code style / consistency violations are marked as **warnings**.

## References
* [AirBnb ES6 Style Guide](https://github.com/airbnb/javascript/blob/master/README.md#table-of-contents)
* [MDN JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
* [Microsoft TypeScript Coding Guidelines](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines)

## Table of Contents
* [TypeScript Specific Guidelines](#typescript-specific-guidelines)
  * [Always provide a type if it can't be inferred](#always-provide-a-type-if-it-cant-be-inferred)
  * [Avoid ```any```, declare types wherever possible](#avoid-any-declare-types-wherever-possible)
  * [Use shorthand when defining arrays](#use-shorthand-when-defining-arrays)
  * [Don't preface private properties with an underscore unless the conflict with getters/setter](#dont-preface-private-properties)
  * [Don't preface interfaces with I](#dont-preface-interfaces)
  * [One file per component](#one-file-per-component)
  * [Always omit ```public``` keyword](#always-omit-public-keyword)
* [Variables](#variables)
  * [Prefer ```const```](#prefer-const)
  * [Use ```let``` instead of ```var```](#use-let-instead-of-var)
  * [Use one `const` or `let` declaration per variable](#use-one-const-or-let-declaration-per-variable)
  * [Group all your `const`s and then group all your `let`s](#group-all-your-consts-and-then-group-all-your-lets)
  * [Assign variables where you need them, but place them in a reasonable place](#assign-variables-where-you-need-them-but-place-them-in-a-reasonable-place)
  * [Don't chain variable assignments](#dont-chain-variable-assignments)
* [Objects](#objects)
  * [Use the literal syntax for object creation](#use-the-literal-syntax-for-object-creation)
  * [Use computed property names when creating objects with dynamic property names](#use-computed-property-names-when-creating-objects-with-dynamic-property-names)
  * [Use object method shorthand](#use-object-method-shorthand)
  * [Use property value shorthand](#use-property-value-shorthand)
  * [Group shorthand properties at the beginning](#group-shorthand-properties-at-the-beginning)
  * [Only quote invalid identifiers](#only-quote-invalid-identifiers)
  * [Do not call `Object.prototype` methods directly](#do-not-call-objectprototype-methods-directly)
  * [Prefer the object spread operator over `Object.assign`](#prefer-the-object-spread-operator-over-objectassign)
* [Arrays](#arrays)
  * [Use the literal syntax for creation](#use-the-literal-syntax-for-creation)
  * [Use push instead of direct assignment to add items](#use-push-instead-of-direct-assignment-to-add-items)
  * [Use array spreads `...` to copy arrays](#use-array-spreads-to-copy-arrays)
  * [Use Array.from to convert an array-like object to an array](#use-arrayfrom-to-convert-an-array-like-object-to-an-array)
  * [Use return statements in multi-line array method callbacks](#use-return-statements-in-multi-line-array-method-callbacks)
* [Destructuring](#destructuring)
  * [Use object destructuring when accessing multiple properties](#use-object-destructuring-when-accessing-multiple-properties)
  * [Use array destructuring](#use-array-destructuring)
  * [Use object destructuring for multiple return values](#use-object-destructuring-for-multiple-return-values)
* [Strings](#strings)
  *  [Use single quotes `''`](#use-single-quotes)
  *  [Avoid concatenating long strings](#avoid-concatenating-long-strings)
  *  [Use template strings instead of concatenation](#use-template-strings-instead-of-concatenation)
  *  [Never use `eval()` on a string](#never-use-eval-on-a-string)
  *  [Do not unnecessarily escape characters](#do-not-unnecessarily-escape-characters)
* [Functions](#functions)
  * [Wrap immediately invoked function expressions in parentheses](#wrap-immediately-invoked-function-expressions-in-parentheses)
  * [Never declare a function in a non-function block](#never-declare-a-function-in-a-non-function-block)
  * [Never name a parameter `arguments'](#never-name-a-parameter-arguments)
  * [Never use `arguments`, use rest syntax `...` instead](#never-use-arguments-use-rest-syntax-instead)
  * [Use default parameter syntax](#use-default-parameter-syntax)
  * [Avoid side effects with default parameters](#avoid-side-effects-with-default-parameters)
  * [Put default parameters last](#put-default-parameters-last)
  * [Never use the Function constructor](#never-use-the-function-constructor)
  * [Use consistent spacing in signiature](#use-consistent-spacing-in-signiature)
  * [Never mutate parameters](#never-mutate-parameters)
  * [Never reassign parameters](#never-reassign-parameters)
  * [Prefer spread operator `...` to call variadic functions](#prefer-spread-operator-to-call-variadic-functions)
* [Arrow Functions](#arrow-functions)
  * [Use arrow functions for simple function expressions](#use-arrow-functions-for-simple-function-expressions)
  * [Omit braces and use implicit return for single line functions](#omit-braces-and-use-implicit-return-for-single-line-functions)
  * [Omit the parentheses for single argument](#omit-the-parentheses-for-single-argument)
  * [Avoid arrow function syntax (`=>`) with comparison operators (`<=`, `>=`)](#avoid-arrow-function-syntax-with-comparison-operators)
  * [When passing callbacks don't wrap direct function calls](#when-passing-callbacks-dont-wrap-direct-function-calls)
* [Iterators and Generators](#iterators-and-generators)
  * [Don't use iterators](#dont-use-iterators)
  * [If you must use generators, use proper spacing](#if-you-must-use-generators-use-proper-spacing)
* [Properties](#properties)
  * [Use dot notation](#use-dot-notation)
  * [Use brackets `[]` when accessing properties with a variable](#use-brackets-when-accessing-properties-with-a-variable)
* [Comparison Operators & Equality](#comparison-operators-equality)
  * [Use `===` and `!==` over `==` and `!=`](#use--and--over--and-)
  * [Truthiness](#truthiness)
  * [Use shortcuts for booleans, but explicit comparisons for strings and numbers](#use-shortcuts-for-booleans-but-explicit-comparisons-for-strings-and-numbers)
  * [Use braces to create blocks in `case` and `default` clauses that contain lexical declarations](#use-braces-to-create-blocks-in-case-and-default-clauses-that-contain-lexical-declarations)
  * [Ternaries should not be nested and generally be single line expressions](#ternaries-should-not-be-nested-and-generally-be-single-line-expressions)
  * [Avoid unneeded ternary statements](#avoid-unneeded-ternary-statements)
* [Blocks](#blocks)
  * [Use braces with all multi-line blocks](#use-braces-with-all-multi-line-blocks)
  * [Put `else` on the same line as your `if` block's closing brace](#put-else-on-the-same-line-as-your-if-blocks-closing-brace)
* [Comments](#comments)
  * [Use `/** ... */` for multi-line comments](#use-for-multi-line-comments)  
  * [Use `//` for single line comments](#use-for-single-line-comments)
  * [Start all comments with a space](#start-all-comments-with-a-space)
  * [Use FIXME and TODO correctly](#use-fixme-and-todo-correctly)
* [Whitespace](#whitespace)
  * [Use soft tabs set to 2 spaces](#use-soft-tabs-set-to-2-spaces)
  * [Place 1 space before the leading brace](#place-1-space-before-the-leading-brace)
  * [Place 1 space before the opening parenthesis in control statements](#place-1-space-before-the-opening-parenthesis-in-control-statements)
  * [Set off operators with spaces](#set-off-operators-with-spaces)
  * [End files with a single newline character](#end-files-with-a-single-newline-character)
  * [Use indentation when making long method chains](#use-indentation-when-making-long-method-chains)
  * [Leave a blank line after blocks and before the next statement](#leave-a-blank-line-after-blocks-and-before-the-next-statement)
  * [Use indentation when making long method chains](#use-indentation-when-making-long-method-chains)
  * [Leave a blank line after blocks and before the next statement](#leave-a-blank-line-after-blocks-and-before-the-next-statement)
  * [Do not pad your blocks with blank lines](#do-not-pad-your-blocks-with-blank-lines)
  * [Do not add spaces inside parentheses](#do-not-add-spaces-inside-parentheses)
  * [Do not add spaces inside brackets](#do-not-add-spaces-inside-brackets)
  * [Add spaces inside curly braces](#add-spaces-inside-curly-braces)
  * [Avoid having lines of code that are longer than 100 characters](#avoid-having-lines-of-code-that-are-longer-than-100-characters)
* [Commas](#commas)
  * [Leading commas: **Nope.**](#leading-commas-nope)
  * [Additional trailing comma: Yup.](#additional-trailing-comma-yup)
* [Semicolons](#semicolons)
  * [Yup.](#yup)
* [Type Casting & Coercion](#type-casting-coercion)
  * [Perform type coercion at the beginning of the statement](#perform-type-coercion-at-the-beginning-of-the-statement)
* [Naming Conventions](#naming-conventions)
  * [**NEVER** single letter names. **BE DESCRIPTIVE**](#never-single-letter-names-be-descriptive)
  * [Use camelCase when naming objects, functions, and instances](#use-camelcase-when-naming-objects-functions-and-instances)
  * [Do not use trailing or leading underscores](#do-not-use-trailing-or-leading-underscores)
  * [Acronyms should always be all capitalized, or all lowercased](#acronyms-should-always-be-all-capitalized-or-all-lowercased)
* [Asynchronous](#asynchronous)
  * [Prefer promises for basic http calls](#prefer-promises-for-basic-http-calls)
  * [Prefer async await over promise chaining](#prefer-async-await-over-promise-chaining)
  
## Typescript Specific Guidelines
#### Always provide a type if it can't be inferred
>Why? Declaring types allows TypeScript to catch possible bugs, and provides a more explicit interface to other developers using your code

```typescript
// bad
let myArray;

// bad
const myArray = [];

// good
const myArray: string[] = [];

// good, type isn't needed as it can be inferred by the value the variable is initialized to
const isGood = true;
```

#### Avoid ```any```, declare types wherever possible
>Why? See previous rule, ```any``` does not enforce any typing

Remember you can always define an inline type for simple objects with only one or two properties. Create a class or interface for more complex objects.

```typescript
// bad
const myObj: any = { property: '' };

// good
const myObj: MyObject = { property: '' }

// good, object type is simple enough for just an inline type literal
const myObj: { property: string } = { property: ''};
```

#### Don't preface private properties
>Why? The TypeScript compiler will catch access violations automatically, and IDE integration and class definitions let developers know when a property is private. The underscore is not needed.

The exception to this rule is if you want a getter and a setter with the same name

```typescript
// bad
class MyClass {
  private _myName
}

// good
class MyClass {
  private myName;
}

// good, our private property has getters and setters with the same name
class MyClass {
  private _myName;
  
  get myName() {
    return this._myName;
  }
  
  set myName(newName) {
    this._myName = newName;
  }
}
```

#### Don't preface interfaces
>Why? Consistency, we don't use Hungarian Notation anywhere else, we don't put 'C' in front of classes or 'A' in front of abstract classes.

>Why? Encourages better naming

[See this thorough StackOverflow explanation](https://stackoverflow.com/questions/31876947/confused-about-the-interface-and-class-coding-guidelines-for-typescript/41967120#41967120)

```typescript
// bad
interface ISubaru {
  centerDifferential;
  frontDifferential;
  rearDifferential;
  clutch;
  fiveSpeedGearbox;
}

class Subaru implements ISubaru {
  
}

// good
interface ManualTransmission {
  fiveSpeedGearbox;
  clutch;
}

interface AllWheelDrive {
  centerDifferential;
  frontDifferential;
  rearDifferential;
}

class Subaru implements ManualTransmission, AllWheelDrive {
  
}
```

#### One file per component
>Why? Makes all class/interface definitions easy to find and reuse.

If you need very simple types remember you can declare them inline `const myObj: { property: string } = { property: ''};`. For anything with more than two properties create a new file to hold the class/interface.

#### Always omit ```public``` keyword
>Why? Properties and methods are public by default, just as properties and methods are in vanilla JavaScript. Easier to differentiate between public and private

```typescript
// bad
class MyClass {
  public firstName;
  public lastName;
  private ssn;
  
  public getFullName() {
    return `${firstName} ${lastName}`
  }
}

// good
class MyClass {
  firstName;
  lastName;
  private ssn;
  
  getFullName() {
    return `${firstName} ${lastName}`
  }
}
```

## Variables
#### Prefer ```const```

>Why?  Ensures you cannot reassign your references, which can lead to unexpected bugs.  By using ```const``` everywhere a variable isn't reassigned, it makes it very obvious when a variable *will* be reassigned.

```typescript
// bad
var a = 1;
var b = 2;

// good
const a = 1;
const b = 2;

// I immediately know this variable will be reassigned later without having look at any more code
let c = 1;
```

#### Use ```let``` instead of ```var```

>Why? ```let``` and ```const``` are block scoped but ```var``` is function scoped (or global if not declared inside a function).  Not using block scoped variables can lead to unexpected behavior and bugs.

```typescript
function varTest() {
  var x = 1;
  if (true) {
    var x = 2;  // same variable!
    console.log(x);  // 2
  }
  console.log(x);  // 2
}

function letTest() {
  let x = 1;
  if (true) {
    let x = 2;  // different variable
    console.log(x);  // 2
  }
  console.log(x);  // 1
}
```

#### Use one `const` or `let` declaration per variable

> Why? It's easier to add new variable declarations this way, and you never have to worry about swapping out a `;` for a `,` or introducing punctuation-only diffs. You can also step through each declaration with the debugger, instead of jumping through all of them at once.

  ```typescript
  // bad
  const items: number[] = getItems(),
      goSportsTeam = true,
      dragonball = 'z';

  // bad
  // (compare to above, and try to spot the mistake)
  const items: number[] = getItems(),
      goSportsTeam = true;
      dragonball = 'z';

  // good
  const items: number[] = getItems();
  const goSportsTeam = true;
  const dragonball = 'z';
  ```

#### Group all your `const`s and then group all your `let`s

> Why? This is helpful when later on you might need to assign a variable depending on one of the previous assigned variables.

  ```typescript
  // bad
  let i, len, dragonball,
      items = getItems(),
      goSportsTeam = true;

  // bad
  let i;
  const items = getItems();
  let dragonball;
  const goSportsTeam = true;
  let len;

  // good
  const goSportsTeam = true;
  const items = getItems();
  let dragonball;
  let i;
  let length;
  ```
  
#### Assign variables where you need them, but place them in a reasonable place

> Why? `let` and `const` are block scoped and not function scoped.

  ```typescript
  // bad - unnecessary function call
  function checkName(hasName: string) {
    const name = getName();

    if (hasName === 'test') {
      return false;
    }

    if (name === 'test') {
      this.setName('');
      return false;
    }

    return name;
  }

  // good
  function checkName(hasName: string) {
    if (hasName === 'test') {
      return false;
    }

    const name: string = getName();

    if (name === 'test') {
      this.setName('');
      return false;
    }

    return name;
  }
  ```
  
## Objects
#### Use the literal syntax for object creation

 > Why? Keeps consistent syntax when creating whether you're creating an empty object or an object with properties.  Easier to read.
  
  ```typescript
  // bad
  const item: any = new Object();

  // good
  const item: any = {};
  ```
#### Use computed property names when creating objects with dynamic property names

  > Why? They allow you to define all the properties of an object in one place.

```typescript
function getKey(k): string {
  return `a key named ${k}`;
}

// bad
const obj = {
  id: 5,
  name: 'San Francisco',
};
obj[getKey('enabled')] = true;

// good
const obj = {
  id: 5,
  name: 'San Francisco',
  [getKey('enabled')]: true,
};
```
    
#### Use object method shorthand

  > Why? It is shorter to write and descriptive.
    
```typescript
// bad
const atom = {
  value: 1,

  addValue: function (value: number): number {
    return atom.value + value;
  },
};

// good
const atom = {
  value: 1,

  addValue(value: number): number {
    return atom.value + value;
  },
};
```
    
#### Use property value shorthand

  > Why? It is shorter to write and descriptive.

```typescript
const lukeSkywalker = 'Luke Skywalker';

// bad
const obj = {
  lukeSkywalker: lukeSkywalker,
};

// good
const obj = {
  lukeSkywalker,
};
```
    
#### Group shorthand properties at the beginning

  > Why? It's easier to tell which properties are using the shorthand.

```typescript
const anakinSkywalker = 'Anakin Skywalker';
const lukeSkywalker = 'Luke Skywalker';

// bad
const obj = {
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  lukeSkywalker,
  episodeThree: 3,
  mayTheFourth: 4,
  anakinSkywalker,
};

// good
const obj = {
  lukeSkywalker,
  anakinSkywalker,
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  episodeThree: 3,
  mayTheFourth: 4,
};
```
    
#### Only quote invalid identifiers

  > Why? In general we consider it subjectively easier to read. It improves syntax highlighting, and is also more easily optimized by many JS engines.

  ```typescript
  // bad
  const bad = {
    'foo': 3,
    'bar': 4,
    'data-blah': 5,
  };

  // good
  const good = {
    foo: 3,
    bar: 4,
    'data-blah': 5,
  };
  ```
  
#### Do not call `Object.prototype` methods directly

  > Why? These methods may be shadowed by properties on the object in question - consider `{ hasOwnProperty: false }` - or, the object may be a null object (`Object.create(null)`).

  ```typescript
  // bad
  console.log(object.hasOwnProperty(key));

  // good
  console.log(Object.prototype.hasOwnProperty.call(object, key));

  // best
  const has = Object.prototype.hasOwnProperty; // cache the lookup once, in module scope.
  ```
  
#### Prefer the object spread operator over `Object.assign`
  
  > Why? Easier to read, more descriptive of what's happening
  
  ```typescript
  // very bad
  const original = { a: 1, b: 2 };
  const copy = Object.assign(original, { c: 3 }); // this mutates `original` ಠ_ಠ
  delete copy.a; // so does this

  // bad
  const original = { a: 1, b: 2 };
  const copy = Object.assign({}, original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }

  // good
  const original = { a: 1, b: 2 };
  const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }

  const { a, ...noA } = copy; // noA => { b: 2, c: 3 }
  ```

**[⬆ back to top](#table-of-contents)**
  
## Arrays

#### Use the literal syntax for creation

  > Why? Keeps consistent syntax when creating whether you're creating an empty array or an array with items in it.  Easier to read.

```typescript
// bad
const items: any[] = new Array();

// good
const items: any[] = [];
```
    
#### Use push instead of direct assignment to add items

```typescript
const someStack: string[] = [];

// bad
someStack[someStack.length] = 'abracadabra';

// good
someStack.push('abracadabra');
```
    
#### Use array spreads `...` to copy arrays

  >Why? It is shorter to write and descriptive.

```typescript
// bad
const len = items.length;
const itemsCopy = [];
let i: number;

for (i = 0; i < len; i++) {
  itemsCopy[i] = items[i];
}

// good
const itemsCopy = [...items];
```

#### Use Array.from to convert an array-like object to an array

```typescript
const foo = document.querySelectorAll('.foo');
const nodes = Array.from(foo);
```
    
#### Use return statements in multi-line array method callbacks

  > Why? Array callbacks expect a return method, not doing so could lead to strange bugs and confusing code.  When using single line arrow function the return is implicit so is not needed. 

```typescript
// good
[1, 2, 3].map(x => {
  const y = x + 1;
  return x * y;
});

// good
[1, 2, 3].map(x => x + 1);

// bad
const flat = {};
[[0, 1], [2, 3], [4, 5]].reduce((memo, item, index) => {
  const flatten = memo.concat(item);
  flat[index] = flatten;
});

// good
const flat = {};
[[0, 1], [2, 3], [4, 5]].reduce((memo, item, index) => {
  const flatten = memo.concat(item);
  flat[index] = flatten;
  return flatten;
});

// bad
inbox.filter((msg) => {
  const { subject, author } = msg;
  if (subject === 'Mockingbird') {
    return author === 'Harper Lee';
  } else {
    return false;
  }
});

// good
inbox.filter(msg => {
  const { subject, author } = msg;
  if (subject === 'Mockingbird') {
    return author === 'Harper Lee';
  }

  return false;
});
```
    
**[⬆ back to top](#table-of-contents)**
    
## Destructuring

#### Use object destructuring when accessing multiple properties

  > Why? Destructuring saves you from creating temporary references for those properties.

```typescript
// bad
function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;

  return `${firstName} ${lastName}`;
}

// good
function getFullName(user) {
  const { firstName, lastName } = user;
  return `${firstName} ${lastName}`;
}

// best
function getFullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}
```
    
#### Use array destructuring

```typescript
const arr = [1, 2, 3, 4];

// bad
const first = arr[0];
const second = arr[1];

// good
const [first, second] = arr;
```
    
#### Use object destructuring for multiple return values

  > Why? You can add new properties over time or change the order of things without breaking call sites.

```typescript
// bad
function processInput(input): number[] {
  // then a miracle occurs
  return [left, right, top, bottom];
}

// the caller needs to think about the order of return data
const [left, __, top] = processInput(input);

// good
function processInput(input): Rectangle {
  // then a miracle occurs
  return { left, right, top, bottom };
}

// the caller selects only the data they need
const { left, top } = processInput(input);
```
  
**[⬆ back to top](#table-of-contents)**

## Strings

#### Use single quotes `''`

```typescript
// bad
const name = "Capt. Janeway";

// bad - template literals should contain interpolation or newlines
const name = `Capt. Janeway`;

// good
const name = 'Capt. Janeway';
```

#### Avoid concatenating long strings

  > Why? Broken strings are painful to work with and make code less searchable.

```typescript
// bad
const errorMessage = 'This is a super long error that was thrown because \
of Batman. When you stop to think about how Batman had anything to do \
with this, you would get nowhere \
fast.';

// bad
const errorMessage = 'This is a super long error that was thrown because ' +
  'of Batman. When you stop to think about how Batman had anything to do ' +
  'with this, you would get nowhere fast.';

// good
const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';
```

#### Use template strings instead of concatenation

  > Why? Template strings give you a readable, concise syntax with proper newlines and string interpolation features.

```typescript
// bad
function sayHi(name: string): string {
  return 'How are you, ' + name + '?';
}

// bad
function sayHi(name: string): string {
  return ['How are you, ', name, '?'].join();
}

// bad
function sayHi(name: string): string {
  return `How are you, ${ name }?`;
}

// good
function sayHi(name: string): string {
  return `How are you, ${name}?`;
}
```

#### Never use `eval()` on a string

  > Why? It opens to many vulnerabilities.

#### Do not unnecessarily escape characters

  > Why? Backslashes harm readability, thus they should only be present when necessary.

```typescript
// bad
const foo = '\'this\' \i\s \"quoted\"';

// good
const foo = '\'this\' is "quoted"';
const foo = `'this' is "quoted"`;
```
    
**[⬆ back to top](#table-of-contents)**
    
## Functions
#### Never declare a function in a non-function block

  > Assign the function to a variable instead. Browsers will allow you to do it, but they all interpret it differently, which is bad news bears.

Note: ECMA-262 defines a `block` as a list of statements. A function declaration is not a statement. [Read ECMA-262's note on this issue](http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf#page=97).

```typescript
// bad
if (currentUser) {
  function test() {
    console.log('Nope.');
  }
}

// less bad
let test;
if (currentUser) {
  test = () => {
    console.log('Yup.');
  };
}

// best
let test;
if (currentUser) {
  test = logYup;
}

function logYup() {
  console.log('Yup.');
}
```

#### Never name a parameter `arguments'
  
  > This will take precedence over the `arguments` object that is given to every function scope.

```typescript
// bad
function nope(name, options, arguments) {
  // ...stuff...
}

// good
function yup(name, options, args) {
  // ...stuff...
}
```

#### Never use `arguments`, use rest syntax `...` instead

  > Why? `...` is explicit about which arguments you want pulled. Plus, rest arguments are a real Array, and not merely Array-like like `arguments`.

```typescript
// bad
function concatenateAll(): string {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}

// good
function concatenateAll(...args): string {
  return args.join('');
}
```

#### Use default parameter syntax

```typescript
// really bad
function handleThings(opts) {
  // No! We shouldn't mutate function arguments.
  // Double bad: if opts is falsy it'll be set to an object which may
  // be what you want but it can introduce subtle bugs.
  opts = opts || {};
  // ...
}

// still bad
function handleThings(opts) {
  if (opts === void 0) {
    opts = {};
  }
  // ...
}

// good
function handleThings(opts = {}) {
  // ...
}
```

#### Avoid side effects with default parameters

  > Why? They are confusing to reason about.

```typescript
var b = 1;
// bad
function count(a = b++) {
  console.log(a);
}
count();  // 1
count();  // 2
count(3); // 3
count();  // 3
```

#### Put default parameters last

```typescript
// bad
function handleThings(opts = {}, name) {
  // ...
}

// good
function handleThings(name, opts = {}) {
  // ...
}
```

#### Never use the Function constructor

  > Why? Creating a function in this way evaluates a string similarly to eval(), which opens vulnerabilities.

```typescript
// bad
var add = new Function('a', 'b', 'return a + b');

// still bad
var subtract = Function('a', 'b', 'return a - b');
```

#### Use consistent spacing in signiature

  > Why? Consistency is good, and you shouldn’t have to add or remove a space when adding or removing a name.

```typescript
// bad
const f = function(){};
const g = function (){};
const h = function() {};

// good
const x = function () {};
const y = function a() {};
```

#### Never mutate parameters

  > Why? Manipulating objects passed in as parameters can cause unwanted variable side effects in the original caller.

```typescript
// bad
function f1(obj) {
  obj.key = 1;
};

// good
function f2(obj) {
  const key = Object.prototype.hasOwnProperty.call(obj, 'key') ? obj.key : 1;
};
```

#### Never reassign parameters

  > Why? Reassigning parameters can lead to unexpected behavior, especially when accessing the `arguments` object. It can also cause optimization issues, especially in V8.

```typescript
// bad
function f1(a) {
  a = 1;
}

function f2(a) {
  if (!a) { a = 1; }
}

// good
function f3(a) {
  const b = a || 1;
}

function f4(a = 1) {
}
```

#### Prefer spread operator `...` to call variadic functions

  > Why? It's cleaner, you don't need to supply a context, and you can not easily compose `new` with `apply`.

```typescript
// bad
const x = [1, 2, 3, 4, 5];
console.log.apply(console, x);

// good
const x = [1, 2, 3, 4, 5];
console.log(...x);

// bad
new (Function.prototype.bind.apply(Date, [null, 2016, 08, 05]));

// good
new Date(...[2016, 08, 05]);
```
    
**[⬆ back to top](#table-of-contents)**

## Arrow Functions

#### Use arrow functions for simple function expressions

Note: If your function is longer than one line, consider moving the logic to a named function

  > Why? It creates a version of the function that executes in the context of `this`, which is usually what you want, and is a more concise syntax.

  > Why not? If you have a fairly complicated function, move the logic into it's own function provides better readability

```typescript
// bad
[1, 2, 3].map(function (item) {
  const itemPlusOne = item + 1;
  return item * itemPlusOne;
});

// good
[1, 2, 3].map(item => {
  const itemPlusOne = item + 1;
  return item * itemPlusOne;
});

// good
[1, 2, 3].map(timesItselfPlusOne);

function timesItselfPlusOne(item) {
  const itemPlusOne = item + 1;
  return item * itemPlusOne;
}
```

#### Omit braces and use implicit return for single line functions

  > Why? Syntactic sugar. It reads well when multiple functions are chained together.

```typescript
// bad
[1, 2, 3].map(number => {
  const nextNumber = number + 1;
  `A string containing the ${nextNumber}.`;
});

// good
[1, 2, 3].map(number => `A string containing the ${number}.`);

// good
[1, 2, 3].map((number) => {
  const nextNumber = number + 1;
  return `A string containing the ${nextNumber}.`;
});

// good
[1, 2, 3].map((number, index) => ({
  [index]: number
}));
```

#### Omit the parentheses for single argument

  > Why? Less visual clutter.

```typescript
// bad
[1, 2, 3].map((x) => x * x);

// good
[1, 2, 3].map(x => x * x);

// good
[1, 2, 3].map(number => (
  `A long string with the ${number}. It’s so long that we don’t want it to take up space on the .map line!`
));

// good
[1, 2, 3].map(x => {
  const y = x + 1;
  return x * y;
});
```

#### Avoid arrow function syntax (`=>`) with comparison operators (`<=`, `>=`)

  > Why? Placing the arrow function and a comparision operator on the same line is difficult to read.

```typescript
// bad
const itemHeight = item => item.height > 256 ? item.largeSize : item.smallSize;

// bad
const itemHeight = (item) => item.height > 256 ? item.largeSize : item.smallSize;

// good
const itemHeight = item => (item.height > 256 ? item.largeSize : item.smallSize);

// good
const itemHeight = (item) => {
  const { height, largeSize, smallSize } = item;
  return height > 256 ? largeSize : smallSize;
};
```
    
#### When passing callbacks don't wrap direct function calls

  > Why?  If you can pass a function in directly, do it, creating an empty wrapper function clutters the code and provides no gain.  Directly passing a well named function greatly increases readability.
  
  ```typescript
  // bad
  items.map(item => {
    return Math.sqrt(item);
  });
  
  // bad
  items.map(item => Math.sqrt(item));
  
  // bad
  getUsernames()
    .then(usernames => {
      processUsernames(usernames);
    });
  
  // bad
  getUsernames()
    .then(usernames => processUsernames(usernames));
  
  // good
  items.map(Math.sqrt);
    
  // good
  getUsernames()
    .then(processUsernames);
  ```
    
## Iterators and Generators

#### Don't use iterators

  > Why? This enforces our immutable rule. Dealing with pure functions that return values is easier to reason about than side effects.

  > Use `map()` / `every()` / `filter()` / `find()` / `findIndex()` / `reduce()` / `some()` / ... to iterate over arrays, and `Object.keys()` / `Object.values()` / `Object.entries()` to produce arrays so you can iterate over objects.

```typescript
const numbers = [1, 2, 3, 4, 5];

// bad
let sum = 0;
for (let num of numbers) {
  sum += num;
}

sum === 15;

// good
let sum = 0;
numbers.forEach(num => sum += num);
sum === 15;

// best (use the functional force)
const sum = numbers.reduce((total, num) => total + num, 0);
sum === 15;
```

#### If you must use generators use proper spacing

  > Why? `function` and `*` are part of the same conceptual keyword - `*` is not a modifier for `function`, `function*` is a unique construct, different from `function`.

```typescript
// bad
function * foo() {
}

const bar = function * () {
}

const baz = function *() {
}

const quux = function*() {
}

function*foo() {
}

function *foo() {
}

// very bad
function
*
foo() {
}

const wat = function
*
() {
}

// good
function* foo() {
}

const foo = function* () {
}
```
    
**[⬆ back to top](#table-of-contents)**
    
## Properties

#### Use dot notation

```typescript
const luke = {
  jedi: true,
  age: 28,
};

// bad
const isJedi = luke['jedi'];

// good
const isJedi = luke.jedi;
```

#### Use brackets `[]` when accessing properties with a variable

```typescript
const luke = {
  jedi: true,
  age: 28,
};

function getProp(prop) {
  return luke[prop];
}

const isJedi = getProp('jedi');
```
    
**[⬆ back to top](#table-of-contents)**

## Comparison Operators & Equality
    
#### Use `===` and `!==` over `==` and `!=`

#### Truthiness

  > Conditional statements such as the `if` statement evaluate their expression using coercion with the `ToBoolean` abstract method and always follow these simple rules:

    + **Objects** evaluate to **true**
    + **Undefined** evaluates to **false**
    + **Null** evaluates to **false**
    + **Booleans** evaluate to **the value of the boolean**
    + **Numbers** evaluate to **false** if **+0, -0, or NaN**, otherwise **true**
    + **Strings** evaluate to **false** if an empty string `''`, otherwise **true**

```typescript
if ([0] && []) {
  // true
  // an array (even an empty one) is an object, objects will evaluate to true
}
```

#### Use shortcuts for booleans, but explicit comparisons for strings and numbers

```typescript
// bad
if (isValid === true) {
  // ...stuff...
}

// good
if (isValid) {
  // ...stuff...
}

// bad
if (name) {
  // ...stuff...
}

// good
if (name !== '') {
  // ...stuff...
}

// bad
if (collection.length) {
  // ...stuff...
}

// good
if (collection.length > 0) {
  // ...stuff...
}
```

- For more information see [Truth Equality and JavaScript](https://javascriptweblog.wordpress.com/2011/02/07/truth-equality-and-javascript/#more-2108) by Angus Croll.

#### Use braces to create blocks in `case` and `default` clauses that contain lexical declarations

  > Why? Lexical declarations are visible in the entire `switch` block but only get initialized when assigned, which only happens when its `case` is reached. This causes problems when multiple `case` clauses attempt to define the same thing.

```typescript
// bad
switch (foo) {
  case 1:
    let x = 1;
    break;
  case 2:
    const y = 2;
    break;
  case 3:
    function f() {}
    break;
  default:
    class C {}
}

// good
switch (foo) {
  case 1: {
    let x = 1;
    break;
  }
  case 2: {
    const y = 2;
    break;
  }
  case 3: {
    function f() {}
    break;
  }
  case 4:
    bar();
    break;
  default: {
    class C {}
  }
}
```

#### Ternaries should not be nested and generally be single line expressions

```typescript
// bad
const foo = maybe1 > maybe2
  ? "bar"
  : value1 > value2 ? "baz" : null;

// better
const maybeNull = value1 > value2 ? 'baz' : null;

const foo = maybe1 > maybe2
  ? 'bar'
  : maybeNull;

// best
const maybeNull = value1 > value2 ? 'baz' : null;

const foo = maybe1 > maybe2 ? 'bar' : maybeNull;
```

#### Avoid unneeded ternary statements

```typescript
// bad
const foo = a ? a : b;
const bar = c ? true : false;
const baz = c ? false : true;

// good
const foo = a || b;
const bar = !!c;
const baz = !c;
```

**[⬆ back to top](#table-of-contents)**

## Blocks

#### Use braces with all multi-line blocks

```typescript
// bad
if (test)
  return false;

// good
if (test) return false;

// good
if (test) {
  return false;
}

// bad
function foo() { return false; }

// good
function bar(): boolean {
  return false;
}
```

#### Put `else` on the same line as your `if` block's closing brace

```typescript
// bad
if (test) {
  thing1();
  thing2();
}
else {
  thing3();
}

// good
if (test) {
  thing1();
  thing2();
} else {
  thing3();
}
```

**[⬆ back to top](#table-of-contents)**
   
## Comments

#### Use `/** ... */` for multi-line comments

```typescript
// bad
// make() returns a new element
// based on the passed in tag name
//
// @param {String} tag
// @return {Element} element
function make(tag) {

  // ...stuff...

  return element;
}

// good
/**
 * make() returns a new element
 * based on the passed-in tag name
 */
function make(tag) {

  // ...stuff...

  return element;
}
```

#### Use `//` for single line comments

  > Place single line comments on a newline above the subject of the comment. Put an empty line before the comment unless it's on the first line of a block.

```typescript
// bad
const active = true;  // is current tab

// good
// is current tab
const active = true;

// bad
function getType() {
  console.log('fetching type...');
  // set the default type to 'no type'
  const type = this._type || 'no type';

  return type;
}

// good
function getType() {
  console.log('fetching type...');

  // set the default type to 'no type'
  const type = this._type || 'no type';

  return type;
}

// also good
function getType() {
  // set the default type to 'no type'
  const type = this._type || 'no type';

  return type;
}
```

#### Start all comments with a space

  > Why? Makes comments easier to read

```typescript
// bad
//is current tab
const active = true;

// good
// is current tab
const active = true;

// bad
/**
 *make() returns a new element
 *based on the passed-in tag name
 */
function make(tag) {

  // ...stuff...

  return element;
}

// good
/**
 * make() returns a new element
 * based on the passed-in tag name
 */
function make(tag) {

  // ...stuff...

  return element;
}
```

#### Use FIXME and TODO correctly

  > Prefixing your comments with `FIXME` or `TODO` helps other developers quickly understand if you're pointing out a problem that needs to be revisited, or if you're suggesting a solution to the problem that needs to be implemented. These are different than regular comments because they are actionable. The actions are `FIXME: -- need to figure this out` or `TODO: -- need to implement`.
  
**[⬆ back to top](#table-of-contents)**
  
## Whitespace

#### Use soft tabs set to 2 spaces

```typescript
// bad
function foo() {
∙∙∙∙const name;
}

// bad
function bar() {
∙const name;
}

// good
function baz() {
∙∙const name;
}
```

#### Place 1 space before the leading brace

```typescript
// bad
function test(){
  console.log('test');
}

// good
function test() {
  console.log('test');
}

// bad
dog.set('attr',{
  age: '1 year',
  breed: 'Bernese Mountain Dog',
});

// good
dog.set('attr', {
  age: '1 year',
  breed: 'Bernese Mountain Dog',
});
```

#### Place 1 space before the opening parenthesis in control statements

  > Place no space between the argument list and the function name in function calls and declarations

```typescript
// bad
if(isJedi) {
  fight ();
}

// good
if (isJedi) {
  fight();
}

// bad
function fight () {
  console.log ('Swooosh!');
}

// good
function fight() {
  console.log('Swooosh!');
}
```

#### Set off operators with spaces

```typescript
// bad
const x=y+5;

// good
const x = y + 5;
```

#### End files with a single newline character

```typescript
// bad
import { es6 } from './AirbnbStyleGuide';
  // ...
export default es6;
```

```typescript
// bad
import { es6 } from './AirbnbStyleGuide';
  // ...
export default es6;↵
↵
```

```typescript
// good
import { es6 } from './AirbnbStyleGuide';
  // ...
export default es6;↵
```

#### Use indentation when making long method chains

  > Use when more than 2 method chains. Use a leading dot, which emphasizes that the line is a method call, not a new statement

```typescript
// bad
$('#items').find('.selected').highlight().end().find('.open').updateCount();

// bad
$('#items').
  find('.selected').
    highlight().
    end().
  find('.open').
    updateCount();

// good
$('#items')
  .find('.selected')
    .highlight()
    .end()
  .find('.open')
    .updateCount();

// bad
const leds = stage.selectAll('.led').data(data).enter().append('svg:svg').classed('led', true)
    .attr('width', (radius + margin) * 2).append('svg:g')
    .attr('transform', 'translate(' + (radius + margin) + ',' + (radius + margin) + ')')
    .call(tron.led);

// good
const leds = stage.selectAll('.led')
    .data(data)
  .enter().append('svg:svg')
    .classed('led', true)
    .attr('width', (radius + margin) * 2)
  .append('svg:g')
    .attr('transform', 'translate(' + (radius + margin) + ',' + (radius + margin) + ')')
    .call(tron.led);

// good
const leds = stage.selectAll('.led').data(data);
```

#### Leave a blank line after blocks and before the next statement

```typescript
// bad
if (foo) {
  return bar;
}
return baz;

// good
if (foo) {
  return bar;
}

return baz;

// bad
const obj = {
  foo() {
  },
  bar() {
  },
};
return obj;

// good
const obj = {
  foo() {
  },

  bar() {
  },
};

return obj;

// bad
const arr = [
  function foo() {
  },
  function bar() {
  },
];
return arr;

// good
const arr = [
  function foo() {
  },

  function bar() {
  },
];

return arr;
```

#### Do not pad your blocks with blank lines

```typescript
// bad
function bar() {

  console.log(foo);

}

// also bad
if (baz) {

  console.log(qux);
} else {
  console.log(foo);

}

// good
function bar() {
  console.log(foo);
}

// good
if (baz) {
  console.log(qux);
} else {
  console.log(foo);
}
```

#### Do not add spaces inside parentheses

```typescript
// bad
function bar( foo ) {
  return foo;
}

// good
function bar(foo) {
  return foo;
}

// bad
if ( foo ) {
  console.log(foo);
}

// good
if (foo) {
  console.log(foo);
}
```

#### Do not add spaces inside brackets

```typescript
// bad
const foo = [ 1, 2, 3 ];
console.log(foo[ 0 ]);

// good
const foo = [1, 2, 3];
console.log(foo[0]);
```

#### Add spaces inside curly braces

```typescript
// bad
const foo = {clark: 'kent'};

// good
const foo = { clark: 'kent' };
```

#### Avoid having lines of code that are longer than 100 characters

Note: long strings are exempt from this rule, and should not be broken up

  > Why? This ensures readability and maintainability.

```typescript
// bad
const foo = jsonData && jsonData.foo && jsonData.foo.bar && jsonData.foo.bar.baz && jsonData.foo.bar.baz.quux && jsonData.foo.bar.baz.quux.xyzzy;

// bad
$.ajax({ method: 'POST', url: 'https://airbnb.com/', data: { name: 'John' } }).done(() => console.log('Congratulations!')).fail(() => console.log('You have failed this city.'));

// good
const foo = jsonData
  && jsonData.foo
  && jsonData.foo.bar
  && jsonData.foo.bar.baz
  && jsonData.foo.bar.baz.quux
  && jsonData.foo.bar.baz.quux.xyzzy;

// good
$.ajax({
  method: 'POST',
  url: 'https://airbnb.com/',
  data: { name: 'John' },
})
  .done(() => console.log('Congratulations!'))
  .fail(() => console.log('You have failed this city.'));
```

**[⬆ back to top](#table-of-contents)**

## Commas

#### Leading commas: **Nope.**

```typescript
// bad
const story = [
    once
  , upon
  , aTime
];

// good
const story = [
  once,
  upon,
  aTime,
];

// bad
const hero = {
    firstName: 'Ada'
  , lastName: 'Lovelace'
  , birthYear: 1815
  , superPower: 'computers'
};

// good
const hero = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  birthYear: 1815,
  superPower: 'computers',
};
```

#### Additional trailing comma: **Yup.**

  > Why? This leads to cleaner git diffs. Also, transpilers like Babel will remove the additional trailing comma in the transpiled code which means you don't have to worry about the trailing comma problem in legacy browsers.

```diff
// bad - git diff without trailing comma
const hero = {
     firstName: 'Florence',
-    lastName: 'Nightingale'
+    lastName: 'Nightingale',
+    inventorOf: ['coxcomb chart', 'modern nursing']
};

// good - git diff with trailing comma
const hero = {
     firstName: 'Florence',
     lastName: 'Nightingale',
+    inventorOf: ['coxcomb chart', 'modern nursing'],
};
```

```typescript
// bad
const hero = {
  firstName: 'Dana',
  lastName: 'Scully'
};

const heroes = [
  'Batman',
  'Superman'
];

// good
const hero = {
  firstName: 'Dana',
  lastName: 'Scully',
};

const heroes = [
  'Batman',
  'Superman',
];

// bad
function createHero(
  firstName,
  lastName,
  inventorOf
) {
  // does nothing
}

// good
function createHero(
  firstName,
  lastName,
  inventorOf,
) {
  // does nothing
}

// good (note that a comma must not appear after a "rest" element)
function createHero(
  firstName,
  lastName,
  inventorOf,
  ...heroArgs
) {
  // does nothing
}

// bad
createHero(
  firstName,
  lastName,
  inventorOf
);

// good
createHero(
  firstName,
  lastName,
  inventorOf,
);

// good (note that a comma must not appear after a "rest" element)
createHero(
  firstName,
  lastName,
  inventorOf,
  ...heroArgs
)
```

**[⬆ back to top](#table-of-contents)**

## Semicolons

**Yup.**

```typescript
// bad
(function () {
  const name = 'Skywalker'
  return name
})()

// good
(function () {
  const name = 'Skywalker';
  return name;
}());

// good, but legacy (guards against the function becoming an argument when two files with IIFEs are concatenated)
;(() => {
  const name = 'Skywalker';
  return name;
}());
```

[Read more](https://stackoverflow.com/questions/7365172/semicolon-before-self-invoking-function/7365214%237365214).

**[⬆ back to top](#table-of-contents)**

## Type Casting & Coercion

#### Perform type coercion at the beginning of the statement

- ##### Strings:

    ```typescript
    // => this.reviewScore = 9;

    // bad
    const totalScore = this.reviewScore + ''; // invokes this.reviewScore.valueOf()

    // bad
    const totalScore = this.reviewScore.toString(); // isn't guaranteed to return a string

    // good
    const totalScore = String(this.reviewScore);
    ```

- ##### Numbers: Use `Number` for type casting and `parseInt` always with a radix

    ```typescript
    const inputValue = '4';

    // bad
    const val = new Number(inputValue);

    // bad
    const val = +inputValue;

    // bad
    const val = inputValue >> 0;

    // bad
    const val = parseInt(inputValue);

    // good
    const val = Number(inputValue);

    // good
    const val = parseInt(inputValue, 10);
    ```


- ##### Booleans:

    ```typescript
    const age = 0;

    // bad
    const hasAge = new Boolean(age);

    // good
    const hasAge = Boolean(age);

    // best
    const hasAge = !!age;
    ```

**[⬆ back to top](#table-of-contents)**


## Naming Conventions

#### **NEVER** single letter names. **BE DESCRIPTIVE**

```typescript
// bad
function q() {
  // ...stuff...
}

// good
function queryDatabase() {
  // ..stuff..
}
```

#### Use camelCase when naming objects, functions, and instances

```typescript
// bad
const OBJEcttsssss = {};
const this_is_my_object = {};
function c() {}

// good
const thisIsMyObject = {};
function thisIsMyFunction() {}
```

#### Do not use trailing or leading underscores

  > Why? JavaScript does not have the concept of privacy in terms of properties or methods. Although a leading underscore is a common convention to mean “private”, in fact, these properties are fully public, and as such, are part of your public API contract. This convention might lead developers to wrongly think that a change won't count as breaking, or that tests aren't needed. tl;dr: if you want something to be “private”, it must not be observably present.

  ```typescript
  // bad
  this.__firstName__ = 'Panda';
  this.firstName_ = 'Panda';
  this._firstName = 'Panda';

  // good
  this.firstName = 'Panda';
  ```
    
The exception to this rule when you have a private property in your class but want identically named getters and setters for it

```typescript
class MyClass {
  private _name: string;
  
  get name(): string {
    return _name;
  }
  
  set name(newName: string): void {
    this._name = newName;
  }
}
```

**[⬆ back to top](#table-of-contents)**

## Asynchronous

#### Prefer promises for basic http calls

> Why? Promises are part of the regular JavaScript / Typescript language which means their behavior is more likely to remain stable (no breaking changes). Promises also allow the use of async/await, which is nicer to read.

This rule does not mean you should not use Observables, its simply about using the right tool for the job. Observables have many great features, and if you need them use an Observable, it's very easy to convert between Observables and Promises.
Many projects however can easily just use Angular event handling and Promises for easier to read and more stable code (for instance RXJS 5 -> 6 introduced breaking changes).

```typescript
// bad
const source = Rx.Observable.of('Hello');
const second = val => Rx.Observable.of(`${val} World`);
const error = val => Rx.Observable.throw('Error!');

function printHelloWorld() {
  const example = source
    .mergeMap(second)
    .mergeMap(error)
    .catch(val => Rx.Observable.of(`I caught: ${val}`));
  
  const subscribe = example.subscribe(val => console.log(val));
}

// good
const getHello = () => new Promise(resolve => resolve('Hello'));
const getWorld = val => new Promise(resolve => resolve(`${val} World`));
const error = () => new Promise((resolve, reject) => reject('Error!'));

async function printHelloWorld() {
  try {
    const hello = await getHello();
    const helloWorld = await getWorld(hello);
    await error();
    
    console.log(helloWorld);
  } catch(error) {
    console.log(`I caught: ${error}`)
  }
}
```

#### Prefer async await over promise chaining

> Why? Async await is easy to read and allows synchronous and asynchronous code and error handling to work seamlessly together.

```typescript
const getUsers = () => new Promise(resolve => resolve(['rob', 'jon', 'adam']));
const getArticles = () => new Promise(resolve => resolve(['angular', '.net', 'java']));
const save = favorites => new Promise(resolve => resolve('Saved!'));

// bad
function setFavorites() {
  Promise.all([getUsers(), getArticles()])
    .then(([users, articles]) => {
      return users.map(user => {
        return {
          user,
          favoriteArticles: articles
        }
      });
    })
    .then(save)
    .catch(error => console.log(error));
}

// good
async function setFavorites() {
  try {
    const [users, articles] = await Promise.all([getUsers(), getArticles()]);
    const favorites = users.map(user => {
      return {
        user,
        favoriteArticles: articles
      }
    });
    
    await save(favorites);
  } catch(error) {
    console.log(error);
  }
}
```
