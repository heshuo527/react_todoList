import React, { useState, useEffect } from 'react';
import { Input, Button, message, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import './css/index.css'

/**
 * 待办
 */
type TodoType = {
  key: number
  id: number
  content: string
  time: number
  done: boolean
}

function App() {

  //初始化输入框的内容 和 小li
  const [inpValue, setInpValue] = useState('')
  const [todoList, setTodoList] = useState<Array<TodoType>>([])

  //实现本地存储 序列化数组
  const saveTodo = (arr: Array<TodoType>) => {
    if (arr.length !== 0) {
      localStorage.todoList = JSON.stringify(arr)
    }
  }

  const newTime = (time: Date | number) => {
    const d = new Date(time)

    const dataS = d.getDate()
    const monthS = d.getMonth() + 1
    const hoursS = d.getHours()
    const minuteS = d.getMinutes()
    const secondS = d.getSeconds()

    const yarn = d.getFullYear();
    const month = dataS < 10 ? '0' + dataS : dataS;
    const data = monthS < 10 ? '0' + monthS : monthS;
    const hours = hoursS < 10 ? '0' + hoursS : hoursS;
    const minute = minuteS < 10 ? '0' + minuteS : minuteS;
    const second = secondS < 10 ? '0' + secondS : secondS;
    return yarn + '-' + month + '-' + data + ' ' + hours + ':' + minute + ':' + second
  }

  const columns: ColumnsType<TodoType> = [
    {
      title: '内容',
      dataIndex: 'content',
      key: 'time',
      render: ((_, todo) => {
        return <div className={todo.done ? 'todo-content' : 'content'}>{todo.content}</div>
      })
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      render: (( _ ) => {
        return newTime(_)
      })
    },
    {
      title: '操作',
      dataIndex: 'address',
      key: 'address',
      render: ((_, todo) => {
        return (
          <>
            <Button onClick={() => todoDone(todo.id)} type="primary">完成</Button>
            <Button onClick={() => todoDelete(todo.id)} type="primary" danger>删除</Button>
          </>
        )
      })
    },
  ];

  //增加一个todoList的回调
  const addTodo = () => {
    if (inpValue === '') {
      return message.error('请输入内容');
    } else {
      const time = new Date().getTime()
      const items = {
        key: time,
        id: time,
        content: inpValue,
        time: time,
        done: false
      }
      message.success('已完成')
      setTodoList([...todoList, items]);
      saveTodo([...todoList, items])
    };
  }

  //完成一个done的回调
  const todoDone = (id: number | undefined) => {
    //浅拷贝一下
    const todos = [...todoList]
    todos.forEach(todo => {
      if (todo.id === id) {
        if (todo.done === false) {
          todo.done = true
        } else {
          todo.done = false
        }
      };
    });
    setTodoList(todos)
    saveTodo(todos)
    message.warning('已完成')
  }

  //删除一个todoList的回调
  const todoDelete = (id: number | undefined) => {
    //浅拷贝一下
    const todos = [...todoList]
    const newList = todos.filter(todo => todo.id !== id)
    message.error('已删除')
    setTodoList(newList)
    saveTodo(newList)
  }

  const initTodo = () => {
    const todoListStr = localStorage.getItem('todoList');
    if (todoListStr) {
      const todoList = JSON.parse(todoListStr);
      setTodoList(todoList);
    }
  }

  useEffect(() => {
    initTodo();
  }, [])

  return (
    <>
      <Input className='antd-input' placeholder="请输入内容" onChange={(e) => setInpValue(e.target.value)} />
      <Button type="primary" onClick={addTodo}>增加</Button>
      {
        <Table columns={columns} dataSource={todoList} />
      }
    </>
  );
}

export default App;
