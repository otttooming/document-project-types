import * as React from "react";
import { ProjectReflectionLvl2 } from "../../common/projectReflection";
import Filter from "./components/Filter/filterWrapper";
import Results from "./components/Results/resultsWrapper";

export interface StateProps {
  foundReflections: number[] | null;
  activeReflections: ProjectReflectionLvl2[] | null;
}

export interface DispatchProps {
  setActiveComponentName: (name: string | null) => void;
  setActiveView: (name: string | null) => void;
}

export type SearchViewProps = StateProps & DispatchProps;

interface InternalState {}

class SearchView extends React.Component<SearchViewProps, InternalState> {
  render() {
    return (
      <div>
        <Filter />

        <Results />
      </div>
    );
  }
}

export default SearchView;
