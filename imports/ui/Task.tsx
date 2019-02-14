import * as React from 'react'

// Task component - represents a single todo item
export default class Task extends React.Component<{
  task: {
    text: string
  }
}> {
  render() {
    return <li>{this.props.task.text}</li>
  }
}
