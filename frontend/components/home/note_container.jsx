import { connect } from 'react-redux';
import Note from './note';
import { getNote, updateNote, clearNoteErrors } from '../../actions/note_actions';
import { getNoteTags } from '../../reducers/tags_selector';
import { getAllTaggings, createTagging, deleteTagging, clearTaggingErrors } from '../../actions/tagging_actions';
import { getAllTags, createTag, clearTagErrors } from '../../actions/tag_actions';
import { openModal } from '../../actions/ui_actions';

const _nullNote = {
  id: null,
  title: null,
  body: null,
  notebook_id: null
};

const mapStateToProps = (state, ownProps) => ({
  note: ownProps.note || _nullNote,
  allTags: Object.values(state.entities.tags),
  tags: getNoteTags(state.entities.tags, state.entities.taggings, ownProps.note ? ownProps.note.id : _nullNote.id),
  errors: Object.values(state.errors.note),
  tagErrors: Object.values(state.errors.tag),
  taggingErrors: Object.values(state.errors.tagging),
  taggings: Object.values(state.entities.taggings)
});

const mapDispatchToProps = dispatch => ({
  getNote: (notebookId, noteId) => dispatch(getNote(notebookId, noteId)),
  updateNote: (notebookId, note) => dispatch(updateNote(notebookId, note)),
  clearNoteErrors: () => dispatch(clearNoteErrors()),
  getAllTags: () => dispatch(getAllTags()),
  getAllTaggings: () => dispatch(getAllTaggings()),
  openModal: type => dispatch(openModal(type)),
  createTagging: tagging => dispatch(createTagging(tagging)),
  createTag: tag => dispatch(createTag(tag)),
  deleteTagging: taggingId => dispatch(deleteTagging(taggingId)),
  clearTaggingErrors: () => dispatch(clearTaggingErrors()),
  clearTagErrors: () => dispatch(clearTagErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(Note);