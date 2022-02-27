import type { CustomDateTime } from "../customDateTime"
import type { CustomField } from "./customField"

export type WorkOrder = {
    id: number
    archived: boolean
    assignedToUser: User
    //channel - returned null?
    closed: boolean
    comment: string
    customFields: CustomField[]
    customer: Customer
    customerNotes: string
    date: Date
    department: string
    hasSignature: boolean
    //keys - returned null
    lines: WorkOrderLineItem[]
    formattedDate: CustomDateTime
    priority: Priority
    stage: OrderStage
    //custom field
    assemblyLaborHours: number
    wpLaborHours: number
    woLocation: string
    backorder: string
    //custom internal
    isWithinDateFilter: boolean
    totalOpenItems: number
  }

export type WorkOrderQueryResult = {
  count: number
  totalCount: number
  data: WorkOrder[]
  message: string
  status: string
}

export type WorkOrderLineItem = {
  id: number
  altAmount: number
  amount: number
  cost: number
  description: string
  duedate: Date
  invoiced: number
  item: ItemRef
  //job - null
  lineNumber: number
  linkedTransaction: Transaction
  //listprice
  //lot
  //margin
  //percentdiscount
  picked: number
  produced: number
  quantity: number
  returned: number
  //serials
  shipped: number
  //tax
  //unitprice
  //uom
  volume: number
  volumeunit: string
  weight: number
  weightunit: string
  //workcenter

  //custom
  assemblyLaborHours: number
  wpLaborHours: number
  hasOutstandingQuantity: boolean
  outstandingQuantity: number
  open: number
  order: WorkOrder
}

export type User = {
  id: number
  name: string
}

export type Customer = {
  id: number
  name: string
}

export type Transaction = {
  id: number
  lineNumber: number
  refNumber: string
  transactionType: string
}

export type ItemRef = {
  id: number
  name: string
}

export type Priority = {
  id: number
  syncToken: number
  name: string
}

export type OrderStage = {
  id: number
  syncToken: number
  name: string
}

export enum Priorities {
  Normal = "3",
  MaterialHold = "4"
}