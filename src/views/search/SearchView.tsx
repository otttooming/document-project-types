import * as React from "react";
import { SearchQuery } from "./searchReducer";
import { Input } from "antd";

export interface StateProps {
  searchQuery: SearchQuery | null;
}

export interface DispatchProps {
  findReflection: (query: SearchQuery | null) => void;
}

export type SearchViewProps = StateProps & DispatchProps;

interface InternalState {}

class SearchView extends React.Component<SearchViewProps, InternalState> {
  handleQuery = (name: string): void => {
    const { findReflection } = this.props;

    const query: SearchQuery = {
      name,
    };

    findReflection(query);
  };

  handleOnChange = (event: React.SyntheticEvent<HTMLInputElement>): void => {
    const {
      currentTarget: { value },
    } = event;

    this.handleQuery(value);
  };

  render() {
    return (
      <div>
        <Input.Search onChange={this.handleOnChange} />
      </div>
    );
  }
}

export default SearchView;
