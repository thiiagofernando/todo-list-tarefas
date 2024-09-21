import { useState, useEffect } from 'react';
import { collection, addDoc, deleteDoc, updateDoc, query, limit, startAfter, getDocs, DocumentData, QueryDocumentSnapshot, doc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Task } from '../core/models/task-Model';

const TASKS_PER_PAGE = 10;

export const useFirestore = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadTasks = async (isInitial = false) => {
    setIsLoading(true);
    try {
      let tasksQuery;

      if (isInitial) {
        tasksQuery = query(collection(db, 'tasks'), limit(TASKS_PER_PAGE));
      } else {
        if (!lastVisible) return;
        tasksQuery = query(collection(db, 'tasks'), startAfter(lastVisible), limit(TASKS_PER_PAGE));
      }

      const snapshot = await getDocs(tasksQuery);
      const newTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];

      if (isInitial) {
        setTasks(newTasks);
      } else {
        setTasks((prevTasks) => [...prevTasks, ...newTasks]);
      }

      const lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];
      setLastVisible(lastVisibleDoc || null);
      setHasMore(snapshot.docs.length === TASKS_PER_PAGE);
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTasks(true);
  }, []);

  const addTask = async (title: string) => {
    try {
      await addDoc(collection(db, 'tasks'), { 
        title, 
        completed: false, 
        createdAt: new Date().toISOString() 
      });
      loadTasks(true);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleTaskCompletion = async (id: string, completed: boolean) => {
    try {
      await updateDoc(doc(db, 'tasks', id), { completed: !completed });
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === id ? { ...task, completed: !completed } : task
        )
      );
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  const loadMore = () => {
    if (hasMore && !isLoading) {
      loadTasks();
    }
  };

  return { tasks, addTask, deleteTask, toggleTaskCompletion, loadMore, hasMore, isLoading };
};
