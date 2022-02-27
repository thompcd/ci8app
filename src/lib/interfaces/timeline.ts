export type TimelineRow = {
    label?: string
    type?: string
}

export type TimelineColumn = {
    id?: string
    type?: string
    label?: string
    role?: string
    p?: PObject
}

export type PObject = {
    role: string
}

export type SelectedEventData = {
    row: number
    column: number
}