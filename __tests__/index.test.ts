import { List } from "immutable";

import Tree from "../src/";

const exampleTree = new Tree(
  "Program Language",
  List.of(
    new Tree(
      "FORTRAN",
      List.of(
        new Tree(
          "ALGOL",
          List.of(
            new Tree(
              "CPL",
              List.of(
                new Tree(
                  "BCPL",
                  List.of(new Tree("B", List.of(new Tree("C", List()))))
                )
              )
            )
          )
        )
      )
    ),
    new Tree("Lisp", List())
  )
);

it("showDebug", () => {
  expect(
    new Tree(
      "a",
      List.of(
        new Tree("b", List.of(new Tree("c", List()))),
        new Tree("d", List())
      )
    ).showDebug()
  ).toBe(`"a"
 |
 ￫"b"
 | |
 | ￫"c"
 |
 ￫"d"
`);
});

it("map", () => {
  expect(
    exampleTree.map(e => {
      if (e === "Program Language") {
        return "updated";
      } else {
        return e;
      }
    }).value
  ).toBe("updated");
  expect(
    exampleTree
      .map(e => {
        if (e === "FORTRAN") {
          return "updated2";
        } else {
          return e;
        }
      })
      .children.get(0).value
  ).toBe("updated2");
});
