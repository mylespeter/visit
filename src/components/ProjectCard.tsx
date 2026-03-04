
'use client';

import { Project } from '@/types';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowBigRight, ArrowLeftToLine, Link2 } from 'lucide-react';
import BlurEffect from "react-progressive-blur";
import { FaArrowDown } from 'react-icons/fa6';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [loaded, setLoaded] = useState(false);

  const handleClick = () => {
    router.push(`/projects/${project.id}`);
  };

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden n border-none rounded-3xl bg-gray-100/50 dark:bg-white/5 border  cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
      onClick={handleClick}
      style={{
        width: "104%",
        height: "470px",
      }}
    >

      {/* Overlay noir au hover */}
      <div
        className="
          absolute inset-0 
          bg-black/0 
          group-hover:bg-black/10 
          transition-all duration-500 
          z-10
        "
      />

      {/* IMAGE */}
      <div className="absolute inset-0 z-0">
        <img
          src={project.image}
          onLoad={() => setLoaded(true)}
          className={`
            w-full h-full object-cover transition-all duration-700
            group-hover:scale-110
            }
          `}
          alt={project.title}
        />

        {/* Blur effect overlay (progressive) */}
       
          <BlurEffect
            intensity={200}
            position="bottom"
            className="h-[159px] bg-gradient-to-t from-black/20 to-transparent"
          />
      
      </div>

      {/* --- BOTTOM CONTENT --- */}
      <div className="
        absolute bottom-0 left-0 right-0 
        bg-gradient-to-t from-black/20 dark:from-black/50 to-transparent
        px-4 pb-4 pt-10
        group-hover:opacity-0 
        group-hover:translate-y-4
        opacity-100 
        translate-y-0
        transition-all duration-500 ease-out
        z-20
      ">
          {/* <p className="text-white text-left text- fa line-clamp-2 mt-1 flex-1">
            {project.title}
          </p> */}
           <span className=" text-xs text-left block w-max text-gray-00 texsx bg-black/40 px-2 py-1  backdrop-blur-lg text-white rounded-full">
            {project.year}
          </span>
        <div className='flex items-center'>
          <p className="text-white text-left text-sm line-clamp-2 mt-1 flex-1">
            {project.shortDescription}
          </p>
          <div className="ml-2">
            <Link2 className='text-white' size={18} />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 backdrop-blur-xl py-1 rounded-full bg-white/20 text-white"
            >
              {tech}
            </span>
          ))}

        </div>
      </div>
     <div className='absolute   top-3 right-3 mix-blend-exclusion'>
  <div className='size-[40px] grid place-content-center bg-white rounded-full'>
   <FaArrowDown className='text-gray-700 rotate-[-120deg]'/>
  </div>
</div>    

      {/* --- OVERLAY HOVER --- */}
      <div className="
        absolute inset-0
        flex flex-col items-center justify-center
        opacity-0 bg-black/40
        group-hover:opacity-100
        transition-all duration-500
        z-30
        p-6
      ">
        <h3 className="text-white p-2 rounded-full font-semibold text-lg mix-blend-difference">
          {project.title}
        </h3>

        <div className="
          flex items-center justify-center
          gap-3
          px-6 py-3
          rounded-full
          bg-white/10
          border border-white/20
          text-white
          font-semibold
          hover:bg-white/20
          hover:scale-105
          transition-all duration-300
        ">
          <span>Voir le projet</span>
          <Link2 size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </div>
  );
}
