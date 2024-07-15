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
  let newState: TodoState[];

  switch (action.type) {
    case TodoActionKind.CREATE:
      newState = [action.payload, ...state];
      break;
    case TodoActionKind.UPDATE:
      newState = state.map((todo) =>
        todo.id === action.targetId
          ? {
              ...todo,
              isDone: !todo.isDone,
            }
          : todo
      );
      break;
    case TodoActionKind.DELETE:
      newState = state.filter((todo) => todo.id !== action.targetId);
      break;
    default:
      return state;
  }

  // 새로운 상태를 localStorage에 저장
  localStorage.setItem("todos", JSON.stringify(newState));

  return newState;
}

export { TodoActionKind, todoReducer };
