import { ArrowForward } from "@mui/icons-material"
import { Stepper, Box, Button, Step, StepLabel, Card, CardContent, Typography, CardActions, ListItem, TextField } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import { DropResult } from "react-beautiful-dnd"
import { useForm } from "react-hook-form"
import { getPhasePresets } from "~/actions/phaseAction"
import { IPhaseCreate, IPhasePreset } from "~/interfaces/PhasePreset"
import DraggableList from "./DraggableList"

interface SelectPresetProps {
    setSelection: React.Dispatch<React.SetStateAction<'preset' | 'create'>>
    updateStep: () => void
}
interface CreatePhaseModelProps {
    updateStep: () => void
    setSelectedModel: React.Dispatch<React.SetStateAction<IPhaseCreate[] | undefined>>
}
interface ConfirmPhaseModelProps {
    selectedModel: IPhaseCreate[]
}
const SelectPresetOrCreate = (props: SelectPresetProps) => {
    const { updateStep, setSelection } = props
    const selectPreset = () => {
        updateStep()
        setSelection('preset')
    }
    const createNew = () => {
        updateStep()
        setSelection('create')
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button variant="contained" sx={{ mt: '20px' }} onClick={selectPreset}>Select a preset</Button>
            <Button variant="contained" sx={{ mt: '20px' }} onClick={createNew}>Create a new one</Button>
        </Box>
    )
}

const SelectPreset = (props: CreatePhaseModelProps) => {
    const { updateStep, setSelectedModel } = props
    const presetQuery = useQuery(['preset'], () => getPhasePresets())
    const presets = presetQuery.data === undefined ? [] : presetQuery.data.data
    const selectPreset = (preset: IPhasePreset) => {
        updateStep()
        setSelectedModel(preset.phases)
    }
    return (
        <Box sx={{ display: 'flex' }}>
            {presets.map((preset: IPhasePreset) => {
                return (
                    <Card sx={{ width: '200px', height: '200px', margin: '10px' }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {preset.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {preset.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => selectPreset(preset)}>Select</Button>
                        </CardActions>
                    </Card>
                )
            })}
        </Box>
    )
}
const CreateNew = (props: CreatePhaseModelProps) => {
    const { updateStep, setSelectedModel } = props
    const onDragEnd = ({ destination, source }: DropResult) => {
        if (!destination) return
        const result = Array.from(phases)
        const [removed] = result.splice(source.index, 1)
        result.splice(destination.index, 0, removed)
        setPhases(result)
    }
    const addPhase = () => {
        const newPhases = [...phases]
        newPhases.push({ name: '', description: '', order: 0 })
        setPhases(newPhases)
    }
    const deletePhase = (index: number) => {
        const newPhases = [...phases]
        newPhases.splice(index, 1)
        setPhases(newPhases)
    }
    const nextStep = () => {
        updateStep()
        setSelectedModel(phases)
    }
    const [phases, setPhases] = React.useState<IPhaseCreate[]>([{ name: '', description: '', order: 0 }, { name: '', description: '', order: 1 }, { name: '', description: '', order: 2 }])
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <DraggableList items={phases} onDragEnd={onDragEnd} deletePhase={deletePhase} setPhases={setPhases} />
            <Button variant="contained" sx={{ m: '10px 10px' }} onClick={addPhase}>
                Add phase
            </Button>
            <Button variant="contained" sx={{ m: '10px 10px' }} onClick={nextStep} color="success" endIcon={<ArrowForward />}>
                Next
            </Button>
        </Box>
    )
}

const ConfirmPhaseModel = (props: ConfirmPhaseModelProps) => {
    const { selectedModel } = props
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {selectedModel.map((phase: IPhaseCreate, index) => {
                return (
                    <ListItem>
                        <Card>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Phase {index + 1}
                                </Typography>
                                <TextField label="Name" fullWidth margin="normal" value={phase.name} disabled />
                                <TextField label="Description" fullWidth margin="normal" value={phase.description} disabled />
                            </CardContent>
                        </Card>
                    </ListItem>
                )
            })}
            <Button variant="contained" color="success" sx={{ m: '20px' }} endIcon={<ArrowForward />}>Confirm</Button>
        </Box>
    )
}

const CreatePhaseModelForm = () => {
    const { register, handleSubmit } = useForm()
    const [activeStep, setActiveStep] = React.useState(0)
    const steps = ['Step 1', 'Step 2', 'Step 3']
    const [selection, setSelection] = React.useState<'preset' | 'create'>('preset')
    const [selectedModel, setSelectedModel] = React.useState<IPhaseCreate[] | undefined>(undefined)
    const increaseStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
    const conditionalRender = () => {
        switch (activeStep) {
            case 0:
                return <SelectPresetOrCreate updateStep={increaseStep} setSelection={setSelection} />
            case 1:
                if (selection === 'preset') {
                    return <SelectPreset updateStep={increaseStep} setSelectedModel={setSelectedModel} />
                }
                return <CreateNew updateStep={increaseStep} setSelectedModel={setSelectedModel} />
            case 2:
                if (selectedModel !== undefined) return <ConfirmPhaseModel selectedModel={selectedModel} />
                return <></>
        }
    }
    return (
        <Box>
            <Box component="form" sx={{ minWidth: '500px', minHeight: '500px' }}>
                {conditionalRender()}
            </Box>
            <Stepper activeStep={activeStep} sx={{ mb: '20px' }}>
                {steps.map((label) => {
                    return (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
        </Box>
    )
}
export default CreatePhaseModelForm