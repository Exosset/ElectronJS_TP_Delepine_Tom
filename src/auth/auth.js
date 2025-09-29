let auth = {
  email: "",
  password: "",
  token: ""
}

let utilisateur = {
  email: "",
  password: "",
  pseudo: "",
  cityCode: "",
  city: "",
  phone: "",
  passwordConfirm: ""
}



// met à jour les infos locales et envoie au back
export async function setAuth(email, password) {
  auth.email = email
  auth.password = password
  try {
    const response = await sendAuth(auth)
    console.log("Réponse du serveur :", response)
    if (response.token) {
      auth.token = response.token
    }
    return response
  } catch (err) {
    console.error("Erreur lors du login :", err)
    throw err
  }
}

// fonction interne : appel au backend
async function sendAuth(auth) {
  console.log("Envoi des credentials :", auth)
  const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(auth)
  })
  if (!res.ok) {
    throw new Error(`Erreur serveur : ${res.status}`)
  }
  return res.json()
}

export async function addAuth(email, password, pseudo, cityCode, city, phone, passwordConfirm) {
  const utilisateur = {
    email,
    password,
    passwordConfirm, // 👈 obligatoire pour ton back
    pseudo,
    cityCode,
    city,
    phone
  }

  const res = await fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(utilisateur)
  })

  if (!res.ok) {
    throw new Error(`Erreur serveur : ${res.status}`)
  }

  return await res.json()
}


export function getAuth() {
  return auth
}
