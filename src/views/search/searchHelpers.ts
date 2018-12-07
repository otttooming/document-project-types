import {
  KindString,
  KindStringSpecial,
  KindStringPossibilities,
} from "./searchReducer";
import { ProjectReflectionLvl2 } from "src/common/projectReflection";

export function filterName(name: string | undefined) {
  return function(child: ProjectReflectionLvl2) {
    if (!name || name.length < 2) {
      return false;
    }

    return child.name.toLowerCase().includes(name.toLowerCase());
  };
}

export function filterKindString(
  kindString: KindStringPossibilities | undefined
) {
  return function(child: ProjectReflectionLvl2) {
    if (Array.isArray(kindString)) {
      return kindString.find(kind => kind === child.kindString);
    }

    if (Object.values(KindString).includes(kindString)) {
      return kindString === child.kindString;
    }

    if (kindString === KindStringSpecial.COMPONENTS) {
      return [KindString.CLASS, KindString.FUNCTION]
        .map(item => String(item))
        .includes(child.kindString);
    }

    return true;
  };
}
