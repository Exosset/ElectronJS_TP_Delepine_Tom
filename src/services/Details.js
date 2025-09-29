import { errorDeleteItem, errorGetItem, errorSaveItem, errorServer } from '../logsInfo/error'
import { warnNothingItem, warnDelete } from '../logsInfo/warn'
import { infoDeleteItem, infoGetArticle, infoSaveItem } from '../logsInfo/info'

export async function getArticleDetails(id) {
  try {
    const res = await fetch(`http://localhost:3000/articles/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })

    if (!res.ok) {
      errorServer(res)
    }

    const article = await res.json()

    // si le back renvoie un objet unique
    if (article?.data) {
        infoGetArticle(article)
      return article.data
    } else {
       warnNothingItem()
      return null
    }
  } catch (err) {
        errorGetItem(err)
    return null
  }
}

export async function editArticleDetails(article) {
  try {
    const res = await fetch("http://localhost:3000/articles/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article)
    })

    if (!res.ok) {
      errorServer(res)
    }

    const result = await res.json()

    if (result?.data) {
        infoSaveItem(result)
      return result.data
    } else {
        warnNothingItem()
      return null
    }
  } catch (err) {
     errorSaveItem(err)
    return null
  }
}

export async function deleteArticleById(id) {
  try {
    const res = await fetch(`http://localhost:3000/articles/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })

    if (!res.ok) {
      errorServer()
    }

    const result = await res.json()

    if (result?.code === "200") {
        infoDeleteItem(result)
      return result
    } else {
      warnDelete(result)
      return null
    }
  } catch (err) {
    errorDeleteItem(err)
    return null
  }
}