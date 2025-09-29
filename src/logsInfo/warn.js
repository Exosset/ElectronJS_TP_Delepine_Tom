import log from "electron-log/renderer"

export function warnDelete(result){
 log.warn("Suppression échouée :", result)
}

export function warnNothingItem(){
    log.warn("Aucun article reçu")
}

export function warnServerUser(newUser){
    log.warn("Erreur côté serveur :", newUser.message || newUser)
}