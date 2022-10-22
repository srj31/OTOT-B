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

  const [responses, setResponses] = React.useState({
    create: 'Try adding a task',
    find: 'Try searching a task',
    update: 'Change the grader for a task',
    delete: 'Delete a task',
  })

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
    const res = await createTask(data)
    setResponses({ ...responses, create: res.message })
  }

  const handleUpdate = async (evt) => {
    evt.preventDefault()

    let data = { ...updateFormData }
    //check if all the required inputs are entered
    const res = await changeGrader(data)
    setResponses({ ...responses, update: res.message })
  }

  // Search currently resets Filter to none since it filters from crafts
  const handleSearch = async (name) => {
    const foundTask = await getATask({ name })
    setResponses({
      ...responses,
      find: foundTask.message ? foundTask.message : foundTask,
    })
    setDisplayTask(foundTask)
  }

  const handleDelete = async (name) => {
    const res = await deleteTask({ name })
    setResponses({ ...responses, delete: res.message })
  }

  React.useEffect(() => {
    const fetchMods = async () => {
      const res = await getCsMods()
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
      <div className="border-bottom">
        <div className="p-2" style={{ fontWeight: 'bold', fontSize: '2rem' }}>
          Add a Task
        </div>
        <div className="mt-2 row" style={{ paddingLeft: '10vw' }}>
          <div className="col-6">
            <div className="col-4">
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
          </div>
          <div className="col-6 d-flex flex-row align-items-center justify-content-center">
            {responses.create}
          </div>
          <div className="d-flex flex-row justify-content-center pb-3">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              style={{ width: '50vw' }}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
      <div className="border-bottom">
        <div className="p-2" style={{ fontWeight: 'bold', fontSize: '2rem' }}>
          Find a Task
        </div>
        <div className="mt-2 row" style={{ paddingLeft: '10vw' }}>
          <div className="col-6">
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
          </div>
          <div className="col-6 d-flex flex-column align-items-center justify-content-center">
            <div>{responses.find}</div>
            <div>
              {displayTask && (
                <div>
                  <div>{displayTask.name}</div>
                  <div>{displayTask.points}</div>
                  <div>{displayTask.grader}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="d-flex flex-row justify-content-center pb-3">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSearch(userSearchInput)}
            style={{ width: '50vw' }}
          >
            Find Task
          </Button>
        </div>
      </div>

      <div className="border-bottom">
        <div className="p-2" style={{ fontWeight: 'bold', fontSize: '2rem' }}>
          Update Grader
        </div>
        <div className="mt-2 row" style={{ paddingLeft: '10vw' }}>
          <div className="col-6">
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
          <div className="col-6 d-flex flex-row align-items-center justify-content-center">
            {responses.update}
          </div>
        </div>
        <div className="d-flex flex-row justify-content-center pb-3">
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            style={{ width: '50vw' }}
          >
            Update
          </Button>
        </div>
      </div>
      <div className="border-bottom">
        <div className="p-2" style={{ fontWeight: 'bold', fontSize: '2rem' }}>
          Delete Task
        </div>
        <div className="mt-2 row" style={{ paddingLeft: '10vw' }}>
          <div className="col-6">
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
          </div>
          <div className="col-6 d-flex flex-row align-items-center justify-content-center">
            {responses.delete}
          </div>
        </div>
        <div className="d-flex flex-row justify-content-center pb-3">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleDelete(deleteTaskName)}
            style={{ width: '50vw' }}
          >
            Delete Task
          </Button>
        </div>
      </div>
      <div>
        <div className="p-2" style={{ fontWeight: 'bold', fontSize: '2rem' }}>
          CS Modules
        </div>
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
