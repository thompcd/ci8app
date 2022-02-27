import type { CustomField } from "./customField"

export type ItemQueryResult = {
    data: Item[]
    message: string
    status: string
  }

export type Item = {
    id: number
    starred: boolean
    name: string
    fullname: string
    description: string
    barcode: string
    sku: string
    type: ItemType
    url: string
    tags: string
    notes: string
    purchaseDescription: string
    vendorPartNumber: string
    customerPartNumber: string
    vender: VendorRef
    bin: string
    warranty: string
    //category
    //class
    //incomeAccount
    //cogsAccount
    //assetAccount
    //expenseAccount
    onHand: number
    available: number
    onSO: number
    onSR: number
    onWO: number
    onPO: number
    onRMA: number
    rented: number
    reorderPoint: number
    maxStock: number
    leadTime: number
    salesPrice: number
    baseSalesPrice: number
    markupPercent: number
    useMarkup: boolean
    minimumPrice: number
    purchaseCost: number
    basePurchaseCost: number
    costBasis: number
    weight: number
    volume: number
    weightunit: string
    volumeunit: string
    sublevel: number
    taxable: boolean
    archived: boolean
    customFields: CustomField[]
    //other fields exist but did not populate
}

export enum ItemType {
    Inventory,
    NonInventory,
    Category,
    Expense,
    Assembly,
    Kit,
    Service,
    Labor,
    Overhead,
    Other
  }

export type VendorRef = {
    id: number
    name: string
}