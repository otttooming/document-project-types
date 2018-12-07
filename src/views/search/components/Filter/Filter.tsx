import * as React from "react";
import { Input, Divider, Checkbox } from "antd";

import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { SearchQuery, KindString } from "../../searchReducer";

export interface StateProps {
  searchQuery: SearchQuery | null;
}

export interface DispatchProps {
  findReflection: (query: SearchQuery | null) => void;
}

export type FilterProps = StateProps & DispatchProps;

interface InternalState {}

class Filter extends React.Component<FilterProps, InternalState> {
  handleQuery = (query: SearchQuery): void => {
    if (!query) {
      return;
    }

    const { findReflection, searchQuery } = this.props;

    const oldQuery: SearchQuery = !searchQuery ? {} : searchQuery;
    const newQuery: SearchQuery = { ...oldQuery, ...query };

    findReflection(newQuery);
  };

  handleOnChange = (event: React.SyntheticEvent<HTMLInputElement>): void => {
    const {
      currentTarget: { value },
    } = event;

    const query: SearchQuery = { name: value };

    this.handleQuery(query);
  };

  handleFilterRestriction = (kind: KindString[]) => (
    event: CheckboxChangeEvent
  ) => {
    const {
      target: { checked },
    } = event;

    const kindString: KindString[] | undefined = checked ? kind : undefined;

    const query: SearchQuery = { kindString };

    this.handleQuery(query);
  };

  render() {
    return (
      <>
        <Input.Search
          onChange={this.handleOnChange}
          style={{ marginBottom: 16 }}
        />

        <div style={{ marginBottom: 32 }}>
          <Checkbox
            onChange={this.handleFilterRestriction([
              KindString.CLASS,
              KindString.FUNCTION,
            ])}
          >
            Components
          </Checkbox>
          <Checkbox
            onChange={this.handleFilterRestriction([KindString.INTERFACE])}
          >
            Interfaces
          </Checkbox>
        </div>
      </>
    );
  }
}

export default Filter;
