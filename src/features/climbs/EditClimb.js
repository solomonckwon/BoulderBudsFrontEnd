import { useParams } from 'react-router-dom'
import EditClimbForm from './EditClimbForm'
import { useGetClimbsQuery } from './climbsApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'

const EditClimb = () => {
    useTitle('BoulderBud: Edit Climb')

    const { id } = useParams()

    const { climb } = useGetClimbsQuery("climbsList", {
        selectFromResult: ({ data }) => ({
            climb: data?.entities[id]
        }),
    })

    if (!climb) return <PulseLoader color={"#FFF"} />

    const content = <EditClimbForm climb={climb} />

    return content
}
export default EditClimb