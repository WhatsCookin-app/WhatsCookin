import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserPlus} from '@fortawesome/free-solid-svg-icons'
import {SearchUsers} from './index'

const AddUser = ({handleCloseModal, search, handleSearch}) => {
  return (
    <div className="mr-1">
      <FontAwesomeIcon
        icon={faUserPlus}
        className="cursor"
        onClick={handleSearch}
      />{' '}
      {search ? (
        <SearchUsers search={search} handleCloseModal={handleCloseModal} />
      ) : (
        ''
      )}
    </div>
  )
}

export default AddUser
