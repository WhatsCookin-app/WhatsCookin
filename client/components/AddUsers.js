import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserPlus} from '@fortawesome/free-solid-svg-icons'
import {SearchUsers} from './index'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'

const AddUser = ({handleCloseModal, search, handleSearch}) => {
  return (
    <div>
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip name="Tool Tip">Add people</Tooltip>}
      >
        <FontAwesomeIcon
          icon={faUserPlus}
          className="cursor mr-3"
          onClick={handleSearch}
        />
      </OverlayTrigger>{' '}
      {search ? (
        <SearchUsers search={search} handleCloseModal={handleCloseModal} />
      ) : (
        ''
      )}
    </div>
  )
}

export default AddUser
