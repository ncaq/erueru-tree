import { List } from "immutable";

export default class Tree<T> {
  public readonly value: T;
  public readonly children: List<Tree<T>>;

  constructor(value: T, children: List<Tree<T>>) {
    this.value = value;
    this.children = children;
  }

  public map(mapper: (value: T) => T) {
    return new Tree(
      mapper(this.value),
      this.children.map(child => child.map(mapper))
    );
  }

  public pushRight(child: Tree<T>) {
    return new Tree(this.value, this.children.push(child));
  }

  public showDebug(): string {
    const result = JSON.stringify(this.value);
    if (this.children.isEmpty()) {
      return result;
    }
    return (
      result +
      "\n |\n" +
      this.children
        .map(child =>
          child
            .showDebug()
            .split("\n")
            .map((line, index) => {
              if (index === 0) {
                return " ￫" + line;
              }
              return " |" + line;
            })
            .join("\n")
        )
        .join("\n") +
      "\n"
    );
  }
}
