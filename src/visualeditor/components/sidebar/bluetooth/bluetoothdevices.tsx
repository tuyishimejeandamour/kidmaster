import React from 'react'
import Device from "@/bluetooth/device";
import PairedDevice from "@/bluetooth/pairedDevice";
interface Props {
    device:PairedDevice
}
export default function RenderBluetoothDevice ({device}:Props) {
  return (
      <div className="flex mx-auto w-full items-center justify-center">
          <ul className="flex flex-col p-4 text-gray-300">

          </ul>
      </div>
  )
}