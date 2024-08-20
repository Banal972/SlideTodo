import { useEffect, useState } from "react"

import { onAuthStateChanged } from "firebase/auth"
import { auth } from "firebaseConfig"

interface UserType {
  displayName: string | null
  email: string | null
  uid: string
  photoURL: string | null
}

const useGetUser = () => {
  const [user, setUser] = useState<UserType | null>(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user
        setUser({ displayName, email, uid, photoURL })
      } else {
        setUser(null)
      }
    })
  }, [])

  return { user }
}

export default useGetUser
