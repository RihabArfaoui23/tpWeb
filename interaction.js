function DnD(canvas, interactor) {
    // Attributs pour les positions du DnD
    this.xDebutDND = 0;
    this.yDebutDND = 0;
    this.xFinDND = 0;
    this.yFinDND = 0;

    // Attribut pour vérifier si une pression a eu lieu
    this.isPressed = false;

    // Fonction pour la gestion de l'événement 'mousedown' (pression de la souris)
    this.mouseDown = function(evt) {
        // Obtenir la position de la souris par rapport au canvas
        var mousePos = getMousePosition(canvas, evt);

        // Initialiser la position de départ du DnD
        this.xDebutDND = mousePos.x;
        this.yDebutDND = mousePos.y;

        // Marquer que la pression a eu lieu
        this.isPressed = true;

        // Afficher dans la console les coordonnées de l'événement
        console.log('Mouse down at:', this.xDebutDND, this.yDebutDND);

        // Commencer à écouter le mouvement de la souris (mousemove) et le relâchement (mouseup)
        canvas.addEventListener('mousemove', this.mouseMove.bind(this));
        canvas.addEventListener('mouseup', this.mouseUp.bind(this));
    };

    // Fonction pour la gestion de l'événement 'mouseup' (relâchement de la souris)
    this.mouseUp = function(evt) {
        if (this.isPressed) {
            // Obtenir la position de la souris lors du relâchement
            var mousePos = getMousePosition(canvas, evt);

            // Sauvegarder la position de fin du DnD
            this.xFinDND = mousePos.x;
            this.yFinDND = mousePos.y;

            // Afficher dans la console les coordonnées de l'événement
            console.log('Mouse up at:', this.xFinDND, this.yFinDND);

            // Terminer l'interaction, on peut ici appeler une fonction pour dessiner une forme (ex. rectangle)
            this.drawShape();

            // Retirer les écouteurs d'événements 'mousemove' et 'mouseup' après avoir terminé l'interaction
            canvas.removeEventListener('mousemove', this.mouseMove.bind(this));
            canvas.removeEventListener('mouseup', this.mouseUp.bind(this));

            // Réinitialiser l'état de pression
            this.isPressed = false;
        }
    };

    // Fonction pour la gestion de l'événement 'mousemove' (déplacement de la souris)
    this.mouseMove = function(evt) {
        if (this.isPressed) {
            // Mettre à jour la position finale lors du déplacement
            var mousePos = getMousePosition(canvas, evt);
            this.xFinDND = mousePos.x;
            this.yFinDND = mousePos.y;

            // Afficher dans la console les coordonnées de l'événement
            console.log('Mouse move at:', this.xFinDND, this.yFinDND);

            // Facultatif : Vous pouvez ici dessiner un "aperçu" du rectangle/lignes en cours de déplacement.
            this.previewShape();
        }
    };

    // Fonction pour dessiner la forme (par exemple, un rectangle)
    this.drawShape = function() {
        // Ici on dessine un rectangle avec les coordonnées de départ et d'arrivée
        var ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.rect(this.xDebutDND, this.yDebutDND, this.xFinDND - this.xDebutDND, this.yFinDND - this.yDebutDND);
        ctx.stroke();
    };

    // Fonction pour prévisualiser la forme en cours de déplacement
    this.previewShape = function() {
        // Effacer tout ce qui a été dessiné précédemment sur le canvas
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Effacer le canvas entier

        // Dessiner à nouveau le rectangle de départ
        ctx.beginPath();
        ctx.rect(this.xDebutDND, this.yDebutDND, this.xFinDND - this.xDebutDND, this.yFinDND - this.yDebutDND);
        ctx.stroke();
    };

    // Associer les événements du canvas à la fonction 'mouseDown'
    canvas.addEventListener('mousedown', this.mouseDown.bind(this));
};

// Fonction pour obtenir la position de la souris relative au canvas
function getMousePosition(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
};
