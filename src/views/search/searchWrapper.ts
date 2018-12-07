import { connect } from "react-redux";
import SearchView, { DispatchProps, StateProps } from "./SearchView";
import { GlobalState } from "../../reducers";
import {
  selectFoundReflections,
  selectActiveReflectionList,
} from "./searchSelectors";
import { setActiveComponentName } from "../../common/project/projectActions";
import { setActiveView } from "../../common/routing/routingActions";

const mapStateToProps = (state: GlobalState): StateProps => {
  return {
    foundReflections: selectFoundReflections(state),
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
)(SearchView);
