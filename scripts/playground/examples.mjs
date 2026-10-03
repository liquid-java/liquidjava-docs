export const examples = {
  positive: `import liquidjava.specification.Refinement;

class Example {
    void positiveNumbers() {
        @Refinement("_ > 0")
        int count = 5;

        // try changing 5 to -1
    }
}
`,
  bounds: `import liquidjava.specification.Refinement;

class Example {
    void setPercentage(@Refinement("_ >= 0 && _ <= 100") int percentage) {}

    void demo() {
        setPercentage(75);
        // try changing 75 to 150
    }
}
`,
  alias: `import liquidjava.specification.Refinement;
import liquidjava.specification.RefinementAlias;

@RefinementAlias("Positive(int x) { x > 0 }")
class Example {
    void demo() {
        @Refinement("Positive(_)")
        int amount = 10;
        // try changing 10 to 0
    }
}
`,
  state: `import liquidjava.specification.StateSet;
import liquidjava.specification.StateRefinement;

@StateSet({"open", "closed"})
class Example {
    @StateRefinement(to = "open(this)")
    Example() {}

    @StateRefinement(from = "open(this)", to = "closed(this)")
    void close() {}

    @StateRefinement(from = "open(this)")
    void read() {}

    static void demo() {
        Example resource = new Example();
        resource.read();
        resource.close();
        // try adding resource.read() after close()
    }
}
`
};
