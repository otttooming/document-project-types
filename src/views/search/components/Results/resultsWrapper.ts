import { connect } from "react-redux";
import Results, { DispatchProps, StateProps } from "./Results";
import { GlobalState } from "../../../../reducers";
import { selectActiveReflectionList } from "../../searchSelectors";
import { setActiveComponentName } from "../../../../common/project/projectActions";
import { setActiveView } from "../../../../common/routing/routingActions";

const mapStateToProps = (state: GlobalState): StateProps => {
  return {
    activeReflections: selectActiveReflectionList(state),
  };
};

const mapDispatchToProps: DispatchProps = {
  setActiveComponentName,
  setActiveView,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Results);
