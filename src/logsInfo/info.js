import log from "electron-log/renderer"

export function infoGetArticle(article){
    log.info("Article récupéré :", article)
}

export function infoGetArticles(articles){
    log.info("Articles récupérés :", articles)
}

export function infoSaveItem(result){
    log.info("Article sauvegardé :", result.data)
}

export function infoDeleteItem(result){
    log.info("Article supprimé :", result)
}

export function infoGetJSON(result){
    log.info("Le JSON a été récupéré :", result)
}

export function infoRememberActivated(){
    log.info("Option remember activée ✅")
}

export function infoAuthSend(user){
    log.info("Auth envoyé :", user)
}

export function infoAuthCreate(newUser){
      log.info("Auth créé :", newUser)
}