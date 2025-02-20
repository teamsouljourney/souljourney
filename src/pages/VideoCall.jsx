"use client"

import { useState } from "react"
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaPhoneSlash,
  FaCommentAlt,
  FaDesktop,
  FaUser,
} from "react-icons/fa"

export default function VideoCall() {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)

  const participants = [
    { id: 1, name: "Brandon Lee", isActive: true },
    { id: 2, name: "Sarah Miller", isActive: true },
  ]

  return (
    <div className="min-h-screen bg-offWhite p-4 md:p-8 pb-32 flex flex-col">
      <div className="flex-grow flex items-center justify-center ">
        <div className="w-full  max-w-lg space-y-2 sm:space-y-4">
          {participants.map((participant) => (
            <div
              key={participant.id}
              className="relative aspect-video rounded-xl overflow-hidden bg-gray-900 shadow-lg"
            >
              {participant.isActive ? (
                <img
                  src="/placeholder.svg?height=480&width=640"
                  alt={`${participant.name}'s video feed`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FaUser className="w-20 h-20 text-gray-500" />
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-white font-medium">{participant.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Control Buttons */}
      <div className=" bottom-0 left-10 right-0 bg-offWhite shadow-lg py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-center gap-4">
          <button onClick={() => setIsMuted(!isMuted)} className="flex flex-col items-center">
            <div
              className={`p-4 rounded-full ${isMuted ? "bg-red-100 text-red-600" : "bg-gray-100 hover:bg-gray-200"}`}
            >
              {isMuted ? <FaMicrophoneSlash className="w-6 h-6" /> : <FaMicrophone className="w-6 h-6" />}
            </div>
            <span className="mt-2 text-xs">{isMuted ? "Unmute" : "Mute"}</span>
          </button>

          <button onClick={() => setIsVideoOn(!isVideoOn)} className="flex flex-col items-center">
            <div
              className={`p-4 rounded-full ${!isVideoOn ? "bg-red-100 text-red-600" : "bg-gray-100 hover:bg-gray-200"}`}
            >
              {isVideoOn ? <FaVideo className="w-6 h-6" /> : <FaVideoSlash className="w-6 h-6" />}
            </div>
            <span className="mt-2 text-xs">{isVideoOn ? "Stop Video" : "Start Video"}</span>
          </button>

          <button className="flex flex-col items-center">
            <div className="p-4 rounded-full bg-gray-100 hover:bg-gray-200">
              <FaDesktop className="w-6 h-6" />
            </div>
            <span className="mt-2 text-xs">Share Screen</span>
          </button>

          <button className="flex flex-col items-center">
            <div className="p-4 rounded-full bg-gray-100 hover:bg-gray-200">
              <FaCommentAlt className="w-6 h-6" />
            </div>
            <span className="mt-2 text-xs">Chat</span>
          </button>

          <button className="flex flex-col items-center">
            <div className="p-4 rounded-full bg-red-600 hover:bg-red-700 text-white">
              <FaPhoneSlash className="w-6 h-6" />
            </div>
            <span className="mt-2 text-xs">End Call</span>
          </button>
        </div>
      </div>
    </div>
  )
}

