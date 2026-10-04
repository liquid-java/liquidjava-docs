export const examples = {
  positive: `import liquidjava.specification.*;

class Example {
    void positiveNumbers() {
        @Refinement("_ > 0")
        int count = -1;
    }
}
`,
  bounds: `import liquidjava.specification.*;

class Example {
    void setPercentage(@Refinement("_ >= 0 && _ <= 100") int percentage) {}

    void demo() {
        setPercentage(125);
    }
}
`,
  alias: `import liquidjava.specification.*;

@RefinementAlias("Positive(int x) { x > 0 }")
class Example {
    void demo() {
        @Refinement("Positive(_)")
        int amount = 0;
    }
}
`,
  state: `import liquidjava.specification.*;

@StateSet({"open", "closed"})
class Example {
    @StateRefinement(to="open(this)")
    Example() {}

    @StateRefinement(from="open(this)", to="closed(this)")
    void close() {}

    @StateRefinement(from="open(this)")
    void read() {}

    static void demo() {
        Example resource = new Example();
        resource.close();
        resource.read();
    }
}
`,
  ghost: `import liquidjava.specification.*;

@Ghost("int count")
class Example {
    @StateRefinement(to="count(this) == 0")
    Example() {}

    @StateRefinement(to="count(this) == count(old(this)) + 1")
    void increment() {}

    @StateRefinement(from="count(this) > 0", to="count(this) == count(old(this)) - 1")
    void decrement() {}

    static void demo() {
        Example counter = new Example();
        counter.increment();
        counter.decrement();
        counter.decrement();
    }
}
`
};
