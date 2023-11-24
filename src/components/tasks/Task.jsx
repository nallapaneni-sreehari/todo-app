import React from 'react'
import { useParams } from 'react-router-dom'

function Task() {
    const { id } = useParams()
    return (
        <div>Task Single {id}</div>
    )
}

export default Task