import React from 'react'

export default function () {
    return (
        <div>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
                <div className="reel relative w-24 h-24 border-8 border-white border-t-transparent border-b-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-white text-xl">Loading Movies...</p>
            </div>
        </div>
    )
}
