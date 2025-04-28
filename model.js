
// Implémenter ici les 4 classes du modèle.

// N'oubliez pas l'héritage !


function Drawing (){
    this.drawing = new Map()
}

function Forme (startX, startY,couleur , epaisseur){
this.startX=startX
this.startY=startY
this.couleur= couleur
this.epaisseur= epaisseur
}
function Rectangle(startX, startY,couleur , epaisseur,hauteur, largeur){
Forme.call(startX, startY,couleur , epaisseur)
this.hauteur=hauteur
this.largeur= largeur

}

function Line(startX, startY,couleur , epaisseur,endX ,endY){
    Forme.call(startX, startY,couleur , epaisseur)
    this.endX=endX
    this.endY= endY
}