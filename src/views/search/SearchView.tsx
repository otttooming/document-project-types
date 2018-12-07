import * as React from "react";
import { List } from "antd";
import { ProjectReflectionLvl2 } from "../../common/projectReflection";
import { ViewName } from "../../common/routing/routingReducer";
import Filter from "./components/Filter/filterWrapper";

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
  handleOnTitleClick = (name: string) => (
    event: React.SyntheticEvent<HTMLAnchorElement>
  ) => {
    const { setActiveComponentName, setActiveView } = this.props;

    event.preventDefault();
    setActiveComponentName(name);
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
        <Filter />

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
