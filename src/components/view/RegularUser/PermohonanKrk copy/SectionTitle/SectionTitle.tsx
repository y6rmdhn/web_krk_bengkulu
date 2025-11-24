import React from 'react'

interface PropTypes {
    title: string
}

const SectionTitle = (props: PropTypes) => {

    const { title } = props

  return (
    <div className="flex items-center gap-3">
      <div className="w-5 h-5 bg-blue-600 rounded-full" />
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </div>
  )
}

export default SectionTitle