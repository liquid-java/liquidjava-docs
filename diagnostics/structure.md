---
title: Diagnostic Structure
parent: Diagnostics
nav_order: 4
---

# Diagnostic Structure

Consider the following refinement error:

![Example LiquidJava refinement error]({{ '/assets/images/error-message.png' | relative_url }})
{: .diagnostic-image }

Each part gives a different piece of information:

| Part | Meaning |
| --- | --- |
| `Refinement Error` | The kind of diagnostic being reported |
| `#ret² == x / 2 && x > 0` | What LiquidJava knows at the return site. Here, the returned value is `x / 2`, and the parameter refinement says `x > 0` |
| `is not a subtype of` | LiquidJava is checking whether the inferred refinement is strong enough to satisfy the declared one |
| `#ret² > 0` | The declared return refinement, obtained from `@Refinement(value="_ > 0", ...)`. |
| Source snippet | The surrounding lines help locate the failing code in context |
| Caret line | The `^` marks the exact expression that caused the violation |
| `result must be positive` | The custom error message from the annotation's `msg` parameter |
| `Counterexample: x == 1 && #ret² == 0` | A concrete model showing why the check fails. Here we can see the failure arises because if `x == 1`, then `x / 2 == 0` |

## Understanding the Counterexample

The counterexample is a concrete assignment of values that makes the verification fail.

In the example above:
- `x == 1` satisfies the parameter refinement `x > 0`
- `#ret² == 0` follows from the return expression `x / 2`, since integer division makes `1 / 2 == 0`
- `0 > 0` is false, so the declared return refinement is violated

So the counterexample explains exactly why LiquidJava cannot prove that `x / 2` is always positive even when `x > 0`. To fix this error, we would need to either change the return expression to allow to return zero with the refinement `_ >= 0`, or strengthen the parameter refinement to require `x > 1`.

## Internal Instance Variables

Names such as `#ret²` are internal variables introduced by LiquidJava during verification. The small superscript number is a counter used to keep those generated variables unique.

LiquidJava converts expressions into an internal A-normal form (ANF) before verification. Every time it creates a fresh internal variable during that process, the counter is incremented. This is why you may see names such as `#ret²` in the diagnostics.

In practice, you can read `#ret²` as "the internal variable that represents this return value occurrence".

```java
int example(int x) { // x⁰
   x = x + 1; // x¹ == x⁰ + 1
   int y = x / 2; // y² == x¹ / 2
   return y; // #ret³ == y²
}
```
