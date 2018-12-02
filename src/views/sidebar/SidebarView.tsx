import * as React from "react";
import Container from "../../components/Container/Container";
import { Button, Tabs } from "antd";
import { ViewName } from "./sidebarReducer";
import DashboardView from "../dashboard/dashboardWrapper";

const TabPane = Tabs.TabPane;

export interface StateProps {
  activeView: ViewName;
}

export interface DispatchProps {
  setActiveView: (name: ViewName) => void;
}

export type SidebarViewProps = StateProps & DispatchProps;

interface InternalState {}

const VIEW = {
  [`${ViewName.Dashboard}`]: <DashboardView />,
};

class SidebarView extends React.Component<SidebarViewProps, InternalState> {
  handleClick = () => {
    this.props.setActiveView(ViewName.Dashboard);
  };

  renderTabTitle = (title: string) => {
    return (
      <div style={{ width: 50, overflow: "hidden", textOverflow: "ellipsis" }}>
        {title}
      </div>
    );
  };

  render() {
    const { activeView } = this.props;

    return (
      <Container>
        <Tabs tabPosition="left">
          <TabPane tab={this.renderTabTitle("Types")} key="1">
            {VIEW[activeView]}
          </TabPane>
          <TabPane tab={this.renderTabTitle("Search")} key="2">
            {" "}
          </TabPane>
        </Tabs>
      </Container>
    );
  }
}

export default SidebarView;
