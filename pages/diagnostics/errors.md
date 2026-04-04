---
title: Errors
parent: Diagnostics
nav_order: 1
permalink: /diagnostics/errors/
---

# Errors

An error can be caused by a refinement violation, an invalid refinement, or another particular issue.

| Error | Meaning |
| --- | --- |
| `RefinementError` | A refinement was violated |
| `StateRefinementError` | A state refinement was violated |
| `NotFoundError` | An element used in a refinement could not be found |
| `SyntaxError` | The syntax used in a refinement is invalid |
| `ArgumentMismatchError` | A ghost or state invocation has the wrong number or type of arguments |
| `StateConflictError` | A state refinement becomes unsatisfiable because it combines disjoint states |
| `IllegalConstructorTransitionError` | A constructor state refinement declares an illegal `from` transition |
| `InvalidRefinementError` | A refinement is semantically invalid, such as a non-boolean expression |
| `CustomError` | Any other error, such as providing a non-existent path to verify |

LiquidJava is only able to report **at most one error per method** to avoid cascading failures. If there are multiple errors in a method, the verifier will report the first one it encounters, and stop verifying the rest of the method, meaning that fixing one error can sometimes reveal another that was previously hidden. 
