import { Button, Dialog, Snackbar, Alert, Box, Skeleton, Card, CardContent, Typography, CardActions, Grid } from '@mui/material'
import { DataGrid, GridRowParams, GridSelectionModel } from '@mui/x-data-grid'
import React from 'react'
import { getProjectInfo } from '~/actions/projectAction'
import { getTasks } from '~/actions/taskAction'
import { addTaskToPhase, removeTaskFromPhase } from '~/actions/phaseAction'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import '~/styles/style.scss'
import { useParams } from 'react-router-dom'
import CreatePhaseModel from '~/components/phaseInfo/CreatePhaseModel'
import { IPhase } from '~/interfaces/Phase'
interface AddOrRemoveTaskToPhaseParams {
    phaseId: string
    taskId: string
}

const PhaseInfo = (): JSX.Element => {
    const queryClient = useQueryClient()
    const { currentProject } = useParams()
    if (currentProject === undefined) return <></>
    const [openTaskD, setOpenTaskD] = React.useState(false)
    const [openArtifactD, setOpenArtifactD] = React.useState(false)
    const [openSnackbar, setOpenSnackbar] = React.useState(false)
    const [currentPhase, setCurrentPhase] = React.useState('')
    const [selectedRows, setSelectedRows] = React.useState<string[]>([''])
    const phaseQuery = useQuery(['phaseList', currentProject], () => getProjectInfo(currentProject))
    const taskQuery = useQuery(['taskList', currentProject], () => getTasks(currentProject))
    const addTaskMutation = useMutation<unknown, Error, AddOrRemoveTaskToPhaseParams>({
        mutationFn: ({ phaseId, taskId }) => addTaskToPhase(phaseId, taskId),
        onSuccess: () => {
            setOpenSnackbar(true)
            queryClient.invalidateQueries(['phaseList', currentProject])
        }
    })
    const removeTaskMutation = useMutation<unknown, Error, AddOrRemoveTaskToPhaseParams>({
        mutationFn: ({ phaseId, taskId }) => removeTaskFromPhase(phaseId, taskId),
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
    const handleClickOpenTaskD = (id: string) => {
        setOpenTaskD(true)
        setCurrentPhase(id)
    }
    const handleCloseTaskD = () => {
        setOpenTaskD(false)
        setOpenSnackbar(false)
        setCurrentPhase('')
    }
    const handleClickOpenArtifactD = (id: string) => {
        setOpenArtifactD(true)
        setCurrentPhase(id)
    }
    const handleCloseArtifactD = () => {
        setOpenArtifactD(false)
        setOpenSnackbar(false)
        setCurrentPhase('')
    }
    const handleDoubleClick = async (params: GridRowParams) => {
        const { id } = params
        const taskId = id.toString()
        const phaseId = currentPhase
        addTaskMutation.mutate({ phaseId, taskId })
    }
    const onTaskRowSelect = (arrayOfIds: GridSelectionModel) => {
        const array = arrayOfIds as string[]
        setSelectedRows(array)
    }
    const handleDeleteSelectedTask = (id: string) => {
        const phaseId = id
        selectedRows.forEach((taskId) => {
            removeTaskMutation.mutate({ phaseId, taskId })
        })
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
                <Grid container spacing={2} sx={{ mb: '20px' }}>
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
                                    onSelectionModelChange={onTaskRowSelect}
                                />
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => handleClickOpenTaskD(_id)} >Add task</Button>
                                <Button color="error" onClick={() => handleDeleteSelectedTask(_id)}>Delete selected task</Button>
                                <Dialog open={openTaskD} onClose={handleCloseTaskD} fullWidth maxWidth="lg">
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
                                <Button onClick={() => handleClickOpenArtifactD(_id)} >Add artifact</Button>
                                <Dialog open={openArtifactD} onClose={handleCloseArtifactD} fullWidth maxWidth="lg">

                                </Dialog>
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
            <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={() => setOpenSnackbar(false)}>
                <Alert severity="success">Operation was success</Alert>
            </Snackbar>
        </Box>
    )
}
export default PhaseInfo