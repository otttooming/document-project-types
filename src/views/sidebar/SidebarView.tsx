import * as React from "react";
import Container from "../../components/Container/Container";
import { Icon, Tabs, Tooltip } from "antd";
import { ViewName } from "./sidebarReducer";
import DashboardView from "../dashboard/dashboardWrapper";
import SearchView from "../search/searchWrapper";

const TabPane = Tabs.TabPane;

export interface StateProps {
  activeView: ViewName;
  gitHubUrl: string | null;
}

export interface DispatchProps {
  setActiveView: (name: ViewName) => void;
}

export type SidebarViewProps = StateProps & DispatchProps;

interface InternalState {}

const VIEW = {
  [`${ViewName.Dashboard}`]: <DashboardView />,
  [`${ViewName.Search}`]: <SearchView />,
};

class SidebarView extends React.Component<SidebarViewProps, InternalState> {
  handelOnChange = (value: ViewName | string) => {
    const { setActiveView, gitHubUrl } = this.props;

    function isGitHubLink(value: ViewName | string): value is string {
      return value === "github";
    }

    if (isGitHubLink(value)) {
      return window.open(gitHubUrl ? gitHubUrl : undefined, "_blank");
    }

    setActiveView(value);
  };

  handleGitHubLink = () => {};

  renderTabTitle = (title: string, icon: string) => {
    return (
      <Tooltip placement="right" title={title}>
        <Icon type={icon} />
      </Tooltip>
    );
  };

  render() {
    const { activeView } = this.props;

    return (
      <Container>
        <Tabs
          tabPosition="left"
          activeKey={activeView}
          onChange={this.handelOnChange}
        >
          <TabPane
            tab={this.renderTabTitle("Types", "home")}
            key={ViewName.Dashboard}
          >
            {VIEW[ViewName.Dashboard]}
          </TabPane>

          <TabPane
            tab={this.renderTabTitle("View source on GitHub", "github")}
            key="github"
          />

          <TabPane
            tab={this.renderTabTitle("Search", "search")}
            key={ViewName.Search}
          >
            {VIEW[ViewName.Search]}
          </TabPane>
        </Tabs>
      </Container>
    );
  }
}

export default SidebarView;
