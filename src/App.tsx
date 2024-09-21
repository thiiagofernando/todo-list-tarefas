import React from 'react';
import { Container, Typography, Paper, CircularProgress } from '@mui/material';
import { useFirestore } from './hooks/useFirestore';
import { TaskList } from './pages/tasks/taskList';
import { TaskPage } from './pages/tasks/tasksPage';

const App: React.FC = () => {
  const { tasks, addTask, deleteTask, toggleTaskCompletion, loadMore, hasMore, isLoading } = useFirestore();

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Lista de Tarefas
        </Typography>
        <TaskPage onAddTask={addTask} />
        {isLoading && tasks.length === 0 ? (
          <CircularProgress />
        ) : (
          <TaskList 
            tasks={tasks} 
            onToggle={toggleTaskCompletion} 
            onDelete={deleteTask} 
            onLoadMore={loadMore}
            hasMore={hasMore}
            isLoading={isLoading}
          />
        )}
      </Paper>
    </Container>
  );
};

export default App;
