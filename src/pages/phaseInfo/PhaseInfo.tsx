import { Button, Dialog, Snackbar, Alert, Box, Skeleton, Card, CardContent, Typography, CardActions, Grid } from '@mui/material'
import { DataGrid, GridRowParams } from '@mui/x-data-grid'
import React from 'react'
import { getProjectInfo } from '~/actions/projectAction'
import { getTasks } from '~/actions/taskAction'
import { addTaskToPhase } from '~/actions/phaseAction'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import '~/styles/style.scss'
import { useParams } from 'react-router-dom'
import CreatePhaseModel from '~/components/phaseInfo/CreatePhaseModel'
import { IPhase } from '~/interfaces/Phase'
interface AddTaskToPhaseParams {
    phaseId: string
    taskId: string
}

const PhaseInfo = (): JSX.Element => {
    const queryClient = useQueryClient()
    const { currentProject } = useParams()
    if (currentProject === undefined) return <></>
    const [open, setOpen] = React.useState(false) // Dialog state
    const [openSnackbar, setOpenSnackbar] = React.useState(false) // Snackbar state
    const [currentPhase, setCurrentPhase] = React.useState('') // Currently selected phase
    const phaseQuery = useQuery(['phaseList', currentProject], () => getProjectInfo(currentProject))
    const taskQuery = useQuery(['taskList', currentProject], () => getTasks(currentProject))
    const mutation = useMutation<unknown, Error, AddTaskToPhaseParams>({
        mutationFn: ({ phaseId, taskId }) => addTaskToPhase(phaseId, taskId),
        onSuccess: () => {
            setOpenSnackbar(true)
            queryClient.invalidateQueries(['phaseList', currentProject])
        }
    })
    if (phaseQuery.isLoading || taskQuery.isLoading) {
        return <Skeleton variant="rounded" className="fullPageSkeleton" />
    }
    const phaseList = phaseQuery.data === undefined ? [] : phaseQuery.data.data.phaseList
    const taskList = taskQuery.data === undefined ? [] : taskQuery.data.data
    const taskColumn = [
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'status', headerName: 'Status' },
        { field: 'description', headerName: 'Description', minWidth: 400, flex: 1 }
    ]
    const artifactColumn = [
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'content', headerName: 'Content', mindWidth: 400, flex: 1 },
        { field: 'type', headerName: 'Type' },
        { field: 'url', headerName: 'Url' },
        { field: 'version', headerName: 'Version' },
        { field: 'threats', headerName: 'Threats' },
        { field: 'vulnerabilities', headerName: 'Vulnerabilities' }
    ]
    const handleClickOpen = (id: string) => {
        setOpen(true)
        setCurrentPhase(id)
    }
    const handleClose = () => {
        setOpen(false)
        setOpenSnackbar(false)
        setCurrentPhase('')
    }
    const handleDoubleClick = async (params: GridRowParams) => {
        const { id } = params
        const taskId = id.toString()
        const phaseId = currentPhase
        mutation.mutate({ phaseId, taskId })
    }
    const phaseInfoRender = () => {
        return phaseList.map(({ _id, name, tasks, artifacts }: IPhase) => {
            const transformedArtifacts = artifacts.map((item) => {
                const { _id, name, content, type, url, version } = item
                const threats = item.threatList.join(", ")
                const vuls = item.vulnerabilityList.join(", ")
                return ({ _id, name, content, type, url, version, threats, vuls })
            })
            return (
                <Grid container spacing={2}>
                    <Grid item xs={6} sx={{ p: '20px' }}>
                        <Card key={_id} sx={{ width: '100%' }}>
                            <CardContent sx={{ height: '30vh' }}>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {name}
                                </Typography>
                                <DataGrid
                                    rows={tasks}
                                    getRowId={(row) => row._id}
                                    columns={taskColumn}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    checkboxSelection
                                />
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => handleClickOpen(_id)} >Add task</Button>
                                <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
                                    <DataGrid rows={taskList} columns={taskColumn} autoHeight onRowDoubleClick={handleDoubleClick} getRowId={row => row._id} />
                                </Dialog>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card key={_id} sx={{ width: '100%' }}>
                            <CardContent sx={{ height: '30vh' }}>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Artifacts
                                </Typography>
                                <DataGrid
                                    rows={transformedArtifacts}
                                    getRowId={(row) => row._id}
                                    columns={artifactColumn}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    checkboxSelection
                                />
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => handleClickOpen(_id)} >Add artifact</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            )
        })
    }
    if (phaseList.length === 0) return <CreatePhaseModel />
    return (
        <Box sx={{ flexGrow: '1' }}>
            {phaseInfoRender()}
            <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleClose}>
                <Alert severity="success">Task added successfully</Alert>
            </Snackbar>
        </Box>
    )
}
export default PhaseInfo