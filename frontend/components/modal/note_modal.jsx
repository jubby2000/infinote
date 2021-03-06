import React from 'react';
import ReactQuill from 'react-quill';

class NoteModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = { title: '', body: '', notebook_id: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.baseState = this.state;
    this.updateHTML = this.updateHTML.bind(this);
    this.clearNoteErrors = this.clearNoteErrors.bind(this);
  }

  componentDidMount() {
    this.props.getAllNotebooks();
  }

  componentWillUnmount() {
    this.clearNoteErrors();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.notebooks[0] !== undefined && this.state.notebook_id === '' && this.state.notebook_id !== newProps.notebooks[0].id) {
      this.setState({notebook_id: newProps.notebooks[0].id});
    }
  }

  handleClose(type) {
    let modal = document.getElementById('note-modal');
    modal.classList.add('fadeOut');
    modal.classList.remove('fadeIn');
    this.resetForm();
    modal.addEventListener('animationend', () => this.props.closeModal(type));
  }

  resetForm() {
    this.setState(this.baseState);
  }

  toggleDisabled() {
    const submitButton = document.getElementById("submit-notebook");
    if (this.state.title !== "") {
      submitButton.removeAttribute("disabled");
    } else {
      submitButton.setAttribute("disabled");
    }
  }

  update(field) {
    return e => {
      this.setState(Object.assign({ [field]: e.target.value }));
    }; 
  }

  updateHTML(value) {
    this.setState(Object.assign({ body: value }));
  }

  handleSubmit(e) {
    e.preventDefault();
    const noteTitle = document.getElementById('note-modal-title-input');
    const noteBody = document.getElementById('note-modal-body-input');
    noteTitle.blur();
    noteBody.blur();
    this.props.createNote(this.state.notebook_id, {title: this.state.title, body: this.state.body})
      .then(() => this.resetForm())
      .then(() => this.handleClose("note-modal"));
  }

  renderErrors() {
    return (
      <ul>
        {this.props.errors.map((err, idx) => (
          <li key={`err-${idx}`}>{err}</li>
        ))}
      </ul>
    );
  }

  clearNoteErrors() {
    if (this.props.errors.length > 0) {
      this.props.clearNoteErrors();
    }
  }

  render() {
    if (!this.props.modal) {
      return null;
    }

    let disabled = this.state.title === "" ? true : false;
    let component;
    switch (this.props.modal) {
      case 'new-note':
        component =
          <form onSubmit={this.handleSubmit}>
            <div className="note-modal-input-buttons">
              <input
                className="note-modal-input-submit"
                id="submit-note"
                disabled={disabled}
                type="submit"
                value={disabled ? "No changes" : "Save"} />
              <input className="note-modal-input-cancel" readOnly value="Cancel" type="cancel" onClick={() => this.handleClose("new-note")} />
            </div>
            <div className="note-filters">
              <div className="notebook-icon-small">
              </div>
              <select className="note-modal-notebooks" name="" id="" value={this.state.notebook_id} onChange={this.update("notebook_id")}>
                {this.props.notebooks.map(notebook => (
                  <option key={notebook.id} value={notebook.id}>{notebook.title}</option>
                ))}
              </select>
              {/* tags go here */}
              <div className="note-modal-errors-container">
                {this.renderErrors()}
              </div>
            </div>
            <div className="note-modal-action-title-separator"></div>
            <input 
              id="note-modal-title-input" 
              className="note-modal-title-input" 
              type="text"
              autoFocus
              value={this.state.title}
              onFocus={this.clearNoteErrors} 
              onChange={this.update("title")} 
              placeholder="Title your note" />
            <ReactQuill 
              className="note-modal-body-input" 
              onFocus={this.clearNoteErrors}
              modules={NoteModal.modules}
              formats={NoteModal.formats}
              value={this.state.body}
              onChange={this.updateHTML}
              placeholder="Just start typing..."
              id="note-modal-body-input"></ReactQuill>
          </form>;
        break;
      default:
        return null;
    }
    return (
      <div id="note-modal" className="note-modal animated fadeIn" onClick={e => e.stopPropagation()}>
        {component}
      </div>
    );
  }
}

NoteModal.modules = {
  toolbar: [
    [{ 'header': ['1', '2', '3'] }, { 'size': ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' },
    { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
};
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
NoteModal.formats = [
  'header', 'code',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'size'
];

export default NoteModal;