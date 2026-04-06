---
title: Understanding Refinement Errors
parent: Diagnostics
nav_order: 4
permalink: /diagnostics/understanding-refinement-errors/
description: Learn how to read and interpret LiquidJava refinement errors.
---

# Understanding Refinement Errors

Consider the following refinement error:

![Example LiquidJava refinement error]({{ '/assets/images/error-message.png' | relative_url }})
{: .diagnostic-image }

Each part gives a different piece of information:

| Part | Meaning |
| --- | --- |
| `Refinement Error` | The kind of diagnostic being reported |
| `#ret² == x / 2 && x > 0` | The inferred refinement, which indicates that the return value is `x / 2`, and the `x` parameter is `x > 0` |
| `is not a subtype of` | LiquidJava is checking whether the inferred refinement is strong enough to satisfy the expected one |
| `#ret² > 0` | The expected refinement, which specifies that the return value must be positive |
| Source snippet | The surrounding lines that help locate the failing code in context |
| Caret line | The line with the `^` indicating the exact expression that caused the error |
| `result must be positive` | The custom error message obtained from the annotation's `msg` parameter |
| `Counterexample: x == 1 && #ret² == 0` | A concrete model showing why the typechecking failed |

The error message also includes the absolute path of the file and line where the error was reported, which can be clicked to jump the source code location in the editor.

## Subtyping

To verify if a refinement holds, LiquidJava checks if the inferred refinement is a subtype of the expected one. This means that every value that satisfies the inferred refinement must also satisfy the expected one. For example, the predicate `x > 0` is a subtype of `x >= 0`, since the set of positive integers is contained within the set of non-negative integers. However, `x > 0` is not a subtype of `x > 1`, since the value `x == 1` satisfies the first predicate but not the second.

## Counterexamples

Refinement errors may provide a counterexample, which is a concrete assignment of values that makes the verification fail.

In the example above:
- `x == 1` satisfies the parameter refinement `x > 0`
- `#ret² == 0` follows from the return expression `x / 2`, since integer division makes `1 / 2 == 0`
- `0 > 0` is false, so the declared return refinement is violated

So the counterexample explains exactly why LiquidJava cannot prove that `x / 2` is always positive even when `x > 0`. To fix this error, we would need to either weaken the return refinement to allow zero with `_ >= 0`, or strengthen the parameter refinement to require `x > 1`.

## Internal Variables

Names such as `#ret²` are internal variables created by LiquidJava during verification. The small superscript number is a counter used to keep those generated variables unique.

LiquidJava converts expressions into an internal A-normal form (ANF) before verification. Every time it creates a fresh internal variable during that process, the counter is incremented. This is why you may see names such as `#ret²` in the diagnostics. In practice, you can read `#ret²` as "the internal variable that represents this return value occurrence".

The following example shows how the internal variables are created in the typechecking:

```java
int example(int x) { // x⁰
   x = x + 1; // x¹ == x⁰ + 1
   int y = x / 2; // y² == x¹ / 2
   return y; // #ret³ == y²
}
```
