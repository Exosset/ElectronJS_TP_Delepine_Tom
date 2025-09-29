import log from 'electron-log/renderer'

export async function getArticles() {
  try {
    const res = await fetch("http://localhost:3000/articles", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    if (!res.ok) {
      throw new Error(`Erreur serveur: ${res.status}`)
    }
    const articles = await res.json()
    if (Array.isArray(articles.data) && articles.data.length > 0) {
      log.info("Le JSON a été récupéré :", articles)
      return articles.data
    } else {
      log.warn("Aucun article trouvé")
      return []
    }
  } catch (err) {
    log.error("Erreur lors de la récupération des articles :", err)
    return []
  }
}
