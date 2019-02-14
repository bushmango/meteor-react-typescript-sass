import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { withTracker } from 'meteor/react-meteor-data'

import { Tasks } from '../api/tasks.js'

import Task from './Task'

// App component - represents the whole app
class App extends React.Component<any> {
  state = {
    newTask: '',
    hideCompleted: false,
  }

  renderTasks() {
    return this.props.tasks
  }

  _newTask_handleSubmit = event => {
    event.preventDefault()
    Tasks.insert({
      text: this.state.newTask,
      createdAt: new Date(), // current time
    })
    this.setState({ newTask: '' })
  }

  _newTask_onChange = event => {
    this.setState({ newTask: event.target.value })
  }

  _hideCompleted_toggle = event => {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    })
  }

  render() {
    let filteredTasks = this.props.tasks
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked)
    }

    return (
      <div className="container">
        <header>
          <h1>Todo List ({this.props.incompleteCount})</h1>
        </header>

        <label className="hide-completed">
          <input
            type="checkbox"
            readOnly
            checked={this.state.hideCompleted}
            onClick={this._hideCompleted_toggle}
          />
          Hide Completed Tasks
        </label>

        <form className="new-task" onSubmit={this._newTask_handleSubmit}>
          <input
            type="text"
            ref="textInput"
            placeholder="Type to add new tasks"
            value={this.state.newTask}
            onChange={this._newTask_onChange}
          />
        </form>

        <ul>
          {filteredTasks.map(task => (
            <Task key={task._id} task={task} />
          ))}
        </ul>
      </div>
    )
  }
}

export default withTracker(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
  }
})(App as any)
