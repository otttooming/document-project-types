import * as React from "react";
import { Input } from "antd";
import { SearchQuery } from "../../searchReducer";

export interface StateProps {
  searchQuery: SearchQuery | null;
}

export interface DispatchProps {
  findReflection: (query: SearchQuery | null) => void;
}

export type FilterProps = StateProps & DispatchProps;

interface InternalState {}

class Filter extends React.Component<FilterProps, InternalState> {
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

export default Filter;
