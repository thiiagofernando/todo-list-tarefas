import React from 'react';
import { ListItem, ListItemText, Checkbox, IconButton } from '@mui/material';
import DeleteOutline from '@mui/icons-material/DeleteOutline'; // Alterado para DeleteOutline
import { Task } from '../../core/models/task-Model';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(task.id)}>
          <DeleteOutline /> {/* Alterado para DeleteOutline */}
        </IconButton>
      }
    >
      <Checkbox
        edge="start"
        checked={task.completed}
        onChange={() => onToggle(task.id, task.completed)}
      />
      <ListItemText
        primary={task.title}
        sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}
      />
    </ListItem>
  );
};
