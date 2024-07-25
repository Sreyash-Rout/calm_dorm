import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Box, Typography, Paper } from '@mui/material';
import './Calendar.css';

const ItemTypes = {
  TASK: 'task',
};

let taskIdCounter = 1; // To keep track of unique task IDs

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

const Task = ({ task }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TASK,
    item: { id: task.id, name: task.name, color: task.color }, // Pass the full task details
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
    >
      {task.name}
    </Paper>
  );
};

const TimeSlot = ({ day, time, tasks = [], moveTask }) => {
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
        <Paper key={task.id} className="task" style={{ backgroundColor: task.color }}>
          {task.name}
        </Paper>
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

  const moveTask = (task, day, time) => {
    // Generate a new ID for the duplicated task
    const newTask = { ...task, id: taskIdCounter++ };

    setTaskAssignments((prevAssignments) => {
      const newAssignments = { ...prevAssignments };

      // Remove the task from its previous slot
      Object.keys(newAssignments).forEach((d) => {
        Object.keys(newAssignments[d]).forEach((t) => {
          newAssignments[d][t] = newAssignments[d][t].filter((t) => t.id !== task.id);
        });
      });

      // Add the new task to the new slot
      if (!newAssignments[day]) {
        newAssignments[day] = {};
      }
      if (!newAssignments[day][time]) {
        newAssignments[day][time] = [];
      }

      newAssignments[day][time].push(newTask);
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
