import { validateEntity } from "../../services/validateEntity";

describe("validateEntity", () => {
  it("should return success true and entity when entity is valid", () => {
    const requestBody = {
      name: "test",
      email: "test@gmail.com",
      id: 1,
      surname: "test",
    };

    const result = validateEntity("user", requestBody);

    expect(result.success).toEqual(true);
  });

  it("should return success false and error when entity is invalid", () => {
    const requestBody = {
      name: "test",
      email: "test@gmail.com",
      id: 1,
    };

    const result = validateEntity("user", requestBody);

    expect(result).toEqual({
      success: false,
      error: "surname is required",
    });
  });
});
