import * as React from "react";
import { SearchQuery } from "./searchReducer";
import { Input, List } from "antd";
import { ProjectReflectionLvl2 } from "src/common/projectReflection";

export interface StateProps {
  searchQuery: SearchQuery | null;
  foundReflections: number[] | null;
  activeReflections: ProjectReflectionLvl2[] | null;
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
    const { activeReflections } = this.props;

    return (
      <div>
        <Input.Search onChange={this.handleOnChange} />

        <List
          itemLayout="horizontal"
          dataSource={!activeReflections ? [] : activeReflections}
          renderItem={(item: ProjectReflectionLvl2) => (
            <List.Item>
              <List.Item.Meta title={item.name} description={item.kindString} />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default SearchView;
