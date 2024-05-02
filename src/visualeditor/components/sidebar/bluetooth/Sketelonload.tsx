import {useBluetoothStore} from "@/store/bluetoothStore";
import {useState} from "react";

interface SkeletonProps {
    handleScan: () => void
}

const skeleton = () => {
    return Array(3).fill(0).map((_, i) => {
        return (
            <div key={`load_${i}`} className="h-20 mx-auto border-2 border-slate-50/20 mb-2 rounded-md w-60">
                <div className="flex flex-row items-center justify-center h-full space-x-5 animate-pulse">
                    <div className="w-10 h-10 bg-gray-300/50 rounded-full ">
                    </div>
                    <div className="flex flex-col space-y-2">
                        <div className="h-5 bg-gray-300/50 rounded-md w-36 ">
                        </div>
                        <div className="w-24 h-5 bg-gray-300/50 rounded-md ">
                        </div>
                    </div>
                </div>
            </div>
        )
    })
}
export default function ({handleScan}: SkeletonProps) {
    const {discoveredDevices} = useBluetoothStore()
    const [loading, setLoading] = useState(false)
    const handleScanClick = () => {
        handleScan()
        setLoading(true)
    }

    return (
        <div className="flex w-full h-full flex-col space-y-2">
            {
                loading && skeleton()
            }
            {
                !loading &&
                (
                    <div className="flex flex-col space-y-2">
                        <span>click scan to start scanning the device</span>
                        <div onClick={handleScanClick} className="space-x-6 space-y-6 bg-blue-700">
                            <span>scan</span>
                        </div>
                    </div>
                )
            }
        </div>
    )

}