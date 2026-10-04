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
`
};
