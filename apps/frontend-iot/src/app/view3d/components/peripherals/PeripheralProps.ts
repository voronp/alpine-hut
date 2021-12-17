export interface PeripheralProps {
  ID: number
  Name: string
  Type: string
  Data: {
    [index:string]: any
    Malfunction?: boolean
  }
  Description: string
  Interface: string
  IsActive: number
}

export interface HeaterProps extends PeripheralProps {
  Data: {
    Pin: string
    Active: string
  }
}

export interface SensorProps extends PeripheralProps {
  Data: {
    DeviceID: string
    Temperature: number
  }
}
