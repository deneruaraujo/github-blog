import { useContext, useEffect, useState } from "react"
import { api } from "../../lib/axios"

import { FaGithub } from 'react-icons/fa'
import { FaBuilding } from 'react-icons/fa'
import { FaUserFriends } from 'react-icons/fa'
import { FaExternalLinkAlt } from 'react-icons/fa'

import { PostCard } from "../../components/PostCard"
import { PostsContext } from "../../context/PostsContext"
import { SearchFormComponent } from "./SearchForm"

interface UserProps {
  name: string
  bio: string
  login: string
  avatar_url: string
  company: string
  followers: number
  html_url: string
}

export function Home() {
  const [userData, setUserData] = useState({} as UserProps)

  const { posts } = useContext(PostsContext)

  useEffect(() => {
    api
      .get('/users/saturdayintokyo')
      .then((response) => setUserData(response.data))
      .catch((err) => {
        console.error('An error occurred: ' + err);
      })
  }, [])

  return (
    <div className="flex flex-col justify-center w-4/6 mx-auto max-w-max min-w-[30%]">
      <div className="flex items-center justify-center mt-[-5rem] mb-[4.5rem] px-10 py-8 rounded-xl gap-8 bg-base-profile ">
        <div>
          <img className="rounded-lg max-w-[150px]" src={userData.avatar_url} alt="Abrir perfil em outra aba" />
        </div>
        <div className="flex flex-col">
          <header className="flex justify-between mb-2">
            <h1 className="text-2xl font-bold text-base-title">{userData.name}</h1>
            <a className="font-bold flex items-center gap-2 text-blue hover:underline decoration-2" target="_blank" href={userData.html_url}>
              GITHUB
              <FaExternalLinkAlt />
            </a>
          </header>
          <p className="mb-6">{userData.bio}</p>
          <div className="flex gap-6">
            <span className="flex items-center gap-2 text-base-subtitle">
              <FaGithub size={18} className="text-base-label" />
              {userData.login}
            </span>
            <span className="flex items-center gap-2 text-base-subtitle">
              <FaBuilding size={18} className="text-base-label" />
              {userData.company}
            </span>
            <span className="flex items-center gap-2 text-base-subtitle">
              <FaUserFriends size={18} className="text-base-label"/>
              {userData.followers} seguidores
            </span>
          </div>
        </div>
      </div>
      <div className="mb-12">
        <header className="flex justify-between items-center mb-3">
          <span className="font-bold text-lg text-base-subtitle">Publicações</span>
          <span className="text-sm text-base-span">{posts.total_count} publicações</span>
        </header>
        <SearchFormComponent />
      </div>
      <section className="grid grid-cols-2 gap-8 last-of-type:mb-8">
        {posts.items?.map(item => (
          <PostCard key={item.number} {...item} />
        ))}
      </section>
    </div>

  )
}