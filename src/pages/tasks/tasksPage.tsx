import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface TaskPageProps {
  onAddTask: (title: string) => void;
}

export const TaskPage: React.FC<TaskPageProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title.trim());
      setTitle('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Nova tarefa"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        Adicionar
      </Button>
    </Box>
  );
};
