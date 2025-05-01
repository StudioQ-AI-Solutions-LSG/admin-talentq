import React from 'react'
import Image from 'next/image'

interface TalentQLogoProps {
  className?: string
}

const TalentQlogo = ({ className = '' }: TalentQLogoProps) => {
  return (
    <div className={className}>
      <Image 
        src="/q_logo.png" 
        alt="TalentQ Logo" 
        width={32} 
        height={32} 
        className="h-8 w-8 object-contain"
      />
    </div>
  )
}

export default TalentQlogo
