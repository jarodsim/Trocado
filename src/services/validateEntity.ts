import User from "../domain/User";
import Category from "../domain/Category";
import Movement from "../domain/Movement";
import Goal from "../domain/Goal";
import Balance from "../domain/Balance";

export function validateEntity(
  entity: "user" | "category" | "movement" | "goal" | "balance",
  requestBody: Record<string, any>
) {
  try {
    const entityClass = getClassByEntity(entity);

    const entityInstance = new entityClass(requestBody as any);

    Object.keys(entityInstance).forEach((key) => {
      if (!entityInstance[key]) {
        throw new Error(`${key} is required`);
      }
    });

    return {
      success: true,
      entity: entityInstance,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

function getClassByEntity(
  entity: "user" | "category" | "movement" | "goal" | "balance"
) {
  switch (entity) {
    case "user":
      return User;
    case "category":
      return Category;
    case "movement":
      return Movement;
    case "goal":
      return Goal;
    case "balance":
      return Balance;
  }
}
