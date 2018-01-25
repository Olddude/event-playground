import { expect } from "chai";
import { bootstrap } from "../app/bootstrap";

describe("bootstrap", () => {
  it("should not return expected output", () => {
    expect(bootstrap()).equal("Hello, World!");
  });
});
