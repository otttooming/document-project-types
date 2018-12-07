import * as React from "react";
import { Input, Radio } from "antd";

import { CheckboxChangeEvent } from "antd/lib/checkbox";
import {
  SearchQuery,
  KindString,
  KindStringSpecial,
  KindStringPossibilities,
} from "../../searchReducer";

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

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

  handleFilterRestriction = (event: CheckboxChangeEvent) => {
    const {
      target: { value },
    } = event;

    const kindString: KindStringPossibilities | undefined = value;

    const query: SearchQuery = { kindString };

    this.handleQuery(query);
  };

  render() {
    const { searchQuery } = this.props;

    const kindFilter: string[] = [
      KindStringSpecial.ALL,
      KindStringSpecial.COMPONENTS,
      KindString.INTERFACE,
    ];

    return (
      <>
        <Input.Search
          onChange={this.handleOnChange}
          style={{ marginBottom: 16 }}
        />

        <div style={{ marginBottom: 32 }}>
          <RadioGroup
            buttonStyle="solid"
            onChange={this.handleFilterRestriction}
            value={
              !searchQuery || !searchQuery.kindString
                ? KindStringSpecial.ALL
                : searchQuery.kindString
            }
          >
            {kindFilter.map((kind, index) => (
              <RadioButton key={index} value={kind}>
                {kind}
              </RadioButton>
            ))}
          </RadioGroup>
        </div>
      </>
    );
  }
}

export default Filter;
