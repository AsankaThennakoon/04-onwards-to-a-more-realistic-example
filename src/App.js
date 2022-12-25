import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {


  const {isLoading,error,sendRequest:sendGetTask}=useHttp();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
  const getTask=(dataTask)=>{
    const loadedTasks = [];

    for (const taskKey in dataTask) {
      loadedTasks.push({ id: taskKey, text: dataTask[taskKey].text });
    }

    setTasks(loadedTasks);


  }

  sendGetTask({url:'https://react-custom-hooks-f28c6-default-rtdb.firebaseio.com/tasks.json'},getTask);

   
  
    
  }, [sendGetTask]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={sendGetTask}
      />
    </React.Fragment>
  );
}

export default App;
