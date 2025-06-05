import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

import "./Status.css";

export type Task = { text: string; url: string; completed: boolean };

const Status = ({ tasks, children }: { tasks: Task[] } & PropsWithChildren) => {
  const renderTask = (task: Task) => {
    return task.completed ? (
      <li key={task.text}>{task.text}</li>
    ) : (
      <Link key={task.text} to={task.url}>
        <li>{task.text}</li>
      </Link>
    );
  };

  const renderIncomplete = () => {
    const incompleteActions = tasks.filter((t) => !t.completed);
    if (incompleteActions.length) {
      return (
        <div>
          <div>{children}</div>
          <ul className="status-incomplete-doc">
            {incompleteActions.map((action: { text: string; url: string }) => {
              return (
                <Link key={action.text} to={action.url}>
                  <li>{action.text}</li>
                </Link>
              );
            })}
          </ul>
        </div>
      );
    }
  };

  const renderComplete = () => {
    const completedActions = tasks.filter((t) => t.completed);
    if (completedActions.length) {
      return (
        <div>
          <p>You have finished the following tasks:</p>
          <ul className="status-completed-doc">
            {completedActions.map(renderTask)}
          </ul>
        </div>
      );
    }
  };

  return (
    <div className="status-onboarding-checklist">
      {renderIncomplete()}
      {renderComplete()}
    </div>
  );
};

export default Status;
