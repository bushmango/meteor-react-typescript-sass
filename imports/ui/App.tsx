import * as React from 'react'

import { withTracker } from 'meteor/react-meteor-data';
 
import { Tasks } from '../api/tasks.js';  

import Task from './Task'

// App component - represents the whole app
class App extends React.Component<any> {

  renderTasks() {
    return this.props.tasks
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>

        <ul>{this.renderTasks()}</ul>
      </div>
    )
  }
}


export default withTracker(() => {
  return {
    tasks: Tasks.find({}).fetch(),
  };
})(App as any);