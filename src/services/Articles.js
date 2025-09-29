import { errorGetItems, errorServer } from '../logsInfo/error'
import { infoGetJSON } from '../logsInfo/info'
import { warnNothingItem } from '../logsInfo/warn'

export async function getArticles() {
  try {
    const res = await fetch("http://localhost:3000/articles", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    if (!res.ok) {
      errorServer(res)
    }
    const articles = await res.json()
    if (Array.isArray(articles.data) && articles.data.length > 0) {
      infoGetJSON(articles)
      return articles.data
    } else {
      warnNothingItem()
      return []
    }
  } catch (err) {
    errorGetItems(err)
    return []
  }
}
