enum TodoActionKind {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

interface CreateTodoAction {
  type: TodoActionKind.CREATE;
  payload: TodoState;
}

interface UpdateTodoAction {
  type: TodoActionKind.UPDATE;
  targetId: number;
}

interface DeleteTodoAction {
  type: TodoActionKind.DELETE;
  targetId: number;
}

type TodoAction = CreateTodoAction | UpdateTodoAction | DeleteTodoAction;

export interface TodoState {
  id: number;
  isDone: boolean;
  content: string;
  date: number;
}

function todoReducer(state: TodoState[], action: TodoAction): TodoState[] {
  switch (action.type) {
    case TodoActionKind.CREATE:
      return [action.payload, ...state];
    case TodoActionKind.UPDATE:
      return state.map((todo) =>
        todo.id === action.targetId
          ? {
              ...todo,
              isDone: !todo.isDone,
            }
          : todo
      );
    case TodoActionKind.DELETE:
      return state.filter((todo) => todo.id !== action.targetId);
    default:
      return state;
  }
}

export { TodoActionKind, todoReducer };
