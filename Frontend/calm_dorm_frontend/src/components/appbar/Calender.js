import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Box, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Calendar.css';

const ItemTypes = {
  TASK: 'task',
};

let taskIdCounter = 1;

const initialTasks = [
  { id: taskIdCounter++, name: 'Multiplayer Gaming', color: '#ff8c94' },
  { id: taskIdCounter++, name: 'Group Therapy', color: '#a8e6cf' },
  { id: taskIdCounter++, name: 'Novel/Stories Discussion', color: '#ff8c94' },
  { id: taskIdCounter++, name: 'One-on-One Coaching', color: '#ffd3b6' },
  { id: taskIdCounter++, name: 'Journal Writing Session', color: '#ffaaa5' },
  { id: taskIdCounter++, name: 'A Day By Yourself', color: '#ffaaa5' }
];

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeSlots = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

const Task = ({ task, handleClick }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TASK,
    item: { id: task.id, name: task.name, color: task.color },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <Paper
      ref={drag}
      className="task"
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: task.color,
      }}
      onClick={handleClick}
    >
      {task.name}
    </Paper>
  );
};

const TimeSlot = ({ day, time, tasks = [], moveTask }) => {
  const navigate = useNavigate();

  const handleTaskClick = (task) => {
    if (task.name === 'Multiplayer Gaming') {
      navigate('/multiplayer-gaming');
    }
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.TASK,
    drop: (item) => moveTask(item, day, time),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <Box
      ref={drop}
      className={`time-slot ${isOver ? 'over' : ''}`}
    >
      {tasks.map((task) => (
        <Task key={task.id} task={task} handleClick={() => handleTaskClick(task)} />
      ))}
    </Box>
  );
};

const Calendar = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [taskAssignments, setTaskAssignments] = useState(
    daysOfWeek.reduce((acc, day) => {
      acc[day] = timeSlots.reduce((timeAcc, time) => {
        timeAcc[time] = [];
        return timeAcc;
      }, {});
      return acc;
    }, {})
  );

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await fetch('/api/preferences');
        const data = await response.json();

        const preferences = data.preferences;
        const newAssignments = { ...taskAssignments };

        if (preferences.novelDiscussion) {
          assignTaskToDays(newAssignments, 'Novel/Stories Discussion', 3); 
        }
        if (preferences.multiplayerGaming) {
          assignTaskToDays(newAssignments, 'Multiplayer Gaming', 3); 
        }
        if (preferences.groupTherapy) {
          assignTaskToDays(newAssignments, 'Group Therapy', 3); 
        }
        if (preferences.oneOnOneCoaching) {
          assignTaskToDays(newAssignments, 'One-on-One Coaching', 3); 
        }
        if (preferences.journalWriting) {
          assignTaskToDays(newAssignments, 'Journal Writing Session', 3); 
        }
        if (preferences.dayByYourself) {
          assignTaskToDays(newAssignments, 'A Day By Yourself', 3);
        }

        setTaskAssignments(newAssignments);
      } catch (error) {
        console.error('Error fetching preferences:', error);
      }
    };

    fetchPreferences();
  }, []);

  const assignTaskToDays = (assignments, taskName, daysCount) => {
    const task = tasks.find(t => t.name === taskName);
    const availableSlots = daysOfWeek.flatMap(day => 
      timeSlots.map(time => ({ day, time }))
    );

    for (let i = 0; i < daysCount; i++) {
      let slot;
      do {
        slot = availableSlots.splice(Math.floor(Math.random() * availableSlots.length), 1)[0];
      } while (assignments[slot.day][slot.time].length > 0);

      assignments[slot.day][slot.time].push({ ...task, id: taskIdCounter++ });
    }
  };

  const moveTask = (task, day, time) => {
    const newTask = { ...task, id: taskIdCounter++ };

    setTaskAssignments((prevAssignments) => {
      const newAssignments = { ...prevAssignments };

      // Remove task from all slots
      Object.keys(newAssignments).forEach((d) => {
        Object.keys(newAssignments[d]).forEach((t) => {
          newAssignments[d][t] = newAssignments[d][t].filter((t) => t.id !== task.id);
        });
      });

      // Ensure only one task per slot
      if (!newAssignments[day]) {
        newAssignments[day] = {};
      }
      if (!newAssignments[day][time]) {
        newAssignments[day][time] = [];
      }

      // Clear the slot and add the new task
      newAssignments[day][time] = [newTask];
      return newAssignments;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box className="calendar-container">
        <Box className="time-header">
          <Box className="empty-header"></Box>
          <Box className="time-slots">
            {timeSlots.map((time) => (
              <Box key={time} className="time-slot-header">{time}</Box>
            ))}
          </Box>
          <Box className="tasks-header">
            <Typography variant="h6">Tasks</Typography>
          </Box>
        </Box>
        <Box className="calendar-body">
          <Box className="days-column">
            {daysOfWeek.map((day) => (
              <Box key={day} className="day-header">{day}</Box>
            ))}
          </Box>
          <Box className="calendar-grid">
            {daysOfWeek.map((day) => (
              <Box key={day} className="day-row">
                {timeSlots.map((time) => (
                  <TimeSlot
                    key={time}
                    day={day}
                    time={time}
                    tasks={taskAssignments[day][time]}
                    moveTask={moveTask}
                  />
                ))}
              </Box>
            ))}
          </Box>
          <Box className="tasks-column">
            {tasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </Box>
        </Box>
      </Box>
    </DndProvider>
  );
};

export default Calendar;
