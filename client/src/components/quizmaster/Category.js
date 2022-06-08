import React, { useState } from 'react'
import Creatable from 'react-select/creatable'
import {Card } from "semantic-ui-react";

const categories = [
  { label: 'Movie', value: 1 },
  { label: 'Music', value: 2 },
  { label: 'Sports', value: 3 },
  { label: 'History', value: 4 }
]


const DeckUpdate = props => {
  const [categoryValue, setCategoryValue] = useState({category: '' })

//   const handleClick = async (event) => {
//     setCategoryValue({ editing: true })
//   }

  const handleChange = (field, value) => {
    switch (field) {
      case 'categories':
        setCategoryValue(value)
        break

      default:
        break
    }
  }

  
  return (
    <Card>
        <div className='input'>
           <Creatable
            isClearable
            isMulti
            onChange={(value) => handleChange('categories', value)}
            options={categories}
            value={categoryValue}
            />
        </div>
        {/* <Button color="teal" onClick={handleClick}>
              Submit
        </Button> */}
    </Card>
 
  )
    }

export default DeckUpdate