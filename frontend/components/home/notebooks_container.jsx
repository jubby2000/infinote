import { connect } from 'react-redux';
import NotebooksIndex from './notebooks_index';
import { getAllNotebooks } from '../../actions/notebook_actions';
import { closeModal, openModal } from '../../actions/ui_actions';

const mapStateToProps = state => ({
  notebooks: Object.values(state.entities.notebooks)
});

const mapDispatchToProps = dispatch => ({
  getAllNotebooks: () => dispatch(getAllNotebooks()),
  // closeModal: modal => dispatch(closeModal(modal)),
  openModal: modal => dispatch(openModal(modal))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotebooksIndex);