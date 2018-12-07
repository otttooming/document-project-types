import { connect } from "react-redux";
import Filter, { DispatchProps, StateProps } from "./Filter";
import { GlobalState } from "../../../../reducers";
import { findReflection } from "../../searchActions";
import { selectSearchQuery } from "../../searchSelectors";

const mapStateToProps = (state: GlobalState): StateProps => {
  return {
    searchQuery: selectSearchQuery(state),
  };
};

const mapDispatchToProps: DispatchProps = {
  findReflection,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
