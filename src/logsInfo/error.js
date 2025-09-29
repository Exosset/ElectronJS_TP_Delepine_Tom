import log from "electron-log/renderer"

export function errorServer(res){
    throw new Error(`Erreur serveur: ${res.status}`)
}

export function errorGetItem(err){
    log.error("Erreur lors de la récupération de l'article :", err)
}

export function errorGetItems(err){
    log.error("Erreur lors de la récupération des articles :", err)
}

export function errorSaveItem(err){
    log.error("Erreur lors de la sauvegarde de l'article :", err)
}

export function errorDeleteItem(err) {
    log.error("Erreur lors de la suppression de l'article :", err)
}

export function errorLoadingDetails(err) {
    log.error("Erreur lors du chargement des détails:", err)
}

export function errorUserCreate(err) {
    log.error("Erreur lors de la création de l'utilisateur :", err)
}