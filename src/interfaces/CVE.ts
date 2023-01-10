export interface ICVE {
    cveId: string
    description: string
    score: number
    cwes: string[]
    vendor: string
    product: string
    version: string[]
}