import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { requiredFields, updateGraderFields } from './constants'
import {
  changeGrader,
  createTask,
  deleteTask,
  getATask,
  getCsMods,
} from './api'
import { Button } from '@mui/material'
import axios from 'axios'
import DropdownInfo from './component/common/DropdownInfo/DropdownInfo'

const App = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    points: '',
    grader: '',
  })

  const [updateFormData, setUpdateFormData] = React.useState({
    name: '',
    newGrader: '',
  })

  const [displayTask, setDisplayTask] = React.useState({})
  const [userSearchInput, setUserSearchInput] = React.useState('')
  const [deleteTaskName, setDeleteTaskName] = React.useState('')

  const [moduleData, setModuleData] = React.useState([])

  const handleInput = (evt) => {
    const name = evt.target.name
    const newValue = evt.target.value
    setFormData({ ...formData, [name]: newValue })
  }

  const handleInputUpdate = (evt) => {
    const name = evt.target.name
    const newValue = evt.target.value
    setUpdateFormData({ ...updateFormData, [name]: newValue })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()

    let data = { ...formData }
    //check if all the required inputs are entered
    console.log(data)
    const res = await createTask(data)
    console.log(res)
  }

  const handleUpdate = async (evt) => {
    evt.preventDefault()

    let data = { ...updateFormData }
    //check if all the required inputs are entered
    console.log(data)
    const res = await changeGrader(data)
    console.log(res)
  }

  // Search currently resets Filter to none since it filters from crafts
  const handleSearch = async (name) => {
    const foundTask = await getATask({ name })
    console.log(foundTask)
    setDisplayTask(foundTask)
  }

  const handleDelete = async (name) => {
    const deletedTask = await deleteTask({ name })
    console.log(deletedTask)
  }

  React.useEffect(() => {
    const fetchMods = async () => {
      const res = await getCsMods()
      console.log(res)
      setModuleData(res)
    }
    fetchMods()
  }, [])

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        {requiredFields.map((requiredField) => {
          return (
            <TextField
              required
              id="outlined-required"
              name={requiredField.name}
              label={requiredField.label}
              key={requiredField.label}
              onChange={handleInput}
            />
          )
        })}
      </div>
      <div>
        <Button color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          name={'task'}
          label={'Search Task Name'}
          key={'search'}
          onChange={(event) => {
            setUserSearchInput(event.target.value)
          }}
        />
        <Button color="primary" onClick={() => handleSearch(userSearchInput)}>
          Find Task
        </Button>
      </div>
      <div>
        {displayTask && (
          <div>
            <div>{displayTask.name}</div>
            <div>{displayTask.points}</div>
            <div>{displayTask.grader}</div>
          </div>
        )}
      </div>

      <div>
        {updateGraderFields.map((updateField) => {
          return (
            <TextField
              required
              id="outlined-required"
              name={updateField.name}
              label={updateField.label}
              key={updateField.label}
              onChange={handleInputUpdate}
            />
          )
        })}
      </div>
      <div>
        <Button color="primary" onClick={handleUpdate}>
          Submit
        </Button>
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          name={'task'}
          label={'Delete Task Name'}
          key={'search'}
          onChange={(event) => {
            setDeleteTaskName(event.target.value)
          }}
        />
        <Button color="primary" onClick={() => handleDelete(deleteTaskName)}>
          Delete Task
        </Button>
      </div>
      <div>
        <div>CS Modules</div>
        <div>
          {moduleData.map((module, i) => {
            return (
              <DropdownInfo data={module} rowName={module.moduleCode} key={i} />
            )
          })}
        </div>
      </div>
    </Box>
  )
}

export default App
