import { connect } from "react-redux";
import { setActiveView } from "../../common/routing/routingActions";
import SidebarView, { DispatchProps, StateProps } from "./SidebarView";
import { GlobalState } from "../../reducers";
import { selectActiveView } from "../../common/routing/routingSelectors";

const mapStateToProps = (state: GlobalState): StateProps => {
  return {
    activeView: selectActiveView(state),
  };
};

const mapDispatchToProps: DispatchProps = {
  setActiveView,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarView);
