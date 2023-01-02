export interface IPhasePreset {
    name: string
    description: string
    phases: [{
        name: string
        description: string
        order: number
    }]
}
export interface IPhaseCreate {
    name: string
    description: string
    order: number
}