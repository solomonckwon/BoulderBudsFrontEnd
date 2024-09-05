import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetCommentsQuery } from './commentsApiSlice'
import { memo } from 'react'

const Comment = ({ commentId }) => {

    const { comment } = useGetCommentsQuery("commentsList", {
        selectFromResult: ({ data }) => ({
            comment: data?.entities[commentId]
        }),
    })

    const navigate = useNavigate()

    if (comment) {
        const created = new Date(comment.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const updated = new Date(comment.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/comments/${commentId}`)

        return (
            <tr className="table__row">
                <td className="table__cell comment__title">{comment.title}</td>
                <td className="table__cell comment__username">{comment.username}</td>
                <td className="table__cell comment__created">{created}</td>
                <td className="table__cell comment__updated">{updated}</td>

                <td className="table__cell">
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}

const memoizedComment = memo(Comment)

export default memoizedComment