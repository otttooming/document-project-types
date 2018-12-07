import { KindString } from "./searchReducer";
import { ProjectReflectionLvl2 } from "src/common/projectReflection";

export function filterName(name: string | undefined) {
  return function(child: ProjectReflectionLvl2) {
    if (!name || name.length < 2) {
      return false;
    }

    return child.name.toLowerCase().includes(name.toLowerCase());
  };
}

export function filterKindString(kindString: KindString[] | undefined) {
  return function(child: ProjectReflectionLvl2) {
    if (!Array.isArray(kindString)) {
      return true;
    }

    return kindString.find(kind => kind === child.kindString);
  };
}
