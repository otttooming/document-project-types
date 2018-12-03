import * as React from "react";
import { SearchQuery } from "./searchReducer";
import { Input, List } from "antd";
import { ProjectReflectionLvl2 } from "../../common/projectReflection";
import { ViewName } from "../../common/routing/routingReducer";

export interface StateProps {
  searchQuery: SearchQuery | null;
  foundReflections: number[] | null;
  activeReflections: ProjectReflectionLvl2[] | null;
}

export interface DispatchProps {
  findReflection: (query: SearchQuery | null) => void;
  setActiveComponentName: (name: string | null) => void;
  setActiveView: (name: string | null) => void;
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

  handleOnTitleClick = (name: string) => (
    event: React.SyntheticEvent<HTMLAnchorElement>
  ) => {
    const { setActiveComponentName, setActiveView } = this.props;

    event.preventDefault();
    setActiveComponentName("constructor-type");
    setActiveView(ViewName.Dashboard);
  };

  renderTitle = ({ name }: ProjectReflectionLvl2) => {
    return (
      <a href="#" onClick={this.handleOnTitleClick(name)}>
        {name}
      </a>
    );
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
              <List.Item.Meta
                title={this.renderTitle(item)}
                description={item.kindString}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default SearchView;
