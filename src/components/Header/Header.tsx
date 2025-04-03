import { useState, useEffect } from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  isAlltodosCompleted: boolean;
  createTodo: (title: string) => Promise<void>;
  setTempTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  inputRef: React.RefObject<HTMLInputElement>;
  toggleAllTodos: () => Promise<void>;
  todosLoading: boolean;
  todosLength: number;
};

export const Header: React.FC<Props> = ({
  isAlltodosCompleted,
  createTodo,
  setTempTodo,
  title,
  setTitle,
  inputRef,
  toggleAllTodos,
  todosLoading,
  todosLength,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (!isSubmitting) {
      inputRef?.current?.focus();
    }
  }, [isSubmitting, inputRef]);

  const handleSubmitForm = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsSubmitting(true);
    const currentTitle = title;

    try {
      await createTodo(currentTitle);
    } catch (error) {
      setTempTodo(null);
    } finally {
      setIsSubmitting(false);
      inputRef?.current?.focus();
    }
  };

  const shouldHideButton = todosLoading || !todosLength;

  return (
    <header className="todoapp__header">
      {!shouldHideButton && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: isAlltodosCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAllTodos}
        />
      )}

      <form onSubmit={handleSubmitForm}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
          ref={inputRef}
          disabled={isSubmitting}
        />
      </form>
    </header>
  );
};
