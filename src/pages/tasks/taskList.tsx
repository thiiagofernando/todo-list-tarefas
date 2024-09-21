import React from 'react';
import { List, Button, Box, CircularProgress } from '@mui/material';
import { Task } from '../../core/models/task-Model';
import { TaskItem } from './taskItem';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete, onLoadMore, hasMore, isLoading }) => {
  return (
    <>
      <List>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
        ))}
      </List>
      {hasMore && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={onLoadMore}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Carregar mais'}
          </Button>
        </Box>
      )}
    </>
  );
};
