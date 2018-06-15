import React from 'react';

class NotebooksIndex extends React.Component {

  constructor(props) {
    super(props);
    this.handleFilter = this.handleFilter.bind(this);
  }

  componentDidMount() {
    this.props.getAllNotebooks();
    this.props.getAllNotes();
  }

  handleFilter(notebook) {
    this.props.getNotebookNotes(notebook.id)
      .then(() => this.props.addFilter("notebook", notebook))
      .then(() => this.props.closePanelModal("notebook"));
  }

  render() {
    return (
        <div>
          <div className="notebooks-header">
            <h2>Notebooks</h2>
            <button 
              className="add-notebook" 
              onClick={() => this.props.openModal("add-notebook")}></button>
          </div>
          <ul className="notebook-list">
            {this.props.notebooks.map(notebook => (
              <li key={notebook.id} onClick={() => this.handleFilter(notebook)}>
                <div>
                  <p className="notebook-title">{notebook.title}</p>
                  <p className="notes-count">{notebook.note_count} {notebook.note_count === 1 ? 'note' : 'notes'}</p>
                </div>
                <div className="notebook-actions">
                  <div className="edit-icon" onClick={() => this.props.openModal("edit-notebook", notebook)}></div>
                  <div className="delete-icon" onClick={() => this.props.deleteNotebook(notebook.id)}></div>
                </div>
              </li>
            )
            )}
          </ul>

        </div>
    );
  }
}

export default NotebooksIndex;