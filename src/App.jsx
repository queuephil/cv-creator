/* eslint-disable react/prop-types */

import './App.css'
import { useState } from 'react'

// component has to be outside to work the same as without component being inside
function Input({ label, name, type, value, onChange }) {
  return (
    <div>
      <input
        key={name}
        name={label}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={`Add your ${label}...`}
      />
    </div>
  )
}

function Form({ dataArray, valueArray, onChange }) {
  return (
    <form className="visible">
      {dataArray.map((el) => {
        return (
          <Input
            key={el['key']}
            name={el['key']}
            label={el['label']}
            type={el['type']}
            value={valueArray[el['key']]}
            onChange={onChange}
          />
        )
      })}
    </form>
  )
}

function FormInput({ theFormData, theData, toggleClassFn }) {
  return (
    <>
      {Object.keys(theFormData.formData).map((formId) => (
        <div key={formId} className="form">
          <button
            onClick={() =>
              theFormData.addExampleData(theFormData.example, formId)
            }
            className="material-symbols-outlined"
          >
            lightbulb
          </button>
          <button
            onClick={() => theFormData.deleteForm(formId)}
            className="material-symbols-outlined"
          >
            delete
          </button>
          <button
            onClick={toggleClassFn}
            className="material-symbols-outlined expanded"
          >
            keyboard_arrow_up
          </button>
          <Form
            formId={formId}
            dataArray={theData}
            valueArray={theFormData.formData[formId]}
            onChange={(e) => theFormData.saveInput(formId, e)}
          />
        </div>
      ))}
    </>
  )
}

function FormOutput({ theFormData, theClassName }) {
  return (
    <>
      {Object.entries(theFormData).map(([formId, formData]) => (
        <div className={theClassName} key={formId}>
          {Object.entries(formData).map(([key, value]) => (
            <p key={key} className={key}>
              {value}
            </p>
          ))}
        </div>
      ))}
    </>
  )
}

// UUIDs have to be created outside to be static
const generalData = [
  { label: 'name', type: 'text', key: crypto.randomUUID() },
  { label: 'email', type: 'email', key: crypto.randomUUID() },
  { label: 'phone', type: 'number', key: crypto.randomUUID() },
  { label: 'address', type: 'text', key: crypto.randomUUID() },
]
const educationalData = [
  { label: 'school', type: 'text', key: crypto.randomUUID() },
  { label: 'degree', type: 'text', key: crypto.randomUUID() },
  { label: 'startdate', type: 'text', key: crypto.randomUUID() },
  { label: 'enddate', type: 'text', key: crypto.randomUUID() },
  { label: 'location', type: 'text', key: crypto.randomUUID() },
]
const practicalData = [
  { label: 'company', type: 'text', key: crypto.randomUUID() },
  // { label: 'position', type: 'text', key: crypto.randomUUID() },
  { label: 'description', type: 'text', key: crypto.randomUUID() },
  { label: 'startdate', type: 'text', key: crypto.randomUUID() },
  { label: 'enddate', type: 'text', key: crypto.randomUUID() },
  { label: 'location', type: 'text', key: crypto.randomUUID() },
]
const generalDataExample = {
  name: 'Phil Philippson',
  email: 'random@queuephil.com',
  phone: '+43 776 12349872',
  address: 'Randomstreet 74, 4626 Random',
}
const educationalDataExample = {
  school: 'University of Randomness',
  degree: 'Master of Desaster',
  startdate: '10/2020',
  enddate: '09/2022',
  location: 'Innsbruck',
}
const practicalDataExample = {
  company: 'DieLeut',
  // position: 'Consultant',
  description:
    'Advising of super random unpractical economical practices. Management of even more random people who want to be someone better.',
  startdate: '10/2020',
  enddate: '09/2022',
  location: 'Innsbruck',
}

export default function App() {
  // state with its function can be reused using a function
  const useFormManagement = () => {
    const [formData, setFormData] = useState({})

    const addForm = () => {
      const newFormId = `form${Object.keys(formData).length + 1}`
      setFormData((prev) => ({ ...prev, [newFormId]: {} }))
    }

    const saveInput = (formId, e) => {
      const { name, value } = e.target
      setFormData((prev) => ({
        ...prev,
        [formId]: { ...prev[formId], [name]: value },
      }))
    }

    const deleteForm = (formId) => {
      setFormData((prev) => {
        const updatedFormData = { ...prev }
        delete updatedFormData[formId]
        return updatedFormData
      })
    }

    const addExampleData = (dataExample, formId) => {
      setFormData((prev) => ({
        ...prev,
        [formId]: { ...dataExample },
      }))
    }

    return {
      formData,
      setFormData,
      addForm,
      saveInput,
      deleteForm,
      addExampleData,
    }
  }
  const general = useFormManagement()
  const educational = useFormManagement()
  const practical = useFormManagement()

  general.example = generalDataExample
  educational.example = educationalDataExample
  practical.example = practicalDataExample

  // the DOM can be manipulated directly but it's better to do this by changing state!!!
  // in this case it seemed to be easier to code like the following
  const toggleClass = (e) => {
    e.target.classList.toggle('expanded')
    e.target.classList.toggle('collapsed')
    e.target.nextElementSibling.classList.toggle('visible')
    e.target.nextElementSibling.classList.toggle('hidden')
  }

  return (
    <div className="cvContainer">
      {/* input------------------------------------------------------------ */}

      <div className="dataInput">
        <section className="general">
          <h2>General</h2>
          <FormInput
            theFormData={general}
            theData={generalData}
            toggleClassFn={toggleClass}
          />
          <button onClick={general.addForm}>Add General</button>
        </section>

        <section className="educational">
          <h2>Education</h2>
          <FormInput
            theFormData={educational}
            theData={educationalData}
            toggleClassFn={toggleClass}
          />
          <button onClick={educational.addForm}>Add Education</button>
        </section>

        <section className="practical">
          <h2>Work</h2>
          <FormInput
            theFormData={practical}
            theData={practicalData}
            toggleClassFn={toggleClass}
          />
          <button onClick={practical.addForm}>Add Work</button>
        </section>
      </div>

      {/* output----------------------------------------------------------- */}

      <div className="dataOutput">
        <section className="cv">
          <FormOutput
            theFormData={general.formData}
            theClassName={'generalOutput'}
          />
          <hr />
          <div>
            <h2>Education</h2>
            <FormOutput
              theFormData={educational.formData}
              theClassName={'educationalOutput'}
            />
          </div>
          <hr />
          <div>
            <h2>Work</h2>
            <FormOutput
              theFormData={practical.formData}
              theClassName={'practicalOutput'}
            />
          </div>
        </section>
      </div>

      {/* ----------------------------------------------------------------- */}
    </div>
  )
}
